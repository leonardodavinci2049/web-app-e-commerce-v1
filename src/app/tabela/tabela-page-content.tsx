/**
 * Tabela Page Content Component
 * Client-side component that handles the table state and interactions
 */

"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Package, Search, ShoppingBag } from "lucide-react";
import { DataTable } from "@/components/tabela/data-table";
import {
  columns,
  transformProductsForTable,
  type ProductTableItem,
} from "@/components/tabela/columns";
import BrandFilter from "@/components/tabela/brand-filter";
import MainHeader from "@/components/home/main-header";
import NavigationMenu from "@/components/home/navigation-menu";
import Footer from "@/components/home/footer";
import type { ProductTableResult, ProductTableFilters } from "./actions";
import { getTableProducts, loadMoreProducts } from "./actions";
import type { BrandData } from "@/services/api-main/brand/types/brand-types";

interface TabelaPageContentProps {
  initialProducts: ProductTableResult;
  brands: BrandData[];
  initialSearchTerm: string;
  initialBrandId?: number;
}

export default function TabelaPageContent({
  initialProducts,
  brands,
  initialSearchTerm,
  initialBrandId,
}: TabelaPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State management
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(
    initialBrandId,
  );
  const [products, setProducts] = useState<ProductTableItem[]>(
    transformProductsForTable(initialProducts.products),
  );
  const [hasMore, setHasMore] = useState(initialProducts.hasMore);
  const [totalCount, setTotalCount] = useState(initialProducts.total);
  const [currentPage, setCurrentPage] = useState(initialProducts.currentPage);
  const [loading, setLoading] = useState(false);

  // Update URL parameters without causing a page reload
  const updateURL = useCallback(
    (filters: { searchTerm: string; brandId?: number }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.searchTerm) {
        params.set("search", filters.searchTerm);
      } else {
        params.delete("search");
      }

      if (filters.brandId) {
        params.set("brand", filters.brandId.toString());
      } else {
        params.delete("brand");
      }

      params.delete("page"); // Reset page when filters change

      const newURL = `${window.location.pathname}?${params.toString()}`;
      router.replace(newURL, { scroll: false });
    },
    [router, searchParams],
  );

  // Filter products
  const handleFilter = useCallback(async (newFilters: ProductTableFilters) => {
    setLoading(true);

    try {
      const result = await getTableProducts({
        ...newFilters,
        page: 1, // Reset to first page when filtering
        pageSize: 100,
      });

      if (result.error) {
        toast.error("Erro ao filtrar produtos", {
          description: result.error,
        });
        return;
      }

      setProducts(transformProductsForTable(result.products));
      setHasMore(result.hasMore);
      setTotalCount(result.total);
      setCurrentPage(1);

      // Show success message if filters are applied
      if (newFilters.searchTerm || newFilters.brandId) {
        toast.success("Filtros aplicados com sucesso", {
          description: `${result.products.length} produtos encontrados`,
        });
      }
    } catch (error) {
      console.error("Erro ao filtrar produtos:", error);
      toast.error("Erro inesperado ao filtrar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search term change
  const handleSearchChange = useCallback(
    (newSearchTerm: string) => {
      setSearchTerm(newSearchTerm);

      // Debounce the search
      const timeoutId = setTimeout(() => {
        startTransition(() => {
          updateURL({ searchTerm: newSearchTerm, brandId: selectedBrandId });
          handleFilter({ searchTerm: newSearchTerm, brandId: selectedBrandId });
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [selectedBrandId, handleFilter, updateURL],
  );

  // Handle brand selection
  const handleBrandSelect = useCallback(
    (brandId: number | undefined) => {
      setSelectedBrandId(brandId);

      startTransition(() => {
        updateURL({ searchTerm, brandId });
        handleFilter({ searchTerm, brandId });
      });
    },
    [searchTerm, handleFilter, updateURL],
  );

  // Load more products
  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreProducts(
        {
          searchTerm,
          brandId: selectedBrandId,
        },
        nextPage,
      );

      if (result.error) {
        toast.error("Erro ao carregar mais produtos", {
          description: result.error,
        });
        return;
      }

      // Append new products to existing ones
      const newProducts = transformProductsForTable(result.products);
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);

      toast.success(`${result.products.length} produtos adicionados`);
    } catch (error) {
      console.error("Erro ao carregar mais produtos:", error);
      toast.error("Erro inesperado ao carregar mais produtos");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage, searchTerm, selectedBrandId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainHeader />
      <NavigationMenu />

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Tabela de Produtos
              </h1>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-3 sm:p-6">
          <BrandFilter
            brands={brands}
            selectedBrandId={selectedBrandId}
            onBrandSelect={handleBrandSelect}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-3 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Lista de Produtos</h2>
              <div className="text-sm text-muted-foreground">
                {products.length} produtos carregados
              </div>
            </div>

            <DataTable
              columns={columns}
              data={products}
              loading={loading || isPending}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              totalCount={totalCount}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
