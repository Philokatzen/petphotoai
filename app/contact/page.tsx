import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "联系我们 - PetPhotoAI",
  description: "联系 PetPhotoAI 客户支持团队",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
            <p className="text-xl text-muted-foreground">
              我们随时准备为您提供帮助
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">多种方式联系我们</h2>
              <p className="text-xl text-muted-foreground">
                选择最适合您的联系方式
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-md mx-auto">
              {/* Email */}
              <div className="text-center p-8 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">电子邮件</h3>
                <p className="text-muted-foreground mb-4">
                  最推荐的方式，我们会在 24 小时内回复
                </p>
                <a
                  href="mailto:support@petphotoai.com"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  support@petphotoai.com
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-muted/50 rounded-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <h3 className="text-2xl font-bold">公司地址</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    PetPhotoAI 科技有限公司
                  </p>
                  <p className="text-muted-foreground mb-2">
                    北京市朝阳区望京SOHO T3
                  </p>
                  <p className="text-muted-foreground mb-2">
                    邮编：100102
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    温馨提示：如需现场拜访，请提前预约
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 h-64 flex items-center justify-center">
                  <MapPin className="h-24 w-24 text-muted-foreground" />
                  <p className="text-muted-foreground">地图区域</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <p className="text-muted-foreground mb-6">
              在联系我们之前，您可能能在 FAQ 中找到答案
            </p>
            <Link href="/#faq">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                查看 FAQ
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Cooperation */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">商务合作</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">技术合作</h3>
                <p className="text-muted-foreground mb-3">
                  AI 技术、图像生成、宠物识别等领域的合作
                </p>
                <a href="mailto:business@petphotoai.com" className="text-purple-600 hover:text-purple-700">
                  business@petphotoai.com
                </a>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">渠道合作</h3>
                <p className="text-muted-foreground mb-3">
                  宠物店、宠物医院、宠物摄影工作室等渠道合作
                </p>
                <a href="mailto:partnership@petphotoai.com" className="text-purple-600 hover:text-purple-700">
                  partnership@petphotoai.com
                </a>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">媒体与公关</h3>
                <p className="text-muted-foreground mb-3">
                  媒体采访、新闻报道、品牌推广等合作
                </p>
                <a href="mailto:pr@petphotoai.com" className="text-purple-600 hover:text-purple-700">
                  pr@petphotoai.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">还没有成为用户？</h2>
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
