/**
 * Product Detail Data Adapter
 * Transforms API ProductWebDetail to UI Product interface
 */

import type { ProductWebDetail } from "@/services/api-main/product/types/product-types";
import type { ProductWithMetadata } from "@/types/products";

/**
 * Generates a URL-friendly slug from product name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Formats price string to number with 2 decimal places
 */
function formatPrice(priceString: string): number {
  const price = Number.parseFloat(priceString);
  return Number.isNaN(price) ? 0 : Number(price.toFixed(2));
}

/**
 * Calculates discount percentage between original and current price
 */
function calculateDiscount(original: number, current: number): number {
  if (original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Determines the fallback image path
 */
function getImagePath(pathImagem: string | null): string {
  if (!pathImagem || pathImagem.trim() === "") {
    return "/images/product/no-image.jpeg";
  }
  return pathImagem;
}

/**
 * Determines category name from TIPO field
 */
function getCategoryName(tipo: string | null): string {
  return tipo || "Sem Categoria";
}

/**
 * Determines badge based on product flags
 */
function getBadge(
  isPromotion: number,
  isDestaque: number,
  isImported: number,
): string | undefined {
  if (isPromotion === 1) return "Promoção";
  if (isDestaque === 1) return "Destaque";
  if (isImported === 1) return "Importado";
  return undefined;
}

/**
 * Adapts ProductWebDetail from API to ProductWithMetadata for UI
 * Uses VL_VAREJO as primary price and VL_CORPORATIVO as original price for discount calculation
 */
export function adaptProductDetailFromApi(
  apiProduct: ProductWebDetail,
): ProductWithMetadata {
  const retailPrice = formatPrice(apiProduct.VL_VAREJO);
  const corporatePrice = formatPrice(apiProduct.VL_CORPORATIVO);

  // Use corporate price as original if it's higher than retail (indicates discount)
  const hasDiscount = corporatePrice > retailPrice;
  const originalPrice = hasDiscount ? corporatePrice : undefined;
  const discount = hasDiscount
    ? calculateDiscount(corporatePrice, retailPrice)
    : undefined;

  const slug = apiProduct.SLUG || generateSlug(apiProduct.PRODUTO);

  return {
    id: apiProduct.ID_PRODUTO.toString(),
    sku: apiProduct.SKU,
    name: apiProduct.PRODUTO,
    price: retailPrice,
    originalPrice,
    discount,
    image: getImagePath(apiProduct.PATH_IMAGEM),
    category: getCategoryName(apiProduct.TIPO),
    brand: apiProduct.MARCA || undefined,
    badge: getBadge(
      apiProduct.PROMOCAO,
      apiProduct.DESTAQUE,
      apiProduct.IMPORTADO,
    ),
    slug,
    stock: apiProduct.ESTOQUE_LOJA,
    warranty: apiProduct.TEMPODEGARANTIA_DIA,
    isImported: apiProduct.IMPORTADO === 1,
    isPromotion: apiProduct.PROMOCAO === 1,
    isNew: apiProduct.DESTAQUE === 1,
    inStock: apiProduct.ESTOQUE_LOJA > 0,
    description: apiProduct.DESCRICAO_VENDA || undefined,
    rating: undefined, // Não disponível na API
    reviewCount: undefined, // Não disponível na API
  };
}
