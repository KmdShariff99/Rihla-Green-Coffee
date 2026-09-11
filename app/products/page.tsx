import type { Metadata } from "next";
import { ProductCatalogue } from "@/components/ProductCatalogue";

export const metadata: Metadata = {
  title: "All Indian Green Coffee Products",
  description: "Filter the complete Rihla Global catalogue of Arabica, Robusta and specialty Indian green coffee products.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <main id="main">
    <section className="page-hero compact-hero">
      <img src="/images/catalogue-samples.jpg" alt="Arabica, Robusta and specialty green coffee samples" />
      <div className="page-hero-content">
        <p className="kicker">Complete product desk</p>
        <h1>Every coffee.<br />One clear catalogue.</h1>
        <p>Browse all current detailed specifications and every product from the legacy catalogue. Filter by category without hiding the full range from the page.</p>
      </div>
    </section>
    <section className="section catalogue-section">
      <p className="kicker catalogue-kicker">01 / Filter & compare · Find the grade that fits your programme</p>
      <ProductCatalogue />
    </section>
  </main>;
}