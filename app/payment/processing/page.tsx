import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ProcessingPageProps {
  searchParams: Promise<{
    orderId?: string;
    method?: string;
    plan?: string;
  }>;
}

export default async function PaymentProcessingPage({
  searchParams,
}: ProcessingPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { orderId, method, plan } = await searchParams;

  // 模拟支付处理 - 实际应用中这里应该显示二维码或跳转到真实支付页面
  // 这里为了演示，3秒后自动跳转到成功页面
  setTimeout(() => {
    // 注意：这里只是演示，实际应该在服务端处理
  }, 3000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-white dark:from-slate-950 dark:via-purple-950/20 dark:to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* 加载动画 */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {method === "alipay" ? (
                  <span className="text-2xl font-bold text-blue-500">支</span>
                ) : (
                  <span className="text-2xl font-bold text-green-500">微</span>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">正在处理支付...</h1>

          <p className="text-muted-foreground mb-2">
            {method === "alipay" ? "支付宝" : "微信支付"} 支付处理中
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            订单号: {orderId}
          </p>

          {/* 模拟支付信息 */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg mb-8">
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">支付方式</span>
                <span className="font-medium">
                  {method === "alipay" ? "支付宝" : "微信支付"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">订单号</span>
                <span className="font-medium text-sm">{orderId}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            请稍候，页面将自动跳转...
          </p>

          {/* 模拟跳转按钮 */}
          <a
            href={`/payment/success?orderId=${orderId}&plan=${plan}`}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            支付完成，点击继续
          </a>

          <p className="text-xs text-muted-foreground mt-4">
            💡 演示模式：点击上方按钮模拟支付成功
          </p>
        </div>
      </div>
    </div>
  );
}
