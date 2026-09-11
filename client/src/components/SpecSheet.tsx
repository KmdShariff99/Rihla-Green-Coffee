"use client";

import { useState } from "react";
import type { Product } from "@shared/schema";

function rows(product: Product) {
  return [
    ["Origin", product.origin || "On request"],
    ["Grade", product.grade || "On request"],
    ["Moisture Content", product.moisture || "On request"],
    ["Screen Size", product.screenSize || "On request"],
    ["Black/Broken Beans", "Max 2%"],
    ["Packaging", "GrainPro / Eco-Tact bags inside Jute bags (for moisture protection)"],
  ];
}

export function SpecSheet({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState(products[0]?.id ?? "");
  const active = products.find((product) => product.id === selected) ?? products[0];
  if (!active) return null;
  return <section className="mt-10" aria-labelledby="buyer-specifications"><h2 id="buyer-specifications" className="font-serif text-2xl">Buyer-grade specifications</h2><div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Coffee grades">{products.map((product) => <button key={product.id} type="button" role="tab" aria-selected={product.id === active.id} onClick={() => setSelected(product.id)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${product.id === active.id ? "border-primary bg-primary text-primary-foreground" : "border-primary/20 bg-card text-foreground hover:border-accent"}`}>{product.grade}</button>)}</div><div className="sr-only" aria-live="polite">Showing specifications for {active.grade}</div><div className="mt-5 grid gap-5 md:grid-cols-2">{products.map((product) => <article key={product.id} id={`spec-${product.id}`} className={`border border-primary/15 bg-card p-5 ${product.id === active.id ? "ring-2 ring-accent/50" : "opacity-75"}`}><h3 className="font-serif text-xl">{product.name}</h3><table className="mt-4 w-full text-left text-sm"><caption className="sr-only">Specifications for {product.name}</caption><tbody>{rows(product).map(([label, value]) => <tr key={label} className="border-b border-primary/10 last:border-0"><th scope="row" className="w-2/5 py-2 pr-3 font-semibold text-primary">{label}</th><td className="py-2 text-foreground/75">{value}</td></tr>)}</tbody></table></article>)}</div></section>;
}
