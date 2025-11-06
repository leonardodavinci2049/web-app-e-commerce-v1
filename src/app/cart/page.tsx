/**
 * Cart Page
 * Modern shopping cart page with excellent UX
 */

import CartHeader from "@/components/cart/cart-header";
import Footer from "@/components/home/footer";
import CartPageClient from "./cart-page-client";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CartHeader />
      <CartPageClient />

      <Footer />
    </div>
  );
}
