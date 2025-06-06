import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProviders } from "@/providers/AppProviders";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaSweep - Where Creativity Meets Innovation",
  description:
    "Join themed hackathons across art, writing, music, and business. Collaborate with creators worldwide and win amazing prizes.",
  generator: "v0.dev",
};

axios.defaults["baseURL"] = process.env.NEXT_PUBLIC_API_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProviders>
            <AuthProvider>
              <Navigation />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
