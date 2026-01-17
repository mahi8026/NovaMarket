/**
 * ProductGrid component for displaying products in a responsive grid layout
 */
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "../ui/SkeletonLoader";

export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
}) {
  if (loading) {
    return <ProductGridSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-1">
              Error Loading Products
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-3xl mb-6">
          <svg
            className="mx-auto h-20 w-20 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          No products available
        </h3>
        <p className="text-lg text-slate-600">
          There are currently no products in the marketplace.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id || Math.random()} product={product} />
      ))}
    </div>
  );
}
