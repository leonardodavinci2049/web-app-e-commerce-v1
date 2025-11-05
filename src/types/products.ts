/**
 * Types for Products Page
 * Maps API response to UI Product interface
 */

import type { ProductWebListItem } from "@/services/api-main/product/types/product-types";
import type { Product } from "./home";

/**
 * Extended Product interface with additional fields from API
 */
export interface ProductWithMetadata extends Product {
  sku?: number;
  stock?: number;
  warranty?: number;
  isImported?: boolean;
  isPromotion?: boolean;
  isLaunch?: boolean;
  createdAt?: string;
}

/**
 * Filters for product search
 */
export interface ProductSearchFilters {
  taxonomyId?: number;
  taxonomySlug?: string;
  productId?: number;
  searchTerm?: string;
  brandId?: number;
  inStockOnly?: boolean;
  page?: number;
  pageSize?: number;
  sortColumn?: number;
  sortOrder?: number;
}

/**
 * Result of product search with pagination
 */
export interface ProductSearchResult {
  products: ProductWithMetadata[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Adapter function type to transform API data to UI data
 */
export type ProductAdapter = (
  apiProduct: ProductWebListItem,
) => ProductWithMetadata;

/**
 * Price configuration for different customer segments
 */
export interface PriceConfig {
  type: "wholesale" | "corporate" | "retail" | "gold" | "silver" | "bronze";
  showOriginal?: boolean;
}
