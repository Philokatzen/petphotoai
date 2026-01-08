import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GeneratePhotoClient } from "./generate-client";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GeneratePhotoPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  // 获取宠物信息和训练好的模型
  const pet = await prisma.pet.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      assets: {
        where: { type: "IMAGE" },
      },
      aiModels: {
        where: { status: "READY" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!pet) {
    return (
      <ConsoleNavHider>
        <ConsoleLayout>
          <div className="container mx-auto py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">宠物不存在</h1>
            </div>
          </div>
        </ConsoleLayout>
      </ConsoleNavHider>
    );
  }

  const trainedModelId = pet.aiModels[0]?.id;

  if (!trainedModelId) {
    return (
      <ConsoleNavHider>
        <ConsoleLayout>
          <div className="container mx-auto py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">请先训练 AI 模型</h1>
              <a href={`/console/pets/${pet.id}/train`} className="text-purple-600 hover:underline">
                前往训练页面
              </a>
            </div>
          </div>
        </ConsoleLayout>
      </ConsoleNavHider>
    );
  }

  // 获取所有主题包
  const photoPacks = await prisma.photoPack.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 转换为前端期望的格式
  const packs = photoPacks.map((pack) => ({
    id: pack.id,
    name: pack.nameCn,
    description: pack.descriptionCn,
  }));

  // 转换 pet 为前端期望的格式
  const petForClient = {
    id: pet.id,
    name: pet.name,
    photos: pet.assets.map((a) => a.url),
    trainedModelId,
  };

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* 头部 */}
            <div>
              <h1 className="text-3xl font-bold mb-2">生成 {pet.name} 的照片</h1>
              <p className="text-muted-foreground">
                选择喜欢的风格，AI 将为 {pet.name} 生成精美的照片
              </p>
            </div>

            <GeneratePhotoClient pet={petForClient} photoPacks={packs} />
          </div>
        </div>
      </ConsoleLayout>
    </ConsoleNavHider>
  );
}
