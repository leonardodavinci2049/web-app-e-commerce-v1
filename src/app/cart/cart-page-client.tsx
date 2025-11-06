"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CartInfoBanner from "@/components/cart/cart-info-banner";
import CartItemsList from "@/components/cart/cart-items-list";
import { useCart } from "@/components/cart/cart-provider";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import { deliveryInfo } from "@/data/cart-data";

export default function CartPageClient() {
  const { items, summary, isHydrated } = useCart();
  const isEmpty = items.length === 0;

  if (!isHydrated) {
    return (
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="h-24 rounded-lg border border-dashed border-border bg-card/40 animate-pulse" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Meu Carrinho de Compras
          </h1>
          {!isEmpty && (
            <p className="text-sm text-muted-foreground">
              {summary.itemCount}{" "}
              {summary.itemCount === 1
                ? "produto adicionado"
                : "produtos adicionados"}
            </p>
          )}
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <CartItemsList items={items} />
                <CartInfoBanner />
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <CartSummary
                    summary={summary}
                    deliveryEstimate={deliveryInfo.estimate}
                    deliveryGuaranteed={deliveryInfo.guaranteed}
                  />
                </div>
              </div>
            </div>

            {/* Back to Shopping Link - Mobile */}
            <div className="mt-8 lg:hidden">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar às compras
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
