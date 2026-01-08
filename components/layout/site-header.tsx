"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header data-site-header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PawPrint className="h-6 w-6 text-purple-600" />
          <span className="hidden font-bold sm:inline-block">PetPhotoAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link
            href="/#features"
            className="transition-colors hover:text-purple-600"
          >
            超能力
          </Link>
          <Link
            href="/#pricing"
            className="transition-colors hover:text-purple-600"
          >
            价格
          </Link>
          <Link
            href="/#examples"
            className="transition-colors hover:text-purple-600"
          >
            萌宠大片
          </Link>
          <Link
            href="/#faq"
            className="transition-colors hover:text-purple-600"
          >
            答疑解惑
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center space-x-4 md:flex">
          {session?.user ? (
            <>
              <Link href="/console">
                <Button variant="outline">工作台</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/console">工作台</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/console/pets">我的主子</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/console/settings">设置</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout">先撤啦</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">登录</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>免费开始</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="ml-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col space-y-1 p-4">
            <Link
              href="/#features"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              超能力
            </Link>
            <Link
              href="/#pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              价格
            </Link>
            <Link
              href="/#examples"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              萌宠大片
            </Link>
            <Link
              href="/#faq"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              答疑解惑
            </Link>
            <div className="my-2 border-t" />
            {session?.user ? (
              <>
                <Link
                  href="/console"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  工作台
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  先撤啦
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  登录
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-purple-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  免费开始
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
