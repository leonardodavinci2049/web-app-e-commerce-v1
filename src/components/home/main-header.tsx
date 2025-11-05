/**
 * MainHeader Component
 * Main header with logo, search bar and action icons
 */

"use client";

import { MessageCircle, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartSidebar from "@/components/cart/cart-sidebar";
import ModeToggle from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { envs } from "@/core/config/envs";

export default function MainHeader() {
  return (
    <header className="bg-card border-b border-border py-4 px-4">
      <div className="container mx-auto max-w-7xl flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/images/logo/logo-header.png"
            alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
            width={64}
            height={32}
            className="h-8 w-16 sm:h-10 sm:w-20"
          />
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            {envs.NEXT_PUBLIC_COMPANY_NAME}
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="O que você procura?"
            className="w-full pl-10 bg-background"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex items-center gap-2"
            asChild
          >
            <Link href="/contact">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Fale Conosco</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="text-sm hidden md:inline">
                Entre / Cadastre-se
              </span>
            </Link>
          </Button>

          {/* Cart Sidebar */}
          <CartSidebar itemCount={2} />

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
