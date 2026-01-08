/**
 * Job Service - 管理训练和生成任务
 * 提供任务的创建、执行、轮询和错误处理
 */

import { prisma } from '@/lib/prisma';
import { getDefaultAIProvider } from '@/lib/ai-providers';
import { JobType, JobStatus, AIModelStatus } from '@prisma/client';

export interface CreateJobParams {
  userId: string;
  petId: string;
  type: JobType;
  inputParams: any;
}

export interface JobResult {
  jobId: string;
  status: JobStatus;
  result?: any;
  error?: string;
}

/**
 * Job Service 类
 */
export class JobService {
  /**
   * 创建训练任务
   */
  async createTrainingJob(params: {
    userId: string;
    petId: string;
    petImages: string[];
    petMeta: any;
  }): Promise<JobResult> {
    const { userId, petId, petImages, petMeta } = params;

    // 1. 检查用户积分
    const credits = await this.getUserCredits(userId);
    const trainingCost = 10;

    if (credits < trainingCost) {
      throw new Error(`积分不足，需要 ${trainingCost} 积分`);
    }

    // 2. 创建 AI Model 记录
    const aiModel = await prisma.aIModel.create({
      data: {
        userId,
        petId,
        name: `${petMeta.name} 的 AI 模型`,
        status: AIModelStatus.PENDING,
        provider: 'stability',
      },
    });

    // 3. 创建训练 Job
    const job = await prisma.job.create({
      data: {
        userId,
        petId,
        aiModelId: aiModel.id,
        type: JobType.TRAIN,
        status: JobStatus.PENDING,
        inputParams: {
          petImages,
          petMeta,
        },
      },
    });

    // 4. 异步执行训练
    this.executeTrainingJob(job.id, aiModel.id, petImages, petMeta, userId).catch(
      (error) => {
        console.error(`训练任务 ${job.id} 执行失败:`, error);
      }
    );

    return {
      jobId: job.id,
      status: JobStatus.PROCESSING,
    };
  }

  /**
   * 创建生成任务
   */
  async createGenerationJob(params: {
    userId: string;
    petId: string;
    photoPackId: string;
    referenceImages?: string[];
    generationParams?: any;
  }): Promise<JobResult> {
    const { userId, petId, photoPackId, referenceImages, generationParams } = params;

    // 1. 检查用户积分
    const credits = await this.getUserCredits(userId);
    const generationCost = 5;

    if (credits < generationCost) {
      throw new Error(`积分不足，需要 ${generationCost} 积分`);
    }

    // 2. 获取宠物的 AI Model
    const aiModel = await prisma.aIModel.findFirst({
      where: { petId, status: AIModelStatus.READY },
      orderBy: { createdAt: 'desc' },
    });

    if (!aiModel) {
      throw new Error('请先训练 AI 模型');
    }

    // 3. 获取 PhotoPack
    const photoPack = await prisma.photoPack.findUnique({
      where: { id: photoPackId },
    });

    if (!photoPack) {
      throw new Error('主题包不存在');
    }

    // 4. 创建生成 Job
    const job = await prisma.job.create({
      data: {
        userId,
        petId,
        aiModelId: aiModel.id,
        type: JobType.GENERATE,
        status: JobStatus.PENDING,
        inputParams: {
          photoPackId,
          referenceImages,
          generationParams,
        },
        photoPackId,
      },
    });

    // 5. 异步执行生成
    this.executeGenerationJob(
      job.id,
      aiModel.id,
      photoPack,
      referenceImages,
      generationParams,
      userId
    ).catch((error) => {
      console.error(`生成任务 ${job.id} 执行失败:`, error);
    });

    return {
      jobId: job.id,
      status: JobStatus.PROCESSING,
    };
  }

  /**
   * 执行训练任务
   */
  private async executeTrainingJob(
    jobId: string,
    aiModelId: string,
    petImages: string[],
    petMeta: any,
    userId: string
  ) {
    const trainingCost = 10;

    try {
      // 更新状态为处理中
      await prisma.job.update({
        where: { id: jobId },
        data: { status: JobStatus.PROCESSING },
      });

      await prisma.aIModel.update({
        where: { id: aiModelId },
        data: { status: AIModelStatus.TRAINING },
      });

      // 调用 AI Provider
      const provider = getDefaultAIProvider();
      const result = await provider.startPetTraining(petImages, petMeta);

      // 更新 AI Model
      await prisma.aIModel.update({
        where: { id: aiModelId },
        data: {
          providerModelId: result.providerModelId,
          status: AIModelStatus.READY,
        },
      });

      // 完成任务
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.COMPLETED,
          finishedAt: new Date(),
          result: { providerModelId: result.providerModelId },
        },
      });

      // 扣除积分
      await this.deductCredits(userId, trainingCost, `训练 AI 模型: ${petMeta.name}`);

      console.log(`✅ 训练任务完成: ${jobId}`);
    } catch (error: any) {
      // 失败处理
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.FAILED,
          finishedAt: new Date(),
          result: { error: error.message },
        },
      });

      await prisma.aIModel.update({
        where: { id: aiModelId },
        data: { status: AIModelStatus.FAILED },
      });

      console.error(`❌ 训练任务失败: ${jobId}`, error);
    }
  }

  /**
   * 执行生成任务
   */
  private async executeGenerationJob(
    jobId: string,
    aiModelId: string,
    photoPack: any,
    referenceImages: string[],
    generationParams: any,
    userId: string
  ) {
    const generationCost = 5;

    try {
      // 更新状态为处理中
      await prisma.job.update({
        where: { id: jobId },
        data: { status: JobStatus.PROCESSING },
      });

      // 获取 AI Model
      const aiModel = await prisma.aIModel.findUnique({
        where: { id: aiModelId },
      });

      if (!aiModel?.providerModelId) {
        throw new Error('AI 模型未就绪');
      }

      // 调用 AI Provider
      const provider = getDefaultAIProvider();
      const result = await provider.generatePetImages(
        aiModel.providerModelId,
        referenceImages,
        {
          ...generationParams,
          basePrompt: photoPack.basePrompt,
          negativePrompt: photoPack.negativePrompt,
        }
      );

      if (result.status === 'failed' || result.images.length === 0) {
        throw new Error(result.error || '生成失败');
      }

      // 保存生成的图片到 Assets
      const assets = await Promise.all(
        result.images.map((image, index) =>
          prisma.asset.create({
            data: {
              userId,
              petId: aiModel.petId,
              aiModelId,
              jobId,
              type: 'IMAGE',
              url: image.url,
              thumbnailUrl: image.url, // 可以生成缩略图
            },
          })
        )
      );

      // 完成任务
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.COMPLETED,
          finishedAt: new Date(),
          result: {
            imageUrls: assets.map((a) => a.url),
            count: assets.length,
          },
        },
      });

      // 扣除积分
      await this.deductCredits(userId, generationCost, `生成宠物照片`);

      console.log(`✅ 生成任务完成: ${jobId}, 生成 ${assets.length} 张图片`);
    } catch (error: any) {
      // 失败处理
      await prisma.job.update({
        where: { id: jobId },
        data: {
          status: JobStatus.FAILED,
          finishedAt: new Date(),
          result: { error: error.message },
        },
      });

      console.error(`❌ 生成任务失败: ${jobId}`, error);
    }
  }

  /**
   * 获取任务状态
   */
  async getJobStatus(jobId: string, userId: string) {
    const job = await prisma.job.findUnique({
      where: { id: jobId, userId },
      include: {
        assets: true,
      },
    });

    if (!job) {
      throw new Error('任务不存在');
    }

    return {
      id: job.id,
      type: job.type,
      status: job.status,
      result: job.result,
      assets: job.assets.map((a) => ({
        id: a.id,
        url: a.url,
        thumbnailUrl: a.thumbnailUrl,
        type: a.type,
      })),
      createdAt: job.createdAt,
      finishedAt: job.finishedAt,
    };
  }

  /**
   * 获取用户积分
   */
  private async getUserCredits(userId: string): Promise<number> {
    const lastCredit = await prisma.credit.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return lastCredit?.balance || 0;
  }

  /**
   * 扣除积分
   */
  private async deductCredits(userId: string, amount: number, reason: string) {
    const lastCredit = await prisma.credit.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    await prisma.credit.create({
      data: {
        userId,
        amount: -amount,
        balance: (lastCredit?.balance || 0) - amount,
        reason,
      },
    });
  }
}

// 导出单例
export const jobService = new JobService();
