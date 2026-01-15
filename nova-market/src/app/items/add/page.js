"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { productApi } from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";

/**
 * Add Item Page - Protected route for adding new products
 * Requires authentication (enforced by middleware)
 */
export default function AddItemPage() {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles product creation
   * @param {object} productData - Product data from form
   */
  const handleSubmit = async (productData) => {
    try {
      setIsSubmitting(true);

      // Create product via API
      const createdProduct = await productApi.createProduct(productData);

      // Show success notification
      toast.success("Product added successfully!");

      // Redirect to product list after a short delay
      setTimeout(() => {
        router.push("/items");
      }, 1500);
    } catch (error) {
      console.error("Failed to create product:", error);

      // Show error notification with user-friendly message
      toast.error(
        error.userMessage || "Failed to add product. Please try again later."
      );

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/items")}
            disabled={isSubmitting}
            className="group mb-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </button>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Add New Product
          </h1>
          <p className="text-lg text-slate-600">
            Fill in the details below to add a new product to the marketplace
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200">
          <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
