/**
 * Account Header Component
 * Header for customer account area with user info and cart
 */

"use client";

import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModeToggle from "@/components/theme/mode-toggle";
import { envs } from "@/core/config/envs";
import AccountMobileMenu from "./account-mobile-menu";

export default function AccountHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
              Pré Pago
            </div>
            <span className="hidden sm:inline">Olá,</span>
            <span className="font-semibold">MAURO AUGUSTO RAMALLI</span>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="hover:underline hidden sm:inline">
              Área do Cliente
            </button>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-header.png"
              alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
              width={64}
              height={32}
              className="h-8 w-16"
            />
            <div className="text-xl md:text-2xl font-bold text-primary">
              {envs.NEXT_PUBLIC_COMPANY_NAME}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link
              href="/account"
              className="text-primary font-semibold border-b-2 border-primary pb-1"
            >
              Dashboard
            </Link>
            <Link
              href="/account/profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Meu Perfil
            </Link>
            <Link
              href="/account/orders"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Meus Pedidos
            </Link>
            <Link
              href="/account/favorites"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Promoções
            </Link>
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="/account/settings"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Configurações
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">R$ 0,00</span>
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground h-5 w-5 rounded-full text-xs flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex items-center gap-4 mt-4 overflow-x-auto pb-2">
          <Link
            href="/account"
            className="text-primary font-semibold border-b-2 border-primary pb-1 whitespace-nowrap text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/account/profile"
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap text-sm"
          >
            Perfil
          </Link>
          <Link
            href="/account/orders"
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap text-sm"
          >
            Pedidos
          </Link>
          <Link
            href="/account/favorites"
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap text-sm"
          >
            Promoções
          </Link>
          <Link
            href="/services"
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap text-sm"
          >
            Serviços
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      <AccountMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
