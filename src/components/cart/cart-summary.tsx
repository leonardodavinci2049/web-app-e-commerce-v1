"use client";

/**
 * Cart Summary Component
 * Order summary with totals and checkout button
 */

import { CheckCircle, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CartSummary as CartSummaryType } from "@/types/cart";
import CartCoupon from "./cart-coupon";
import ContinueShoppingButton from "./continue-shopping-button";

interface CartSummaryProps {
  summary: CartSummaryType;
  deliveryEstimate: string;
  deliveryGuaranteed: boolean;
}

export default function CartSummary({ summary }: CartSummaryProps) {
  const { subtotal, shipping, discount, total, itemCount, installments } =
    summary;

  return (
    <div className="space-y-4">
      {/* Cart Icon Header */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="font-bold">resumo do pedido</h2>
        </div>

        {/* Summary Details */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "produto" : "produtos"}
            </span>
            <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">subtotal</span>
            <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ca entrega</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <Badge variant="secondary" className="text-xs">
                  Grátis
                </Badge>
              ) : (
                `R$ ${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600 dark:text-green-400">
                desconto
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                - R$ {discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold">total</span>
              <span className="text-2xl font-bold text-primary">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Installments Info */}
          {installments && (
            <div className="text-center text-sm text-muted-foreground">
              ou até {installments.count}x de R$ {installments.value.toFixed(2)}
              {}
              sem juros no cartão
            </div>
          )}
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-lg font-bold h-12"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Finalizar Compra
      </Button>

      {/* Continue Shopping */}
      <ContinueShoppingButton />

      {/* Coupon Section */}
      <CartCoupon />

      {/* Delivery Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Entrega garantida em até 3 dias úteis
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Preços especiais para atacadistas
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Suporte especializado</p>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span>Compra 100% segura e protegida</span>
      </div>
    </div>
  );
}
