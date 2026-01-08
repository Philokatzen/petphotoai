import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Home, Sparkles } from "lucide-react";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    plan?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { orderId, plan } = await searchParams;

  // 更新订单状态为已完成
  if (orderId) {
    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED" },
      });

      // 添加积分到用户账户
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (order?.creditsAmount) {
        // 获取当前余额
        const lastCredit = await prisma.credit.findFirst({
          where: { userId: session.user.id },
          orderBy: { createdAt: "desc" },
        });

        const currentBalance = lastCredit?.balance || 0;
        const newBalance = currentBalance + order.creditsAmount;

        // 创建积分记录
        await prisma.credit.create({
          data: {
            userId: session.user.id,
            amount: order.creditsAmount,
            balance: newBalance,
            reason: `购买${plan === "basic" ? "按需付费(59元)" : plan === "pro" ? "专业版(129元)" : "工作室版(199元)"}套餐`,
          },
        });
      }
    } catch (error) {
      console.error("更新订单状态失败:", error);
    }
  }

  const planNames = {
    basic: "按需付费",
    pro: "专业版",
    studio: "工作室版",
  };

  const planName = planNames[plan as keyof typeof planNames] || "套餐";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-white dark:from-green-950/20 dark:via-purple-950/20 dark:to-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            {/* 成功图标 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">支付成功！</h1>
              <p className="text-muted-foreground">感谢您的购买</p>
            </div>

            {/* 订单信息 */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">套餐</span>
                <span className="font-semibold">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">订单号</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">状态</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  已完成
                </span>
              </div>
            </div>

            {/* 下一步操作 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-center mb-4">
                您现在可以开始使用了！
              </p>

              <Button asChild className="w-full" size="lg">
                <Link href="/start">
                  <Sparkles className="mr-2 h-5 w-5" />
                  开始创建宠物模型
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/console">
                    <Home className="mr-2 h-4 w-4" />
                    控制台
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/console/settings">
                    <Download className="mr-2 h-4 w-4" />
                    查看订单
                  </Link>
                </Button>
              </div>
            </div>

            {/* 提示信息 */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💡 <strong>提示：</strong>订单确认邮件已发送至您的邮箱，请查收。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
