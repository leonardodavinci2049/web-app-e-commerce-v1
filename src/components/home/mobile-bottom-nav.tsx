/**
 * MobileBottomNav Component
 * Bottom navigation bar for mobile devices - e-commerce style
 * Only visible on small screens (mobile)
 */

"use client";

import { Heart, Menu, Package, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

export default function MobileBottomNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

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

          {/* Pedidos */}
          <Link
            href="/pedidos"
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Package className="h-5 w-5" />
            <span className="text-xs font-medium">Pedidos</span>
          </Link>

          {/* Favoritos */}
          <Link
            href="/favoritos"
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors relative"
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs font-medium">Favoritos</span>
          </Link>

          {/* Conta */}
          <Link
            href="/conta"
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Conta</span>
          </Link>

          {/* Carrinho - Cart Sidebar */}
          <CartSidebar
            trigger={
              <button
                type="button"
                className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
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
