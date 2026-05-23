import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Express | Where Flavor Meets Fire",
  description:
    "Experience the boldest flavors in town. From sizzling burgers to wood-fired pizzas — every bite is a masterpiece. Premium fast food restaurant since 2009.",
  keywords: [
    "Food Express",
    "restaurant",
    "fast food",
    "burgers",
    "pizza",
    "chicken",
    "desserts",
    "premium dining",
  ],
  authors: [{ name: "Food Express" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Food Express | Where Flavor Meets Fire",
    description:
      "Experience the boldest flavors in town. Premium fast food restaurant since 2009.",
    siteName: "Food Express",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Express | Where Flavor Meets Fire",
    description:
      "Experience the boldest flavors in town. Premium fast food restaurant since 2009.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
