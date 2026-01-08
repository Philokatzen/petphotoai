import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  PawPrint,
  Sparkles,
  Download,
  Shield,
  Zap,
  Check,
  ImageIcon,
  Upload,
  Wand2,
  Star,
  Quote,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - 左文案右图片 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-white py-20 dark:from-slate-950 dark:via-purple-950/20 dark:to-background">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* 左侧文案 */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  <Sparkles className="mr-2 h-4 w-4" />
                  ✨ 让每一只毛孩子都拥有专属大片
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  把你家{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    主子
                  </span>
                  <br />
                  变成网红吧～
                </h1>
                <p className="text-xl text-muted-foreground sm:text-2xl">
                  只需几张萌照，AI 就能让毛孩子变身气质小明星
                  <br />
                  证件照、漫画风、国风、赛博朋克...百变风格任宠选
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/start">
                  <Button size="lg" className="h-12 px-8 text-lg">
                    免费开始创作
                    <PawPrint className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/#examples">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                    查看案例
                    <ImageIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-600" />
                  <span>不绑合约</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-600" />
                  <span>用多少付多少</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-600" />
                  <span>闪电出片</span>
                </div>
              </div>
            </div>

            {/* 右侧示例图片 - 真实宠物照片 */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {sampleImages.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl shadow-lg group ${
                      i % 2 === 0 ? "translate-y-8" : "-translate-y-8"
                    }`}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={img.url}
                        alt={img.label}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">{img.label}</p>
                        <p className="text-white/80 text-xs">{img.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 装饰元素 */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 照片风格展示 - 真实宠物照片 + AI 风格说明 */}
      <section id="examples" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">15+ 种百变风格</h2>
            <p className="text-xl text-muted-foreground">
              从正经证件照到放飞自我的艺术创作，总有一款适合你家主子
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {styleExamples.map((style) => (
              <div
                key={style.name}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-sm hover:shadow-xl transition-all"
              >
                <Image
                  src={style.url}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{style.name}</p>
                  <p className="text-white/80 text-xs">{style.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            💝 这些都是真实萌宠照，AI 能把它们变成任何你想要的样子
          </p>
        </div>
      </section>

      {/* 应用场景 */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">毛孩子的百变 C 位时刻</h2>
            <p className="text-xl text-muted-foreground">
              收藏每一个感动瞬间，让爱宠的生活充满仪式感
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 社交媒体分享 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39-.19 0-.37.04-.55.1-.17-.07-.33-.15-.48-.25-.17-.11-.31-.26-.39-.45-.08-.2-.12-.4-.12-.61 0-.48.26-.92.65-1.11.34-.16.72-.19 1.08-.11.31.07.58.22.81.43.28.25.48.57.59.92.12.39.16.8.12 1.21-.05.54-.25 1.03-.57 1.43-.26.32-.59.53-.96.64-.33-.1-.7-.13-1.06-.07-.3.06-.57.18-.8.36-.21.17-.38.38-.5.63-.12.26-.18.54-.18.83 0 .5.24.95.61 1.29.32.28.71.41 1.12.37.39-.04.76-.18 1.05-.48.28-.29.46-.66.53-1.07.07-.43.2-.83.41-1.18.25-.4.19-.81.29-1.23.29-.44 0-.87-.1-1.26-.3-.36-.19-.67-.45-.91-.78-.22-.32-.38-.67-.47-1.05-.09-.39-.13-.8-.13-1.21 0-.43.08-.84.23-1.22.12-.33.29-.62.5-.97.63-.36.12-.73.16-1.1.1-.35-.06-.68-.19-.98-.38-.28-.18-.5-.42-.66-.72-.15-.28-.25-.59-.3-.92-.05-.36-.03-.72.05-1.06.09-.38.25-.72.47-1.01.19-.25.42-.46.68-.62.31-.18.66-.26 1.02-.22.32.04.63.15.89.33.26.19.47.43.62.72.16.29.24.62.24.97 0 .37-.08.72-.23 1.04-.13.28-.31.52-.53.71-.2.18-.43.32-.69.41-.26-.09-.53-.13-.8-.13-.27 0-.53.04-.78.13-.25.09-.47.22-.65.4-.17-.17-.31-.37-.41-.6-.1-.23-.15-.49-.15-.76 0-.27.05-.53.15-.77.11-.25.26-.46.45-.64.17-.17.37-.3.59-.39.2-.09.42-.13.65-.13.24 0 .48.04.7.13.23.09.42.22.58.39.16.18.28.4.36.66.08.27.12.56.12.86 0 .31-.05.6-.15.87-.12.29-.3.53-.53.7-.25.2-.54.32-.86.35-.33.03-.66-.03-.97-.12-.29-.08-.56-.23-.79-.44-.22-.2-.39-.45-.5-.73-.11-.29-.16-.6-.16-.93 0-.34.06-.66.18-.96.14-.33.34-.61.58-.99.23-.35.36-.75.41-1.17.04-.37-.03-.73-.1-1.06-.23-.31-.12-.59-.3-.83-.53-.22-.22-.39-.5-.5-.82-.1-.31-.14-.65-.14-1 0-.36.06-.69.19-1 .15-.34.38-.62.66-.87.26-.24.56-.36.89-.35.31.01.6.1.85.25.24.15.43.36.56.61.13.26.19.57.19.92 0 .36-.07.7-.21 1.01-.16.33-.39.6-.67.79-.3.22-.64.33-1 .32-.38-.01-.75-.09-1.08-.26-.31-.16-.57-.39-.77-.67-.19-.26-.31-.57-.35-.91-.04-.35-.02-.7.07-1.03.1-.35.28-.65.51-.88.25-.24.55-.36.9-.34.35.02.67.12.94.29.26.16.46.38.59.65.13.28.19.62.19.97 0 .37-.08.72-.23 1.04-.17.34-.41.62-.7.81-.31.2-.66.31-1.02.29-.39-.02-.76-.1-1.09-.28-.31-.17-.57-.41-.77-.69-.19-.27-.3-.59-.33-.94-.03-.36.01-.71.12-1.04.28-.36.16-.64.4-.99.38z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">社交达人必备</h3>
              <p className="text-muted-foreground mb-4">
                小红书、朋友圈、Instagram...让全世界都看到你家主子的绝美瞬间
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  小红书爆款萌宠笔记
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  朋友圈吸睛神器
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  微博热搜预定
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  Ins 风精致大片
                </li>
              </ul>
            </div>

            {/* 宠物生日庆祝 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">生日派对主角</h3>
              <p className="text-muted-foreground mb-4">
                用超萌照片记录毛孩子的每一个成长里程碑，仪式感拉满
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  派对海报 C 位出道
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  蛋糕定制专属图案
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  超有纪念意义的贺卡
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  成长相册回忆杀
                </li>
              </ul>
            </div>

            {/* 宠物周边产品 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">独家周边定制</h3>
              <p className="text-muted-foreground mb-4">
                把毛孩子的可爱印在生活的每个角落，陪伴无处不在
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  手机壳、抱枕、挂画
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  T恤、帆布袋潮品
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  马克杯、钥匙扣小物
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  私人定制相册
                </li>
              </ul>
            </div>

            {/* 线下活动物料 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">线下活动神器</h3>
              <p className="text-muted-foreground mb-4">
                宠物店聚会、展会活动...专业级物料一键搞定
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  吸睛海报
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  易拉宝、展架
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  名片、宣传单
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  超有氛围的背景墙
                </li>
              </ul>
            </div>

            {/* 宠物内容创作 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">萌宠博主标配</h3>
              <p className="text-muted-foreground mb-4">
                创作爆款内容，打造网红萌宠 IP，粉丝蹭蹭涨
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  视频封面吸睛图
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  短视频素材库
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  公众号推文配图
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  直播间酷炫背景
                </li>
              </ul>
            </div>

            {/* 宠物纪念收藏 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">爱的永恒纪念</h3>
              <p className="text-muted-foreground mb-4">
                把与毛孩子的点点滴滴永久珍藏，回忆永远都在
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  精致纪念相册
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  艺术肖像画
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  水晶摆台
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  数字油画
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 三步使用流程 */}
      <section className="bg-gradient-to-b from-background to-purple-50 py-20 dark:to-purple-950/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">三步解锁大片</h2>
            <p className="text-xl text-muted-foreground">
              超简单，几分钟就能让毛孩子变身小明星
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-3xl font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl ${step.iconBg}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-600 to-pink-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 用户好评 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">铲屎官们都说好</h2>
            <p className="text-xl text-muted-foreground">
              数千个毛孩子家庭的首选
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((review, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="mb-4 h-8 w-8 text-purple-200" />
                <p className="text-muted-foreground mb-6">{review.content}</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格方案 */}
      <section id="pricing" className="bg-gradient-to-b from-background to-purple-50 py-20 dark:to-purple-950/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">简单透明的价格</h2>
            <p className="text-xl text-muted-foreground">
              按需选择，不玩套路，随时可以停用
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-8 transition-all hover:shadow-lg ${
                  plan.popular
                    ? "border-purple-600 shadow-xl scale-105"
                    : "border-border shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-sm font-medium text-white">
                    大家都爱这个
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <p className="mb-6 text-muted-foreground">{plan.description}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 flex-shrink-0 text-purple-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/payment?plan=${plan.name === "按需付费" ? "basic" : plan.name === "专业版" ? "pro" : "studio"}`} className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">为什么选择 PetPhotoAI</h2>
            <p className="text-xl text-muted-foreground">
              专业 AI 技术，专为毛孩子打造
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">家长们常问</h2>
            <p className="text-xl text-muted-foreground">
              快速了解 PetPhotoAI 的魔法
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="mb-2 font-semibold text-lg flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-bold">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-10">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-20 text-white">
        <div className="container text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            准备好让你家主子出道了吗？
          </h2>
          <p className="mb-10 text-xl text-purple-100 max-w-2xl mx-auto">
            现在就开始，3 分钟就能收获第一张 AI 萌宠大片
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/start">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-lg bg-white text-purple-600 hover:bg-purple-50"
              >
                免费试试看
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-lg border-white text-white hover:bg-white/10"
              >
                看看价格
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Hero 示例图片 - 真实宠物照片 (使用 Unsplash)
const sampleImages = [
  {
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
    label: "金毛犬",
    style: "证件照风格",
  },
  {
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    label: "英短猫",
    style: "漫画风格",
  },
  {
    url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80",
    label: "柯基犬",
    style: "国风风格",
  },
  {
    url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80",
    label: "布偶猫",
    style: "赛博朋克",
  },
];

// 风格示例 - 使用更匹配的真实宠物照片
const styleExamples = [
  {
    name: "证件照",
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", // 正面照
    description: "专业正规",
  },
  {
    name: "漫画风",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80", // 可爱猫咪
    description: "可爱卡通 AI 生成",
  },
  {
    name: "雪景",
    url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80", // 雪地狗狗
    description: "冬日雪景 AI 创作",
  },
  {
    name: "太空",
    url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80", // 科幻感
    description: "科幻奇幻 AI 创作",
  },
  {
    name: "油画",
    url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80", // 艺术感狗狗
    description: "艺术油画 AI 创作",
  },
  {
    name: "国风",
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80", // 端庄感猫咪
    description: "东方美学 AI 创作",
  },
  {
    name: "赛博朋克",
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80", // 酷炫感
    description: "未来科技 AI 创作",
  },
  {
    name: "海滩",
    url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80", // 海边
    description: "清新自然 AI 创作",
  },
];

// 使用步骤
const steps = [
  {
    title: "上传毛孩子的萌照",
    description: "3-20 张清晰照片，不同角度表情都要，让 AI 充分了解主子",
    icon: <Upload className="h-6 w-6" />,
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    title: "AI 学习主子特征",
    description: "AI 会仔细研究毛孩子的每个细节，训练专属模型",
    icon: <Wand2 className="h-6 w-6" />,
    iconBg: "bg-pink-100 text-pink-600",
  },
  {
    title: "选择风格开拍",
    description: "pick 喜欢的主题，AI 马上为毛孩子生成各种美照",
    icon: <Sparkles className="h-6 w-6" />,
    iconBg: "bg-purple-100 text-purple-600",
  },
];

// 用户好评 - 真实头像
const testimonials = [
  {
    author: "铲屎官小美",
    pet: "英短喵主子 咪咪",
    rating: 5,
    content: "救命！生成的证件照太专业了，咪咪简直像去影楼拍了一样～漫画风也超级可爱！",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    author: "狗爸阿杰",
    pet: "金毛小天使 旺财",
    rating: 5,
    content: "给旺财拍了超多风格，国风版特别有仙气！朋友都以为我请了专业摄影～",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    author: "柯基妈妈小雨",
    pet: "柯基屁屁 豆豆",
    rating: 5,
    content: "超级简单！上传照片等一会儿就好了。赛博朋克豆豆太帅了，朋友圈被赞爆！",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

// 价格方案
const pricingPlans = [
  {
    name: "按需尝鲜",
    price: "59",
    period: "次",
    description: "适合想试试看的家长",
    features: [
      "训练 1 个毛孩子模型",
      "生成 20 张萌照",
      "支持 1 种风格",
      "高清下载",
      "保留 30 天",
    ],
    cta: "买它买它",
    ctaLink: "/auth/signup",
    popular: false,
  },
  {
    name: "宠爱无限",
    price: "129",
    period: "月",
    description: "萌宠博主必备",
    features: [
      "无限训练毛孩子模型",
      "每月 200 张照片",
      "所有风格随便玩",
      "高清下载",
      "永久保存",
      "专属客服",
    ],
    cta: "马上订阅",
    ctaLink: "/auth/signup",
    popular: true,
  },
  {
    name: "专业工作室",
    price: "199",
    period: "月",
    description: "宠物摄影工作室首选",
    features: [
      "无限训练模型",
      "无限生成照片",
      "所有风格解锁",
      "4K 超高清",
      "永久保存",
      "API 接口",
      "1对1 顾问",
    ],
    cta: "聊聊合作",
    ctaLink: "/contact",
    popular: false,
  },
];

// 功能特点
const features = [
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: "AI 专属模特训练",
    description: "根据毛孩子照片定制专属模型，精准捕捉每个可爱细节",
  },
  {
    icon: <ImageIcon className="h-7 w-7" />,
    title: "15+ 种百变风格",
    description: "从正经证件照到放飞艺术创作，满足所有脑洞需求",
  },
  {
    icon: <Download className="h-7 w-7" />,
    title: "高清无损下载",
    description: "所有照片都是高清画质，批量下载，永久珍藏",
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: "隐私安全有保障",
    description: "企业级加密保护，毛孩子的照片只有你能看到",
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: "闪电出片",
    description: "模型训练完成后，几分钟就能拿到美照，不用等",
  },
  {
    icon: <PawPrint className="h-7 w-7" />,
    title: "猫狗专属优化",
    description: "专门针对喵星人汪星人优化，效果超自然",
  },
];

// 常见问题
const faqs = [
  {
    question: "要上传多少张毛孩子的照片呀？",
    answer: "建议 3-20 张哦～不同角度、表情、场景都要有，这样 AI 才能充分了解主子的魅力！照片越清晰多样，效果越赞～",
  },
  {
    question: "AI 训练要等很久吗？",
    answer: "通常 15-30 分钟就好啦～训练完成后会通知你，之后生成照片只要几分钟，刷个短视频的时间就搞定！",
  },
  {
    question: "生成的照片清晰度如何？",
    answer: "我们用的是最顶级的 AI 技术，所有照片都是高清（2048x2048）画质。专业版和工作室版还能获得更高分辨率哦～",
  },
  {
    question: "可以拍哪些风格呀？",
    answer: "我们有 15+ 种主题风格，包括证件照、漫画风、雪景、太空、油画、国风、赛博朋克、海滩、森林、节日主题等等。还会持续更新哦～",
  },
  {
    question: "照片会保存多久？",
    answer: "按需付费的保留 30 天，专业版和工作室版的照片永久保存在云端，随时都能下载回来～",
  },
  {
    question: "支持哪些毛孩子呀？",
    answer: "目前主要支持喵星人和汪星人，专门为这两种主子优化过。其他宠物也可以试试，效果可能略有不同哦～",
  },
];
