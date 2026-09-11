import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductCategory } from "@shared/schema";

const categories: { value: ProductCategory | "all"; label: string; note: string }[] = [
  { value: "all", label: "All coffees", note: "The complete current catalogue" },
  { value: "arabica", label: "Arabica", note: "Washed Plantation and unwashed Arabica Cherry grades" },
  { value: "robusta", label: "Robusta", note: "Washed Plantation and unwashed Robusta Cherry grades" },
  { value: "specialty", label: "Specialty", note: "Distinctive Indian lots" },
];

export default function Products() {
  const [, navigate] = useLocation();
  const requested = new URLSearchParams(window.location.search).get("category") as ProductCategory | null;
  const initialCategory = ["arabica", "robusta", "specialty"].includes(requested || "") ? requested! : "all";
  const [active, setActive] = useState<ProductCategory | "all">(initialCategory);
  const filtered = active === "all" ? products : products.filter((product) => product.category === active);
  const current = categories.find((category) => category.value === active) || categories[0];
  const productJsonLd = filtered.map((product) => ({ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.technicalProfile, brand: { "@type": "Brand", name: "Rihla Global" }, category: `${product.category} green coffee`, additionalProperty: [["Origin", product.origin], ["Grade", product.grade], ["Moisture Content", product.moisture], ["Screen Size", product.screenSize], ["Black/Broken Beans", "Max 2%"], ["Packaging", "60 kg jute bags with GrainPro / Eco-Tact liners"]].map(([name, value]) => ({ "@type": "PropertyValue", name, value })) }));

  return <div className="pt-20"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /><section className="bg-primary py-20 text-white lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="eyebrow text-accent">The coffee catalogue</p><h1 className="display-title mt-5 max-w-3xl">Indian coffees with a clear physical story.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Browse the current Arabica, Robusta, and specialty grades. Availability remains lot-specific; ask for the latest specification before ordering.</p></div></section><section className="bg-background py-16 lg:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-wrap gap-2 border-b border-primary/15 pb-8">{categories.map((category) => <Button key={category.value} type="button" variant={active === category.value ? "default" : "outline"} className="rounded-full" onClick={() => { setActive(category.value); navigate(category.value === "all" ? "/products" : `/products?category=${category.value}`); }}>{category.label}</Button>)}</div><div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{current.note}</p><h2 className="mt-2 font-serif text-3xl">{current.label}</h2></div><p className="text-sm text-muted-foreground">{filtered.length} current {filtered.length === 1 ? "grade" : "grades"}</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="mt-16 grid gap-6 border-t border-primary/15 pt-8 md:grid-cols-3"><div><p className="eyebrow">Commercial terms</p><p className="mt-3 font-serif text-xl">500 kg minimum order</p></div><div><p className="eyebrow">Standard packing</p><p className="mt-3 font-serif text-xl">60 kg jute bags</p></div><div><p className="eyebrow">On request</p><p className="mt-3 font-serif text-xl">GrainPro / Eco-Tact liners</p></div></div><div className="mt-10 flex flex-wrap gap-4"><a href="/catalogue" className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">View full catalogue <ArrowRight className="ml-2 size-4" /></a><a href="/contact" className="inline-flex items-center rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary">Request current lot specs <Download className="ml-2 size-4" /></a></div></div></section></div>;
}
