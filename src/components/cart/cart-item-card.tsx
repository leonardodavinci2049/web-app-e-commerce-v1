/**
 * Cart Item Card Component (Client Component)
 * Individual cart item with quantity controls
 */

"use client";

import { ExternalLink, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/types/cart";
import { useCart } from "./cart-provider";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();

  const maxQuantity = item.maxQuantity ?? item.stock;
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.price);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < maxQuantity) {
      updateQuantity(item.productId, item.quantity + 1);
    }
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) {
      return;
    }

    if (num > 0 && num <= maxQuantity) {
      updateQuantity(item.productId, num);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="shrink-0">
          <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-medium text-sm md:text-base line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                SKU: {item.sku}
              </p>
              {item.stock > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Estoque: {item.stock}
                </p>
              )}
            </div>

            {/* Link to Product */}
            <Button variant="ghost" size="sm" asChild className="shrink-0">
              <Link href={`/product/${item.productId}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Price and Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="h-8 w-16 text-center"
                min={1}
                max={maxQuantity}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={handleIncrease}
                disabled={item.quantity >= maxQuantity}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold text-primary">{formattedPrice}</p>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
