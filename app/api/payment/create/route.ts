import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.formData();
    const plan = body.get("plan") as string;
    const amount = parseInt(body.get("amount") as string);
    const paymentMethod = body.get("paymentMethod") as string; // "alipay" or "wechat"

    if (!plan || !amount || !paymentMethod) {
      return NextResponse.json({ error: "参数不完整" }, { status: 400 });
    }

    // 创建订单
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        amount: amount * 100, // 转换为分
        currency: "CNY",
        status: "PENDING",
        creditsAmount: plan === "basic" ? 59 : plan === "pro" ? 129 : 199,
        metadata: {
          plan,
          paymentMethod,
        },
      },
    });

    // 根据支付方式生成支付链接
    // 这里使用模拟数据，实际需要对接支付宝/微信支付 API
    const paymentUrl = await generatePaymentUrl(order.id, amount, paymentMethod, plan);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl,
      amount,
    });

  } catch (error) {
    console.error("创建支付失败:", error);
    return NextResponse.json(
      { error: "创建支付失败，请稍后重试" },
      { status: 500 }
    );
  }
}

// 生成支付链接（模拟，实际需要对接真实支付 API）
async function generatePaymentUrl(
  orderId: string,
  amount: number,
  method: string,
  plan: string
): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // 模拟支付成功页面 URL
  // 实际开发中，这里应该调用支付宝/微信支付的 API，获取真实的支付链接
  if (method === "alipay") {
    // 支付宝支付
    // 实际应该使用 alipay-sdk 或调用支付宝 API
    return `${baseUrl}/payment/processing?orderId=${orderId}&method=alipay&plan=${plan}`;
  } else if (method === "wechat") {
    // 微信支付
    // 实际应该使用微信支付 SDK 或调用微信支付 API
    return `${baseUrl}/payment/processing?orderId=${orderId}&method=wechat&plan=${plan}`;
  }

  return `${baseUrl}/payment/processing?orderId=${orderId}`;
}
