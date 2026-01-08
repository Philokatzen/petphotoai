import Link from "next/link";
import { PawPrint } from "lucide-react";

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-5 w-5 text-purple-600" />
              <span className="font-bold">PetPhotoAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              使用 AI 技术为您的宠物生成精美照片
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">产品</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-purple-600">
                  功能特点
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-purple-600">
                  价格方案
                </Link>
              </li>
              <li>
                <Link href="/#examples" className="hover:text-purple-600">
                  作品案例
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">公司</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-purple-600">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-600">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple-600">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-600">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">帮助</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#faq" className="hover:text-purple-600">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-purple-600">
                  客户支持
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PetPhotoAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
