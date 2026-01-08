import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PetType } from "@prisma/client";

/**
 * POST /api/pets - 创建宠物
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const { name, type, breed, coatColor, gender, birthday, notes, photos } = body;

    // 验证输入
    if (!name || !type) {
      return NextResponse.json(
        { error: "请填写宠物名称和类型" },
        { status: 400 }
      );
    }

    if (!photos || photos.length < 3) {
      return NextResponse.json(
        { error: "至少上传 3 张照片" },
        { status: 400 }
      );
    }

    // 转换 type 为大写
    const petTypeUpper = type.toUpperCase() as "CAT" | "DOG" | "OTHER";

    // 创建宠物记录
    const pet = await prisma.pet.create({
      data: {
        userId: session.user.id,
        name,
        type: petTypeUpper,
        breed,
        coatColor,
        gender,
        birthday: birthday ? new Date(birthday) : null,
        notes,
        // 同时创建 Assets 记录
        assets: {
          create: photos.map((url: string) => ({
            userId: session.user.id,
            type: "IMAGE",
            url,
            thumbnailUrl: url, // 暂时使用相同 URL，后续可生成缩略图
          })),
        },
      },
      include: {
        assets: true,
      },
    });

    return NextResponse.json(pet);
  } catch (error: any) {
    console.error("创建宠物错误:", error);
    return NextResponse.json(
      { error: error.message || "创建失败，请稍后重试" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/pets - 获取宠物列表
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const pets = await prisma.pet.findMany({
      where: { userId: session.user.id },
      include: {
        assets: {
          where: { type: "IMAGE" },
          orderBy: { createdAt: "desc" },
        },
        aiModels: {
          where: { status: "READY" },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 转换为前端期望的格式
    const petsWithPhotos = pets.map((pet) => ({
      ...pet,
      type: pet.type.toLowerCase() as "cat" | "dog" | "other", // 转换为小写
      photos: pet.assets.map((a) => a.url),
      trainedModelId: pet.aiModels[0]?.id || null,
    }));

    return NextResponse.json(petsWithPhotos);
  } catch (error: any) {
    console.error("获取宠物列表错误:", error);
    return NextResponse.json(
      { error: error.message || "获取失败，请稍后重试" },
      { status: 500 }
    );
  }
}
