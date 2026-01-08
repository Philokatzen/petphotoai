/**
 * Stability AI Provider 实现
 * 使用 Stability AI SDXL 进行图片生成
 * 注意：Stability AI 不支持真正的"训练"，而是通过 image-to-image 实现风格迁移
 */

import { AIProvider, PetMeta, TrainingResult, TrainingStatus, GenerationParams, GenerationResult, GeneratedImage } from './types';

// Stability AI SDXL 模型配置
const STABILITY_MODELS = {
  TXT2IMG: 'stable-diffusion-xl-1024-v1-0',
  IMG2IMG: 'stable-diffusion-xl-1024-v1-0',
};

export class StabilityAIProvider extends AIProvider {
  private apiKey: string;
  private baseURL = 'https://api.stability.ai/v1';

  constructor(apiKey: string, retryConfig?: Partial<import('./types').RetryConfig>) {
    super(retryConfig);
    this.apiKey = apiKey;
  }

  getProviderName(): string {
    return 'stability';
  }

  /**
   * Stability AI 不支持真正的模型训练
   * 我们使用虚拟的模型 ID，实际是通过 reference images 进行生成
   */
  async startPetTraining(
    petImages: string[],
    petMeta: PetMeta
  ): Promise<TrainingResult> {
    // 对于 Stability AI，我们不需要真正的"训练"
    // 而是创建一个虚拟模型 ID，用于后续的 image-to-image 生成
    const providerModelId = this.generateVirtualModelId(petMeta, petImages);

    // 模拟训练过程（实际上不需要等待）
    return {
      providerModelId,
      status: 'ready', // Stability AI 可以立即使用
      estimatedTime: 0,
    };
  }

  /**
   * 获取训练状态
   * Stability AI 的虚拟模型总是 ready 状态
   */
  async getTrainingStatus(providerModelId: string): Promise<TrainingStatus> {
    // 解析虚拟模型 ID
    const modelData = this.parseVirtualModelId(providerModelId);

    if (!modelData) {
      return {
        status: 'failed',
        error: '无效的模型 ID',
      };
    }

    return {
      status: 'ready',
      progress: 100,
    };
  }

  /**
   * 生成宠物图片
   * 使用 image-to-image 或 text-to-image
   */
  async generatePetImages(
    providerModelId: string,
    referenceImages?: string[],
    params?: GenerationParams
  ): Promise<GenerationResult> {
    try {
      const modelData = this.parseVirtualModelId(providerModelId);

      if (!modelData) {
        throw new Error('无效的模型 ID');
      }

      const {
        petMeta,
        sampleImages,
      } = modelData;

      // 构建提示词
      const prompt = this.buildPrompt(petMeta, params?.basePrompt);

      // 决定使用 text-to-image 还是 image-to-image
      const useImg2Img = referenceImages && referenceImages.length > 0;
      const referenceImage = useImg2Img ? referenceImages[0] : (sampleImages?.[0]);

      if (useImg2Img && referenceImage) {
        return await this.generateImageToImage(
          referenceImage,
          prompt,
          params || {}
        );
      } else {
        return await this.generateTextToImage(
          prompt,
          params || {}
        );
      }
    } catch (error: any) {
      console.error('Stability AI 生成失败:', error);
      return {
        images: [],
        status: 'failed',
        error: error.message || '生成失败',
      };
    }
  }

  /**
   * Text-to-Image 生成
   */
  private async generateTextToImage(
    prompt: string,
    params: GenerationParams
  ): Promise<GenerationResult> {
    const numImages = params.numImages || 4;
    const width = params.width || 1024;
    const height = params.height || 1024;
    const steps = params.steps || 30;
    const cfgScale = params.cfgScale || 7;
    const seed = params.seed || Math.floor(Math.random() * 1000000);

    const response = await this.fetchWithRetry<{
      artifacts: Array<{ base64: string; seed: number }>;
    }>(
      `${this.baseURL}/generation/${STABILITY_MODELS.TXT2IMG}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: cfgScale,
          height,
          width,
          steps,
          samples: numImages,
          seed,
        }),
      }
    );

    const images: GeneratedImage[] = response.artifacts.map((artifact) => ({
      url: `data:image/png;base64,${artifact.base64}`,
      base64: artifact.base64,
      seed: artifact.seed,
    }));

    return {
      images,
      status: 'completed',
    };
  }

  /**
   * Image-to-Image 生成
   */
  private async generateImageToImage(
    referenceImage: string,
    prompt: string,
    params: GenerationParams
  ): Promise<GenerationResult> {
    const numImages = params.numImages || 4;
    const width = params.width || 1024;
    const height = params.height || 1024;
    const steps = params.steps || 30;
    const cfgScale = params.cfgScale || 7;
    const imageStrength = params.imageStrength || 0.35;
    const seed = params.seed || Math.floor(Math.random() * 1000000);

    // 准备图片数据
    const imageBuffer = await this.fetchImageBuffer(referenceImage);
    const formData = new FormData();
    formData.append('init_image', new Blob([new Uint8Array(imageBuffer)]), 'image.png');
    formData.append('init_image_mode', 'IMAGE_STRENGTH');
    formData.append('image_strength', imageStrength.toString());
    formData.append('text_prompts[0][text]', prompt);
    formData.append('text_prompts[0][weight]', '1');
    formData.append('cfg_scale', cfgScale.toString());
    formData.append('samples', numImages.toString());
    formData.append('steps', steps.toString());
    formData.append('seed', seed.toString());

    const response = await this.fetchWithRetry<{
      artifacts: Array<{ base64: string; seed: number }>;
    }>(
      `${this.baseURL}/generation/${STABILITY_MODELS.IMG2IMG}/image-to-image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
        body: formData,
      }
    );

    const images: GeneratedImage[] = response.artifacts.map((artifact) => ({
      url: `data:image/png;base64,${artifact.base64}`,
      base64: artifact.base64,
      seed: artifact.seed,
    }));

    return {
      images,
      status: 'completed',
    };
  }

  /**
   * 生成虚拟模型 ID
   * 格式: stability:{base64_encoded_data}
   */
  private generateVirtualModelId(petMeta: PetMeta, images: string[]): string {
    const data = {
      type: petMeta.type,
      breed: petMeta.breed || 'unknown',
      coatColor: petMeta.coatColor || 'unknown',
      name: petMeta.name,
      imageCount: images.length,
      sampleImages: images.slice(0, 3), // 保存前3张作为参考
      timestamp: Date.now(),
    };

    const encoded = Buffer.from(JSON.stringify(data)).toString('base64');
    return `stability:${encoded}`; // 不再截断，保持完整数据
  }

  /**
   * 解析虚拟模型 ID
   */
  private parseVirtualModelId(providerModelId: string): {
    petMeta: PetMeta;
    sampleImages: string[];
  } | null {
    try {
      if (!providerModelId.startsWith('stability:')) {
        return null;
      }

      const encoded = providerModelId.replace('stability:', '');
      const json = Buffer.from(encoded, 'base64').toString('utf-8');
      const data = JSON.parse(json);

      return {
        petMeta: {
          name: data.name,
          type: data.type,
          breed: data.breed,
          coatColor: data.coatColor,
        },
        sampleImages: data.sampleImages || [],
      };
    } catch (error) {
      console.error('解析模型 ID 失败:', error);
      return null;
    }
  }

  /**
   * 获取图片 Buffer
   */
  private async fetchImageBuffer(imageUrl: string): Promise<Buffer> {
    if (imageUrl.startsWith('data:')) {
      // Base64 图片
      const base64Data = imageUrl.split(',')[1];
      return Buffer.from(base64Data, 'base64');
    } else {
      // URL 图片
      const response = await fetch(imageUrl);
      return Buffer.from(await response.arrayBuffer());
    }
  }

  /**
   * 构建提示词
   */
  private buildPrompt(petMeta: PetMeta, basePrompt?: string): string {
    const parts: string[] = [];

    // 基础描述
    parts.push(`A beautiful ${this.getPetTypeName(petMeta.type)} named ${petMeta.name}`);

    // 品种和颜色
    if (petMeta.breed) {
      parts.push(petMeta.breed);
    }
    if (petMeta.coatColor) {
      parts.push(`${petMeta.coatColor} colored`);
    }

    // 风格
    parts.push('high quality, detailed, professional photography');

    // 自定义提示词
    if (basePrompt) {
      parts.push(basePrompt);
    }

    return parts.join(', ');
  }

  /**
   * 获取宠物类型名称
   */
  private getPetTypeName(type: string): string {
    const names: Record<string, string> = {
      cat: '猫',
      dog: '狗',
      other: '宠物',
    };
    return names[type] || type;
  }
}
