import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/app/products/actions";
import Footer from "@/components/home/footer";
import MainHeader from "@/components/home/main-header";
import { BreadcrumbNav } from "@/components/product/breadcrumb-nav";
import { ProductActions } from "@/components/product/product-actions";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { envs } from "@/core/config/envs";
import { getProductDetail } from "./actions";
import {
  extractProductIdFromSlug,
  extractProductSlugFromArray,
} from "./helpers";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Product Details Page
 * Dynamic page that displays detailed information about a product
 * URL format: /product/[category]/[product-id]/[product-name-slug]
 *
 * Server Component that fetches real product data from API
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // Await params as required by Next.js 16
  const resolvedParams = await params;

  // Extract product ID and slug from URL segments
  const productId = extractProductIdFromSlug(resolvedParams.slug);
  const productSlug = extractProductSlugFromArray(resolvedParams.slug);

  // If no valid product ID found, show 404
  if (!productId) {
    notFound();
  }

  // Fetch product detail from API
  const result = await getProductDetail(productId, productSlug);

  // If product not found or error occurred, show 404
  if (!result.product) {
    notFound();
  }

  const product = result.product;

  // Get related products from same category
  const relatedResult = await getProductsByCategory(
    product.category.toLowerCase().replace(/\s+/g, "-"),
    1,
    8,
  );

  const relatedProducts = relatedResult.products.filter(
    (p) => p.id !== product.id,
  );

  return (
    <>
      <MainHeader />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <BreadcrumbNav
              category={product.category}
              productName={product.name}
            />
          </div>

          {/* Product Main Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Image Gallery */}
            <div className="lg:sticky lg:top-4 lg:self-start">
              <ProductImageGallery
                mainImage={product.image}
                productName={product.name}
                discount={product.discount}
              />
            </div>

            {/* Right Column - Product Info & Actions */}
            <div className="space-y-6">
              <ProductInfo product={product} />
              <ProductActions
                productName={product.name}
                productPrice={product.price}
              />
            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductTabs brand={product.brand} category={product.category} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts
              products={relatedProducts}
              currentProductId={product.id}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProductDetailsPageProps) {
  // Await params as required by Next.js 16
  const resolvedParams = await params;

  const productId = extractProductIdFromSlug(resolvedParams.slug);
  const productSlug = extractProductSlugFromArray(resolvedParams.slug);

  if (!productId) {
    return {
      title: "Produto não encontrado",
    };
  }

  // Fetch product detail for metadata
  const result = await getProductDetail(productId, productSlug);

  if (!result.product) {
    return {
      title: "Produto não encontrado",
    };
  }

  const product = result.product;

  return {
    title: `${product.name} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
    description: product.description
      ? `${product.description.substring(0, 160)}...`
      : `Compre ${product.name} por R$ ${product.price.toFixed(2)}. ${product.category}. Frete grátis para pedidos acima de R$ 199.`,
  };
}
