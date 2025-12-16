import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@shared/schema";
import logoImage from "@assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/export-process", label: "Export Process" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}?text=Hello, I'm interested in your green coffee products.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home-logo">
            <img
              src={logoImage}
              alt="Rihla Global Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className={`font-semibold text-lg md:text-xl tracking-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                {companyInfo.name}
              </span>
              <span className={`text-xs tracking-wide transition-colors ${
                isScrolled ? "text-muted-foreground" : "text-white/80"
              }`}>
                {companyInfo.tagline}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? isScrolled
                      ? "text-primary bg-primary/10"
                      : "text-white bg-white/20"
                    : isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-whatsapp-header"
            >
              <Button
                size="sm"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </a>
            <Link href="/contact" data-testid="link-contact-header">
              <Button size="sm" variant="default">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 top-16 bg-background z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 text-base font-medium rounded-md transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              }`}
              data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
            <Link href="/contact" className="w-full">
              <Button className="w-full" variant="default">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
