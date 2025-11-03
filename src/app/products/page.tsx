/**
 * Products Page - Listagem de Produtos E-commerce
 * Route: /products
 */

/**
 * Products Page - Listagem de Produtos E-commerce
 * Route: /products
 */

import ProductsPageContent from "@/components/products/products-page-content";
import { allProducts, categories } from "@/data/mock-data";

export default function ProductsPage() {
  return <ProductsPageContent products={allProducts} categories={categories} />;
}
