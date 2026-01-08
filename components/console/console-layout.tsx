import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PawPrint, Plus, Image as ImageIcon, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/console" className="flex items-center gap-2">
                <PawPrint className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-xl">PetPhotoAI</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/console/pets/new"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  添加宠物
                </Link>
                <Link
                  href="/console/pets"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PawPrint className="h-4 w-4" />
                  我的宠物
                </Link>
                <Link
                  href="/console/generations"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ImageIcon className="h-4 w-4" />
                  生成记录
                </Link>
                <Link
                  href="/console/credits"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  积分充值
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md">
                    {session?.user?.name?.[0]?.toUpperCase() || (session?.user?.email?.[0]?.toUpperCase() || "U")}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {session?.user?.name || session?.user?.email}
                  </span>
                </div>
              </div>
              <Link href="/console/settings">
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <form
                action="/api/auth/signout"
                method="POST"
                className="hidden sm:block"
              >
                <Button size="sm" variant="ghost" type="submit">
                  <LogOut className="h-4 w-4 mr-2" />
                  退出
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main>{children}</main>
    </div>
  );
}
