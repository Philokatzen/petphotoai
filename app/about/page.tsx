import { Metadata } from "next";
import { Heart, Users, Target, Award } from "lucide-react";
import Link from "next/link";
import { PawPrint } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们 - PetPhotoAI",
  description: "了解 PetPhotoAI 的故事、使命和团队",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-6">
              <PawPrint className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">关于 PetPhotoAI</h1>
            <p className="text-xl text-muted-foreground">
              我们致力于用 AI 技术，让每一只宠物的美好瞬间都能被永久珍藏
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <Heart className="h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold mb-6">我们的故事</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                PetPhotoAI 成立于 2024 年，源于一个简单的想法：每一只宠物都值得拥有最美丽的照片。
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                作为宠物爱好者，我们知道拍摄出完美的宠物照片有多难。宠物们总是动来动去，
                抓不住那个完美瞬间。专业摄影师又太昂贵。所以我们想到了用 AI 技术来解决这个问题。
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                通过上传几张您宠物的日常照片，我们的 AI 就能学习到宠物的独特特征，
                然后生成各种风格的专业级精美照片。证件照、漫画风、国风、赛博朋克...
                只要有想象，我们就能为您实现。
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                至今，我们已经为数万名宠物主人提供了服务，生成了超过百万张精美照片。
                每一张照片背后，都是一份对宠物的爱。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">我们的价值观</h2>
            <p className="text-xl text-muted-foreground">驱动我们前进的信念</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">热爱宠物</h3>
              <p className="text-muted-foreground">
                我们都是宠物爱好者，深知宠物对家庭的重要性
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">用户至上</h3>
              <p className="text-muted-foreground">
                用户体验是我们一切工作的出发点和落脚点
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">技术创新</h3>
              <p className="text-muted-foreground">
                持续投入研发，使用最先进的 AI 技术
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100K+</div>
              <div className="text-muted-foreground">服务用户</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-muted-foreground">生成照片</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-muted-foreground">主题风格</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-muted-foreground">满意率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">我们的团队</h2>
            <p className="text-xl text-muted-foreground">一群热爱宠物的技术和产品专家</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                AI
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 技术团队</h3>
              <p className="text-muted-foreground text-sm">
                来自顶级 AI 公司的专家，专注图像生成技术
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                UX
              </div>
              <h3 className="text-xl font-semibold mb-2">产品设计团队</h3>
              <p className="text-muted-foreground text-sm">
                专注于打造简单易用的用户体验
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                CS
              </div>
              <h3 className="text-xl font-semibold mb-2">客户支持团队</h3>
              <p className="text-muted-foreground text-sm">
                全天候为您提供专业、贴心的服务
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-20 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">准备好为您的宠物创作了吗？</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            立即开始，只需 3 分钟即可生成第一张 AI 宠物照片
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/start">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                免费开始
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                联系我们
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
