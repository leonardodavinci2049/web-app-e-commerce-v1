/**
 * ProductFilters Component
 * Horizontal filters bar for products page
 */

"use client";

import { ChevronDownIcon, FilterIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/home";

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  subcategory: string;
}

// Subcategorias mockadas baseadas nas categorias
const subcategoriesByCategory: Record<string, string[]> = {
  "ferramentas-eletricas": [
    "Furadeiras",
    "Parafusadeiras",
    "Serras",
    "Lixadeiras",
    "Plainas",
  ],
  "ferramentas-manuais": [
    "Martelos",
    "Chaves",
    "Alicates",
    "Limas",
    "Esquadros",
  ],
  "equipamentos-seguranca": [
    "EPIs",
    "Extintores",
    "Sinalizações",
    "Primeiros Socorros",
  ],
  "materiais-eletricos": ["Fios", "Disjuntores", "Tomadas", "Interruptores"],
  hidraulica: ["Canos", "Conexões", "Registros", "Válvulas"],
  "parafusos-fixadores": ["Parafusos", "Buchas", "Arruelas", "Pregos"],
  "tintas-vernizes": ["Tintas", "Pincéis", "Rolos", "Vernizes"],
  "equipamentos-industriais": [
    "Compressores",
    "Geradores",
    "Máquinas de Bancada",
  ],
};

export default function ProductFilters({
  categories,
  onFilterChange,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    subcategory: "",
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCategoryDropdown(false);
      setShowSubcategoryDropdown(false);
    };

    if (showCategoryDropdown || showSubcategoryDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showCategoryDropdown, showSubcategoryDropdown]);

  // Get subcategories for selected category
  const availableSubcategories = filters.category
    ? subcategoriesByCategory[filters.category] || []
    : [];

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };

    // Reset subcategory if category changes
    if (
      newFilters.category !== undefined &&
      newFilters.category !== filters.category
    ) {
      updatedFilters.subcategory = "";
    }

    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = { category: "", subcategory: "" };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  // Check if filters are active
  const hasActiveFilters = filters.category || filters.subcategory;

  return (
    <div className="mb-8">
      {/* Filters Panel */}
      <div className="bg-card border border-border rounded-lg shadow-lg p-6">
        {/* Filter Icon and Label - Top Left */}
        <div className="flex items-center gap-2 text-destructive font-medium mb-4">
          <FilterIcon className="h-4 w-4" />
          <span>Filtros</span>
        </div>

        {/* Filter Controls - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Category Filter */}
          <div className="space-y-2">
            <label
              htmlFor="category-filter"
              className="text-sm font-medium text-muted-foreground"
            >
              Categoria
            </label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
                className="w-full justify-between bg-background hover:bg-muted border-muted-foreground/20 shadow-sm"
              >
                {filters.category
                  ? categories.find((c) => c.id === filters.category)?.name ||
                    "Todas as Categorias"
                  : "Todas as Categorias"}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              {showCategoryDropdown && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) =>
                    e.key === "Escape" && setShowCategoryDropdown(false)
                  }
                >
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          handleFilterChange({ category: category.id });
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left p-2 hover:bg-muted rounded transition-colors"
                      >
                        <div className="font-medium">{category.name}</div>
                        {category.description && (
                          <div className="text-sm text-muted-foreground">
                            {category.description}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="space-y-2">
            <label
              htmlFor="subcategory-filter"
              className="text-sm font-medium text-muted-foreground"
            >
              Subcategoria
            </label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSubcategoryDropdown(!showSubcategoryDropdown);
                }}
                disabled={!filters.category}
                className="w-full justify-between bg-background hover:bg-muted border-muted-foreground/20 shadow-sm disabled:opacity-50"
              >
                {filters.subcategory || "Todas as Subcategorias"}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              {showSubcategoryDropdown && availableSubcategories.length > 0 && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) =>
                    e.key === "Escape" && setShowSubcategoryDropdown(false)
                  }
                >
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {availableSubcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        type="button"
                        onClick={() => {
                          handleFilterChange({ subcategory });
                          setShowSubcategoryDropdown(false);
                        }}
                        className="w-full text-left p-2 hover:bg-muted rounded transition-colors"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-start">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="bg-muted hover:bg-muted/80 border-muted-foreground/20 shadow-sm flex items-center gap-2"
              >
                <XIcon className="h-4 w-4" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Badges */}
        {hasActiveFilters && (
          <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-muted-foreground/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">
                Filtros ativos:
              </span>

              {filters.category && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 shadow-sm"
                >
                  {categories.find((c) => c.id === filters.category)?.name}
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ category: "" })}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {filters.subcategory && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 shadow-sm"
                >
                  {filters.subcategory}
                  <button
                    type="button"
                    onClick={() => handleFilterChange({ subcategory: "" })}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
