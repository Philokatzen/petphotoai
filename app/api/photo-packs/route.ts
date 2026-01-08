import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/photo-packs - 获取所有主题包
 */
export async function GET() {
  try {
    const photoPacks = await prisma.photoPack.findMany({
      orderBy: { createdAt: "asc" },
    });

    // 转换为前端期望的格式
    const packs = photoPacks.map((pack) => ({
      id: pack.id,
      name: pack.nameCn,
      description: pack.descriptionCn,
      defaultNumImages: pack.defaultNumImages,
      speciesSupport: pack.speciesSupport,
    }));

    return NextResponse.json(packs);
  } catch (error: any) {
    console.error("获取主题包列表错误:", error);
    return NextResponse.json(
      { error: error.message || "获取失败" },
      { status: 500 }
    );
  }
}
