import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrainPetClient } from "./train-client";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TrainPetPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  // 获取宠物信息和资产
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
              <button
                onClick={() => redirect("/console/pets/new")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                创建宠物模型
              </button>
            </div>
          </div>
        </ConsoleLayout>
      </ConsoleNavHider>
    );
  }

  // 转换为前端期望的格式
  const petForClient = {
    id: pet.id,
    name: pet.name,
    photos: pet.assets.map((a) => a.url),
    trainedModelId: pet.aiModels[0]?.id || null,
  };

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 头部 */}
            <div>
              <h1 className="text-3xl font-bold mb-2">训练 {pet.name} 的 AI 模型</h1>
              <p className="text-muted-foreground">
                上传了 {pet.assets.length} 张照片，现在可以开始训练专属 AI 模型
              </p>
            </div>

            <TrainPetClient pet={petForClient} />
          </div>
        </div>
      </ConsoleLayout>
    </ConsoleNavHider>
  );
}
