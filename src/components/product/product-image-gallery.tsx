"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
  discount?: number;
}

/**
 * Product Image Gallery Component (Client-side)
 * Handles image display with zoom hover effect
 */
export function ProductImageGallery({
  mainImage,
  productName,
  discount,
}: ProductImageGalleryProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted/50">
      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {discount && (
          <Badge variant="destructive" className="text-sm font-bold">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Main Image */}
      <div className="relative h-full w-full overflow-hidden transition-transform hover:scale-105">
        <Image
          src={imageError ? "/images/product/no-image.jpeg" : mainImage}
          alt={productName}
          fill
          className="object-contain p-2"
          onError={() => setImageError(true)}
          priority
        />
      </div>
    </div>
  );
}
