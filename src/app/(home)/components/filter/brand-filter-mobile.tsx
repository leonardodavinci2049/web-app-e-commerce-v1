"use client";

import { Tags } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BrandFilterItem } from "../../actions";
import { findBrandsForFilter } from "../../actions";

interface BrandFilterMobileProps {
  className?: string;
  selectedBrandId?: number;
  onSelectBrand?: (brandId: number) => void;
}

export function BrandFilterMobile({
  className,
  selectedBrandId,
  onSelectBrand,
}: BrandFilterMobileProps) {
  const [brands, setBrands] = useState<BrandFilterItem[]>([]);

  useEffect(() => {
    void (async () => {
      const result = await findBrandsForFilter();
      setBrands(result);
    })();
  }, []);

  const handleSelectBrand = useCallback(
    (brandId: number) => {
      if (!onSelectBrand) return;
      onSelectBrand(brandId);
    },
    [onSelectBrand],
  );

  return (
    <Card className={cn("gap-1 pt-1", className)}>
      <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-sm font-semibold">
        <Tags className="h-4 w-4 text-muted-foreground" />
        <span>Filtro por marcas</span>
      </div>
      <CardContent className="grid grid-cols-2 gap-3 pt-0 px-3 pb-3">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className={cn(
              "flex h-10 w-full items-center justify-start gap-2 rounded-xl border px-3 text-left text-sm font-semibold",
              "bg-linear-to-b from-card/95 via-card to-accent/40 shadow-sm transition-all duration-150",
              "hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/70 hover:from-primary/10 hover:via-card hover:to-accent/70",
              "active:translate-y-px active:shadow-md",
              "cursor-pointer",
              brand.id === selectedBrandId
                ? "border-primary/80 text-primary shadow-md ring-1 ring-primary/40"
                : "border-muted-foreground/20 text-foreground/90 hover:text-primary",
            )}
            onClick={() => handleSelectBrand(brand.id)}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-linear-to-r from-primary to-primary/40 shadow-[0_0_8px_rgba(0,0,0,0.12)]" />
            <span className="truncate">{brand.name}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
