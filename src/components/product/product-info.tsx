import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/home";

interface ProductInfoProps {
  product: Product;
}

/**
 * Product Information Component (Server-side)
 * Displays product title, rating, prices and category
 */
export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <div>
        <Badge variant="outline" className="text-xs">
          {product.category}
        </Badge>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        {product.name}
      </h1>

      {/* Rating (Mock) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(45 avaliações)</span>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-sm font-medium text-green-600">Em estoque</span>
      </div>

      {/* Prices */}
      <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              De: R$ {product.originalPrice?.toFixed(2).replace(".", ",")}
            </span>
            <Badge variant="destructive" className="text-xs">
              Economize R${" "}
              {((product.originalPrice || 0) - product.price)
                .toFixed(2)
                .replace(".", ",")}
            </Badge>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">Por:</span>
          <span className="text-3xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          Em até{" "}
          <span className="font-semibold">
            12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")}
          </span>{" "}
          sem juros
        </p>
      </div>
    </div>
  );
}
