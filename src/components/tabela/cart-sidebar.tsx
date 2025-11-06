/**
 * Cart Sidebar Component for Tabela Page
 * Shows cart items on the right side for desktop screens only
 */

"use client";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  className?: string;
}

export default function CartSidebar({ className }: CartSidebarProps) {
  const { items: cartItems, summary, updateQuantity, removeItem } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <ShoppingCart className="w-5 h-5" />
              Seu Pedido
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
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <ShoppingCart className="w-5 h-5" />
            Seu Pedido
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
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            size="lg"
          >
            Enviar Pedido
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
