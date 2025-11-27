/**
 * Tabela Page Content Component
 * Client-side component that handles the table state and interactions
 */

"use client";

import { Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import CartSidebarFixo from "@/app/(home)/components/sidebar/cart-sidebar-fixo";
import FilterSidebar from "@/app/(home)/components/sidebar/filter-sidebar";
import {
  columns,
  type ProductTableItem,
  transformProductsForTable,
} from "@/app/(home)/components/tabela/columns";
import { DataTable } from "@/app/(home)/components/tabela/data-table";
import Footer from "@/components/home/footer";
import { Switch } from "@/components/ui/switch";
import type { ProductTableFilters, ProductTableResult } from "../../actions";
import { getTableProducts, loadMoreProducts } from "../../actions";
import { BrandFilter } from "../filter/brand-filter";
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
  const [selectedBrandId, setSelectedBrandId] = useState<number>(0);
  const [hasMore, setHasMore] = useState(initialProducts.hasMore);
  const [totalCount, setTotalCount] = useState(initialProducts.total);
  const [currentPage, setCurrentPage] = useState(initialProducts.currentPage);
  const [loading, setLoading] = useState(false);
  const [showStock, setShowStock] = useState(searchParams.get("stock") === "1");
  const tableRef = useRef<HTMLDivElement>(null);

  const updateURL = useCallback(
    (filters: {
      searchTerm: string;
      brandId?: number;
      stockOnly?: boolean;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      // Ensure catalog search params do not leak into tabela route
      params.delete("search");

      if (filters.searchTerm) {
        params.set("tableSearch", filters.searchTerm);
      } else {
        params.delete("tableSearch");
      }

      if (typeof filters.brandId === "number") {
        if (filters.brandId > 0) {
          params.set("brandId", String(filters.brandId));
        } else {
          params.delete("brandId");
        }
      }

      if (filters.stockOnly) {
        params.set("stock", "1");
      } else {
        params.delete("stock");
      }

      params.delete("page");

      const queryString = params.toString();
      const newURL = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;
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
        updateURL({
          searchTerm: normalizedTerm,
          brandId: selectedBrandId,
          stockOnly: showStock,
        });
        handleFilter({
          searchTerm: normalizedTerm,
          brandId: selectedBrandId,
          stockOnly: showStock,
        });
      });
    },
    [handleFilter, selectedBrandId, setHeaderInputValue, updateURL, showStock],
  );

  const handleBrandFilter = useCallback(
    (brandId: number) => {
      setSelectedBrandId(brandId);

      startTransition(() => {
        updateURL({
          searchTerm: productSearchTerm,
          brandId,
          stockOnly: showStock,
        });
        handleFilter({
          searchTerm: productSearchTerm,
          brandId,
          stockOnly: showStock,
        });
      });
    },
    [handleFilter, productSearchTerm, updateURL, showStock],
  );

  const handleStockFilter = useCallback(
    (checked: boolean) => {
      setShowStock(checked);

      startTransition(() => {
        updateURL({
          searchTerm: productSearchTerm,
          brandId: selectedBrandId,
          stockOnly: checked,
        });
        handleFilter({
          searchTerm: productSearchTerm,
          brandId: selectedBrandId,
          stockOnly: checked,
        });
      });
    },
    [handleFilter, productSearchTerm, selectedBrandId, updateURL],
  );

  const handleMobileBrandFilter = useCallback(
    (brandId: number) => {
      handleBrandFilter(brandId);

      // Scroll suave para a tabela após selecionar o filtro no mobile
      // Pequeno delay para garantir que a UI respondeu ao clique
      setTimeout(() => {
        if (tableRef.current) {
          const yOffset = -100; // Ajuste para compensar header fixo e dar um respiro
          const element = tableRef.current;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    },
    [handleBrandFilter],
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
          brandId: selectedBrandId,
          stockOnly: showStock,
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
    } catch (error) {
      console.error("Erro ao carregar mais produtos:", error);
      toast.error("Erro inesperado ao carregar mais produtos");
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    hasMore,
    currentPage,
    productSearchTerm,
    selectedBrandId,
    showStock,
  ]);

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="lg:grid lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-6">
            <FilterSidebar
              className="hidden lg:block lg:sticky lg:top-28"
              selectedBrandId={selectedBrandId}
              onSelectBrand={handleBrandFilter}
            />

            <main className="space-y-4 sm:space-y-8">
              <div className="bg-card border border-border rounded-lg shadow-sm p-2 sm:p-6">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="flex items-center gap-2 text-3xl font-semibold">
                      <Package className="h-5 w-5 text-primary" />
                      Tabela de Produtos
                    </h1>
                    <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={showStock}
                          onCheckedChange={handleStockFilter}
                        />
                        <span className="font-medium text-foreground">
                          Estoque
                        </span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      {products.length} produtos carregados
                    </div>
                  </div>

                  <div className="lg:hidden space-y-4">
                    <BrandFilter
                      selectedBrandId={selectedBrandId}
                      onSelectBrand={handleMobileBrandFilter}
                    />
                    <div className="flex items-center justify-between px-1">
                      <div className="text-sm text-muted-foreground">
                        {products.length} produtos carregados
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={showStock}
                          onCheckedChange={handleStockFilter}
                        />
                        <span className="text-sm font-medium">Estoque</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] md:items-start">
                    <div className="min-w-0" ref={tableRef}>
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
