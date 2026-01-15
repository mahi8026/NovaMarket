"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api";
import ProductDetails from "@/components/products/ProductDetails";
import { ProductDetailsSkeleton } from "@/components/ui/SkeletonLoader";

export default function ProductDetailsPage({ params }) {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getProduct(unwrappedParams.id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }

    if (unwrappedParams.id) {
      fetchProduct();
    }
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <ProductDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            {error || "Product not found"}
          </p>
          <button
            onClick={() => router.push("/items")}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
