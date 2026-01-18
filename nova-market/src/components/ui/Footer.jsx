"use client";

import Link from "next/link";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Nova Market
              </span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Curating the finest products for professionals, creators, and
              enthusiasts. Quality you can trust, performance you can feel.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-white">Shop</h4>
            <Link
              href="/items"
              className="text-white hover:text-blue-300 transition-colors text-sm"
            >
              All Products
            </Link>
            <Link
              href="/items"
              className="text-white hover:text-blue-300 transition-colors text-sm"
            >
              New Arrivals
            </Link>
            <Link
              href="/items"
              className="text-white hover:text-blue-300 transition-colors text-sm"
            >
              Best Sellers
            </Link>
            <Link
              href="/items/add"
              className="text-white hover:text-blue-300 transition-colors text-sm"
            >
              Sell on Nova
            </Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-white">Support</h4>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Help Center
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Shipping & Delivery
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Returns
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Contact Us
            </button>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-white">Company</h4>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              About Us
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Careers
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Privacy Policy
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors text-sm text-left"
              onClick={() => {}}
            >
              Terms of Service
            </button>
          </div>
        </div>

        {/* Footer Marquee */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <Marquee speed="normal" pauseOnHover={true}>
            {[
              "🚀 Free Shipping on Orders Over $50",
              "⭐ 30-Day Money Back Guarantee",
              "🔒 Secure SSL Encrypted Payments",
              "📞 24/7 Customer Support Available",
              "🎁 Exclusive Member Discounts",
              "⚡ Lightning Fast Delivery",
              "🛡️ Warranty Protection Included",
              "🌟 Premium Quality Products Only",
            ].map((text, index) => (
              <div
                key={index}
                className="text-white font-medium whitespace-nowrap px-8 hover:text-blue-300 transition-colors cursor-pointer"
              >
                {text}
              </div>
            ))}
          </Marquee>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Nova Market Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-white text-sm font-mono cursor-pointer hover:text-blue-300 transition-colors">
              USD
            </span>
            <span className="text-white text-sm font-mono cursor-pointer hover:text-blue-300 transition-colors">
              EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
