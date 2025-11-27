/**
 * CartSidebar Component
 * Right sidebar with cart summary - opens when clicking mini cart icon
 * Mobile: 75% screen width | Desktop: fixed width
 */

"use client";

import { Minus, Plus, ShoppingBag, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { type SVGProps, useState } from "react";
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
import { useCart } from "./cart-provider";

interface CartSidebarProps {
  trigger?: React.ReactNode;
}

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

export default function CartSidebar({ trigger }: CartSidebarProps) {
  const [open, setOpen] = useState(false);
  const {
    items: cartItems,
    summary,
    itemCount,
    updateQuantity,
    removeItem,
    isHydrated,
  } = useCart();

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleFinalizePurchase = () => {
    const lines = cartItems.map((item, index) => {
      const subtotal = formatCurrency(item.price * item.quantity);
      return `${index + 1}. ${item.name} - ${item.quantity}x ${formatCurrency(item.price)} = ${subtotal}`;
    });

    const shippingLabel =
      summary.shipping === 0
        ? "Frete: Grátis"
        : `Frete: ${formatCurrency(summary.shipping)}`;

    const message = [
      "Olá! Gostaria de finalizar meu pedido pelo site.",
      "",
      "Itens:",
      ...lines,
      "",
      `Subtotal: ${formatCurrency(summary.subtotal)}`,
      shippingLabel,
      `Total: ${formatCurrency(summary.total)}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/5516992770660?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {/* Only render badge after hydration is complete to prevent hydration mismatch */}
            {isHydrated && itemCount > 0 && (
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
            <div className="mr-6">
              <span className="sr-only">
                {`${cartItems.length} ${cartItems.length === 1 ? "item" : "itens"} no carrinho, ${summary.itemCount} unidades no total`}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex h-6 min-w-12 items-center justify-center rounded-full bg-primary px-2 text-xs font-semibold text-primary-foreground"
              >
                {cartItems.length}/{summary.itemCount}
              </span>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!isHydrated ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 animate-pulse" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Carregando...</h3>
                <p className="text-sm text-muted-foreground">
                  Aguarde enquanto carregamos seu carrinho
                </p>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
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
                <div key={item.id} className="relative flex gap-3 group">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.productId)}
                    className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full bg-background/90 text-muted-foreground shadow-sm transition-opacity group-hover:opacity-100"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <X className="h-3 w-3" />
                  </Button>

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
                            updateQuantity(item.productId, item.quantity - 1)
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
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={
                            item.quantity >= (item.maxQuantity ?? item.stock)
                          }
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary and Actions - Fixed at bottom */}
        {isHydrated && cartItems.length > 0 && (
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
                    <span className="text-green-600">Negociado</span>
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
{/*               {summary.installments && (
                <p className="text-xs text-center text-muted-foreground">
                  ou {summary.installments.count}x de{" "}
                  {formatCurrency(summary.installments.value)} sem juros
                </p>
              )}
 */}
              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  className="w-full flex items-center justify-center gap-4 rounded-2xl border border-white/20 bg-linear-to-br from-[#32e26e] via-[#25D366] to-[#128C7E] p-6 text-white shadow-lg shadow-[#128C7E]/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:from-[#1cc08c] dark:via-[#128C7E] dark:to-[#0f7c6d]"
                  size="lg"
                  onClick={handleFinalizePurchase}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 shadow-inner shadow-black/20 sm:h-12 sm:w-12">
                    <WhatsAppIcon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                  </span>
                  <span className="flex flex-col items-start text-left">
                    <span className="text-base font-semibold uppercase tracking-wide">
                      Finalizar Pedido
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      Atendimento via WhatsApp
                    </span>
                  </span>
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
