import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Trivastu",
    default: "Trivastu | Top Construction Company in Ranchi | Turnkey Builders",
  },
  description: "Trivastu turns your dreams into reality. We are the leading turnkey construction, architecture, and interior design company in Ranchi, Jharkhand. Book a free consultation today.",
  keywords: ["Top Construction Company in Ranchi", "Best builders in Jharkhand", "Turnkey house construction", "Architects in Ranchi", "Interior designers Ranchi", "Trivastu", "Luxury Builders"],
  authors: [{ name: "Trivastu" }],
  creator: "Trivastu",
  publisher: "Trivastu",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://trivastu.com",
  },
  openGraph: {
    title: "Trivastu | Top Construction Company in Ranchi",
    description: "Leading turnkey construction, architecture, and interior design company in Jharkhand.",
    url: "https://trivastu.com",
    siteName: "Trivastu Brand",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Trivastu - Premium Turnkey Construction",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trivastu | Top Construction Company in Ranchi",
    description: "Leading turnkey construction, architecture, and interior design company in Jharkhand.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200&h=630"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trivastu Ventures",
              "url": "https://trivastu.com",
              "logo": "https://trivastu.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/trivastu",
                "https://www.instagram.com/trivastu",
                "https://www.linkedin.com/company/trivastu"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8655202633",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              }
            })
          }}
        />

        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
