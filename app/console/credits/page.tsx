import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, CreditCard, TrendingUp, History } from "lucide-react";
import { ConsoleLayout } from "@/components/console/console-layout";
import { ConsoleNavHider } from "@/components/console/console-nav-hider";

export default async function CreditsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // 获取用户当前积分
  const userCredits = await prisma.credit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  const currentBalance = userCredits[0]?.balance || 0;

  // 获取积分历史记录
  const creditHistory = await prisma.credit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // 充值套餐
 const RECHARGE_PLANS = [
    { credits: 50, price: 9.9, popular: false, description: "适合初次体验" },
    { credits: 200, price: 29.9, popular: true, description: "性价比推荐" },
    { credits: 500, price: 49.9, popular: false, description: "适合经常使用" },
    { credits: 1000, price: 79.9, popular: false, description: "超值大礼包" },
  ];

  return (
    <ConsoleNavHider>
      <ConsoleLayout>
        <div className="container mx-auto py-8">
          <div className="max-w-6xl mx-auto space-y-8">
        {/* 头部 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">积分中心</h1>
          <p className="text-muted-foreground">
            充值积分，享受 AI 宠物照片生成服务
          </p>
        </div>

        {/* 当前积分 */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">当前积分余额</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-bold text-purple-600">{currentBalance}</p>
                  <span className="text-muted-foreground">积分</span>
                </div>
              </div>
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Coins className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 充值套餐 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">充值套餐</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {RECHARGE_PLANS.map((plan) => (
              <Card
                key={plan.credits}
                className={`relative transition-all hover:shadow-lg ${
                  plan.popular
                    ? "border-purple-600 ring-2 ring-purple-600 scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium rounded-full">
                    推荐
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-center">
                    <span className="text-3xl">{plan.credits}</span>
                    <span className="text-lg font-normal text-muted-foreground">
                      {" "}积分
                    </span>
                  </CardTitle>
                  <CardDescription className="text-center text-base">
                    ¥{plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-center text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span>
                        可生成 {Math.floor(plan.credits / 5)} 次照片
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span>
                        可训练 {Math.floor(plan.credits / 10)} 个模型
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => alert("支付功能开发中，敬请期待！")}
                  >
                    立即充值
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 积分说明 */}
        <Card>
          <CardHeader>
            <CardTitle>积分说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium">训练 AI 模型</p>
                <p className="text-sm text-muted-foreground">
                  每次训练消耗 10 积分，为您的宠物创建专属 AI 模型
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium">生成宠物照片</p>
                <p className="text-sm text-muted-foreground">
                  每次生成消耗 5 积分，AI 为您生成 4 张精美照片
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium">积分永不过期</p>
                <p className="text-sm text-muted-foreground">
                  充值的积分永久有效，随时使用
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 积分历史 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              积分历史
            </CardTitle>
          </CardHeader>
          <CardContent>
            {creditHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                还没有积分记录
              </div>
            ) : (
              <div className="space-y-3">
                {creditHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{record.reason}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={record.amount > 0 ? "default" : "secondary"}
                        className="mb-1"
                      >
                        {record.amount > 0 ? "+" : ""}
                        {record.amount}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        余额: {record.balance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </ConsoleLayout>
    </ConsoleNavHider>
  );
}
