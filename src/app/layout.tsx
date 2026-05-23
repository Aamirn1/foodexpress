import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = "https://foodexpresslalkurti.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Food Express | Where Flavor Meets Fire",
    template: "%s | Food Express",
  },
  description:
    "🔥 Experience the boldest flavors in town. From sizzling burgers to wood-fired pizzas — every bite is a masterpiece. Order now for delivery or dine-in at Lalkurti, Rawalpindi.",
  keywords: [
    "Food Express",
    "fast food restaurant",
    "burgers",
    "pizza",
    "chicken wings",
    "desserts",
    "food delivery Rawalpindi",
    "Lalkurti restaurant",
    "order food online",
    "premium fast food",
    "flame grilled burgers",
    "wood fired pizza",
  ],
  authors: [{ name: "Food Express" }],
  creator: "Food Express",
  publisher: "Food Express",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Food Express | Where Flavor Meets Fire 🔥",
    description:
      "Experience the boldest flavors in town. From sizzling burgers to wood-fired pizzas — every bite is a masterpiece. Order now!",
    url: siteUrl,
    siteName: "Food Express",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "Food Express - Where Flavor Meets Fire. Premium fast food restaurant with flame-grilled burgers, wood-fired pizzas, and more.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Express | Where Flavor Meets Fire 🔥",
    description:
      "Experience the boldest flavors in town. Flame-grilled burgers, wood-fired pizzas — every bite is a masterpiece.",
    images: [
      {
        url: "/og-image.png",
        alt: "Food Express - Premium Fast Food Restaurant",
      },
    ],
    creator: "@foodexpress",
    site: "@foodexpress",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#FF6B00" />
        {/* WhatsApp link preview color */}
        <meta name="msapplication-TileColor" content="#0A0A0A" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
