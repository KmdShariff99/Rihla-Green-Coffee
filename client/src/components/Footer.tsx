import { Link } from "wouter";
import { Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { companyInfo } from "@shared/schema";
import logoImage from "@assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg";

export function Footer() {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}`;
  return <footer className="bg-primary text-primary-foreground" data-testid="footer">
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
        <div><Link href="/" className="flex items-center gap-3"><img src={logoImage} alt="Rihla Global" width="44" height="44" className="size-11 rounded-full object-cover" /><span className="font-serif text-2xl">Rihla <span className="text-accent">Global</span></span></Link><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/65">Indian green coffee, prepared with clarity for buyers who care about origin, physicals, and dependable export coordination.</p><p className="eyebrow mt-8">Indian origin · global standards</p></div>
        <div><p className="eyebrow mb-5 text-primary-foreground/60">Explore</p><div className="flex flex-col gap-3 text-sm text-primary-foreground/70">{[["/products","Coffees"],["/about","Our approach"],["/export-process","Export process"],["/blog","Insights"],["/contact","Contact"]].map(([href,label]) => <Link key={href} href={href} className="transition-colors hover:text-accent">{label}</Link>)}</div></div>
        <div><p className="eyebrow mb-5 text-primary-foreground/60">Coffee desk</p><div className="flex flex-col gap-3 text-sm text-primary-foreground/70"><Link href="/products?category=arabica" className="hover:text-accent">Arabica</Link><Link href="/products?category=robusta" className="hover:text-accent">Robusta</Link><Link href="/products?category=specialty" className="hover:text-accent">Specialty</Link><a href="/e-catalogue.html" className="hover:text-accent">E-catalogue <ArrowUpRight className="inline size-3" /></a></div></div>
        <div><p className="eyebrow mb-5 text-primary-foreground/60">Talk to us</p><div className="flex flex-col gap-4 text-sm text-primary-foreground/70"><a href={`mailto:${companyInfo.email}`} className="flex gap-3 hover:text-accent"><Mail className="size-4 shrink-0 text-accent" />{companyInfo.email}</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-accent"><MessageCircle className="size-4 shrink-0 text-accent" />{companyInfo.whatsapp}</a><span className="flex gap-3"><MapPin className="size-4 shrink-0 text-accent" />{companyInfo.address}</span></div></div>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</span><span>Prepared and graded in compliance with Coffee Board of India standards.</span></div>
    </div>
  </footer>;
}
