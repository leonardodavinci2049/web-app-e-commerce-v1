import ProductCard from "@/components/home/product-card";
import type { Product } from "@/types/home";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

/**
 * Related Products Component (Server-side)
 * Displays products from the same category
 */
export function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out current product and limit to 4 items
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Produtos Relacionados
        </h2>
        <p className="text-muted-foreground">
          Outros produtos que podem te interessar
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
