import { SignUpForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">注册 PetPhotoAI</h1>
          <p className="mt-2 text-muted-foreground">
            开始为您的宠物创作 AI 精美照片
          </p>
        </div>

        <SignUpForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          已有账号？{" "}
          <Link href="/auth/signin" className="text-purple-600 hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  );
}
