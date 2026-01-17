"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center">
        <div className="size-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-green-600">
            check_circle
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped soon.
        </p>

        <div className="space-y-3">
          <Link
            href="/items"
            className="block w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block w-full text-slate-600 dark:text-slate-400 hover:text-primary py-3"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
