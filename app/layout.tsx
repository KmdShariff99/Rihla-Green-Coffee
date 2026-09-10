import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../client/src/index.css";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>;
}
