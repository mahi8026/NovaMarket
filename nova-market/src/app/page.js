"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
  FaUsers,
  FaTrophy,
  FaRocket,
  FaShieldAlt,
  FaGift,
  FaCrown,
  FaFire,
  FaThumbsUp,
} from "react-icons/fa";
import {
  MdVerified,
  MdLocalShipping,
  MdFlashOn,
  MdTrendingUp,
} from "react-icons/md";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: mousePosition.x * -0.03,
              y: mousePosition.y * -0.03,
            }}
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: mousePosition.x * 0.01,
              y: mousePosition.y * 0.01,
            }}
            className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-xl"
          />
        </div>
      )}

      {/* Hero Section with 3D Elements */}
      <section className="relative pt-[72px] min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-95"></div>

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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/20 backdrop-blur-xl">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex h-3 w-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                  />
                  <span className="text-sm font-bold text-white tracking-wide uppercase bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
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
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6">
                  <span className="block bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                    a
                  </span>
                  <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                    Market
                  </span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-8"
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

              {/* CTA Buttons with Hover Effects */}
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
                    className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-3">
                      <FaRocket className="text-xl" />
                      Explore Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaArrowRight />
                      </motion.div>
                    </div>
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
                  className="relative z-10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl transform-gpu"
                >
                  <img
                    alt="Premium tech products"
                    className="rounded-2xl shadow-2xl max-w-md w-full object-cover aspect-[4/3]"
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                  />

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute -top-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-2xl shadow-xl"
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
                    className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-2xl shadow-xl"
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
                  <div className="absolute -top-8 left-1/2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg" />
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg" />
                  <div className="absolute -bottom-8 left-1/3 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Brand Ticker */}
      <section className="py-8 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center gap-8 overflow-x-auto"
          >
            {["SONY", "APPLE", "SAMSUNG", "LOGITECH", "BOSE", "DELL"].map(
              (brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-2xl font-bold text-white/60 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {brand}
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Creative Features Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience shopping like never before with our revolutionary
              platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBolt className="text-4xl" />,
                title: "Lightning Fast",
                description:
                  "Blazing fast performance with cutting-edge technology",
                gradient: "from-yellow-400 to-orange-500",
                delay: 0.1,
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: "Ultra Secure",
                description: "Bank-level security protecting every transaction",
                gradient: "from-green-400 to-emerald-500",
                delay: 0.2,
              },
              {
                icon: <FaTrophy className="text-4xl" />,
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
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-2xl`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200 bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
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
              className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
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
                  className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-4">
                    <FaRocket className="text-2xl" />
                    Start Shopping Now
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaArrowRight className="text-xl" />
                    </motion.div>
                  </div>
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
