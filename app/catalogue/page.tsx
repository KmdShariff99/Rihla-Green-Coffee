import type { Metadata } from "next";
import { products } from "../../shared/schema";

export const metadata: Metadata = {
  title: "E-Catalogue | Rihla Global",
  description: "Browse Rihla Global Indian green coffee grades and physical specifications.",
  alternates: { canonical: "/catalogue" },
};

const packaging = "60 kg jute bags with GrainPro / Eco-Tact liners";

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow">Buyer resource</p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Indian green coffee catalogue</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">The catalogue below mirrors the current product section, including grade, origin, moisture, screen size, defect tolerance, and packaging.</p>
        </div>
        <div className="mt-12 overflow-hidden border border-primary/15 bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <caption className="sr-only">Rihla Global green coffee product specifications</caption>
              <thead className="bg-primary text-primary-foreground"><tr>{["Product", "Category", "Origin", "Grade", "Moisture", "Screen size", "Defect tolerance", "Packaging"].map((heading) => <th key={heading} scope="col" className="px-5 py-4 font-semibold">{heading}</th>)}</tr></thead>
              <tbody className="divide-y divide-primary/10">{products.map((product) => <tr key={product.id} className="align-top hover:bg-secondary/30"><th scope="row" className="px-5 py-5 font-serif text-base font-normal text-foreground">{product.name}<span className="mt-1 block font-sans text-xs text-muted-foreground">{product.technicalProfile}</span></th><td className="px-5 py-5 capitalize">{product.category}</td><td className="px-5 py-5 whitespace-nowrap">{product.origin}</td><td className="px-5 py-5 whitespace-nowrap">{product.grade}</td><td className="px-5 py-5">{product.moisture}</td><td className="px-5 py-5">{product.screenSize}</td><td className="px-5 py-5">Max 2% black/broken</td><td className="px-5 py-5">{packaging}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">Availability remains lot-specific. Request the latest lot specification before ordering.</p>
      </div>
    </main>
  );
}
