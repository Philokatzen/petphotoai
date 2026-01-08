import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

interface PaymentPageProps {
  searchParams: Promise<{
    plan?: string;
    amount?: string;
  }>;
}

const pricingPlans = {
  basic: {
    name: "按需付费",
    price: 59,
    period: "次",
    description: "适合偶尔使用的用户",
    features: [
      "训练 1 个宠物专属模型",
      "生成 20 张照片",
      "支持 1 种主题风格",
      "高清下载",
      "保留 30 天",
    ],
  },
  pro: {
    name: "专业版",
    price: 129,
    period: "月",
    description: "适合宠物博主和爱好者",
    features: [
      "无限训练宠物模型",
      "每月生成 200 张照片",
      "支持所有主题风格",
      "高清下载",
      "永久保存",
      "优先客服支持",
    ],
  },
  studio: {
    name: "工作室版",
    price: 199,
    period: "月",
    description: "适合宠物摄影工作室",
    features: [
      "无限训练宠物模型",
      "无限生成照片",
      "支持所有主题风格",
      "4K 超高清下载",
      "永久保存",
      "API 接口访问",
      "专属客户经理",
    ],
  },
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    const params = await searchParams;
    redirect("/auth/signin?callbackUrl=/payment?" + new URLSearchParams(params as any).toString());
  }

  const params = await searchParams;
  const planKey = params.plan || "basic";
  const plan = pricingPlans[planKey as keyof typeof pricingPlans] || pricingPlans.basic;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-white dark:from-slate-950 dark:via-purple-950/20 dark:to-background">
      <div className="container mx-auto py-10 px-4">
        {/* 返回按钮 */}
        <Link href="/#pricing">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">完成支付</h1>
            <p className="text-muted-foreground">选择您喜欢的支付方式</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 订单信息 */}
            <div className="md:col-span-2 space-y-6">
              {/* 选中的套餐 */}
              <Card>
                <CardHeader>
                  <CardTitle>订单信息</CardTitle>
                  <CardDescription>请确认您的订单详情</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <Badge className="mb-2">已选套餐</Badge>
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-purple-600">
                        ¥{plan.price}
                      </p>
                      <p className="text-sm text-muted-foreground">/{plan.period}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">套餐权益</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 支付方式选择 */}
              <Card>
                <CardHeader>
                  <CardTitle>选择支付方式</CardTitle>
                  <CardDescription>支持以下支付方式</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 支付宝 */}
                  <form action="/api/payment/create" method="POST">
                    <input type="hidden" name="plan" value={planKey} />
                    <input type="hidden" name="amount" value={plan.price} />
                    <input type="hidden" name="paymentMethod" value="alipay" />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-blue-500 flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold group-hover:text-blue-600">支付宝</p>
                          <p className="text-sm text-muted-foreground">推荐使用支付宝支付</p>
                        </div>
                      </div>
                      <div className="text-blue-500 font-semibold">
                        ¥{plan.price}
                      </div>
                    </button>
                  </form>

                  {/* 微信支付 */}
                  <form action="/api/payment/create" method="POST">
                    <input type="hidden" name="plan" value={planKey} />
                    <input type="hidden" name="amount" value={plan.price} />
                    <input type="hidden" name="paymentMethod" value="wechat" />

                    <button
                      type="submit"
                      className="w-full flex items-center justify-between p-4 border-2 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-green-500 flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold group-hover:text-green-600">微信支付</p>
                          <p className="text-sm text-muted-foreground">使用微信快捷支付</p>
                        </div>
                      </div>
                      <div className="text-green-500 font-semibold">
                        ¥{plan.price}
                      </div>
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* 侧边信息栏 */}
            <div className="space-y-6">
              {/* 安全保障 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">安全保障</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>SSL 加密传输</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>第三方支付平台保障</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>7天无理由退款</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>正规发票</span>
                  </div>
                </CardContent>
              </Card>

              {/* 联系客服 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">需要帮助？</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    如果您在支付过程中遇到任何问题，请联系我们的客服团队。
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">联系客服</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
