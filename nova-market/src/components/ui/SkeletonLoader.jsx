/**
 * SkeletonLoader components for better loading UX
 * Provides placeholder content during data loading
 */

/**
 * Generic skeleton element
 */
export function Skeleton({ className = "", width = "100%", height = "1rem" }) {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
}

/**
 * Product card skeleton loader
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full" height="12rem" />

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton height="1.5rem" width="80%" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="90%" />
        </div>

        {/* Price skeleton */}
        <Skeleton height="1.25rem" width="30%" />
      </div>
    </div>
  );
}

/**
 * Product grid skeleton loader
 */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * Product details skeleton loader
 */
export function ProductDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image skeleton */}
          <div className="md:w-1/2">
            <Skeleton className="w-full" height="24rem" />
          </div>

          {/* Details skeleton */}
          <div className="md:w-1/2 p-8 space-y-4">
            <Skeleton height="2rem" width="70%" />
            <Skeleton height="1.5rem" width="40%" />

            <div className="space-y-2 pt-4">
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="95%" />
              <Skeleton height="1rem" width="90%" />
              <Skeleton height="1rem" width="85%" />
            </div>

            <div className="pt-4">
              <Skeleton height="3rem" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
