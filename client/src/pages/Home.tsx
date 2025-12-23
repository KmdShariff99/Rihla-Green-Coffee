import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Download, MessageCircle, CheckCircle, Shield, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { BlogCard } from "@/components/BlogCard";
import { products, blogPosts, companyInfo } from "@shared/schema";

import heroImage1 from "@assets/stock_images/coffee_plantation_la_7f8b9a7f.jpg";
import heroImage2 from "@assets/stock_images/coffee_plantation_la_401546ca.jpg";
import heroImage3 from "@assets/stock_images/coffee_plantation_la_e28f92cf.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

const trustItems = [
  {
    icon: Shield,
    title: "ICB Compliant",
    description: "All products graded per Coffee Board of India standards",
  },
  {
    icon: FileText,
    title: "Transparent Specs",
    description: "Clear moisture, screen size, and grade specifications",
  },
  {
    icon: CheckCircle,
    title: "Export Documentation",
    description: "Complete documentation support for international trade",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Ready to serve buyers across Middle East, Europe, and Asia",
  },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const featuredProducts = products.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}?text=Hello, I'm interested in your green coffee products.`;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Indian coffee plantation ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" data-testid="text-hero-headline">
            Indian Green Coffee Beans Exporter
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-3">
            {companyInfo.tagline}
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Export-grade Indian green coffee beans prepared and graded in compliance with Coffee Board of India standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" data-testid="link-hero-specs">
              <Button size="lg" className="min-w-[200px]">
                Request Specifications
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="/e-catalogue.html" target="_blank" rel="noopener noreferrer" data-testid="link-hero-catalogue">
              <Button size="lg" variant="outline" className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Download E-Catalogue
              </Button>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="link-hero-whatsapp">
              <Button size="lg" className="min-w-[200px] bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366]">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-hero-slide-${index}`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-intro">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            About Rihla Global
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {companyInfo.description}
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:gap-3 transition-all" data-testid="link-learn-more">
            Learn more about us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-card" data-testid="section-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Why Choose Rihla Global
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We prioritize transparency, compliance, and reliable communication in every export partnership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, index) => (
              <Card key={index} className="text-center hover-elevate" data-testid={`card-trust-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-featured-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Export-grade green coffee beans graded per ICB standards
              </p>
            </div>
            <Link href="/products" data-testid="link-view-all-products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-primary" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
            Ready to Source Indian Green Coffee?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Download our comprehensive product catalogue or get in touch to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/e-catalogue.html" target="_blank" rel="noopener noreferrer" data-testid="link-cta-catalogue">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                <Download className="w-4 h-4 mr-2" />
                Download E-Catalogue
              </Button>
            </a>
            <Link href="/contact" data-testid="link-cta-contact">
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-blog-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Industry Insights
              </h2>
              <p className="text-muted-foreground">
                Learn about Indian coffee grades, export standards, and more
              </p>
            </div>
            <Link href="/blog" data-testid="link-view-all-blog">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
