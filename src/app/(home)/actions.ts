/**
 * Server Actions for Products Table Page
 * Fetches products and brands data from API
 */

"use server";

import { createLogger } from "@/core/logger";
import { BrandServiceApi } from "@/services/api-main/brand/brand-service-api";
import type {
  BrandData,
  FindBrandRequest,
} from "@/services/api-main/brand/types/brand-types";
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

export interface BrandFilterItem {
  id: number;
  name: string;
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

export async function findBrandsForFilter(
  params: Partial<FindBrandRequest> = {},
): Promise<BrandFilterItem[]> {
  try {
    const response = await BrandServiceApi.findBrands(params);

    if (!BrandServiceApi.isValidBrandResponse(response)) {
      return [
        {
          id: 0,
          name: "TODAS",
        },
      ];
    }

    const brands = BrandServiceApi.extractBrandList(response).filter(
      (brand: BrandData) => Boolean(brand.MARCA),
    );

    const mapped = brands.map((brand) => ({
      id: brand.ID_MARCA,
      name: brand.MARCA?.toUpperCase() ?? "",
    }));

    return [
      {
        id: 0,
        name: "TODAS",
      },
      ...mapped,
    ];
  } catch (error) {
    logger.error("Erro ao carregar marcas para filtro", error);

    return [
      {
        id: 0,
        name: "TODAS",
      },
    ];
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
