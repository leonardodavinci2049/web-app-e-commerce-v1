/**
 * Cart Sidebar Component for Tabela Page
 * Shows cart items on the right side for desktop screens only
 */

"use client";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { type SVGProps, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  className?: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  dinheiro: "Dinheiro",
  cartao: "Cartão",
  pix: "PIX",
  boleto: "Boleto",
};

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

export default function CartSidebarFixo({ className }: CartSidebarProps) {
  const { items: cartItems, summary, updateQuantity, removeItem } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const lineItemCount = cartItems.length;
  const totalProductQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const itemQuantityLabel = lineItemCount === 1 ? "item" : "itens";
  const cartQuantityDisplay = `${lineItemCount}/${totalProductQuantity}`;
  const cartQuantityAriaLabel = `${lineItemCount} ${itemQuantityLabel} no carrinho, ${totalProductQuantity} unidades no total`;

  const handleSendOrder = () => {
    const paymentLabel = PAYMENT_LABELS[paymentMethod] ?? paymentMethod;
    const lines = cartItems.map((item, index) => {
      const subtotal = formatPrice(item.price * item.quantity);
      return `${index + 1}. ${item.name} - ${item.quantity}x ${formatPrice(item.price)} = ${subtotal}`;
    });

    const message = [
      "Olá! Gostaria de realizar um pedido.",
      "",
      "Itens:",
      ...lines,
      "",
      `Total: ${formatPrice(summary.total)}`,
      `Forma de pagamento: ${paymentLabel}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/5516992770660?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (cartItems.length === 0) {
    const emptyCartAriaLabel = "0 itens no carrinho";

    return (
      <div className={cn("w-full", className)}>
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
            <CardTitle className="flex items-center justify-between text-blue-800 dark:text-blue-200">
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Seu Pedido
              </span>
              <span className="sr-only">{emptyCartAriaLabel}</span>
              <span
                aria-hidden="true"
                className="inline-flex h-6 min-w-[3rem] items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white dark:bg-blue-500"
              >
                0/0
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione produtos da tabela para começar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
          <CardTitle className="flex items-center justify-between text-blue-800 dark:text-blue-200">
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Seu Pedido
            </span>
            <span className="sr-only">{cartQuantityAriaLabel}</span>
            <span
              aria-hidden="true"
              className="inline-flex h-6 min-w-[3rem] items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white dark:bg-blue-500"
            >
              {cartQuantityDisplay}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Cart Items */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.productId)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="h-8 w-8 p-0"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="h-8 w-8 p-0"
                      disabled={
                        item.quantity >= (item.maxQuantity ?? item.stock)
                      }
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-2">
            <label htmlFor="payment-method" className="text-sm font-medium">
              Forma de Pagamento:
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>

          {/* Payment Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              ⚠️ Valores apenas para clientes em ATACADO. Consulte condições.
            </p>
          </div>

          {/* Total */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(summary.total)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full flex items-center justify-center gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#32e26e] via-[#25D366] to-[#128C7E] p-6 text-white shadow-lg shadow-[#128C7E]/30 transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:from-[#1cc08c] dark:via-[#128C7E] dark:to-[#0f7c6d]"
            size="lg"
            onClick={handleSendOrder}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 shadow-inner shadow-black/20 sm:h-12 sm:w-12">
              <WhatsAppIcon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </span>
            <span className="flex flex-col items-start text-left">
              <span className="text-base font-semibold uppercase tracking-wide">
                Enviar Pedido
              </span>
              <span className="text-xs font-medium text-white/80">
                Atendimento via WhatsApp
              </span>
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
