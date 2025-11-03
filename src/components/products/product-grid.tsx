/**
 * ProductGrid Component
 * Responsive grid with infinite scroll functionality
 */

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/home/product-card";
import LoadMoreButton from "@/components/products/load-more-button";
import type { FilterState } from "@/components/products/product-filters";
import type { Product } from "@/types/home";

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
}

const PRODUCTS_PER_PAGE = 12;

export default function ProductGrid({ products, filters }: ProductGridProps) {
  const [loadedCount, setLoadedCount] = useState(PRODUCTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Helper function to normalize category names for comparison
  const normalizeCategory = useCallback((category: string) => {
    return category
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9]/g, "");
  }, []);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filters.category) {
        const productCategory = normalizeCategory(product.category);
        const filterCategory = normalizeCategory(
          filters.category.replace("-", " "),
        );

        if (!productCategory.includes(filterCategory)) {
          return false;
        }
      }

      // Subcategory filter (if implemented in product data)
      if (filters.subcategory && product.subcategory) {
        const productSubcategory = normalizeCategory(product.subcategory);
        const filterSubcategory = normalizeCategory(filters.subcategory);

        if (!productSubcategory.includes(filterSubcategory)) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters, normalizeCategory]);

  // Get products to display (with load more functionality)
  const displayedProducts = filteredProducts.slice(0, loadedCount);
  const hasMoreProducts = loadedCount < filteredProducts.length;

  // Handle load more
  const handleLoadMore = () => {
    setLoading(true);

    // Simulate loading time
    setTimeout(() => {
      setLoadedCount((prev) =>
        Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length),
      );
      setLoading(false);
    }, 500);
  };

  // Reset loaded count when filters change
  useEffect(() => {
    setLoadedCount(PRODUCTS_PER_PAGE);
  }, []);

  // Show "no products found" message
  if (filteredProducts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-md p-16">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros para ver mais produtos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Products Counter */}
      <div className="mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
        <p className="text-muted-foreground font-medium">
          Mostrando {displayedProducts.length} de {filteredProducts.length}{" "}
          produtos
          {(filters.category || filters.subcategory) && " filtrados"}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      <LoadMoreButton
        onClick={handleLoadMore}
        loading={loading}
        hasMore={hasMoreProducts}
        loadedCount={displayedProducts.length}
        totalCount={filteredProducts.length}
      />
    </div>
  );
}
