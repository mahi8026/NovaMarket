import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  // Redirect if already authenticated
  const cookieStore = await cookies();
  if (isAuthenticated(cookieStore)) {
    redirect("/items");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-primary-600 to-accent-purple p-3 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Nova Marketplace
          </h1>
          <p className="text-lg text-slate-600">Sign in to your account</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}
