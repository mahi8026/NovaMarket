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
    0
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
        }
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined block">diamond</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              Nova Marketplace
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/items")}
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_cart
              </span>
              Back to Shop
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Forms */}
          <div className="flex-1 space-y-10">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-8">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-10 rounded-full ${
                    step >= 1
                      ? "bg-primary text-white"
                      : "bg-slate-200 dark:bg-slate-800"
                  } flex items-center justify-center font-bold`}
                >
                  1
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step >= 1 ? "text-primary" : "text-slate-400"
                  }`}
                >
                  Shipping
                </span>
              </div>
              <div
                className={`h-px flex-1 ${
                  step >= 2 ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                } mx-4 -mt-6`}
              ></div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-10 rounded-full ${
                    step >= 2
                      ? "bg-primary text-white"
                      : "bg-slate-200 dark:bg-slate-800"
                  } flex items-center justify-center font-bold`}
                >
                  2
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step >= 2 ? "text-primary" : "text-slate-400"
                  }`}
                >
                  Payment
                </span>
              </div>
              <div
                className={`h-px flex-1 ${
                  step >= 3 ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"
                } mx-4 -mt-6`}
              ></div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-10 rounded-full ${
                    step >= 3
                      ? "bg-primary text-white"
                      : "bg-slate-200 dark:bg-slate-800"
                  } flex items-center justify-center font-bold`}
                >
                  3
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step >= 3 ? "text-primary" : "text-slate-400"
                  }`}
                >
                  Complete
                </span>
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
                    <label className="block text-sm font-semibold mb-2">
                      Contact Email *
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                    <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                          placeholder="John Doe"
                          type="text"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                          Address *
                        </label>
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                          placeholder="123 Main Street"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          City *
                        </label>
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                          placeholder="New York"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Postal Code *
                        </label>
                        <input
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                          placeholder="10001"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-bold mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center justify-between p-4 border-2 ${
                          formData.shippingMethod === "priority"
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 dark:border-slate-800"
                        } rounded-xl cursor-pointer`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            name="shippingMethod"
                            value="priority"
                            checked={formData.shippingMethod === "priority"}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary"
                            type="radio"
                          />
                          <div>
                            <p className="font-bold">Priority Shipping</p>
                            <p className="text-sm text-slate-500">
                              Delivered within 24-48 hours
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold">$15.00</span>
                      </label>
                      <label
                        className={`flex items-center justify-between p-4 border-2 ${
                          formData.shippingMethod === "standard"
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 dark:border-slate-800"
                        } rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary"
                            type="radio"
                          />
                          <div>
                            <p className="font-bold">Standard Delivery</p>
                            <p className="text-sm text-slate-500">
                              3-5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold">Free</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                  >
                    Continue to Payment
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
                      className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Pay with Stripe"}
                    </button>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-slate-600 dark:text-slate-400 hover:text-primary py-3"
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
