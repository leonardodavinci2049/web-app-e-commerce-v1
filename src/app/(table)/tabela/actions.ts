/**
 * Server Actions for Products Table Page
 * Fetches products and brands data from API
 */

"use server";

import { createLogger } from "@/core/logger";
import { BrandServiceApi } from "@/services/api-main/brand/brand-service-api";
import type { BrandData } from "@/services/api-main/brand/types/brand-types";
import { ProductWebServiceApi } from "@/services/api-main/product/product-service-api";
import type {
  ProductWebFindRequest,
  ProductWebListItem,
} from "@/services/api-main/product/types/product-types";

const logger = createLogger("TabelaActions");

export interface ProductTableFilters {
  searchTerm?: string;
  brandId?: number;
  page?: number;
  pageSize?: number;
  sortColumn?: number;
  sortOrder?: number;
}

export interface ProductTableResult {
  products: ProductWebListItem[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  error?: string;
}

export interface BrandsResult {
  brands: BrandData[];
  error?: string;
}

/**
 * Fetches products for the table with pagination and filters
 */
export async function getTableProducts(
  filters: ProductTableFilters = {},
): Promise<ProductTableResult> {
  try {
    const {
      searchTerm = "",
      brandId = 0,
      page = 0,
      pageSize = 100,
      sortColumn = 1,
      sortOrder = 1,
    } = filters;

    // Build request parameters
    const params: Partial<ProductWebFindRequest> = {
      pe_produto: searchTerm,
      pe_id_marca: brandId,
      pe_qt_registros: pageSize,
      pe_pagina_id: page,
      pe_coluna_id: sortColumn,
      pe_ordem_id: sortOrder,
    };

    /*    logger.info("Buscando produtos para tabela", { params }); */

    // Call the API service
    const response = await ProductWebServiceApi.findProducts(params);

    // Extract products from response
    const products = ProductWebServiceApi.extractProductList(response);

    const result: ProductTableResult = {
      products,
      total: response.quantity || products.length,
      hasMore: products.length === pageSize,
      currentPage: page,
    };

    /*     logger.info("Produtos carregados com sucesso", {
      count: products.length,
      total: result.total,
      hasMore: result.hasMore,
    }); */

    return result;
  } catch (error) {
    logger.error("Erro ao carregar produtos para tabela", error);
    return {
      products: [],
      total: 0,
      hasMore: false,
      currentPage: 0,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Fetches all brands for the filter dropdown
 */
export async function getBrands(): Promise<BrandsResult> {
  try {
    // logger.info("Buscando marcas para filtro");

    // Call the brand service
    const response = await BrandServiceApi.findBrands({
      pe_limit: 200, // Get more brands for the filter
    });

    // Extract brands from response
    const brands = BrandServiceApi.extractBrandList(response);

    // logger.info("Marcas carregadas com sucesso", { count: brands.length });

    return {
      brands: brands.filter(
        (brand) => brand.MARCA && brand.MARCA.trim() !== "",
      ),
    };
  } catch (error) {
    logger.error("Erro ao carregar marcas", error);
    return {
      brands: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Load more products (for pagination)
 */
export async function loadMoreProducts(
  currentFilters: ProductTableFilters,
  nextPage: number,
): Promise<ProductTableResult> {
  return getTableProducts({
    ...currentFilters,
    page: nextPage,
  });
}
