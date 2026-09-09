import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@shared/schema";
import logoImage from "@assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg";

const navLinks = [
  { href: "/products", label: "Coffees" },
  { href: "/about", label: "Our approach" },
  { href: "/export-process", label: "Export process" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, [location]);
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent("Hello Rihla Global, I would like a green coffee quote.\nProduct:\nQuantity (kg):\nDestination country:\nPackaging preference:\nCompany:\nBusiness email:\nAdditional requirements:")}`;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "border-b border-primary/10 bg-background/90 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-home-logo">
          <img src={logoImage} alt="Rihla Global" width="48" height="48" className="size-11 rounded-full object-cover ring-1 ring-accent/60" />
          <span className={`font-serif text-xl tracking-tight ${isScrolled ? "text-foreground" : "text-white"}`}>Rihla <span className="text-accent">Global</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${location === link.href ? (isScrolled ? "bg-primary text-primary-foreground" : "bg-white/15 text-white") : (isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white")}`} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(" ", "-")}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] ${isScrolled ? "text-primary" : "text-white"}`}><MessageCircle className="size-4" /> WhatsApp</a>
          <Link href="/contact"><Button size="sm" className="rounded-full px-5">Request specs <ArrowUpRight data-icon="inline-end" /></Button></Link>
        </div>
        <button className={`rounded-full p-2 lg:hidden ${isScrolled ? "text-foreground" : "text-white"}`} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-border bg-background px-5 py-6 shadow-xl lg:hidden"><nav className="flex flex-col gap-2" aria-label="Mobile navigation">{navLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-md px-3 py-3 font-serif text-2xl text-foreground hover:bg-muted">{link.label}</Link>)}<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4"><Button className="w-full rounded-full">Chat on WhatsApp <MessageCircle data-icon="inline-end" /></Button></a></nav></div>}
    </header>
  );
}
