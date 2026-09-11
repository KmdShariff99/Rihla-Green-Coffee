import { Link } from "wouter";
import { ArrowDownRight, ArrowRight, Check, Download, MessageCircle, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, companyInfo } from "@shared/schema";
import plantationImage from "@assets/stock_images/coffee_plantation_la_7f8b9a7f.jpg";
import warehouseImage from "@assets/stock_images/coffee_export_wareho_9dc79469.jpg";
import { PlantationCarousel } from "@/components/PlantationCarousel";
import { MotionReveal } from "@/components/MotionReveal";
import { CountUp } from "@/components/CountUp";

const journeys = [
  ["01", "Plantation", "Where altitude, shade, and careful cultivation shape the lot."],
  ["02", "Cherry & process", "From ripe cherry through parchment, each stage matters."],
  ["03", "Green coffee", "Clean, graded physicals prepared for a buyer's program."],
  ["04", "Export desk", "Clear specifications, documentation, and direct communication."],
];

const categoryContent = [
  { label: "Arabica", copy: "Washed Plantation grades with clear physical specifications.", href: "/products?category=arabica" },
  { label: "Robusta", copy: "Plantation grades selected for blends, espresso, and volume programs.", href: "/products?category=robusta" },
  { label: "Specialty", copy: "Distinctive Indian coffees including Monsooned and bold lots.", href: "/products?category=specialty" },
];

export default function Home() {
  const whatsappNumber = companyInfo.whatsapp.replace(/\D/g, "");
  const whatsappMessage = "Hello Rihla Global, I would like a green coffee quote.\nProduct:\nQuantity (kg):\nDestination country:\nPackaging preference:\nCompany:\nBusiness email:\nAdditional requirements:";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
  return <div className="overflow-hidden">
    <section className="relative flex min-h-[min(860px,100vh)] items-end bg-primary" data-testid="section-hero">
      <img src={plantationImage} alt="Coffee plantation in India" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(155_25%_8%/.88)_0%,hsl(155_25%_8%/.62)_48%,hsl(155_25%_8%/.14)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(155_25%_8%/.72),transparent_45%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
        <div className="max-w-3xl"><p className="eyebrow mb-7 text-accent">Indian origin · green coffee · export desk</p><h1 className="display-title max-w-3xl text-white">Indian green coffee, prepared for the world.</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">Export-ready Arabica, Robusta, and specialty coffees with transparent specifications and a direct line to the people behind each enquiry.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/contact"><Button size="lg" className="rounded-full px-7">Request specifications <ArrowRight data-icon="inline-end" /></Button></Link><Link href="/products"><Button size="lg" variant="outline" className="rounded-full border-white/35 bg-white/10 px-7 text-white backdrop-blur hover:bg-white/20">Explore our coffees <ArrowDownRight data-icon="inline-end" /></Button></Link></div></div>
        <div className="mt-16 flex flex-col gap-5 border-t border-white/20 pt-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"><span>Minimum order · <CountUp value={500} suffix=" kg" /></span><span><CountUp value={60} suffix=" kg" /> jute bags · GrainPro or hermetic liners on request</span><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:text-white"><MessageCircle className="size-4" /> Start a buyer conversation</a></div>
      </div>
    </section>

    <section className="bg-background py-20 lg:py-32" data-testid="section-intro"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.7fr_1.3fr] lg:px-8"><div><p className="eyebrow">A clear starting point</p><h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-5xl">The right coffee begins with the right conversation.</h2></div><div className="max-w-2xl lg:pt-10"><p className="text-xl leading-8 text-foreground/75">Rihla Global connects Indian green coffee with international B2B buyers through a practical, transparent export process.</p><div className="mt-10 grid gap-6 border-t border-primary/15 pt-6 sm:grid-cols-3">{[["01","Indian origin"],["02","Lot-specific clarity"],["03","Export support"]].map(([number,label]) => <div key={number}><span className="font-mono text-xs text-accent">{number}</span><p className="mt-2 font-serif text-lg">{label}</p></div>)}</div></div></div></section>

    <section className="bg-primary py-20 text-primary-foreground lg:py-28" data-testid="section-journey"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-accent">From bean to brief</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">A supply story you can follow.</h2><p className="mt-6 max-w-sm leading-7 text-primary-foreground/65">A premium coffee experience is not only about the cup. It is about knowing what you are buying, how it was prepared, and who will answer the next question.</p></div><div className="grid gap-0 sm:grid-cols-2">{journeys.map(([number,title,copy], index) => <MotionReveal key={number} delay={index * 0.06}><div className="border-t border-primary-foreground/20 py-7 sm:px-6 first:sm:pl-0"><span className="font-mono text-xs text-accent">{number}</span><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/60">{copy}</p></div></MotionReveal>)}</div></div></div></section>

    <section className="bg-background py-20 lg:py-32" data-testid="section-coffees"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">The coffee desk</p><h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Our coffees</h2></div><Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">View full catalogue <MoveUpRight className="size-4" /></Link></div><div className="grid gap-5 lg:grid-cols-3">{categoryContent.map((category, index) => <MotionReveal key={category.label} delay={index * 0.06}><Link href={category.href} className="group flex min-h-[260px] flex-col justify-between border border-primary/15 bg-card p-7 transition-colors hover:border-accent hover:bg-secondary/35"><div><p className="eyebrow text-accent">Indian green coffee</p><h3 className="mt-3 font-serif text-3xl text-foreground">{category.label}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{category.copy}</p></div><span className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-primary">Explore category <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link></MotionReveal>)}</div></div></section>

    <section className="bg-secondary/45 py-20 lg:py-28" data-testid="section-assurance"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8"><PlantationCarousel /><div><p className="eyebrow">Built for buyers</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Specifics before promises.</h2><p className="mt-6 leading-7 text-muted-foreground">We keep the conversation grounded in what matters to a procurement team: product, grade, physicals, packing, destination, and next steps.</p><ul className="mt-8 flex flex-col gap-4">{["Transparent grade and screen information", "Export documentation support", "500 kg minimum order", "Direct email and WhatsApp response"].map((item) => <li key={item} className="flex items-start gap-3 text-sm"><span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" /></span>{item}</li>)}</ul><Link href="/about" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary">See our approach <ArrowRight className="size-4" /></Link></div></div></section>

    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28" data-testid="section-cta"><img src={warehouseImage} alt="Coffee export preparation" loading="lazy" className="absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity" /><div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8"><p className="eyebrow text-accent">Start with a specification</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Tell us what your coffee program needs.</h2><p className="mx-auto mt-6 max-w-xl leading-7 text-primary-foreground/65">Share the product, quantity, destination, and packing preference. We will take it from there.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/contact"><Button size="lg" variant="secondary" className="rounded-full px-7">Request specifications <ArrowRight data-icon="inline-end" /></Button></Link><a href="/catalogue" target="_blank" rel="noopener noreferrer"><Button size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10"><Download data-icon="inline-start" /> Download catalogue</Button></a></div></div></section>
  </div>;
}
