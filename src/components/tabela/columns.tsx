/**
 * Data Table Columns Definition for Products Table
 */

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent font-semibold text-left justify-start gap-1 sm:gap-2"
          >
            Nome do Produto
            <ArrowUpDown className="ml-1 h-3 w-3 hidden sm:inline-flex sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        </div>
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
      const productName = produto?.trim() || "Produto sem nome";
      const productNameWithBreaks = productName.replace(/\//g, "/\u200B");
      const formattedMobileName =
        productNameWithBreaks.length > 40
          ? productNameWithBreaks.replace(/(.{40})/g, "$1\u200B")
          : productNameWithBreaks;

      return (
        <div className="space-y-1 sm:space-y-2 py-1 sm:py-2 min-w-0">
          <div className="font-medium text-foreground leading-tight whitespace-normal break-words text-xs sm:text-base hyphens-auto">
            <span className="sm:hidden block whitespace-normal break-words">
              {formattedMobileName}
            </span>
            <span className="hidden sm:block whitespace-normal break-words">
              {productNameWithBreaks}
            </span>
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
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 hover:bg-transparent font-semibold text-right justify-end gap-1 sm:gap-2"
          >
            Preço
            <ArrowUpDown className="ml-1 h-3 w-3 hidden sm:inline-flex sm:ml-2 sm:h-4 sm:w-4" />
          </Button>
        </div>
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
        <div className="text-right space-y-1 min-w-[72px] sm:min-w-[100px]">
          <div
            className={cn(
              "font-bold text-sm sm:text-lg wrap-break-word",
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
            size="icon"
            className={cn(
              "size-9 sm:size-10 p-0 relative",
              hasStock
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {hasStock && (
              <Plus className="w-2.5 h-2.5 absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-green-500 text-white rounded-full p-0.5" />
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
