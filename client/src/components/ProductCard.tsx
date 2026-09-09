import { Link } from "wouter";
import { MapPin, Gauge, Droplets, Grid, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import beansImage from "@assets/stock_images/green_coffee_beans_r_0332a1f5.jpg";
import plantationImage from "@assets/stock_images/coffee_plantation_la_401546ca.jpg";
import warehouseImage from "@assets/stock_images/coffee_export_wareho_9dc79469.jpg";

interface ProductCardProps { product: Product; }
const categoryLabels = { arabica: "Arabica", robusta: "Robusta", specialty: "Specialty" };
const categoryImages = { arabica: plantationImage, robusta: beansImage, specialty: warehouseImage };

export function ProductCard({ product }: ProductCardProps) {
  return <article className="group overflow-hidden border border-primary/15 bg-card" data-testid={`card-product-${product.id}`}>
    <div className="image-frame relative aspect-[16/9] bg-primary"><img src={categoryImages[product.category]} alt={`${product.name} Indian green coffee`} loading="lazy" /><Badge className="absolute left-4 top-4 rounded-full bg-background/90 text-foreground backdrop-blur">{categoryLabels[product.category]}</Badge></div>
    <div className="flex flex-col p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">{product.origin}</p><h3 className="mt-2 font-serif text-2xl leading-tight">{product.name}</h3></div><ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{product.technicalProfile}</p><dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-primary/10 pt-5 text-xs"><div><dt className="text-muted-foreground">Grade</dt><dd className="mt-1 font-medium text-foreground">{product.grade}</dd></div><div><dt className="text-muted-foreground">Screen</dt><dd className="mt-1 font-medium text-foreground">{product.screenSize}</dd></div><div><dt className="text-muted-foreground">Moisture</dt><dd className="mt-1 font-medium text-foreground">{product.moisture}</dd></div><div><dt className="text-muted-foreground">MOQ</dt><dd className="mt-1 font-medium text-foreground">500 kg</dd></div></dl><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="mt-7"><Button variant="outline" className="w-full rounded-full">Request this grade <ArrowUpRight data-icon="inline-end" /></Button></Link></div>
  </article>;
}
