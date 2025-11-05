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
 * Formats price value to number with 2 decimal places
 */
function formatPrice(priceInput: string | number | null | undefined): number {
  if (priceInput === null || priceInput === undefined) {
    return 0;
  }

  const rawValue =
    typeof priceInput === "number" ? priceInput : Number(priceInput);
  if (Number.isNaN(rawValue)) {
    return 0;
  }

  return Number(rawValue.toFixed(2));
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
  isPromotion: number | null | undefined,
  isDestaque: number | null | undefined,
  isImported: number | null | undefined,
): string | undefined {
  if ((isPromotion ?? 0) === 1) return "Promoção";
  if ((isDestaque ?? 0) === 1) return "Destaque";
  if ((isImported ?? 0) === 1) return "Importado";
  return undefined;
}

/**
 * Adapts ProductWebDetail from API to ProductWithMetadata for UI
 * Uses VL_VAREJO as primary price and VL_CORPORATIVO as original price for discount calculation
 */
export function adaptProductDetailFromApi(
  apiProduct: ProductWebDetail,
): ProductWithMetadata {
  const productName = apiProduct.PRODUTO || "Produto sem nome";
  const retailPrice = formatPrice(apiProduct.VL_VAREJO);
  const corporatePrice = formatPrice(apiProduct.VL_CORPORATIVO);

  // Use corporate price as original if it's higher than retail (indicates discount)
  const hasDiscount = corporatePrice > retailPrice;
  const originalPrice = hasDiscount ? corporatePrice : undefined;
  const discount = hasDiscount
    ? calculateDiscount(corporatePrice, retailPrice)
    : undefined;

  const slugCandidate = apiProduct.SLUG?.trim();
  const slug =
    slugCandidate && slugCandidate.length > 0
      ? slugCandidate
      : generateSlug(productName);

  const resolvedSku =
    typeof apiProduct.SKU === "number" && !Number.isNaN(apiProduct.SKU)
      ? apiProduct.SKU
      : apiProduct.ID_PRODUTO;
  const stock = apiProduct.ESTOQUE_LOJA ?? 0;
  const warranty = apiProduct.TEMPODEGARANTIA_DIA ?? 0;
  const isImported = (apiProduct.IMPORTADO ?? 0) === 1;
  const isPromotion = (apiProduct.PROMOCAO ?? 0) === 1;
  const isHighlight = (apiProduct.DESTAQUE ?? 0) === 1;

  return {
    id: apiProduct.ID_PRODUTO.toString(),
    sku: resolvedSku,
    name: productName,
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
    stock,
    warranty,
    isImported,
    isPromotion,
    isNew: isHighlight,
    inStock: stock > 0,
    description:
      apiProduct.DESCRICAO_VENDA || apiProduct.DESCRICAO_TAB || undefined,
    rating: undefined, // Não disponível na API
    reviewCount: undefined, // Não disponível na API
  };
}
