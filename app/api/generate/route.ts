import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jobService } from "@/lib/services/job-service";

/**
 * POST /api/generate - 开始生成照片
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const { petId, photoPackId, referenceImages, generationParams } = body;

    // 验证参数
    if (!petId) {
      return NextResponse.json(
        { error: "缺少宠物 ID" },
        { status: 400 }
      );
    }

    if (!photoPackId) {
      return NextResponse.json(
        { error: "请选择主题包" },
        { status: 400 }
      );
    }

    // 获取宠物信息
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        userId: session.user.id,
      },
    });

    if (!pet) {
      return NextResponse.json(
        { error: "宠物不存在或无权访问" },
        { status: 404 }
      );
    }

    // 获取主题包信息
    const photoPack = await prisma.photoPack.findUnique({
      where: { id: photoPackId },
    });

    if (!photoPack) {
      return NextResponse.json(
        { error: "主题包不存在" },
        { status: 404 }
      );
    }

    // 调用 JobService 创建生成任务
    const result = await jobService.createGenerationJob({
      userId: session.user.id,
      petId,
      photoPackId,
      referenceImages,
      generationParams,
    });

    return NextResponse.json({
      jobId: result.jobId,
      status: result.status,
      message: "开始生成照片",
    });
  } catch (error: any) {
    console.error("生成错误:", error);
    return NextResponse.json(
      { error: error.message || "生成失败" },
      { status: 500 }
    );
  }
}
