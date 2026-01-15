/**
 * ProductCard component for displaying product information in a card format
 * Modern design with hover effects and animations
 * Uses Next.js Image component for optimized image loading
 */
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  if (!product) {
    return null;
  }

  const { id, name, description, price, image } = product;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
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
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white z-10">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-gray-500 font-medium uppercase tracking-wider">
          Product
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {name || "Unnamed Product"}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {description || "No description available"}
        </p>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-mono text-xl font-bold text-primary tracking-tight">
            ${typeof price === "number" ? price.toFixed(2) : "0.00"}
          </span>

          <Link
            href={`/items/${id}`}
            className="flex items-center justify-center p-2 rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
