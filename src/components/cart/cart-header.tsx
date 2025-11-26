/**
 * Cart Header Component
 * Simple header for cart page with logo only
 */

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { envs } from "@/core/config/envs";

export default function CartHeader() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button + Logo */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="lg:hidden">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>

            <Link href="/" className="shrink-0 flex items-center gap-2">
              <Image
                src="/images/logo/logo-header.png"
                alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
                width={64}
                height={32}
                className="h-8 w-16"
              />
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                {envs.NEXT_PUBLIC_COMPANY_NAME}
              </h1>
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às compras
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
