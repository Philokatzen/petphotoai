"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, ImageIcon, Wand2, Loader2, AlertCircle } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  photos: string[];
  trainedModelId: string | null;
}

interface TrainPetClientProps {
  pet: Pet;
}

export function TrainPetClient({ pet }: TrainPetClientProps) {
  const router = useRouter();
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "training" | "completed">(
    pet.trainedModelId ? "completed" : "idle"
  );
  const [jobId, setJobId] = useState<string | null>(null);

  const handleStartTraining = async () => {
    setIsTraining(true);
    setError(null);

    try {
      const response = await fetch(`/api/pets/${pet.id}/train`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "训练失败");
      }

      setJobId(data.jobId);
      setStatus("training");

      // 轮询训练状态
      pollTrainingStatus(data.jobId);
    } catch (err: any) {
      setError(err.message);
      setIsTraining(false);
    }
  };

  const pollTrainingStatus = async (currentJobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/jobs/${currentJobId}`);
        const data = await response.json();

        if (data.status === "COMPLETED") {
          setStatus("completed");
          setIsTraining(false);
          clearInterval(interval);
          router.refresh();
        } else if (data.status === "FAILED") {
          clearInterval(interval);
          setIsTraining(false);
          setError(data.result?.error || "训练失败，请重试");
        }
      } catch (err) {
        console.error("轮询状态失败:", err);
      }
    }, 3000); // 每 3 秒轮询一次
  };

  return (
    <>
      {/* 照片预览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            上传的照片 ({pet.photos.length})
          </CardTitle>
          <CardDescription>
            这些照片将用于训练 {pet.name} 的专属 AI 模型
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {pet.photos.map((photo, index) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={photo}
                  alt={`${pet.name} 照片 ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 训练信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            训练说明
          </CardTitle>
          <CardDescription>
            AI 将学习 {pet.name} 的特征，训练专属模型
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">AI 模型训练</p>
                <p className="text-sm text-muted-foreground">
                  分析 {pet.name} 的面部特征、毛色、表情等
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">多风格生成</p>
                <p className="text-sm text-muted-foreground">
                  训练完成后，可以生成 15+ 种不同风格的照片
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">快速出图</p>
                <p className="text-sm text-muted-foreground">
                  模型训练完成后，几分钟即可生成新照片
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 训练状态卡片 */}
      <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            {status === "completed" ? "训练完成" : "准备开始训练"}
          </CardTitle>
          <CardDescription>
            {status === "completed"
              ? `${pet.name} 的 AI 模型已训练完成，可以开始生成照片了`
              : "开始训练前，请确保照片质量良好且包含多个角度"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-900">训练失败</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {status === "completed" ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">训练成功！</p>
                  <p className="text-sm text-green-700">
                    {pet.name} 的专属 AI 模型已准备就绪
                  </p>
                </div>
              </div>
              <Link href={`/console/pets/${pet.id}/generate`}>
                <Button size="lg" className="w-full md:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  开始生成照片
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleStartTraining}
              disabled={isTraining}
            >
              {isTraining ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  训练中...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  开始训练 AI 模型 (消耗 10 积分)
                </>
              )}
            </Button>
          )}

          {isTraining && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                训练进度：AI 正在学习 {pet.name} 的特征...
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2 dark:bg-purple-900">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">
                训练中，请稍候...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
