/**
 * ProductsPageContent Component
 * Main content for products page with state management
 */

"use client";

import { useState } from "react";
import Footer from "@/components/home/footer";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import ProductFilters, {
  type FilterState,
} from "@/components/products/product-filters";
import ProductGrid from "@/components/products/product-grid";
import type { Category, Product } from "@/types/home";

interface ProductsPageContentProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsPageContent({
  products,
  categories,
}: ProductsPageContentProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    subcategory: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 bg-card border border-border rounded-lg shadow-sm p-3">
          <div className="text-sm text-muted-foreground">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Produtos</span>
          </div>
        </nav>

        {/* Page Title */}
        {/*   <div className="text-center mb-8 bg-card border border-border rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nossos Produtos
          </h1>
          <p className="text-muted-foreground">
            Encontramos {products.length} produtos
          </p>
        </div>
 */}
        {/* Filters - Horizontal bar */}
       {/* <ProductFilters categories={categories} onFilterChange={setFilters} /> */}

        {/* Products Grid with Infinite Scroll */}
        <ProductGrid products={products} filters={filters} />
      </main>

      {/* Reutilizar Footer da homepage */}
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
