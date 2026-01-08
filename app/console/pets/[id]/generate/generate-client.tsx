"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle2, Download, AlertCircle } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  photos: string[];
  trainedModelId: string;
}

interface PhotoPack {
  id: string;
  name: string;
  description: string;
}

interface GeneratePhotoClientProps {
  pet: Pet;
  photoPacks: PhotoPack[];
}

export function GeneratePhotoClient({ pet, photoPacks }: GeneratePhotoClientProps) {
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const selectedPack = photoPacks.find((p) => p.id === selectedPackId);

  const handleGenerate = async () => {
    if (!selectedPackId) return;

    setIsGenerating(true);
    setGeneratedPhotos([]);
    setCurrentJobId(null);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petId: pet.id,
          photoPackId: selectedPackId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "生成失败");
      }

      setCurrentJobId(data.jobId);

      // 轮询生成状态
      pollGenerationStatus(data.jobId);
    } catch (error: any) {
      setError(error.message);
      setIsGenerating(false);
    }
  };

  const pollGenerationStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const data = await response.json();

        if (data.status === "COMPLETED") {
          clearInterval(interval);
          setIsGenerating(false);
          // 从 assets 中提取图片 URL
          const imageUrls = data.assets?.map((a: any) => a.url) || [];
          setGeneratedPhotos(imageUrls);
          setCurrentJobId(null);
        } else if (data.status === "FAILED") {
          clearInterval(interval);
          setIsGenerating(false);
          setError(data.result?.error || "生成失败，请重试");
          setCurrentJobId(null);
        }
      } catch (error) {
        console.error("轮询状态失败:", error);
      }
    }, 3000); // 每 3 秒轮询一次
  };

  const handleDownload = (photoUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = photoUrl;
    link.download = `${pet.name}-${selectedPack?.name}-${index + 1}.png`;
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* 风格选择 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">选择照片风格</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {photoPacks.map((pack) => (
            <Card
              key={pack.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedPackId === pack.id
                  ? "ring-2 ring-purple-600 border-purple-600"
                  : ""
              }`}
              onClick={() => setSelectedPackId(pack.id)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{pack.name}</h3>
                <p className="text-xs text-muted-foreground">{pack.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-900">生成失败</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* 生成按钮 */}
      {selectedPackId && (
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="h-14 px-8 text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                生成 {selectedPack?.name} 风格照片 (消耗 5 积分)
              </>
            )}
          </Button>
        </div>
      )}

      {/* 生成进度 */}
      {isGenerating && (
        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <div>
                <p className="font-medium">AI 正在为您创作...</p>
                <p className="text-sm text-muted-foreground">
                  预计需要 1-2 分钟，请稍候
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 生成结果 */}
      {generatedPhotos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              生成完成！
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generatedPhotos.map((photo, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={photo}
                    alt={`${pet.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(photo, index)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
