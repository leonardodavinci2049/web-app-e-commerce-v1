/**
 * Server Actions for Products Page
 * Fetches real product data from API
 */

"use server";

import { createLogger } from "@/core/logger";
import { adaptProductsFromApi } from "@/lib/adapters/product-adapter";
import { ProductWebServiceApi } from "@/services/api-main/product/product-service-api";
import type {
  ProductSearchFilters,
  ProductSearchResult,
} from "@/types/products";

const logger = createLogger("ProductsActions");

/**
 * Fetches products from the API with optional filters
 * Server Action for products page
 */
export async function getProducts(
  filters?: ProductSearchFilters,
): Promise<ProductSearchResult> {
  try {
    // Build request parameters from filters
    const params = {
      pe_id_taxonomy: filters?.taxonomyId,
      pe_slug_taxonomy: filters?.taxonomySlug,
      pe_id_produto: filters?.productId,
      pe_produto: filters?.searchTerm,
      pe_id_marca: filters?.brandId,
      pe_flag_estoque: filters?.inStockOnly ? 1 : 0,
      pe_qt_registros: filters?.pageSize || 20,
      pe_pagina_id: filters?.page || 0,
      pe_coluna_id: filters?.sortColumn || 1,
      pe_ordem_id: filters?.sortOrder || 1,
    };

    // Call the API service
    const response = await ProductWebServiceApi.findProducts(params);

    // Extract products from response
    const productList = ProductWebServiceApi.extractProductList(response);

    // Adapt API data to UI format
    const adaptedProducts = adaptProductsFromApi(productList);

    // Calculate pagination metadata
    const pageSize = params.pe_qt_registros || 20;
    const currentPage = params.pe_pagina_id || 0;
    const totalCount = response.quantity || 0;
    const hasMore = adaptedProducts.length >= pageSize;

    return {
      products: adaptedProducts,
      totalCount,
      currentPage,
      pageSize,
      hasMore,
    };
  } catch (error) {
    logger.error("Error fetching products", error);

    // Return empty result on error instead of throwing
    // This allows the page to render with empty state
    return {
      products: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,
      hasMore: false,
    };
  }
}

/**
 * Fetches products with specific taxonomy filter
 * Useful for category pages
 */
export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 20,
): Promise<ProductSearchResult> {
  return getProducts({
    taxonomySlug: categorySlug,
    page,
    pageSize,
  });
}

/**
 * Fetches products with search term
 * Useful for search functionality
 */
export async function searchProducts(
  searchTerm: string,
  page = 1,
  pageSize = 20,
): Promise<ProductSearchResult> {
  return getProducts({
    searchTerm,
    page,
    pageSize,
  });
}

/**
 * Fetches products in stock only
 * Useful for showing available products
 */
export async function getAvailableProducts(
  page = 1,
  pageSize = 20,
): Promise<ProductSearchResult> {
  return getProducts({
    inStockOnly: true,
    page,
    pageSize,
  });
}
