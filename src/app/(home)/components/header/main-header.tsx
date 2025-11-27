/**
 * MainHeader Component
 * Main header with logo, search bar and action icons
 */

"use client";

import { Moon, Search, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  type ChangeEvent,
  type FormEvent,
  type SVGProps,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useCart } from "@/components/cart/cart-provider";
import CartSidebar from "@/components/cart/cart-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { envs } from "@/core/config/envs";
import { useTableSearch } from "../table/table-search-context";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Logotipo do WhatsApp"
      fill="currentColor"
      {...props}
    >
      <title>Logotipo do WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

export default function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const { inputValue, setInputValue, submitSearch, clearSearch } =
    useTableSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === "") {
        clearSearch();
        return;
      }

      setInputValue(value);
    },
    [clearSearch, setInputValue],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitSearch();
    },
    [submitSearch],
  );

  const handleWhatsAppClick = () => {
    const message =
      "Olá! estou no APP do Caixa Fechada, Gostaria de mais informações";
    const whatsappUrl = `https://wa.me/5516992770660?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="hidden md:block bg-card border-b border-border py-4 px-4">
      <div className="container mx-auto max-w-7xl grid grid-cols-3 items-center">
        {/* Logo - Left */}
        <div className="flex justify-start">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/images/logo/logo-header.png"
              alt="Logo"
              width={64}
              height={32}
              className="h-8 w-16 sm:h-10 sm:w-20"
            />
            <h1 className="text-xl font-bold text-primary sm:text-2xl">
              {envs.NEXT_PUBLIC_COMPANY_NAME}
            </h1>
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="flex justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl relative flex items-center"
          >
            <Input
              type="search"
              placeholder="O que você procura?"
              className="w-full pl-4 pr-12 h-10 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inputValue}
              onChange={handleChange}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-12 rounded-l-none shrink-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Action Icons - Right */}
        <div className="flex justify-end items-center gap-6">
          {/* Fale Conosco */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
          >
            <div className="h-6 flex items-center justify-center">
              <WhatsAppIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide">
              Fale Conosco
            </span>
          </button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto hover:bg-transparent p-0 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary group"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div className="h-6 flex items-center justify-center">
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              )}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide">
              Tema
            </span>
          </Button>

          {/* Cart Sidebar */}
          <CartSidebar
            trigger={
              <Button
                variant="ghost"
                className="h-auto w-auto hover:bg-transparent p-0 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary relative group"
              >
                <div className="h-6 flex items-center justify-center relative">
                  <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {mounted && itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  Carrinho
                </span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
