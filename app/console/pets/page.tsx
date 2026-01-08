import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Plus, Sparkles, ImageIcon } from "lucide-react";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";
import { getPetTypeLabel } from "@/lib/utils/pet-type";

export default async function PetsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // 获取用户的所有宠物，包含资源
  const pets = await prisma.pet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
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
      jobs: {
        where: { type: "GENERATE" },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  // 获取用户积分
  const userCredits = await prisma.credit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  const currentBalance = userCredits[0]?.balance || 0;

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-6xl mx-auto space-y-8">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">我的宠物</h1>
            <p className="text-muted-foreground">
              管理您的宠物模型，查看训练状态和生成记录
            </p>
          </div>
          <Link href="/console/pets/new">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              添加宠物
            </Button>
          </Link>
        </div>

        {/* 积分信息 */}
        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">当前积分余额</p>
                <p className="text-3xl font-bold text-purple-600">{currentBalance}</p>
              </div>
              <Link href="/console/credits">
                <Button variant="outline">
                  充值积分
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 宠物列表 */}
        {pets.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <PawPrint className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">还没有宠物模型</h3>
              <p className="text-muted-foreground mb-6">
                上传 3-20 张照片，为您的宠物创建专属 AI 模型
              </p>
              <Link href="/console/pets/new">
                <Button size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  创建第一个宠物模型
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => {
              const photos = pet.assets.map((a) => a.url);
              const trainedModelId = pet.aiModels[0]?.id || null;
              const lastGeneration = pet.jobs[0];

              return (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* 照片预览 */}
                  <div className="grid grid-cols-3 gap-1 p-2 bg-muted">
                    {photos.slice(0, 9).map((photo, index) => (
                      <div key={index} className="aspect-square relative rounded overflow-hidden">
                        <img
                          src={photo}
                          alt={`${pet.name} 照片 ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                    {photos.length > 9 && (
                      <div className="aspect-square flex items-center justify-center bg-muted text-muted-foreground text-sm">
                        +{photos.length - 9}
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle>{pet.name}</CardTitle>
                    <CardDescription>
                      {getPetTypeLabel(pet.type)}
                      {pet.breed && ` · ${pet.breed}`}
                      {pet.coatColor && ` · ${pet.coatColor}`}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* 状态标签 */}
                    <div className="flex items-center gap-2">
                      {trainedModelId ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <Sparkles className="h-3 w-3 mr-1" />
                          已训练
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          未训练
                        </span>
                      )}
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {photos.length} 张照片
                      </span>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2">
                      {trainedModelId ? (
                        <Link href={`/console/pets/${pet.id}/generate`} className="flex-1">
                          <Button size="sm" variant="default" className="w-full">
                            生成照片
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/console/pets/${pet.id}/train`} className="flex-1">
                          <Button size="sm" variant="default" className="w-full">
                            训练模型
                          </Button>
                        </Link>
                      )}
                      <Link href={`/console/pets/${pet.id}/train`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          查看详情
                        </Button>
                      </Link>
                    </div>

                    {/* 生成记录 */}
                    {lastGeneration && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-1">
                          最近生成: {new Date(lastGeneration.createdAt).toLocaleDateString()}
                        </p>
                        <Link href={`/console/generations?petId=${pet.id}`}>
                          <Button size="sm" variant="ghost" className="w-full">
                            查看所有记录
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
          </div>
        </div>
      </ConsoleLayout>
    </ConsoleNavHider>
  );
}
