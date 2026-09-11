import type { Metadata } from "next";
import { ProductCatalogue } from "@/components/ProductCatalogue";

export const metadata: Metadata = {
  title: "All Indian Green Coffee Products",
  description: "Filter all 46 Coffee Board of India green coffee grade designations with clear moisture, screen, and tolerance specifications.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <main id="main">
    <section className="page-hero compact-hero">
      <img src="/images/catalogue-samples.jpg" alt="Arabica, Robusta and specialty green coffee samples" width="1024" height="1024" fetchPriority="high" decoding="async" />
      <div className="page-hero-content">
        <p className="kicker">Complete product desk</p>
        <h1>Every coffee.<br />One clear catalogue.</h1>
        <p>Review all 46 Coffee Board grade designations with explicit moisture, sieve, garbling, and tolerance limits. Filter without losing the full register.</p>
      </div>
    </section>
    <section className="section catalogue-section">
      <p className="kicker catalogue-kicker">01 / Filter & compare · Find the grade that fits your programme</p>
      <ProductCatalogue />
    </section>
  </main>;
}