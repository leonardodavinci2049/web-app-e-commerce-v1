/**
 * Static filter sidebar layout for the tabela page
 * Displays placeholder UI for upcoming filtering features
 */

"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { type ChangeEvent, type FormEvent, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BrandFilter } from "../filter/brand-filter";
import { useTableSearch } from "../table/table-search-context";

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
  const { inputValue, setInputValue, submitSearch, clearSearch } =
    useTableSearch();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === "") {
        clearSearch();
        return;
      }

      setInputValue(value);
    },
    [clearSearch, setInputValue],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitSearch();
    },
    [submitSearch],
  );

  return (
    <aside className={cn("space-y-6", className)}>
      <Card className="gap-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            Filtros principais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <label className="text-sm font-medium" htmlFor="sidebar-search">
            Pesquisa por nome
          </label>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="sidebar-search"
                type="search"
                placeholder="Digite um termo ou modelo..."
                value={inputValue}
                onChange={handleChange}
                className="pl-10 h-11"
              />
            </div>
            <Button type="submit" className="w-full">
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>
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
