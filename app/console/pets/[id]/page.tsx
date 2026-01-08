import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, ImageIcon, Sparkles, Settings, ChevronRight, Calendar, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPetTypeLabel } from "@/lib/utils/pet-type";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PetDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  // 获取宠物详细信息
  const pet = await prisma.pet.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      assets: {
        where: { type: "IMAGE" },
        orderBy: { createdAt: "desc" },
      },
      aiModels: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      jobs: {
        where: { type: "GENERATE" },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          photoPack: true,
        },
      },
    },
  });

  if (!pet) {
    return (
      <ConsoleNavHider>
        <ConsoleLayout>
          <div className="container mx-auto py-12">
            <div className="text-center">
              <PawPrint className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-2xl font-bold mb-4">找不到这个主子</h1>
              <p className="text-muted-foreground mb-6">
                可能是走丢了，或者你还没有添加这个毛孩子
              </p>
              <Link href="/console/pets/new">
                <Button>
                  <PawPrint className="mr-2 h-4 w-4" />
                  添加新主子
                </Button>
              </Link>
            </div>
          </div>
        </ConsoleLayout>
      </ConsoleNavHider>
    );
  }

  const photos = pet.assets;
  const trainedModel = pet.aiModels[0];
  const generations = pet.jobs;

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* 面包屑导航 */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/console" className="hover:text-foreground">
                工作台
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/console/pets" className="hover:text-foreground">
                我的主子们
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{pet.name}</span>
            </div>

            {/* 主子信息卡片 */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* 左侧：基本信息 */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">主子档案</CardTitle>
                      {trainedModel ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <Sparkles className="h-3 w-3 mr-1" />
                          已训练
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          未训练
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 照片网格 */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">萌照集</span>
                        <Badge variant="outline">{photos.length} 张</Badge>
                      </div>
                      {photos.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1">
                          {photos.slice(0, 9).map((photo, index) => (
                            <div key={index} className="aspect-square relative rounded overflow-hidden">
                              <Image
                                src={photo.url}
                                alt={`${pet.name} 照片 ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                              />
                            </div>
                          ))}
                          {photos.length > 9 && (
                            <div className="aspect-square flex items-center justify-center bg-muted text-muted-foreground text-xs">
                              +{photos.length - 9}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="aspect-square flex items-center justify-center bg-muted rounded-lg text-muted-foreground text-sm">
                          还没有上传照片
                        </div>
                      )}
                    </div>

                    {/* 基本信息 */}
                    <div className="space-y-3 pt-4 border-t">
                      <div>
                        <label className="text-xs text-muted-foreground">名字</label>
                        <p className="font-medium">{pet.name}</p>
                      </div>
                      {pet.type && (
                        <div>
                          <label className="text-xs text-muted-foreground">品种</label>
                          <p className="font-medium">
                            {getPetTypeLabel(pet.type)}
                            {pet.breed && ` · ${pet.breed}`}
                          </p>
                        </div>
                      )}
                      {pet.coatColor && (
                        <div>
                          <label className="text-xs text-muted-foreground">毛色</label>
                          <p className="font-medium">{pet.coatColor}</p>
                        </div>
                      )}
                      {pet.description && (
                        <div>
                          <label className="text-xs text-muted-foreground">关于主子</label>
                          <p className="text-sm text-muted-foreground">{pet.description}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          加入时间 {new Date(pet.createdAt).toLocaleDateString("zh-CN")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：操作和记录 */}
              <div className="md:col-span-2 space-y-6">
                {/* 快速操作 */}
                <div className="grid gap-4 md:grid-cols-2">
                  {trainedModel ? (
                    <Link href={`/console/pets/${pet.id}/generate`} className="block">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                              <Palette className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">生成美照</h3>
                              <p className="text-sm text-muted-foreground">为 {pet.name} 创作各种风格的照片</p>
                            </div>
                            <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <Link href={`/console/pets/${pet.id}/train`} className="block">
                      <Card className="hover:shadow-lg transition-shadow border-purple-200 dark:border-purple-800">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-center">
                              <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">训练 AI 模型</h3>
                              <p className="text-sm text-muted-foreground">上传 {photos.length} 张照片，开始训练</p>
                            </div>
                            <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )}

                  <Link href={`/console/pets/${pet.id}/train`} className="block">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center">
                            <PawPrint className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">管理照片</h3>
                            <p className="text-sm text-muted-foreground">添加或删除训练照片</p>
                          </div>
                          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href={`/console/generations?petId=${pet.id}`} className="block">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">生成记录</h3>
                            <p className="text-sm text-muted-foreground">查看所有历史美照</p>
                          </div>
                          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <button className="block text-left w-full">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-slate-500 text-white flex items-center justify-center">
                            <Settings className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">编辑信息</h3>
                            <p className="text-sm text-muted-foreground">修改主子的档案资料</p>
                          </div>
                          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </div>

                {/* 最近生成记录 */}
                {generations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>最近生成记录</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {generations.slice(0, 5).map((job) => (
                          <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                job.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-600'
                                  : job.status === 'PROCESSING'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                <ImageIcon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {job.photoPack?.nameCn || '未知风格'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(job.createdAt).toLocaleDateString("zh-CN")}
                                </p>
                              </div>
                            </div>
                            <Badge variant={
                              job.status === 'COMPLETED' ? 'default' :
                              job.status === 'PROCESSING' ? 'secondary' :
                              'destructive'
                            }>
                              {job.status === 'COMPLETED' ? '完成' :
                               job.status === 'PROCESSING' ? '生成中' :
                               '失败'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {generations.length > 5 && (
                        <Link
                          href={`/console/generations?petId=${pet.id}`}
                          className="block text-center mt-4 text-sm text-purple-600 hover:underline"
                        >
                          查看全部 {generations.length} 条记录
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </ConsoleLayout>
    </ConsoleNavHider>
  );
}
