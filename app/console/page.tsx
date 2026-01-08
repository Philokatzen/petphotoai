import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, PawPrint, Settings, Sparkles, ImageIcon } from "lucide-react";
import { ConsoleLayout } from "@/components/console/console-layout";
import Link from "next/link";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";
import Image from "next/image";

export default async function ConsolePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // 获取用户的所有宠物
  const pets = await prisma.pet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      assets: {
        where: { type: "IMAGE" },
        orderBy: { createdAt: "desc" },
        take: 9,
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
    take: 3, // 控制台只显示最近3个
  });

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container py-10">
          {/* 页面头部 */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold">我的萌宠小窝</h1>
            <p className="mt-2 text-muted-foreground">
              管理主子们的 AI 模型，拍美照
            </p>
          </div>

          {/* 用户信息卡片 */}
          <div className="mb-8 rounded-xl border bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:from-purple-950/20 dark:to-pink-950/20">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <PawPrint className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">欢迎回家，{session.user.name}!</h2>
                <p className="text-muted-foreground">
                  开始为你的主子创建专属 AI 模型吧～
                </p>
              </div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">快捷通道</h2>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <QuickActionCard
                title="添加新主子"
                description="上传照片创建新的萌宠模型"
                icon={<Plus className="h-6 w-6" />}
                href="/console/pets/new"
              />
              <QuickActionCard
                title="我的主子们"
                description="看看已创建的所有萌宠模型"
                icon={<PawPrint className="h-6 w-6" />}
                href="/console/pets"
              />
              <QuickActionCard
                title="美照记录"
                description="查看所有照片生成历史"
                icon={<Plus className="h-6 w-6" />}
                href="/console/generations"
              />
              <QuickActionCard
                title="个人设置"
                description="管理账户信息和偏好"
                icon={<Settings className="h-6 w-6" />}
                href="/console/settings"
              />
            </div>
          </div>

          {/* 宠物列表 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">我的主子们</h2>
              <Link href="/console/pets">
                <Button variant="outline" size="sm">
                  查看全部
                </Button>
              </Link>
            </div>

            {pets.length === 0 ? (
              <div className="rounded-xl border p-10 text-center">
                <PawPrint className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">还没有萌宠模型</h3>
                <p className="mt-2 text-muted-foreground">
                  上传主子的照片，创建专属的 AI 模型
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/console/pets/new">
                    <Plus className="mr-2 h-4 w-4" />
                    添加第一个主子
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pets.map((pet) => {
                  const photos = pet.assets.map((a) => a.url);
                  const trainedModelId = pet.aiModels[0]?.id || null;
                  const lastJob = pet.jobs[0];

                  return (
                    <div
                      key={pet.id}
                      className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      {/* 宠物照片网格 */}
                      <div className="mb-4">
                        {photos.length > 0 ? (
                          <div className="grid grid-cols-3 gap-1 p-2 bg-muted rounded-lg">
                            {photos.slice(0, 9).map((url, index) => (
                              <div
                                key={index}
                                className="aspect-square relative rounded overflow-hidden"
                              >
                                <Image
                                  src={url}
                                  alt={`${pet.name} photo ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                />
                              </div>
                            ))}
                            {photos.length < 9 && (
                              <div className="col-span-3 aspect-square flex items-center justify-center bg-muted text-muted-foreground text-sm">
                                {photos.length}/9 张照片
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="col-span-3 aspect-square flex items-center justify-center bg-muted text-muted-foreground text-sm rounded-lg">
                            暂无照片
                          </div>
                        )}
                      </div>

                      {/* 宠物信息 */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{pet.name}</h3>
                          <div className="flex gap-2">
                            {trainedModelId ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                已训练
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                未训练
                              </span>
                            )}
                            {lastJob && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                <ImageIcon className="h-3 w-3 mr-1" />
                                {photos.length} 张萌照
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pet.description || "这个主子很神秘，还没介绍自己呢"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          加入时间 {new Date(pet.createdAt).toLocaleDateString("zh-CN")}
                        </p>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        {trainedModelId ? (
                          <Link href={`/console/pets/${pet.id}/generate`} className="flex-1">
                            <Button size="sm" variant="default" className="w-full">
                              生成美照
                            </Button>
                          </Link>
                        ) : (
                          <Link href={`/console/pets/${pet.id}/train`} className="flex-1">
                            <Button size="sm" variant="default" className="w-full">
                              训练模型
                            </Button>
                          </Link>
                        )}
                        <Link href={`/console/pets/${pet.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full">
                            查看详情
                          </Button>
                        </Link>
                      </div>
                    </div>
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

function QuickActionCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}
