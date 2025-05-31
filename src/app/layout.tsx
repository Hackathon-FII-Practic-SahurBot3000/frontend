import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProviders } from "@/providers/AppProviders";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Power of COLLECTIVE Imagination",
  description: "Build worlds, write stories, create experiences",
  generator: "v0.dev",
};

axios.defaults['baseURL'] = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </AppProviders>
      </body>
    </html>
  );
}
