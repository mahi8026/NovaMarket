"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center">
        <div className="size-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-orange-600">
            cancel
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Your payment was cancelled. Your cart items are still saved.
        </p>

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Try Again
          </Link>
          <Link
            href="/items"
            className="block w-full text-slate-600 dark:text-slate-400 hover:text-primary py-3"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
