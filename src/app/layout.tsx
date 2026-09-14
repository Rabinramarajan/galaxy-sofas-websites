import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { site } from "@/constants/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const defaultTitle = "Galaxy Sofas | Custom & Premium Sofas in Chennai";
const defaultDescription =
  "Discover stylish, comfortable and custom-made sofas from Galaxy Sofas in Chennai. Explore L shape sofas, recliners, sofa cum beds, custom designs and sofa services.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: "%s | Galaxy Sofas",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/hero/galaxy-sofas-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Galaxy Sofas showroom sofa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/hero/galaxy-sofas-hero.jpg"],
  },
  icons: {
    icon: "/images/logo/galaxy-sofas-logo.png",
    apple: "/images/logo/galaxy-sofas-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${cormorant.variable} h-full`}>
      <body className={`${outfit.className} flex min-h-full flex-col bg-background text-foreground antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-dark"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
