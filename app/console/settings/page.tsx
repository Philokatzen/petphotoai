import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Key, Mail, Calendar } from "lucide-react";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // 获取用户详细信息
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          pets: true,
          credits: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 头部 */}
          <div>
            <h1 className="text-3xl font-bold mb-2">个人设置</h1>
            <p className="text-muted-foreground">
              管理您的账户信息和偏好设置
            </p>
          </div>

          {/* 账户信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                账户信息
              </CardTitle>
              <CardDescription>
                您的基本账户信息和统计数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">用户 ID</Label>
                  <p className="font-mono text-sm mt-1">{user.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">姓名</Label>
                  <p className="mt-1">{user.name || "未设置"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    邮箱
                  </Label>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    注册时间
                  </Label>
                  <p className="mt-1">
                    {new Date(user.createdAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">宠物数量</Label>
                  <p className="mt-1">{user._count.pets} 个</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">积分记录数</Label>
                  <p className="mt-1">{user._count.credits} 条</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 修改信息表单 */}
          <Card>
            <CardHeader>
              <CardTitle>修改个人信息</CardTitle>
              <CardDescription>
                更新您的显示名称
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/api/user/update" method="POST" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name || ""}
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <Button type="submit">保存更改</Button>
              </form>
            </CardContent>
          </Card>

          {/* 修改密码 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                修改密码
              </CardTitle>
              <CardDescription>
                为保障账户安全，建议定期更换密码
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/api/user/change-password" method="POST" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="请输入当前密码"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="请输入新密码（至少 6 位）"
                    minLength={6}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    minLength={6}
                    required
                  />
                </div>
                <Button type="submit" variant="outline">
                  更新密码
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsoleLayout>
    </ConsoleNavHider>
  );
}
