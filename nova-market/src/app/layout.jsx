import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import { ToastProvider } from "../contexts/ToastContext";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nova Marketplace",
  description:
    "Your premier destination for discovering and managing quality products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ErrorBoundary>
          <SessionProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
