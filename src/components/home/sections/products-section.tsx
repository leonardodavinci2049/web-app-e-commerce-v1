/**
 * ProductsSection Component
 * Grid section for displaying products
 */

import type { Product } from "@/types/home";
import ProductCard from "../product-card";

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
}

export default function ProductsSection({
  title,
  subtitle,
  products,
  id,
}: ProductsSectionProps) {
  return (
    <section id={id} className="py-12 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
