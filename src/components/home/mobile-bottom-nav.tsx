/**
 * MobileBottomNav Component
 * Bottom navigation bar for mobile devices - e-commerce style
 * Only visible on small screens (mobile)
 */

"use client";

import { Menu, Package, ShoppingCart, Table } from "lucide-react";
import Link from "next/link";
import { type SVGProps, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import CartSidebar from "@/components/cart/cart-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/data/mock-data";

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

export default function MobileBottomNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, isHydrated } = useCart();

  const handleWhatsAppClick = () => {
    const message =
      "Olá! estou no APP do Caixa Fechada, Gostaria de mais informações";
    const whatsappUrl = `https://wa.me/5516992770660?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Bottom Navigation Bar */}
      <nav className="bg-card/95 backdrop-blur-sm border-t border-border px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Menu - Hambúrguer */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 px-3 py-2 h-auto text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="text-xs font-medium">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-primary">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:bg-muted rounded transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Catalogo 
          <Link
            href="/products"
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Package className="h-5 w-5" />
            <span className="text-xs font-medium">Catalogo</span>
          </Link>
             */}
          {/* Tabela
          <Link
            href="/tabela"
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <Table className="h-5 w-5" />
            <span className="text-xs font-medium">Tabela</span>
          </Link>
        */}
          {/* Fale Conosco */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Fale Conosco</span>
          </button>

          {/* Carrinho - Cart Sidebar */}
          <CartSidebar
            trigger={
              <button
                type="button"
                className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {isHydrated && itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">Carrinho</span>
              </button>
            }
          />
        </div>
      </nav>
    </div>
  );
}
