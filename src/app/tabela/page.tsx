/**
 * Products Table Page
 * Modern table listing with brand filters and search
 */

import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import MainHeader from "@/components/header/main-header";
import MobileHeader from "@/components/header/mobile-header";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import NavigationMenu from "@/components/mainmenu/navigation-menu";
import { getBrands, getTableProducts } from "./actions";
import TabelaPageContent from "./tabela-page-content";

export const metadata: Metadata = {
  title: "Tabela de Produtos | Loja",
  description:
    "Navegue por nossa completa tabela de produtos com filtros por marca e busca inteligente. Encontre os melhores produtos com preços competitivos.",
};

interface TabelaPageProps {
  searchParams: Promise<{
    search?: string;
    brand?: string;
    page?: string;
  }>;
}

async function TabelaPageData({ searchParams }: TabelaPageProps) {
  const params = await searchParams;
  const searchTerm = params.search || "";
  const brandId = params.brand ? parseInt(params.brand, 10) : undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;

  // Fetch data in parallel
  const [productsResult, brandsResult] = await Promise.all([
    getTableProducts({
      searchTerm,
      brandId,
      page,
      pageSize: 100,
    }),
    getBrands(),
  ]);

  return (
    <TabelaPageContent
      initialProducts={productsResult}
      brands={brandsResult.brands}
      initialSearchTerm={searchTerm}
      initialBrandId={brandId}
    />
  );
}

function TabelaPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Header */}
      <MainHeader />
      <NavigationMenu />

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-lg w-1/3 animate-pulse" />
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          </div>

          {/* Filters skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded-lg animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={`filter-skeleton-item-${idx}-${Math.random()}`}
                  className="h-16 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Table skeleton */}
          <div className="border rounded-lg">
            <div className="p-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Carregando tabela de produtos...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TabelaPage(props: TabelaPageProps) {
  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Header */}
      <MainHeader />
      <NavigationMenu hideOnMobile={true} />

      <Suspense fallback={<TabelaPageLoading />}>
        <TabelaPageData {...props} />
      </Suspense>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  );
}
