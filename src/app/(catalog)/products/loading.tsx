/**
 * Products Page Loading State
 * Displays skeleton UI while products are being fetched
 */

import Footer from "@/components/home/footer";
import MobileBottomNav from "@/components/home/mobile-bottom-nav";
import NavigationMenu from "@/components/mainmenu/navigation-menu";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationMenu />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <nav className="mb-6 bg-card border border-border rounded-lg shadow-sm p-3">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </nav>

        {/* Filters Skeleton */}
        <div className="mb-6 bg-card border border-border rounded-lg shadow-sm p-4">
          <div className="flex gap-4 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`filter-skeleton-${i}`}
                className="h-10 w-32 bg-muted animate-pulse rounded shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Counter Skeleton */}
        <div className="mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="h-5 w-48 bg-muted animate-pulse rounded" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 12 }).map(() => (
            <div
              key={crypto.randomUUID()}
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="aspect-square bg-muted animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-10 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
