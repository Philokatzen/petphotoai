import { SignInForm } from "@/components/auth/signin-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">登录 PetPhotoAI</h1>
          <p className="mt-2 text-muted-foreground">
            欢迎回来，继续为您的宠物创作精美照片
          </p>
        </div>

        <SignInForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          还没有账号？{" "}
          <Link href="/auth/signup" className="text-purple-600 hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
