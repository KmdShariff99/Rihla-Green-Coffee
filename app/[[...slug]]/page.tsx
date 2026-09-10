import type { Metadata } from "next";
import dynamic from "next/dynamic";

type PageProps = { params: Promise<{ slug?: string[] }> };

const LegacyApp = dynamic(() => import("../../client/src/App"), { loading: () => <div className="min-h-screen bg-background" aria-label="Loading Rihla Global" /> });

const pageMetadata: Record<string, { title: string; description: string }> = {
  about: { title: "Our Approach", description: "Learn how Rihla Global sources and prepares traceable Indian green coffee for international buyers." },
  products: { title: "Indian Green Coffee", description: "Explore Rihla Global Arabica, Robusta, and specialty green coffee grades with clear specifications." },
  "export-process": { title: "Export Process", description: "See how Rihla Global coordinates grading, documentation, packing, and export-ready Indian green coffee." },
  blog: { title: "Coffee Insights", description: "Read practical insights about Indian coffee origin, green coffee specifications, and export programs." },
  contact: { title: "Contact Rihla Global", description: "Request Indian green coffee specifications, pricing, and export support from Rihla Global." },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const key = slug?.[0] ?? "";
  const metadata = pageMetadata[key] ?? { title: "Indian Green Coffee Exporter", description: "Traceable Indian green coffee prepared for international buyers." };
  const canonical = `/${slug?.join("/") ?? ""}`.replace(/\/$/, "") || "/";
  return { title: metadata.title, description: metadata.description, alternates: { canonical }, openGraph: { title: metadata.title, description: metadata.description, url: canonical, type: "website" }, twitter: { card: "summary_large_image", title: metadata.title, description: metadata.description } };
}

export default function CatchAllPage() {
  return <LegacyApp />;
}
