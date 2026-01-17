/**
 * ProductCard component for displaying product information in a card format
 * Modern design with hover effects and animations
 * Uses Next.js Image component for optimized image loading
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaArrowRight, FaShoppingCart, FaStar } from "react-icons/fa";
import { useState } from "react";

export default function ProductCard({ product, index = 0 }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return null;
  }

  const { id, name, description, price, image } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={name || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FaShoppingCart className="text-6xl text-gray-400" />
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/90 backdrop-blur text-gray-900"
          } p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white z-10`}
        >
          <FaHeart className="w-5 h-5" />
        </motion.button>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <FaStar className="text-yellow-500 text-sm" />
          <span className="text-xs font-bold">4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-gray-500 font-medium uppercase tracking-wider">
          Product
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
          {name || "Unnamed Product"}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {description || "No description available"}
        </p>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-mono text-xl font-bold text-blue-600 tracking-tight">
            ${typeof price === "number" ? price.toFixed(2) : "0.00"}
          </span>

          <Link
            href={`/items/${id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all group/btn"
          >
            <span className="text-sm font-semibold">View</span>
            <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
