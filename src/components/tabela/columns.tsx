/**
 * Data Table Columns Definition for Products Table
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProductWebListItem } from "@/services/api-main/product/types/product-types";

// Define the product type for the table
export type ProductTableItem = ProductWebListItem & {
  displayPrice: string;
  isPromotional: boolean;
  hasStock: boolean;
};

export const columns: ColumnDef<ProductTableItem>[] = [
  {
    accessorKey: "PRODUTO",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent font-semibold text-left justify-start"
        >
          Nome do Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const produto = row.getValue("PRODUTO") as string;
      const marca = row.original.MARCA;
      const modelo = row.original.MODELO;
      const ref = row.original.REF;
      const isNew = row.original.LANCAMENTO === 1;
      const isPromotional = row.original.PROMOCAO === 1;
      const isImported = row.original.IMPORTADO === 1;

      return (
        <div className="space-y-1 sm:space-y-2 py-1 sm:py-2 max-w-[160px] sm:max-w-none">
          <div className="font-medium text-foreground leading-tight break-words text-xs sm:text-base hyphens-auto">
            {produto || "Produto sem nome"}
          </div>

          {/* Product metadata - Hide some on mobile */}
          <div className="flex flex-wrap gap-0.5 sm:gap-1 text-xs text-muted-foreground">
            {marca && (
              <span className="bg-muted px-1 sm:px-2 py-0.5 rounded text-xs">
                {marca}
              </span>
            )}
            {modelo && (
              <span className="bg-muted px-1 sm:px-2 py-0.5 rounded text-xs hidden sm:inline">
                Modelo: {modelo}
              </span>
            )}
            {ref && (
              <span className="bg-muted px-1 sm:px-2 py-0.5 rounded text-xs hidden sm:inline">
                Ref: {ref}
              </span>
            )}
          </div>

          {/* Product badges - Smaller on mobile */}
          <div className="flex flex-wrap gap-0.5 sm:gap-1">
            {isNew && (
              <Badge
                variant="default"
                className="text-xs bg-green-100 text-green-800 hover:bg-green-200 px-1 py-0 sm:px-2"
              >
                {isPromotional || isImported ? "Novo" : "Lançamento"}
              </Badge>
            )}
            {isPromotional && (
              <Badge
                variant="destructive"
                className="text-xs px-1 py-0 sm:px-2"
              >
                Promoção
              </Badge>
            )}
            {isImported && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-800 px-1 py-0 sm:px-2 hidden sm:inline-flex"
              >
                Importado
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "displayPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent font-semibold text-right justify-end w-full"
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vlAtacado = row.original.VL_ATACADO;
      const isPromotional = row.original.PROMOCAO === 1;

      // Convert string price to number for display
      const precoAtacado = parseFloat(vlAtacado || "0");

      const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price);
      };

      return (
        <div className="text-right space-y-1 min-w-[80px] sm:min-w-[100px]">
          <div
            className={cn(
              "font-bold text-sm sm:text-lg break-words",
              isPromotional ? "text-red-600" : "text-foreground",
            )}
          >
            {precoAtacado > 0 ? (
              formatPrice(precoAtacado)
            ) : (
              <span className="text-muted-foreground text-xs sm:text-sm">
                Consultar preço
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Ação",
    cell: ({ row }) => {
      const hasStock = row.original.ESTOQUE_LOJA > 0;
      const produto = row.original.PRODUTO;

      const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        console.log("Adicionar ao carrinho:", produto);
        // You can add toast notification here
      };

      return (
        <div className="text-center">
          <Button
            onClick={handleAddToCart}
            disabled={!hasStock}
            size="sm"
            className={cn(
              "w-10 h-10 p-0 relative",
              hasStock
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {hasStock && (
              <Plus className="w-3 h-3 absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5" />
            )}
          </Button>
        </div>
      );
    },
  },
];

/**
 * Helper function to transform API products to table format
 */
export function transformProductsForTable(
  products: ProductWebListItem[],
): ProductTableItem[] {
  return products.map((product) => {
    const vlAtacado = parseFloat(product.VL_ATACADO || "0");

    return {
      ...product,
      displayPrice: vlAtacado.toString(),
      isPromotional: product.PROMOCAO === 1,
      hasStock: product.ESTOQUE_LOJA > 0,
    };
  });
}
