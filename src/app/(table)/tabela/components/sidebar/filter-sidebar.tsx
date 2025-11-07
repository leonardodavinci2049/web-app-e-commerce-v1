/**
 * Static filter sidebar layout for the tabela page
 * Displays placeholder UI for upcoming filtering features
 */

import { Search, SlidersHorizontal, Tags } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  className?: string;
}

const BRAND_PRESETS: Array<{
  name: string;
  className: string;
  textClassName?: string;
}> = [
  {
    name: "Samsung",
    className: "bg-[#1428a0]",
    textClassName: "text-white",
  },
  {
    name: "Motorola",
    className: "bg-[#43b02a]",
    textClassName: "text-white",
  },
  {
    name: "Apple",
    className: "bg-[#1e1e1e]",
    textClassName: "text-white",
  },
  {
    name: "Xiaomi",
    className: "bg-[#ff6900]",
    textClassName: "text-white",
  },
  {
    name: "Realme",
    className: "bg-[#ffd500]",
    textClassName: "text-slate-900",
  },
  {
    name: "Asus",
    className: "bg-[#0b64c0]",
    textClassName: "text-white",
  },
  {
    name: "Infinit",
    className: "bg-[#6c1d8d]",
    textClassName: "text-white",
  },
  {
    name: "Pouco",
    className: "bg-[#f6c000]",
    textClassName: "text-slate-900",
  },
  {
    name: "LG",
    className: "bg-[#a50034]",
    textClassName: "text-white",
  },
  {
    name: "Outros",
    className: "bg-[#4e5d78]",
    textClassName: "text-white",
  },
];

export default function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      <Card className="gap-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            Filtros principais
          </CardTitle>
          <CardDescription>
            Utilize os filtros para refinar a visualização da tabela.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <label className="text-sm font-medium" htmlFor="sidebar-search">
            Pesquisa por nome
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="sidebar-search"
              type="search"
              placeholder="Digite o modelo..."
              className="pl-10 h-11"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Função de busca avançada disponível em breve.
          </p>
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
          {BRAND_PRESETS.map((brand) => (
            <div
              key={brand.name}
              className={cn(
                "rounded-xl border border-white/20 p-3 text-center text-sm font-semibold shadow-sm transition-transform",
                "hover:-translate-y-0.5 hover:shadow-md",
                brand.className,
                brand.textClassName ?? "text-white",
              )}
            >
              {brand.name}
            </div>
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
