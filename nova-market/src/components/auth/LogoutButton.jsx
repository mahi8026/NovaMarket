"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton({ className = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // If using NextAuth session, use NextAuth signOut
      if (session) {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
      } else {
        // Fall back to cookie-based logout
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (response.ok) {
          router.push("/");
          router.refresh(); // Refresh to update auth state
        }
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
