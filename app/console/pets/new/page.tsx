import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UploadPetForm } from "@/components/console/upload-pet-form";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

export default async function NewPetPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container py-10">
          <div className="mx-auto max-w-3xl">
            {/* 页面头部 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">添加新宠物</h1>
              <p className="mt-2 text-muted-foreground">
                上传 3-20 张宠物照片，AI 将为您训练专属模型
              </p>
            </div>

            {/* 上传表单 */}
            <UploadPetForm userId={session.user.id} />
          </div>
        </div>
      </ConsoleLayout>
    </ConsoleNavHider>
  );
}
