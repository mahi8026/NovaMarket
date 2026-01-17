"use client";

import Marquee from "@/components/ui/Marquee";

export default function MarqueeDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-16">
          Marquee Showcase
        </h1>

        <div className="space-y-16">
          {/* Basic Marquee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Basic Brands Marquee
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Marquee>
                {[
                  "APPLE",
                  "GOOGLE",
                  "MICROSOFT",
                  "AMAZON",
                  "TESLA",
                  "NETFLIX",
                  "SPOTIFY",
                  "ADOBE",
                ].map((brand, i) => (
                  <div
                    key={i}
                    className="text-3xl font-bold text-white px-8 whitespace-nowrap"
                  >
                    {brand}
                  </div>
                ))}
              </Marquee>
            </div>
          </section>

          {/* Fast Reverse Marquee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Fast Reverse Marquee
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Marquee speed="fast" reverse={true}>
                {[
                  "🚀 Innovation",
                  "⭐ Excellence",
                  "💎 Quality",
                  "🔥 Performance",
                  "⚡ Speed",
                  "🛡️ Security",
                  "🎯 Precision",
                  "🌟 Premium",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-2xl font-semibold text-purple-300 px-6 whitespace-nowrap"
                  >
                    {item}
                  </div>
                ))}
              </Marquee>
            </div>
          </section>

          {/* Slow Product Cards Marquee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Product Cards Marquee
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <Marquee speed="slow" pauseOnHover={true}>
                {[
                  {
                    name: "MacBook Pro",
                    price: "$1,999",
                    rating: "⭐⭐⭐⭐⭐",
                  },
                  { name: "iPhone 15", price: "$999", rating: "⭐⭐⭐⭐⭐" },
                  { name: "AirPods Pro", price: "$249", rating: "⭐⭐⭐⭐⭐" },
                  { name: "iPad Air", price: "$599", rating: "⭐⭐⭐⭐⭐" },
                  { name: "Apple Watch", price: "$399", rating: "⭐⭐⭐⭐⭐" },
                ].map((product, i) => (
                  <div
                    key={i}
                    className="bg-white/20 rounded-xl p-6 mx-4 min-w-[250px] border border-white/30"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-400 mb-1">
                      {product.price}
                    </p>
                    <p className="text-yellow-400">{product.rating}</p>
                  </div>
                ))}
              </Marquee>
            </div>
          </section>

          {/* Stats Marquee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Statistics Marquee
            </h2>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8">
              <Marquee speed="normal">
                {[
                  { icon: "👥", number: "1M+", label: "Users" },
                  { icon: "📦", number: "500K+", label: "Orders" },
                  { icon: "🌍", number: "100+", label: "Countries" },
                  { icon: "⭐", number: "4.9", label: "Rating" },
                  { icon: "🚀", number: "99.9%", label: "Uptime" },
                  { icon: "💰", number: "$50M+", label: "Revenue" },
                ].map((stat, i) => (
                  <div key={i} className="text-center px-8 whitespace-nowrap">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </Marquee>
            </div>
          </section>

          {/* Double Marquee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Double Direction Marquee
            </h2>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Marquee speed="normal">
                  {[
                    "Design",
                    "Development",
                    "Marketing",
                    "Analytics",
                    "Support",
                    "Innovation",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="text-2xl font-bold text-blue-300 px-8 whitespace-nowrap"
                    >
                      {item}
                    </div>
                  ))}
                </Marquee>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Marquee speed="normal" reverse={true}>
                  {[
                    "Quality",
                    "Performance",
                    "Security",
                    "Scalability",
                    "Reliability",
                    "Excellence",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="text-2xl font-bold text-pink-300 px-8 whitespace-nowrap"
                    >
                      {item}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
