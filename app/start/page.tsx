import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function StartPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // 已登录，跳转到我的宠物页面
    redirect("/console/pets");
  } else {
    // 未登录，跳转到注册页面
    redirect("/auth/signup");
  }
}
