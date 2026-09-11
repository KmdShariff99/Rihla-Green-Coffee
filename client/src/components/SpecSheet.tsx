import type { Product } from "@shared/schema";

const fixedSpecs = {
  origin: "Western Ghats, India (Chikmagalur/Coorg)",
  moisture: "11.5% - 12.5% (Vetted at Curing Works)",
  screenSize: "17/18",
  defects: "Max 2%",
  packaging: "GrainPro / Eco-Tact bags inside Jute bags (for moisture protection)",
};

export function SpecSheet({ product }: { product: Product }) {
  const grade = product.category === "arabica" ? "Arabica Plantation A" : product.category === "robusta" ? "Robusta Cherry AB" : "Monsooned Malabar";
  const rows = [["Origin", fixedSpecs.origin], ["Grade", grade], ["Moisture Content", fixedSpecs.moisture], ["Screen Size", fixedSpecs.screenSize], ["Black/Broken Beans", fixedSpecs.defects], ["Packaging", fixedSpecs.packaging]];
  return <section className="mt-10" aria-labelledby={`spec-${product.id}`}><h2 id={`spec-${product.id}`} className="font-serif text-2xl">Product Specification: Indian Green Coffee Beans</h2><div className="mt-4 overflow-x-auto border border-primary/15 bg-card"><table className="w-full min-w-[620px] text-left text-sm"><caption className="sr-only">Buyer-grade specifications for {product.name}</caption><tbody>{rows.map(([label, value]) => <tr key={label} className="border-b border-primary/10 last:border-0"><th scope="row" className="w-1/3 px-4 py-3 font-semibold text-primary">{label}</th><td className="px-4 py-3 text-foreground/75">{value}</td></tr>)}</tbody></table></div></section>;
}
