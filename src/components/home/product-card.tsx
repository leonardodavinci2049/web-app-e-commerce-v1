/**
 * ProductCard Component
 * Card component for displaying product information
 */

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/home";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  // Generate product URL
  const productUrl = `/product/${product.category
    .toLowerCase()
    .replace(/\s+/g, "-")}/${product.id}/${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <Link href={productUrl} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">Novo</Badge>
            )}
            {product.badge && (
              <Badge className="bg-secondary text-secondary-foreground">
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-foreground font-medium text-sm line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="space-y-1">
            {product.originalPrice && (
              <p className="text-destructive line-through text-xs">
                R$ {product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-primary font-bold text-lg">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            Ver produto
          </Button>
        </div>
      </Link>
    </div>
  );
}
