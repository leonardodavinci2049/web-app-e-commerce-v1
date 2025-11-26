/**
 * Static filter sidebar layout for the tabela page
 * Displays placeholder UI for upcoming filtering features
 */

"use client";

import { Search, SlidersHorizontal, Tags } from "lucide-react";

import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

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
import type { BrandFilterItem } from "../../actions";
import { findBrandsForFilter } from "../../actions";
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

      <Card className="gap-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tags className="h-5 w-5 text-muted-foreground" />
            Filtro por marcas
          </CardTitle>
          <CardDescription>
            Selecione uma marca para visualizar os produtos relacionados.
          </CardDescription>
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
