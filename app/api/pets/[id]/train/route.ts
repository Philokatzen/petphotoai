import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jobService } from "@/lib/services/job-service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/pets/[id]/train - 开始训练
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const { id: petId } = await params;

    // 获取宠物信息和照片
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
      include: {
        assets: {
          where: { type: "IMAGE" },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!pet) {
      return NextResponse.json(
        { error: "宠物不存在或无权访问" },
        { status: 404 }
      );
    }

    // 检查照片数量
    const petImages = pet.assets.map((a) => a.url);
    if (petImages.length < 3) {
      return NextResponse.json(
        { error: "至少需要 3 张照片才能开始训练" },
        { status: 400 }
      );
    }

    // 检查是否已有训练中的模型
    const existingJob = await prisma.job.findFirst({
      where: {
        petId,
        type: "TRAIN",
        status: { in: ["PENDING", "PROCESSING"] },
      },
      include: {
        aiModel: true,
      },
    });

    if (existingJob) {
      return NextResponse.json({
        jobId: existingJob.id,
        status: "processing",
        message: "模型训练中",
      });
    }

    // 检查是否已有训练完成的模型
    const completedModel = await prisma.aIModel.findFirst({
      where: {
        petId,
        status: "READY",
      },
    });

    if (completedModel) {
      return NextResponse.json({
        jobId: completedModel.jobs[0]?.id,
        modelId: completedModel.id,
        status: "completed",
        message: "模型已完成训练",
      });
    }

    // 构建宠物元数据
    const petMeta = {
      name: pet.name,
      type: pet.type,
      breed: pet.breed || undefined,
      coatColor: pet.coatColor || undefined,
      gender: pet.gender || undefined,
    };

    // 调用 JobService 创建训练任务
    const result = await jobService.createTrainingJob({
      userId: session.user.id,
      petId,
      petImages,
      petMeta,
    });

    return NextResponse.json({
      jobId: result.jobId,
      status: result.status,
      message: "开始训练 AI 模型",
    });
  } catch (error: any) {
    console.error("训练错误:", error);
    return NextResponse.json(
      { error: error.message || "训练失败" },
      { status: 500 }
    );
  }
}

// GET /api/pets/[id]/train - 获取训练状态
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const { id: petId } = await params;

    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
      include: {
        assets: {
          where: { type: "IMAGE" },
        },
      },
    });

    if (!pet) {
      return NextResponse.json(
        { error: "宠物不存在或无权访问" },
        { status: 404 }
      );
    }

    // 查找最新的训练任务
    const latestJob = await prisma.job.findFirst({
      where: {
        petId,
        type: "TRAIN",
      },
      include: {
        aiModel: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // 查找已完成的模型
    const readyModel = await prisma.aIModel.findFirst({
      where: {
        petId,
        status: "READY",
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      modelId: readyModel?.id,
      jobId: latestJob?.id,
      status: readyModel
        ? "completed"
        : latestJob?.status?.toLowerCase() || "pending",
      photos: pet.assets.length,
    });
  } catch (error: any) {
    console.error("获取训练状态错误:", error);
    return NextResponse.json(
      { error: error.message || "获取失败" },
      { status: 500 }
    );
  }
}
