/**
 * Tabela Page Content Component
 * Client-side component that handles the table state and interactions
 */

"use client";

import { Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import CartSidebarFixo from "@/app/(table)/tabela/components/sidebar/cart-sidebar-fixo";
import FilterSidebar from "@/app/(table)/tabela/components/sidebar/filter-sidebar";
import {
  columns,
  type ProductTableItem,
  transformProductsForTable,
} from "@/app/(table)/tabela/components/tabela/columns";
import { DataTable } from "@/app/(table)/tabela/components/tabela/data-table";
import Footer from "@/components/home/footer";
import type { ProductTableFilters, ProductTableResult } from "../../actions";
import { getTableProducts, loadMoreProducts } from "../../actions";
import { useTableSearch } from "./table-search-context";

interface TabelaPageContentProps {
  initialProducts: ProductTableResult;
  initialSearchTerm: string;
}

export default function TabelaPageContent({
  initialProducts,
  initialSearchTerm,
}: TabelaPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { setInputValue: setHeaderInputValue, registerSearchHandler } =
    useTableSearch();

  const [productSearchTerm, setProductSearchTerm] = useState(initialSearchTerm);
  const [products, setProducts] = useState<ProductTableItem[]>(
    transformProductsForTable(initialProducts.products),
  );
  const [hasMore, setHasMore] = useState(initialProducts.hasMore);
  const [totalCount, setTotalCount] = useState(initialProducts.total);
  const [currentPage, setCurrentPage] = useState(initialProducts.currentPage);
  const [loading, setLoading] = useState(false);

  const updateURL = useCallback(
    (filters: { searchTerm: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.searchTerm) {
        params.set("search", filters.searchTerm);
      } else {
        params.delete("search");
      }

      params.delete("page");

      const newURL = `${window.location.pathname}?${params.toString()}`;
      router.replace(newURL, { scroll: false });
    },
    [router, searchParams],
  );

  const handleFilter = useCallback(async (newFilters: ProductTableFilters) => {
    setLoading(true);

    try {
      const result = await getTableProducts({
        ...newFilters,
        page: 0,
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
      setCurrentPage(0);

      if (newFilters.searchTerm) {
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

  const applySearch = useCallback(
    (rawTerm: string) => {
      const normalizedTerm = rawTerm.trim();
      setHeaderInputValue(normalizedTerm);
      setProductSearchTerm(normalizedTerm);

      startTransition(() => {
        updateURL({ searchTerm: normalizedTerm });
        handleFilter({ searchTerm: normalizedTerm });
      });
    },
    [handleFilter, setHeaderInputValue, updateURL],
  );

  useEffect(() => {
    setProductSearchTerm(initialSearchTerm);
    setHeaderInputValue(initialSearchTerm);
  }, [initialSearchTerm, setHeaderInputValue]);

  useEffect(() => {
    const unregister = registerSearchHandler(applySearch);
    return unregister;
  }, [registerSearchHandler, applySearch]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreProducts(
        {
          searchTerm: productSearchTerm,
        },
        nextPage,
      );

      if (result.error) {
        toast.error("Erro ao carregar mais produtos", {
          description: result.error,
        });
        return;
      }

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
  }, [loading, hasMore, currentPage, productSearchTerm]);

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="lg:grid lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-6">
            <FilterSidebar className="hidden lg:block lg:sticky lg:top-28" />

            <main className="space-y-4 sm:space-y-8">
              <div className="bg-card border border-border rounded-lg shadow-sm p-2 sm:p-6">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="flex items-center gap-2 text-3xl font-semibold">
                      <Package className="h-5 w-5 text-primary" />
                      Tabela de Produtos
                    </h1>
                    <div className="text-sm text-muted-foreground">
                      {products.length} produtos carregados
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] md:items-start">
                    <div className="min-w-0">
                      <DataTable
                        columns={columns}
                        data={products}
                        loading={loading || isPending}
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                        totalCount={totalCount}
                      />
                    </div>

                    <CartSidebarFixo className="hidden md:block md:sticky md:top-6 md:max-w-xs md:w-full" />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
