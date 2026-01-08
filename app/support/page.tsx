import { Metadata } from "next";
import { HeadphonesIcon, Search, MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "客户支持 - PetPhotoAI",
  description: "PetPhotoAI 客户支持中心",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <HeadphonesIcon className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6">客户支持中心</h1>
            <p className="text-xl text-muted-foreground">
              我们随时准备为您提供帮助
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">如何我们可以帮助您？</h2>
              <p className="text-xl text-muted-foreground">
                选择最适合您问题的支持方式
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Search */}
              <div className="border rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">搜索帮助文档</h3>
                <p className="text-muted-foreground mb-4">
                  快速查找常见问题的答案
                </p>
                <Link href="/#faq" className="text-purple-600 hover:text-purple-700 font-medium">
                  搜索 FAQ →
                </Link>
              </div>

              {/* Email */}
              <div className="border rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">发送邮件</h3>
                <p className="text-muted-foreground mb-4">
                  我们会在 24 小时内回复您
                </p>
                <a href="mailto:support@petphotoai.com" className="text-purple-600 hover:text-purple-700 font-medium">
                  发送邮件 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Topics */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">常见支持主题</h2>
              <p className="text-xl text-muted-foreground">
                快速找到您需要的帮助
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Account Issues */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">账户问题</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">如何注册账户？</p>
                    <p className="text-muted-foreground">
                      点击页面右上角的"免费注册"按钮，输入您的邮箱和密码即可完成注册。注册后需要验证邮箱地址。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">忘记密码怎么办？</p>
                    <p className="text-muted-foreground">
                      在登录页面点击"忘记密码"，输入您的注册邮箱，我们会发送密码重置链接到您的邮箱。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">如何更改邮箱地址？</p>
                    <p className="text-muted-foreground">
                      登录后访问控制台的"设置"页面，点击"更改邮箱"，验证新邮箱后即可完成更改。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">如何删除账户？</p>
                    <p className="text-muted-foreground">
                      在"设置"页面找到"删除账户"选项，确认后将删除所有个人数据，此操作不可撤销。
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Issues */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">支付问题</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">支持哪些支付方式？</p>
                    <p className="text-muted-foreground">
                      我们支持支付宝和微信支付两种支付方式，所有交易均通过加密处理，确保您的支付安全。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">如何申请退款？</p>
                    <p className="text-muted-foreground">
                      按需付费订单在创建后7天内可申请退款。订阅服务可随时取消，但不退还未使用部分。如遇技术问题无法使用，可申请全额退款。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">积分如何使用？</p>
                    <p className="text-muted-foreground">
                      积分可用于训练宠物模型和生成照片。每次训练和生成会消耗相应积分。您可以在控制台查看当前积分余额。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">如何查看订单历史？</p>
                    <p className="text-muted-foreground">
                      登录后访问控制台的"设置"页面，在"订单历史"部分可以查看所有过往订单和支付记录。
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Generation */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">照片生成</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">需要上传多少张照片？</p>
                    <p className="text-muted-foreground">
                      建议上传 3-20 张宠物照片。照片越多、角度越丰富，AI 学习效果越好，生成质量也会更高。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">训练 AI 模型需要多长时间？</p>
                    <p className="text-muted-foreground">
                      通常情况下，AI 模型训练需要 15-30 分钟。训练完成后您会收到通知，之后生成照片只需几分钟。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">生成照片的质量如何？</p>
                    <p className="text-muted-foreground">
                      所有生成的照片均为高清（2048x2048）画质。专业版和工作室版用户可以获得更高分辨率的图片。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">如何下载生成的照片？</p>
                    <p className="text-muted-foreground">
                      在生成结果页面，点击照片即可单独下载，或使用"批量下载"功能一次性下载所有照片。
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Issues */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">技术问题</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">照片上传失败怎么办？</p>
                    <p className="text-muted-foreground">
                      请检查照片格式（支持 JPG、PNG）和大小（单张不超过 10MB）。如果问题持续，请尝试清理浏览器缓存或更换浏览器。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">生成任务卡住了？</p>
                    <p className="text-muted-foreground">
                      生成任务通常在几分钟内完成。如果超过 30 分钟仍未完成，请刷新页面或联系技术支持。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">照片质量不理想？</p>
                    <p className="text-muted-foreground">
                      尝试上传更多不同角度和光线的照片，确保宠物面部清晰可见。也可以尝试不同的主题风格。
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">报告其他问题</p>
                    <p className="text-muted-foreground">
                      如果遇到以上未列出的问题，请通过 support@petphotoai.com 联系我们，我们会尽快为您解决。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">仍需要帮助？</h2>
              <p className="text-xl text-muted-foreground">
                通过表单向我们发送详细的问题描述
              </p>
            </div>

            <div className="bg-background border rounded-xl p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="请输入您的邮箱"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    主题
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>请选择主题</option>
                    <option>账户问题</option>
                    <option>支付问题</option>
                    <option>技术问题</option>
                    <option>功能建议</option>
                    <option>其他问题</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    问题描述
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="请详细描述您的问题..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  提交问题
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-xl text-purple-100 mb-8">
            立即注册，体验 AI 宠物摄影的魅力
          </p>
          <Link href="/start">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              免费开始
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
