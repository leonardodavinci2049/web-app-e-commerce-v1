import { notFound } from "next/navigation";
import Footer from "@/components/home/footer";
import MainHeader from "@/components/home/main-header";
import { BreadcrumbNav } from "@/components/product/breadcrumb-nav";
import { ProductActions } from "@/components/product/product-actions";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { envs } from "@/core/config/envs";
import { allProducts } from "@/data/mock-data";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Product Details Page
 * Dynamic page that displays detailed information about a product
 * URL format: /product/[category]/[product-id]/[product-name-slug]
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // Await params as required by Next.js 16
  const resolvedParams = await params;

  // Extract product ID from slug (expected format: [category, id, name-slug])
  const productId = resolvedParams.slug[1] || resolvedParams.slug[0];

  // Find product in mock data
  const product = allProducts.find((p) => p.id === productId);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
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
 * Generate static params for all products (optional)
 * This enables static generation at build time
 */
export function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: [
      product.category.toLowerCase().replace(/\s+/g, "-"),
      product.id,
      product.name.toLowerCase().replace(/\s+/g, "-"),
    ],
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProductDetailsPageProps) {
  // Await params as required by Next.js 16
  const resolvedParams = await params;

  const productId = resolvedParams.slug[1] || resolvedParams.slug[0];
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  return {
    title: `${product.name} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
    description: `Compre ${product.name} por R$ ${product.price.toFixed(2)}. ${product.category}. Frete grátis para pedidos acima de R$ 199.`,
  };
}
