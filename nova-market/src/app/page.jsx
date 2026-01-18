"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBolt, FaTrophy, FaShieldAlt, FaCrown, FaFire } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { useState, useEffect } from "react";

import Marquee from "@/components/ui/Marquee";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use a timeout to avoid synchronous setState in effect
    const timer = setTimeout(() => setMounted(true), 0);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      {/* Floating Elements - Only render after mount */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: mousePosition.x * -0.03,
              y: mousePosition.y * -0.03,
            }}
            className="absolute top-40 right-20 w-24 h-24 bg-linear-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: mousePosition.x * 0.01,
              y: mousePosition.y * 0.01,
            }}
            className="absolute bottom-40 left-1/3 w-40 h-40 bg-linear-to-br from-teal-400/20 to-green-400/20 rounded-full blur-xl"
          />
        </div>
      )}

      {/* Hero Section with 3D Elements */}
      <section className="relative pt-18 min-h-screen flex items-center overflow-hidden text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-95"></div>

          {/* Animated Geometric Shapes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-300/20 rounded-full"
          />

          {/* Static Floating Particles - No Math.random() */}
          {mounted && (
            <>
              <motion.div
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: "10%", top: "20%" }}
              />
              <motion.div
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: "80%", top: "30%" }}
              />
              <motion.div
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: "60%", top: "70%" }}
              />
              <motion.div
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: "30%", top: "80%" }}
              />
              <motion.div
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 2 }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{ left: "90%", top: "50%" }}
              />
            </>
          )}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col gap-8 max-w-2xl"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-pink-500/20 to-purple-500/20 border border-white/20 backdrop-blur-xl">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex h-3 w-3 rounded-full bg-linear-to-r from-pink-400 to-purple-400"
                  />
                  <span className="text-sm font-bold text-transparent tracking-wide uppercase bg-linear-to-r from-pink-300 to-purple-300 bg-clip-text">
                    🚀 Revolutionary Shopping Experience
                  </span>
                </div>
              </motion.div>

              {/* Main Heading with Gradient Text */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl flex gap-10 font-black leading-[0.9] tracking-tight mb-6">
                  <span className="block bg-linear-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                    A
                  </span>
                  <span className="block bg-linear-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                    Market
                  </span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-1 bg-linear-to-r from-pink-500 to-purple-500 rounded-full mb-8"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-purple-100 font-light leading-relaxed max-w-lg"
              >
                Where innovation meets convenience. Discover premium products
                that transform your lifestyle.
              </motion.p>

              {/* CTA Buttons with Sparkle Effects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/items"
                    className="inline-block px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    Explore Now
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/items"
                    className="px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                  >
                    <FaFire className="text-orange-400" />
                    Hot Deals
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 3D Hero Image with Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="hidden lg:flex justify-end relative perspective-1000"
            >
              <div className="relative">
                {/* Main Product Card */}
                <motion.div
                  whileHover={{ rotateY: 10, rotateX: 5 }}
                  className="relative z-10 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl transform-gpu"
                >
                  <Image
                    alt="Premium tech products"
                    className="rounded-2xl shadow-2xl max-w-md w-full object-cover aspect-4/3"
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                    width={800}
                    height={600}
                  />

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute -top-6 -left-6 bg-linear-to-r from-green-400 to-emerald-500 p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3 text-white">
                      <MdTrendingUp className="text-2xl" />
                      <div>
                        <div className="text-xs font-medium opacity-90">
                          Sales
                        </div>
                        <div className="text-lg font-bold">+127%</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="absolute -bottom-6 -right-6 bg-linear-to-r from-orange-400 to-red-500 p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3 text-white">
                      <FaCrown className="text-2xl" />
                      <div>
                        <div className="text-xs font-medium opacity-90">
                          Premium
                        </div>
                        <div className="text-lg font-bold">Quality</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Orbiting Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute -top-8 left-1/2 w-6 h-6 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg" />
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-linear-to-r from-pink-400 to-purple-400 rounded-full shadow-lg" />
                  <div className="absolute -bottom-8 left-1/3 w-5 h-5 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Brand Marquee */}
      <section className="py-8 bg-black/5 text-white backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Marquee speed="normal" pauseOnHover={true}>
              {[
                "SONY",
                "APPLE",
                "SAMSUNG",
                "LOGITECH",
                "BOSE",
                "DELL",
                "MICROSOFT",
                "GOOGLE",
                "AMAZON",
                "TESLA",
              ].map((brand) => (
                <div
                  key={brand}
                  className="text-3xl font-bold text-white/80 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap px-8"
                >
                  {brand}
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </section>

      {/* Creative Features Section */}
      <section className="py-32 bg-linear-to-b from-slate-900 to-gray-900 relative overflow-hidden text-white">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-purple-300/10 rounded-full"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              Why Choose Us?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
              Experience shopping like never before with our revolutionary
              platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBolt className="text-4xl text-white" />,
                title: "Lightning Fast",
                description:
                  "Blazing fast performance with cutting-edge technology",
                gradient: "from-yellow-400 to-orange-500",
                delay: 0.1,
              },
              {
                icon: <FaShieldAlt className="text-4xl text-white" />,
                title: "Ultra Secure",
                description: "Bank-level security protecting every transaction",
                gradient: "from-green-400 to-emerald-500",
                delay: 0.2,
              },
              {
                icon: <FaTrophy className="text-4xl text-white" />,
                title: "Premium Quality",
                description:
                  "Curated selection of the finest products worldwide",
                gradient: "from-purple-400 to-pink-500",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="group relative"
              >
                <div className="relative bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full shadow-2xl hover:shadow-purple-500/20 transition-all duration-300\">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-2xl`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:bg-linear-to-r group-hover:from-blue-200 group-hover:to-purple-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-16 bg-linear-to-r from-purple-900/20 to-pink-900/20 overflow-hidden">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            What Our Customers Say
          </h3>
        </div>

        {/* First row - normal direction */}
        <div className="mb-8">
          <Marquee speed="slow" pauseOnHover={true}>
            {[
              {
                text: "Amazing quality products! Fast shipping and excellent customer service.",
                author: "Sarah M.",
              },
              {
                text: "Best marketplace I've ever used. The interface is so smooth and modern.",
                author: "John D.",
              },
              {
                text: "Found exactly what I was looking for. Great prices and authentic products.",
                author: "Emily R.",
              },
              {
                text: "Outstanding experience from start to finish. Highly recommended!",
                author: "Michael B.",
              },
              {
                text: "The product quality exceeded my expectations. Will definitely shop again.",
                author: "Lisa K.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-4 min-w-87.5 border border-white/20"
              >
                <p className="text-white/90 mb-3 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-purple-300 font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Second row - reverse direction */}
        <div>
          <Marquee speed="slow" reverse={true} pauseOnHover={true}>
            {[
              {
                text: "Incredible selection and unbeatable prices. Love this platform!",
                author: "David W.",
              },
              {
                text: "Seamless shopping experience with beautiful design. 5 stars!",
                author: "Anna S.",
              },
              {
                text: "Fast delivery and products exactly as described. Perfect!",
                author: "Chris L.",
              },
              {
                text: "User-friendly interface and excellent customer support team.",
                author: "Maria G.",
              },
              {
                text: "Premium quality products at competitive prices. Fantastic!",
                author: "Robert H.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-4 min-w-87.5 border border-white/20"
              >
                <p className="text-white/90 mb-3 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-pink-300 font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Stats Marquee */}
      <section className="py-12 bg-black/20">
        <Marquee speed="fast" pauseOnHover={false}>
          {[
            { icon: "🚀", stat: "50K+", label: "Happy Customers" },
            { icon: "⭐", stat: "4.9/5", label: "Average Rating" },
            { icon: "📦", stat: "100K+", label: "Products Sold" },
            { icon: "🌍", stat: "50+", label: "Countries Served" },
            { icon: "💎", stat: "99.9%", label: "Customer Satisfaction" },
            { icon: "🔥", stat: "24/7", label: "Customer Support" },
            { icon: "⚡", stat: "2-Day", label: "Fast Delivery" },
            { icon: "🛡️", stat: "100%", label: "Secure Payments" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-black px-8 whitespace-nowrap"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div className="text-2xl font-bold text-purple-300">
                  {item.stat}
                </div>
                <div className="text-sm text-white/70">{item.label}</div>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden text-white">
        {/* Static Particles - No Math.random() */}
        {mounted && (
          <div className="absolute inset-0">
            {[
              { left: "10%", top: "20%", delay: 0 },
              { left: "80%", top: "30%", delay: 0.5 },
              { left: "60%", top: "70%", delay: 1 },
              { left: "30%", top: "80%", delay: 1.5 },
              { left: "90%", top: "50%", delay: 2 },
              { left: "20%", top: "60%", delay: 2.5 },
              { left: "70%", top: "20%", delay: 3 },
              { left: "40%", top: "90%", delay: 3.5 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: particle.delay,
                }}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-7xl font-black mb-8 bg-linear-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            >
              Ready to Experience the Future?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-purple-100 mb-12 leading-relaxed"
            >
              Join millions of satisfied customers and discover what makes Nova
              Marketplace extraordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/items"
                  className="inline-block px-12 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Start Shopping Now
                </Link>
              </motion.div>

              <div className="text-purple-200 text-lg">
                🎉 Free shipping on orders over $50
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
