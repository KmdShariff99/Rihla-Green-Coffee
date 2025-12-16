import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { companyInfo } from "@shared/schema";
import logoImage from "@assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/export-process", label: "Export Process" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products?category=arabica", label: "Arabica Coffee" },
  { href: "/products?category=robusta", label: "Robusta Coffee" },
  { href: "/products?category=specialty", label: "Specialty Coffee" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}`;

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" data-testid="link-footer-logo">
              <img
                src={logoImage}
                alt="Rihla Global Logo"
                className="h-10 w-10 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-foreground">
                  {companyInfo.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {companyInfo.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              India-based exporter of premium green coffee beans, supplying
              export-ready coffee with transparent specifications and consistent
              quality.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#25D366] flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
                  data-testid="link-footer-phone"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-[#25D366] flex-shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
                  data-testid="link-footer-whatsapp"
                >
                  WhatsApp: {companyInfo.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {companyInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {currentYear} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              Prepared and graded in compliance with Coffee Board of India
              standards
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
