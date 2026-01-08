"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PawPrint, Upload, X } from "lucide-react";

export function UploadPetForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<"cat" | "dog" | "other">("cat");
  const [breed, setBreed] = useState("");
  const [coatColor, setCoatColor] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length + photos.length > 20) {
      setError("最多只能上传 20 张照片");
      return;
    }

    setPhotos([...photos, ...validFiles]);

    // Generate previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (photos.length < 3) {
      setError("请至少上传 3 张宠物照片");
      return;
    }

    setIsLoading(true);

    try {
      // Upload photos to cloud storage
      const photoUrls: string[] = [];
      for (const photo of photos) {
        const formData = new FormData();
        formData.append("file", photo);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("照片上传失败");
        }

        const uploadData = await uploadResponse.json();
        photoUrls.push(uploadData.url);
      }

      // Create pet record
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          breed: breed || null,
          coatColor: coatColor || null,
          gender: gender || null,
          birthday: birthday || null,
          notes: notes || null,
          photos: photoUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "创建失败");
      }

      // Redirect to training page
      router.push(`/console/pets/${data.id}/train`);
    } catch (error: any) {
      setError(error.message || "创建失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本信息 */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">基本信息</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">宠物名字 *</Label>
              <Input
                id="name"
                placeholder="例如：旺财、咪咪..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">宠物类型 *</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">猫咪 🐱</SelectItem>
                  <SelectItem value="dog">狗狗 🐶</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="breed">品种（选填）</Label>
              <Input
                id="breed"
                placeholder="例如：金毛、英短..."
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coatColor">毛色（选填）</Label>
              <Input
                id="coatColor"
                placeholder="例如：白色、黑白花色..."
                value={coatColor}
                onChange={(e) => setCoatColor(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gender">性别（选填）</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="选择性别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">公</SelectItem>
                  <SelectItem value="female">母</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">生日（选填）</Label>
              <Input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">备注（选填）</Label>
            <Input
              id="notes"
              placeholder="例如：喜欢玩球、怕雷声..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 上传照片 */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">上传宠物照片</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          请上传 3-20 张不同角度和表情的宠物照片，AI 将根据这些照片训练专属模型
        </p>

        <div className="mb-4">
          <label
            htmlFor="photos"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-purple-400 hover:bg-purple-50/50"
          >
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">点击或拖拽上传照片</p>
            <p className="text-xs text-muted-foreground">
              支持 JPG、PNG 格式，单张不超过 10MB
            </p>
          </label>
          <input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* 照片预览 */}
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          已上传 {photos.length} / 20 张照片
          {photos.length < 3 && (
            <span className="text-red-500">（至��需要 3 张）</span>
          )}
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "创建中..." : "创建宠物模型"}
        <PawPrint className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
