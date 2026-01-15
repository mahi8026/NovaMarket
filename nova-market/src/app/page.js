import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-accent-purple/5 to-accent-teal/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-sm">
              <span className="text-primary-600 font-medium text-sm">
                ✨ Welcome to the Future of Shopping
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-purple to-accent-teal bg-clip-text text-transparent leading-tight">
              Nova Marketplace
            </h1>
            <p className="text-xl lg:text-2xl mb-10 text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover amazing products and connect with sellers in our vibrant
              marketplace community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/items"
                className="group px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Browse Products
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-primary-600 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-primary-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Why Choose Nova Marketplace?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the perfect blend of innovation, security, and
              community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-primary-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Fast & Secure
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Lightning-fast browsing with enterprise-grade security for all
                  transactions.
                </p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-teal hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-accent-teal to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Community Driven
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect with trusted sellers and buyers in our growing
                  marketplace community.
                </p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-purple hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-accent-purple to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Quality Assured
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Every product is verified to ensure you get the best quality
                  and value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-slate-900">
                About Nova Marketplace
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed text-lg">
                Founded with a vision to create the most user-friendly and
                secure marketplace experience, Nova Marketplace brings together
                buyers and sellers from around the world.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Our platform combines cutting-edge technology with intuitive
                design to make buying and selling as simple as possible. Whether
                you're looking for unique items or want to start your own
                business, Nova Marketplace is your gateway to success.
              </p>
              <Link
                href="/items"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explore Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary-50 via-accent-purple/10 to-accent-teal/10 rounded-3xl p-12 text-center shadow-xl border border-slate-200">
              <div className="space-y-8">
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
                    10,000+
                  </div>
                  <div className="text-slate-600 font-medium">
                    Happy Customers
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-5xl font-bold bg-gradient-to-r from-accent-purple to-purple-700 bg-clip-text text-transparent mb-2">
                    5,000+
                  </div>
                  <div className="text-slate-600 font-medium">
                    Products Listed
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <div className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-emerald-700 bg-clip-text text-transparent mb-2">
                    99.9%
                  </div>
                  <div className="text-slate-800 font-semibold">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to succeed in the marketplace
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-primary-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Product Listing
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Easy-to-use tools for listing your products with detailed
                descriptions and high-quality images.
              </p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-teal hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-teal to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Secure Payments
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Multiple payment options with bank-level security to protect
                your transactions.
              </p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-purple hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Customer Support
              </h3>
              <p className="text-slate-600 leading-relaxed">
                24/7 customer support to help you with any questions or issues
                you may have.
              </p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-orange hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-orange to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                Analytics
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Detailed analytics and insights to help you optimize your sales
                and grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
              Join thousands of satisfied customers and sellers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-primary-50/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-primary-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Sarah Johnson</h4>
                  <p className="text-slate-700 text-sm font-medium">
                    Verified Buyer
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                "Nova Marketplace made it so easy to find exactly what I was
                looking for. The interface is intuitive and the sellers are
                trustworthy."
              </p>
            </div>
            <div className="group bg-gradient-to-br from-white to-accent-teal/10 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-teal hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-teal to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Mike Chen</h4>
                  <p className="text-slate-700 text-sm font-medium">Seller</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                "As a seller, I love how simple it is to list products and
                manage my inventory. The platform has helped me grow my business
                significantly."
              </p>
            </div>
            <div className="group bg-gradient-to-br from-white to-accent-purple/10 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-accent-purple hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-purple to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  E
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-slate-900">Emily Rodriguez</h4>
                  <p className="text-slate-700 text-sm font-medium">
                    Power User
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                "The customer support is outstanding and the security features
                give me peace of mind when making purchases. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Basic</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">Free</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-teal mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Browse all products</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-teal mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Basic search filters</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-teal mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Customer support</span>
                </li>
              </ul>
              <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                Get Started
              </button>
            </div>
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl border-2 border-primary-500 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent-purple text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Seller</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">$9.99</span>
                <span className="text-lg text-slate-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-600">
                    List unlimited products
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Sales analytics</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-primary-600 to-accent-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Start Selling
              </button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Enterprise
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">
                  $49.99
                </span>
                <span className="text-lg text-slate-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-purple mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Everything in Seller</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-purple mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Priority support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-accent-purple mr-3 flex-shrink-0 mt-0.5"
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
                  <span className="text-slate-700">Advanced analytics</span>
                </li>
              </ul>
              <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
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
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Email</p>
                      <p className="text-slate-600">
                        support@novamarketplace.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-teal to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Phone</p>
                      <p className="text-slate-700">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">
                        Address
                      </p>
                      <p className="text-slate-600">
                        123 Marketplace Ave, Tech City, TC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
