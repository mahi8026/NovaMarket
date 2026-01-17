"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return null;
  }

  const { id, name, description, price, image, createdAt } = product;

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex((item) => item.id === id);

    if (existingItemIndex > -1) {
      // Increment quantity if exists
      existingCart[existingItemIndex].quantity =
        (existingCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Add new item
      existingCart.push({
        id,
        name,
        description,
        price,
        image,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => router.push("/checkout"), 300);
  };

  return (
    <div className="product-page min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <button
          onClick={() => router.push("/items")}
          className="group mb-8 flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
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

        {/* Product Details Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative h-96 md:h-auto min-h-[400px]">
              {image ? (
                <Image
                  src={image}
                  alt={name || "Product image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-24 h-24 text-slate-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-slate-500 text-lg font-medium">
                      No image available
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="p-8 lg:p-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {name || "Unnamed Product"}
              </h1>

              <div className="mb-8">
                <div className="inline-block bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-4xl font-bold text-white font-mono">
                    ${typeof price === "number" ? price.toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {description || "No description available"}
                </p>
              </div>

              {/* Additional Information */}
              <div className="border-t border-slate-200 pt-8 mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Product Information
                </h2>
                <dl className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl">
                    <dt className="text-slate-600 font-medium">Product ID:</dt>
                    <dd className="text-slate-900 font-semibold font-mono">
                      {id}
                    </dd>
                  </div>
                  {createdAt && (
                    <div className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl">
                      <dt className="text-slate-600 font-medium">Added:</dt>
                      <dd className="text-slate-900 font-semibold">
                        {new Date(createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`w-full ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-white border-2 border-slate-300 text-slate-900 hover:text-slate-900"
                  } px-6 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 group`}
                >
                  {addedToCart ? (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white">Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
