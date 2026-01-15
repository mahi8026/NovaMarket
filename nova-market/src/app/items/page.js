"use client";

import { useState, useEffect } from "react";
import { productApi } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import { useToast } from "@/contexts/ToastContext";

export default function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        const errorMessage =
          err.userMessage || "Failed to load products. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Discover Products
              </h1>
              <p className="text-lg text-slate-600">
                Explore our curated collection of amazing items
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-2xl font-bold text-primary-600">
                  {products.length}
                </span>
                <span className="text-slate-600 ml-2">
                  {products.length === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}
