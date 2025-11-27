/**
 * Products Table Page
 * Modern table listing with search interface
 */

import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import { getTableProducts } from "./actions";
import TabelaPageContent from "./components/table/tabela-page-content";

export const metadata: Metadata = {
  title: "Caixa Fechada | Peças para Celulares em Ribeirão Preto – Atacado e Varejo",
  description: "A Caixa Fechada é a maior distribuidora de peças para celulares em Ribeirão Preto. Vendas no atacado e varejo com variedade, qualidade e entrega rápida",
};

interface TabelaPageProps {
  searchParams: Promise<{
    tableSearch?: string;
    brandId?: string;
    stock?: string;
    page?: string;
  }>;
}

async function TabelaPageData({ searchParams }: TabelaPageProps) {
  const params = await searchParams;
  const searchTerm = params.tableSearch || "";
  const page = params.page ? parseInt(params.page, 10) : 0;

  const brandId = params.brandId ? parseInt(params.brandId, 10) : 0;
  const stockOnly = params.stock === "1";

  const productsResult = await getTableProducts({
    searchTerm,
    brandId,
    stockOnly,
    page,
    pageSize: 100,
  });

  return (
    <TabelaPageContent
      initialProducts={productsResult}
      initialSearchTerm={searchTerm}
    />
  );
}

function TabelaPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded-lg w-1/3 animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
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
  );
}

export default function TabelaPage(props: TabelaPageProps) {
  return (
    <>
      <Suspense fallback={<TabelaPageLoading />}>
        <TabelaPageData {...props} />
      </Suspense>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  );
}
