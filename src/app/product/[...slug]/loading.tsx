/**
 * Product Detail Page Loading State
 * Displays skeleton UI while product is being fetched
 */

import Footer from "@/components/home/footer";
import MainHeader from "@/components/home/main-header";

export default function ProductDetailLoading() {
  return (
    <>
      <MainHeader />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <span>/</span>
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <span>/</span>
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* Product Main Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Image Gallery Skeleton */}
            <div className="lg:sticky lg:top-4 lg:self-start">
              <div className="aspect-square bg-muted animate-pulse rounded-lg mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={`thumb-${i}`}
                    className="aspect-square bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Product Info Skeleton */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-8 bg-muted animate-pulse rounded w-full" />
              </div>

              {/* Rating */}
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />

              {/* Price */}
              <div className="space-y-2">
                <div className="h-10 w-40 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>

              {/* Stock Status */}
              <div className="h-6 w-24 bg-muted animate-pulse rounded" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-full" />
                <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="h-12 bg-muted animate-pulse rounded" />
                <div className="h-12 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="mt-12">
            <div className="flex gap-4 border-b border-border mb-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={`tab-${i}`}
                  className="h-10 w-32 bg-muted animate-pulse rounded"
                />
              ))}
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div className="mt-12">
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`related-${i}`}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <div className="aspect-square bg-muted animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
