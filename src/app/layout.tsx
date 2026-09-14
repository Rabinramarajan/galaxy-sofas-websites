import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  // Only the weights actually used in the UI.
  weight: ["400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const defaultTitle = `${site.name} | Custom Sofas & Sofa Store in ${site.city}`;
const defaultDescription =
  "Explore custom sofas, L shape sofas, recliners, sofa cum beds and sofa services from Galaxy Sofas in Chennai. Enquire for a sofa designed for your home.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#8b5e3c",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  publisher: site.businessName,
  category: "Furniture",
  // Stops iOS Safari from auto-linking (and restyling) numbers in body copy.
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Galaxy Sofas — custom sofas made in Chennai",
      },
    ],
  },
  twitter: {
    // No verified Galaxy Sofas X/Twitter account, so no `site`/`creator` handle.
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [site.ogImage],
  },
  // favicon.ico, icon.png and apple-icon.png in src/app are picked up automatically.
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${cormorant.variable} h-full`}>
      <body
        className={`${outfit.className} flex min-h-full flex-col bg-background text-foreground antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
        <Analytics />
      </body>
    </html>
  );
}
