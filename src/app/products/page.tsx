/**
 * Products Page - Listagem de Produtos E-commerce
 * Route: /products
 *
 * Server Component that fetches real product data from API
 */

import ProductsPageContent from "@/components/products/products-page-content";
import { categories } from "@/data/mock-data";
import { getProducts } from "./actions";

export default async function ProductsPage() {
  // Fetch real products from API
  const result = await getProducts({
    pageSize: 48, // Load more products initially
  });

  return (
    <ProductsPageContent products={result.products} categories={categories} />
  );
}
