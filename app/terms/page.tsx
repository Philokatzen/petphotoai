import { Metadata } from "next";
import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务条款 - PetPhotoAI",
  description: "PetPhotoAI 服务条款",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-purple-950/20 dark:via-pink-950/20 dark:to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6">服务条款</h1>
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
                欢迎使用 PetPhotoAI（"本服务"）。这些服务条款（"条款"） govern
                您对我们服务的访问和使用。使用我们的服务即表示您同意这些条款。
              </p>
            </div>

            <h2>1. 服务说明</h2>
            <p>PetPhotoAI 提供以下服务：</p>
            <ul>
              <li><strong>AI 宠物照片生成：</strong>基于上传的宠物照片生成各种风格的 AI 照片</li>
              <li><strong>宠物模型训练：</strong>训练专属的 AI 宠物模型</li>
              <li><strong>照片存储：</strong>云端存储您的宠物照片和生成结果</li>
              <li><strong>积分系统：</strong>购买和使用积分来兑换服务</li>
            </ul>

            <h2>2. 用户资格</h2>
            <p>您必须满足以下条件才能使用我们的服务：</p>
            <ul>
              <li>年满 16 周岁</li>
              <li>具备完全民事行为能力</li>
              <li>未在之前被我们暂停或终止服务</li>
              <li>遵守所有适用的法律法规</li>
            </ul>

            <h2>3. 用户账户</h2>
            <h3>3.1 注册</h3>
            <p>创建账户时，您必须：</p>
            <ul>
              <li>提供准确、真实、完整的信息</li>
              <li>保持信息更新</li>
              <li>保护账户安全</li>
              <li>对账户下的所有活动负责</li>
            </ul>

            <h3>3.2 账户安全</h3>
            <p>您同意：</p>
            <ul>
              <li>不与他人共享账户凭证</li>
              <li>立即通知我们任何未经授权的访问</li>
              <li>对您账户下发生的所有活动负责</li>
            </ul>

            <h2>4. 服务使用规则</h2>
            <h3>4.1 允许的使用</h3>
            <p>您可以使用服务来：</p>
            <ul>
              <li>为您的宠物创建 AI 照片</li>
              <li>个人、非商业用途</li>
              <li>遵守这些条款和所有适用法律</li>
            </ul>

            <h3>4.2 禁止的使用</h3>
            <p>您不得：</p>
            <ul>
              <li>上传非宠物或非法内容</li>
              <li>侵犯他人的知识产权</li>
              <li>用于商业或营利目的（除非获得授权）</li>
              <li>试图反向工程或破解我们的 AI 模型</li>
              <li>使用自动化工具批量抓取内容</li>
              <li>干扰或破坏服务的正常运行</li>
              <li>协助他人违反这些条款</li>
            </ul>

            <h2>5. 内容和知识产权</h2>
            <h3>5.1 您的内容</h3>
            <p>您保留对上传内容的所有权。通过上传内容，您授予我们：</p>
            <ul>
              <li>存储和处理内容的权利</li>
              <li>用于提供服务的许可</li>
              <li>展示和分享生成结果的权利</li>
            </ul>

            <h3>5.2 AI 生成内容</h3>
            <ul>
              <li>您对使用 AI 生成的内容承担责任</li>
              <li>生成的照片可用于个人用途</li>
              <li>商业使用需要相应的付费套餐授权</li>
              <li>我们不对 AI 生成内容的准确性负责</li>
            </ul>

            <h3>5.3 我们的知识产权</h3>
            <p>服务及其所有内容、功能和特性均归我们或我们的许可方所有，
            受知识产权法保护。</p>

            <h2>6. 付费和退款</h2>
            <h3>6.1 定价</h3>
            <ul>
              <li>所有价格均以人民币（CNY）显示</li>
              <li>我们保留随时更改价格的权利</li>
              <li>价格变更不适用于现有订阅</li>
            </ul>

            <h3>6.2 支付</h3>
            <ul>
              <li>支持支付宝、微信支付等支付方式</li>
              <li>支付处理由第三方支付平台完成</li>
              <li>我们不存储您的完整支付信息</li>
            </ul>

            <h3>6.3 退款政策</h3>
            <ul>
              <li><strong>按需付费：</strong>订单创建后 7 天内可申请退款</li>
              <li><strong>订阅服务：</strong>订阅期内可随时取消，不退还未使用部分</li>
              <li><strong>技术问题：</strong>如因技术原因无法使用，可申请全额退款</li>
            </ul>

            <h2>7. 取消和终止</h2>
            <h3>7.1 您的权利</h3>
            <p>您可以随时：</p>
            <ul>
              <li>删除您的账户</li>
              <li>取消订阅</li>
              <li>停止使用服务</li>
            </ul>

            <h3>7.2 我们的权利</h3>
            <p>我们可以在以下情况下立即暂停或终止您的账户：</p>
            <ul>
              <li>违反这些条款</li>
              <li>从事欺诈或非法活动</li>
              <li>危害服务或其他用户</li>
              <li>长期不活跃账户（12个月以上）</li>
            </ul>

            <h2>8. 免责声明</h2>
            <ul>
              <li>服务"按原样"提供，不提供任何明示或暗示的保证</li>
              <li>我们不保证服务不中断、及时、安全或无错误</li>
              <li>我们不对使用服务造成的任何损失负责</li>
              <li>AI 生成内容可能不完美，我们不保证其质量</li>
            </ul>

            <h2>9. 责任限制</h2>
            <p>在法律允许的最大范围内：</p>
            <ul>
              <li>我们的责任限于您支付的费用金额</li>
              <li>我们不对间接、附带、特殊或后果性损害负责</li>
              <li>某些司法管辖区不允许排除某些保证，可能不适用于您</li>
            </ul>

            <h2>10. 争议解决</h2>
            <h3>10.1 适用法律</h3>
            <p>这些条款受中华人民共和国法律管辖。</p>

            <h3>10.2 争议解决</h3>
            <p>任何争议应首先通过友好协商解决。协商不成的，任何一方可向北京市朝阳区人民法院提起诉讼。</p>

            <h2>11. 赔偿</h2>
            <p>您同意就以下任何索赔、损失、责任、费用（包括律师费）对我们进行赔偿并使我们免受损害：</p>
            <ul>
              <li>您使用或滥用服务</li>
              <li>您违反这些条款</li>
              <li>您侵犯他人的权利</li>
            </ul>

            <h2>12. 其他条款</h2>
            <h3>12.1 完整协议</h3>
            <p>这些条款构成您与我们之间关于服务使用的完整协议。</p>

            <h3>12.2 可分割性</h3>
            <p>如果条款的任何规定被认定为不可执行，其余条款仍然有效。</p>

            <h3>12.3 放弃</h3>
            <p>我们未能执行任何权利或条款不构成对该权利或条款的放弃。</p>

            <h3>12.4 转让</h3>
            <p>您不得转让这些条款或任何权利。我们可以自由转让我们的权利和义务。</p>

            <h2>13. 变更</h2>
            <p>我们保留随时修改这些条款的权利。变更后继续使用服务即表示您接受新条款。
            重大变更将通过邮件或网站通知告知您，至少提前 30 天通知。</p>

            <h2>14. 联系我们</h2>
            <p>如有任���问题或疑虑，请联系我们：</p>
            <ul>
              <li>邮箱：<a href="mailto:legal@petphotoai.com">legal@petphotoai.com</a></li>
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
