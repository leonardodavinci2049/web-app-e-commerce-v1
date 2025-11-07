/**
 * Products Page - Listagem de Produtos E-commerce
 * Route: /products
 *
 * Server Component that fetches real product data from API
 */

import ProductsPageContent from "@/components/products/products-page-content";
import { categories } from "@/data/mock-data";
import { getProducts } from "./actions";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() ?? "";

  const result = await getProducts({
    pageSize: 48,
    searchTerm: searchTerm || undefined,
  });

  return (
    <ProductsPageContent products={result.products} categories={categories} />
  );
}
