import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Download } from "lucide-react";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

export default async function GenerationsPage({
  searchParams,
}: {
  searchParams: Promise<{ petId?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { petId } = await searchParams;

  // 获取生成任务
  const jobs = await prisma.job.findMany({
    where: {
      type: "GENERATE",
      userId: session.user.id,
      ...(petId && { petId }),
    },
    include: {
      pet: true,
      photoPack: true,
      assets: {
        where: { type: "IMAGE" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-6xl mx-auto space-y-8">
        {/* 头部 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">生成记录</h1>
          <p className="text-muted-foreground">
            查看所有 AI 生成的照片记录
          </p>
        </div>

        {/* 生成记录列表 */}
        {jobs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">还没有生成记录</h3>
              <p className="text-muted-foreground">
                训练宠物模型后，就可以生成各种风格的照片了
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => {
              const photoPackName = job.photoPack?.nameCn || "未知风格";
              const resultUrls = job.assets.map((a) => a.url);

              return (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <ImageIcon className="h-5 w-5" />
                          {job.pet.name}
                          <span className="text-sm font-normal text-muted-foreground">
                            · {photoPackName}
                          </span>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(job.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          job.status === "COMPLETED"
                            ? "default"
                            : job.status === "PROCESSING"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {job.status === "COMPLETED"
                          ? "已完成"
                          : job.status === "PROCESSING"
                          ? "生成中"
                          : "失败"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {resultUrls.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {resultUrls.map((url, index) => (
                          <div
                            key={index}
                            className="group relative aspect-square rounded-lg overflow-hidden border"
                          >
                            <img
                              src={url}
                              alt={`生成照片 ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <a
                                href={url}
                                download={`${job.pet.name}-${photoPackName}-${index + 1}.png`}
                                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                下载
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        {job.status === "PROCESSING" || job.status === "PENDING"
                          ? "AI 正在创作中，请稍候..."
                          : job.result?.error
                          ? job.result.error
                          : "生成失败，请重试"}
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
