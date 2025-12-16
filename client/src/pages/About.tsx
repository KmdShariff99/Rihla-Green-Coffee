import { Link } from "wouter";
import { ArrowRight, Target, Eye, Handshake, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import plantationImage from "@assets/stock_images/coffee_plantation_la_401546ca.jpg";

const values = [
  {
    icon: Target,
    title: "Transparency",
    description: "Clear specifications and honest communication in every transaction",
  },
  {
    icon: Eye,
    title: "Traceability",
    description: "Full visibility into origin, processing, and quality parameters",
  },
  {
    icon: Handshake,
    title: "Reliability",
    description: "Consistent quality and timely delivery in every shipment",
  },
];

const highlights = [
  "Sourcing from major Indian coffee-producing regions",
  "Coffee Board of India (ICB) grading compliance",
  "Transparent moisture, screen size, and grade specifications",
  "Export documentation support and guidance",
  "Buyer-focused communication and flexibility",
  "Seasonal lot availability updates",
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="section-about-hero">
        <div className="absolute inset-0">
          <img
            src={plantationImage}
            alt="Indian coffee plantation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-about-headline">
              About Rihla Global
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Connecting Indian green coffee producers with international markets through a reliable and transparent export process.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-about-story">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Rihla Global is an India-based exporter of green coffee beans, working with growers and processors across major coffee-producing regions including Karnataka, Kerala, and Tamil Nadu.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We focus on sourcing, grading, and supplying export-ready green coffee beans with transparent specifications and consistent quality. Our approach prioritizes clear communication and reliable service over volume-based claims.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As a growing exporter, we align our practices with Coffee Board of India guidelines and internationally accepted trade norms, ensuring that every lot meets the expectations of discerning buyers worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-card" data-testid="section-about-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every aspect of our export operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-elevate" data-testid={`card-value-${index}`}>
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-about-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                What We Offer
              </h2>
              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`text-highlight-${index}`}>
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/products" data-testid="link-about-products">
                  <Button>
                    Explore Our Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={plantationImage}
                  alt="Coffee plantation landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="font-semibold mb-1">ICB Compliant</p>
                <p className="text-sm text-primary-foreground/80">
                  All products graded per Coffee Board of India standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-primary" data-testid="section-about-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
            Partner With Us
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Looking for a reliable Indian green coffee supplier? Let's discuss how we can meet your sourcing requirements.
          </p>
          <Link href="/contact" data-testid="link-about-contact">
            <Button size="lg" variant="secondary">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
