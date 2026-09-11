import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../client/src/index.css";
import { Analytics } from "./Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rihlaglobal.com"),
  title: { default: "Rihla Global | Indian Green Coffee Exporter", template: "%s | Rihla Global" },
  description: "Rihla Global exports traceable Indian green Arabica, Robusta, and specialty coffee beans to international buyers.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "https://www.rihlaglobal.com/", siteName: "Rihla Global", title: "Rihla Global | Indian Green Coffee Exporter", description: "Traceable Indian green coffee, prepared for international buyers." },
  twitter: { card: "summary_large_image", title: "Rihla Global | Indian Green Coffee Exporter", description: "Traceable Indian green coffee, prepared for international buyers." },
};

export const viewport: Viewport = { themeColor: "#102f24", colorScheme: "light", width: "device-width", initialScale: 1 };

const organizationJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Rihla Global", url: "https://www.rihlaglobal.com", logo: "https://www.rihlaglobal.com/logo.jpeg", address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" }, contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "exports@rihlaglobal.com", telephone: "+91 9398540256" } };
const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "Rihla Global", url: "https://www.rihlaglobal.com" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="bg-background"><body><Analytics /><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />{children}</body></html>;
}
