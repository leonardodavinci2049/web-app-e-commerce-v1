/**
 * Static filter sidebar layout for the tabela page
 * Displays placeholder UI for upcoming filtering features
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BrandFilter } from "../filter/brand-filter";

interface FilterSidebarProps {
  className?: string;
  selectedBrandId?: number;
  onSelectBrand?: (brandId: number) => void;
}

export default function FilterSidebar({
  className,
  selectedBrandId,
  onSelectBrand,
}: FilterSidebarProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      {/* Filtro por Marca */}
      <BrandFilter
        selectedBrandId={selectedBrandId}
        onSelectBrand={onSelectBrand}
      />

      <Card className="gap-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Filtro por categorias</CardTitle>
          <CardDescription>
            Nesta etapa exibimos apenas a estrutura visual. Em breve você poderá
            segmentar por categorias do catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            Em breve
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
