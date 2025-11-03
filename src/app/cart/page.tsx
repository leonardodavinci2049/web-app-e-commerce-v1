/**
 * Cart Page
 * Modern shopping cart page with excellent UX
 */

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CartHeader from "@/components/cart/cart-header";
import CartInfoBanner from "@/components/cart/cart-info-banner";
import CartItemsList from "@/components/cart/cart-items-list";
import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import Footer from "@/components/home/footer";
import {
  calculateCartSummary,
  deliveryInfo,
  mockCartItems,
} from "@/data/cart-data";

export default function CartPage() {
  // Get mock cart data
  const cartItems = mockCartItems;
  const summary = calculateCartSummary(cartItems);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <CartHeader />

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
                  <CartItemsList items={cartItems} />
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

      <Footer />
    </div>
  );
}
