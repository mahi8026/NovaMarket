"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  FaDiamond,
  FaShoppingCart,
  FaLock,
  FaArrowRight,
  FaArrowLeft,
  FaCreditCard,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    shippingMethod: "priority",
    newsletter: false,
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push("/items");
    }
  }, [router]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const shipping = formData.shippingMethod === "priority" ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContinueToPayment = () => {
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            shippingInfo: formData,
            total: total,
          }),
        },
      );

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Nova Marketplace
              </h1>
              <p className="text-xs text-slate-500">Secure Checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/items")}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Shop
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Forms */}
          <div className="flex-1 space-y-8">
            {/* Progress Stepper */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-3 flex-1">
                  <div
                    className={`relative size-12 rounded-full ${
                      step >= 1
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                    } flex items-center justify-center font-bold text-lg transition-all duration-300`}
                  >
                    {step > 1 ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "1"
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        step >= 1 ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      Shipping
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Your details
                    </p>
                  </div>
                </div>

                <div
                  className={`h-0.5 flex-1 mx-4 ${
                    step >= 2
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  } transition-all duration-500`}
                ></div>

                <div className="flex flex-col items-center gap-3 flex-1">
                  <div
                    className={`size-12 rounded-full ${
                      step >= 2
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                    } flex items-center justify-center font-bold text-lg transition-all duration-300`}
                  >
                    {step > 2 ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      "2"
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        step >= 2 ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      Payment
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Secure payment
                    </p>
                  </div>
                </div>

                <div
                  className={`h-0.5 flex-1 mx-4 ${
                    step >= 3
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  } transition-all duration-500`}
                ></div>

                <div className="flex flex-col items-center gap-3 flex-1">
                  <div
                    className={`size-12 rounded-full ${
                      step >= 3
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                    } flex items-center justify-center font-bold text-lg transition-all duration-300`}
                  >
                    3
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        step >= 3 ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      Complete
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Order placed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContinueToPayment();
                  }}
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
                      Contact Email *
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                      placeholder="email@example.com"
                      type="email"
                      required
                    />
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="rounded text-primary focus:ring-primary"
                        id="news"
                        type="checkbox"
                      />
                      <label className="text-sm text-slate-500" htmlFor="news">
                        Email me with news and offers
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                      Shipping Address
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
                          Full Name *
                        </label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                          placeholder="John Doe"
                          type="text"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
                          Address *
                        </label>
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                          placeholder="123 Main Street"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
                          City *
                        </label>
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                          placeholder="New York"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
                          Postal Code *
                        </label>
                        <input
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                          placeholder="10001"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center justify-between p-4 border-2 ${
                          formData.shippingMethod === "priority"
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                        } rounded-xl cursor-pointer transition-all`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            name="shippingMethod"
                            value="priority"
                            checked={formData.shippingMethod === "priority"}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                            type="radio"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              Priority Shipping
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Delivered within 24-48 hours
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          $15.00
                        </span>
                      </label>
                      <label
                        className={`flex items-center justify-between p-4 border-2 ${
                          formData.shippingMethod === "standard"
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
                        } rounded-xl cursor-pointer transition-all`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                            type="radio"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              Standard Delivery
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              3-5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          Free
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    <span>Continue to Payment</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </section>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h3 className="font-semibold mb-2">Shipping to:</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formData.fullName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.postalCode}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {loading ? "Processing..." : "Pay with Stripe"}
                    </button>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-3 font-medium transition-colors"
                  >
                    ← Back to Shipping
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Items */}
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{item.name}</p>
                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity || 1}
                        </p>
                        <p className="text-sm font-mono mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-mono">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Est. Taxes</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Total</span>
                    <span className="font-mono text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest leading-relaxed">
                    Guaranteed safe & secure checkout
                    <br />
                    Powered by Stripe & PCI Compliant
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
