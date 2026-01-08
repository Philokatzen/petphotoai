import { Metadata } from "next";
import { Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策 - PetPhotoAI",
  description: "PetPhotoAI 隐私政策",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6">隐私政策</h1>
            <p className="text-xl text-muted-foreground">
              最后更新日期：2024年12月
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <div className="mb-8">
              <p className="text-muted-foreground">
                欢迎使用 PetPhotoAI（"我们"、"本服务"）。我们非常重视您的隐私。
                本隐私政策说明了我们如何收集、使用、披露和保护您的信息。
              </p>
            </div>

            <h2>1. 我们收集的信息</h2>
            <h3>1.1 账户信息</h3>
            <p>当您创建账户时，我们收集：</p>
            <ul>
              <li>姓名、电子邮件地址</li>
              <li>头像（可选）</li>
              <li>登录凭证</li>
            </ul>

            <h3>1.2 宠物信息</h3>
            <p>为了提供 AI 服务，我们收集：</p>
            <ul>
              <li>宠物照片</li>
              <li>宠物名字、品种、毛色等基本信息</li>
              <li>生成的 AI 照片</li>
            </ul>

            <h3>1.3 支付信息</h3>
            <p>支付处理由第三方支付平台完成，我们不存储您的完整支付卡信息。</p>

            <h3>1.4 使用数据</h3>
            <p>我们自动收集：</p>
            <ul>
              <li>设备信息、IP 地址</li>
              <li>浏览和使用行为</li>
              <li>Cookies 和类似技术</li>
            </ul>

            <h2>2. 我们如何使用您的信息</h2>
            <ul>
              <li><strong>提供服务：</strong>训练 AI 模型、生成宠物照片</li>
              <li><strong>处理支付：</strong>完成交易、发送收据</li>
              <li><strong>改善服务：</strong>分析使用数据、优化 AI 模型</li>
              <li><strong>客户支持：</strong>响应您的询问和请求</li>
              <li><strong>营销沟通：</strong>发送产品更新、促销信息（可退订）</li>
              <li><strong>安全保护：</strong>防止欺诈、滥用、保障服务安全</li>
            </ul>

            <h2>3. 信息共享</h2>
            <p>我们不会出售您的个人信息。我们仅在以下情况下共享信息：</p>
            <ul>
              <li><strong>服务提供商：</strong>AI 服务提供商、云存储、支付处理等</li>
              <li><strong>法律要求：</strong>响应法律程序、保护权利和财产</li>
              <li><strong>业务转让：</strong>在合并、收购等情况下转让业务</li>
            </ul>

            <h2>4. 数据安全</h2>
            <p>我们采取以下措施保护您的信息：</p>
            <ul>
              <li>SSL/TLS 加密传输</li>
              <li>数据库加密存储</li>
              <li>定期安全审计</li>
              <li>访问权限控制</li>
              <li>安全培训和意识提升</li>
            </ul>

            <h2>5. 数据保留</h2>
            <ul>
              <li><strong>活跃用户：</strong>在账户有效期内保留数据</li>
              <li><strong>删除账户：</strong>30天后删除所有个人数据</li>
              <li><strong>法律要求：</strong>按法律要求保留必要数据</li>
            </ul>

            <h2>6. 您的权利</h2>
            <p>您对自己的数据拥有以下权利：</p>
            <ul>
              <li><strong>访问权：</strong>查看我们收集的您的信息</li>
              <li><strong>更正权：</strong>更新或修正不准确的信息</li>
              <li><strong>删除权：</strong>要求删除您的账户和数据</li>
              <li><strong>反对权：</strong>反对某些数据处理活动</li>
              <li><strong>数据携带权：</strong>以结构化格式导出您的数据</li>
            </ul>
            <p>如需行使这些权利，请通过 <a href="mailto:support@petphotoai.com">support@petphotoai.com</a> 联系我们。</p>

            <h2>7. Cookies 政策</h2>
            <p>我们使用 Cookies 来：</p>
            <ul>
              <li>保持您登录状态</li>
              <li>记住您的偏好设置</li>
              <li>分析网站使用情况</li>
              <li>个性化内容体验</li>
            </ul>
            <p>您可以通过浏览器设置管理 Cookies，但这可能影响某些功能。</p>

            <h2>8. 儿童隐私</h2>
            <p>我们的服务面向 16 岁以上用户。我们不会故意收集 16 岁以下儿童的个人信息。
            如果发现我们收集了此类信息，我们将立即删除。</p>

            <h2>9. 国际数据传输</h2>
            <p>您的信息可能会传输到您所在国家/地区以外的服务器并在此处处理。
            我们确保按照本隐私政策保护您的信息。</p>

            <h2>10. 政策变更</h2>
            <p>我们可能会不时更新本隐私政策。变更后继续使用服务即表示您接受新政策。
            重大变更将通过邮件或网站通知告知您。</p>

            <h2>11. 联系我们</h2>
            <p>如有任何问题或关切，请联系我们：</p>
            <ul>
              <li>邮箱：<a href="mailto:privacy@petphotoai.com">privacy@petphotoai.com</a></li>
              <li>地址：北京市朝阳区望京SOHO T3</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/contact">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                联系我们
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
