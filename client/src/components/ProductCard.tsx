import { Link } from "wouter";
import { MapPin, Gauge, Droplets, Grid, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps { product: Product; }
const categoryLabels = { arabica: "Arabica", robusta: "Robusta", specialty: "Specialty" };
export function ProductCard({ product }: ProductCardProps) {
  return <article className="group overflow-hidden border border-primary/15 bg-card" data-testid={`card-product-${product.id}`}>
    <div className="flex items-center justify-between border-b border-primary/10 bg-primary/[0.04] px-6 py-4"><Badge className="rounded-full bg-primary text-primary-foreground">{categoryLabels[product.category]}</Badge><span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Available by lot</span></div>
    <div className="flex flex-col p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">{product.origin}</p><h3 className="mt-2 font-serif text-2xl leading-tight">{product.name}</h3></div><ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{product.technicalProfile}</p><dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-primary/10 pt-5 text-xs"><div><dt className="text-muted-foreground">Grade</dt><dd className="mt-1 font-medium text-foreground">{product.grade}</dd></div><div><dt className="text-muted-foreground">Screen</dt><dd className="mt-1 font-medium text-foreground">{product.screenSize}</dd></div><div><dt className="text-muted-foreground">Moisture</dt><dd className="mt-1 font-medium text-foreground">{product.moisture}</dd></div><div><dt className="text-muted-foreground">MOQ</dt><dd className="mt-1 font-medium text-foreground">500 kg</dd></div></dl><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="mt-7"><Button variant="outline" className="w-full rounded-full">Request this grade <ArrowUpRight data-icon="inline-end" /></Button></Link></div>
  </article>;
}
