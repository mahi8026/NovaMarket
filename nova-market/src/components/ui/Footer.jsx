"use client";

import Link from "next/link";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f0f1a" }} className="pt-20 pb-10 border-t border-white/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Nova Market</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Curating the finest products for professionals, creators, and
              enthusiasts. Quality you can trust, performance you can feel.
            </p>
            <div className="flex gap-4">
              {[
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com",
                  path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-purple-400">Shop</h4>
            <Link href="/items" className="text-gray-300 hover:text-white transition-colors text-sm">All Products</Link>
            <Link href="/items" className="text-gray-300 hover:text-white transition-colors text-sm">New Arrivals</Link>
            <Link href="/items" className="text-gray-300 hover:text-white transition-colors text-sm">Best Sellers</Link>
            <Link href="/items/add" className="text-gray-300 hover:text-white transition-colors text-sm">Sell on Nova</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-purple-400">Support</h4>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Help Center</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Shipping &amp; Delivery</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Returns</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Contact Us</button>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg mb-2 text-purple-400">Company</h4>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>About Us</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Careers</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Privacy Policy</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm text-left" onClick={() => {}}>Terms of Service</button>
          </div>
        </div>

        {/* Footer Marquee */}
        <div className="border-t border-white/20 pt-8 pb-6">
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
                className="text-gray-300 font-medium whitespace-nowrap px-8 hover:text-white transition-colors cursor-pointer"
              >
                {text}
              </div>
            ))}
          </Marquee>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nova Market Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-400 text-sm font-mono cursor-pointer hover:text-white transition-colors">USD</span>
            <span className="text-gray-400 text-sm font-mono cursor-pointer hover:text-white transition-colors">EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
