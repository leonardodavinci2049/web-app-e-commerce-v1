/**
 * Brand Filter Component
 * Visual brand blocks for filtering products
 */

"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { BrandData } from "@/services/api-main/brand/types/brand-types";

interface BrandFilterProps {
  brands: BrandData[];
  selectedBrandId?: number;
  onBrandSelect: (brandId: number | undefined) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  className?: string;
}

const BRAND_COLORS: string[] = [
  "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "bg-green-100 text-green-800 hover:bg-green-200",
  "bg-purple-100 text-purple-800 hover:bg-purple-200",
  "bg-orange-100 text-orange-800 hover:bg-orange-200",
  "bg-red-100 text-red-800 hover:bg-red-200",
  "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  "bg-pink-100 text-pink-800 hover:bg-pink-200",
  "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
];

export default function BrandFilter({
  brands,
  selectedBrandId,
  onBrandSelect,
  searchTerm,
  onSearchChange,
  className,
}: BrandFilterProps) {
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Filter brands based on search term
  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return brands;

    return brands.filter((brand) =>
      brand.MARCA?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [brands, searchTerm]);

  // Show only first 9 brands initially, unless showing all or searching
  const visibleBrands = useMemo(() => {
    if (showAllBrands || searchTerm.trim()) {
      return filteredBrands;
    }
    return filteredBrands.slice(0, 9);
  }, [filteredBrands, showAllBrands, searchTerm]);

  const handleBrandClick = (brandId: number) => {
    if (selectedBrandId === brandId) {
      onBrandSelect(undefined); // Deselect if already selected
    } else {
      onBrandSelect(brandId);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Digite o modelo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base bg-background"
        />
      </div>

      {/* Brand Filter Blocks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Filtrar por marca</h3>
          {filteredBrands.length > 9 && !searchTerm.trim() && (
            <button
              type="button"
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {showAllBrands
                ? "Ver menos"
                : `Ver todas (${filteredBrands.length})`}
            </button>
          )}
        </div>

        {/* Brand Blocks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {visibleBrands.map((brand, index) => {
            const isSelected = selectedBrandId === brand.ID_MARCA;
            const colorClass = BRAND_COLORS[index % BRAND_COLORS.length];

            return (
              <button
                key={brand.ID_MARCA}
                type="button"
                onClick={() => handleBrandClick(brand.ID_MARCA)}
                className={cn(
                  "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-center min-h-[60px] flex items-center justify-center",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-md transform scale-105"
                    : cn("border-transparent", colorClass),
                  "hover:shadow-md hover:transform hover:scale-105",
                )}
              >
                <span className="truncate leading-tight">
                  {brand.MARCA || "Sem nome"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Brand Info */}
        {selectedBrandId && (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <span className="text-sm text-muted-foreground">
              Marca selecionada:
            </span>
            <Badge variant="default" className="font-medium">
              {brands.find((b) => b.ID_MARCA === selectedBrandId)?.MARCA ||
                "Desconhecida"}
            </Badge>
            <button
              type="button"
              onClick={() => onBrandSelect(undefined)}
              className="text-sm text-primary hover:text-primary/80 ml-auto"
            >
              Limpar filtro
            </button>
          </div>
        )}

        {/* No Results Message */}
        {searchTerm.trim() && filteredBrands.length === 0 && (
          <div className="text-center p-6 text-muted-foreground">
            <p>Nenhuma marca encontrada para "{searchTerm}"</p>
          </div>
        )}

        {/* Total Brands Info */}
        {brands.length > 0 && (
          <div className="text-xs text-muted-foreground text-center">
            {searchTerm.trim() ? (
              <>
                Mostrando {filteredBrands.length} de {brands.length} marcas
              </>
            ) : (
              <>
                Mostrando {visibleBrands.length} de {brands.length} marcas
                {!showAllBrands &&
                  brands.length > 9 &&
                  " • Clique em 'Ver todas' para mostrar mais"}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
