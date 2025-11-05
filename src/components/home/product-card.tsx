/**
 * ProductCard Component
 * Card component for displaying product information
 */

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
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

  const categorySlug = slugify(product.category);
  const productSlug = product.slug
    ? slugify(product.slug)
    : slugify(product.name);
  const productUrl = `/product/${categorySlug}/${product.id}/${productSlug}`;

  const productImage = product.image || "/images/product/no-image.jpeg";

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <Link href={productUrl} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
          <h3 className="text-foreground font-medium text-sm line-clamp-2 min-h-10">
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
