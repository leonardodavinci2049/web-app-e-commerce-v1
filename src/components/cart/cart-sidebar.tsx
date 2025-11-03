/**
 * CartSidebar Component
 * Right sidebar with cart summary - opens when clicking mini cart icon
 * Mobile: 75% screen width | Desktop: fixed width
 */

"use client";

import { Minus, Plus, ShoppingBag, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { calculateCartSummary, mockCartItems } from "@/data/cart-data";

interface CartSidebarProps {
  trigger?: React.ReactNode;
  itemCount?: number;
}

export default function CartSidebar({
  trigger,
  itemCount = 3,
}: CartSidebarProps) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const summary = calculateCartSummary(cartItems);

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(newQuantity, item.maxQuantity || 99),
              ),
            }
          : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[75%] sm:w-[400px] md:w-[450px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Carrinho de Compras
            </SheetTitle>
            <span className="text-sm text-muted-foreground">
              {summary.itemCount} {summary.itemCount === 1 ? "item" : "itens"}
            </span>
          </div>
        </SheetHeader>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Carrinho vazio</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione produtos para começar suas compras
                </p>
              </div>
              <Button onClick={() => setOpen(false)} className="mt-2">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 group">
                  {/* Product Image */}
                  <div className="relative shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      SKU: {item.sku}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= (item.maxQuantity || 99)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(item.price)}/un
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-auto p-0 text-xs text-destructive hover:text-destructive hover:bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary and Actions - Fixed at bottom */}
        {cartItems.length > 0 && (
          <div className="border-t bg-card">
            <div className="px-6 py-4 space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(summary.subtotal)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-medium">
                  {summary.shipping === 0 ? (
                    <span className="text-green-600">Grátis</span>
                  ) : (
                    formatCurrency(summary.shipping)
                  )}
                </span>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(summary.total)}
                </span>
              </div>

              {/* Installments */}
              {summary.installments && (
                <p className="text-xs text-center text-muted-foreground">
                  ou {summary.installments.count}x de{" "}
                  {formatCurrency(summary.installments.value)} sem juros
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button className="w-full" size="lg">
                  Finalizar Compra
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ver Carrinho
                  </Link>
                </Button>
              </div>

              {/* Free shipping message */}
              {summary.subtotal < 299 && (
                <div className="text-xs text-center text-muted-foreground bg-muted/50 rounded-md py-2 px-3">
                  Faltam {formatCurrency(299 - summary.subtotal)} para frete
                  grátis
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
