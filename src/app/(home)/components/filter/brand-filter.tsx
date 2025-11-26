"use client";

import { Tags } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BrandFilterItem } from "../../actions";
import { findBrandsForFilter } from "../../actions";

interface BrandFilterProps {
  className?: string;
  selectedBrandId?: number;
  onSelectBrand?: (brandId: number) => void;
}

export function BrandFilter({
  className,
  selectedBrandId,
  onSelectBrand,
}: BrandFilterProps) {
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
    <Card className={cn("gap-2", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tags className="h-5 w-5 text-muted-foreground" />
          Filtro por marcas
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 pt-0">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className={cn(
              "flex h-11 w-full items-center justify-start gap-2 rounded-xl border px-3 text-left text-sm font-semibold",
              "bg-gradient-to-b from-card/95 via-card to-accent/40 shadow-sm transition-all duration-150",
              "hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/70 hover:from-primary/10 hover:via-card hover:to-accent/70",
              "active:translate-y-px active:shadow-md",
              "cursor-pointer",
              brand.id === selectedBrandId
                ? "border-primary/80 text-primary shadow-md ring-1 ring-primary/40"
                : "border-muted-foreground/20 text-foreground/90 hover:text-primary",
            )}
            onClick={() => handleSelectBrand(brand.id)}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-primary/40 shadow-[0_0_8px_rgba(0,0,0,0.12)]" />
            <span className="truncate">{brand.name}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
