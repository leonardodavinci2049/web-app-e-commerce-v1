/**
 * Server Actions for Product Detail Page
 * Fetches real product data from API by ID or slug
 */

"use server";

import { createLogger } from "@/core/logger";
import { adaptProductDetailFromApi } from "@/lib/adapters/product-detail-adapter";
import { ProductWebServiceApi } from "@/services/api-main/product/product-service-api";
import type { ProductWithMetadata } from "@/types/products";

const logger = createLogger("ProductDetailActions");

/**
 * Result type for product detail fetch
 */
export interface ProductDetailResult {
  product: ProductWithMetadata | null;
  error?: string;
}

/**
 * Fetches a single product by ID and slug
 * Server Action for product detail page
 *
 * @param productId - ID of the product
 * @param productSlug - Slug of the product
 * @returns Product detail or null if not found
 */
export async function getProductDetail(
  productId: string,
  productSlug: string,
): Promise<ProductDetailResult> {
  try {
    // Convert string ID to number
    const numericId = Number.parseInt(productId, 10);

    if (Number.isNaN(numericId)) {
      logger.warn(`Invalid product ID: ${productId}`);
      return {
        product: null,
        error: "ID do produto inválido",
      };
    }

    // Call the API service
    const response = await ProductWebServiceApi.findProductById({
      pe_id_produto: numericId,
      pe_slug_produto: productSlug,
    });

    // Check if response is valid
    if (!ProductWebServiceApi.isValidProductDetail(response)) {
      logger.warn(`Product not found: ID=${productId}, slug=${productSlug}`);
      return {
        product: null,
        error: "Produto não encontrado",
      };
    }

    // Extract product from response
    const productDetail = ProductWebServiceApi.extractProduct(response);

    if (!productDetail) {
      return {
        product: null,
        error: "Produto não encontrado",
      };
    }

    // Adapt API data to UI format
    const adaptedProduct = adaptProductDetailFromApi(productDetail);

    return {
      product: adaptedProduct,
    };
  } catch (error) {
    logger.error("Error fetching product detail", error);

    // Return null product with error message
    return {
      product: null,
      error: "Erro ao carregar produto",
    };
  }
}
