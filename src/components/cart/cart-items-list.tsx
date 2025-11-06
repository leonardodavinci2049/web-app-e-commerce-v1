"use client";

/**
 * Cart Items List Component
 * List of all cart items
 */

import type { CartItem } from "@/types/cart";
import CartItemCard from "./cart-item-card";

interface CartItemsListProps {
  items: CartItem[];
}

export default function CartItemsList({ items }: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Produtos</h2>
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </p>
      </div>

      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
