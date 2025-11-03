import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbNavProps {
  category: string;
  productName: string;
}

/**
 * Breadcrumb Navigation Component (Server-side)
 * Displays hierarchical navigation path
 */
export function BreadcrumbNav({ category, productName }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        href="/products"
        className="hover:text-foreground transition-colors"
      >
        Produtos
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        href={`/products?category=${category}`}
        className="hover:text-foreground transition-colors"
      >
        {category}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="truncate font-medium text-foreground max-w-[200px] md:max-w-none">
        {productName}
      </span>
    </nav>
  );
}
