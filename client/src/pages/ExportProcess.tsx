import { Link } from "wouter";
import { ArrowRight, ClipboardList, CheckCircle, Package, FileText, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { exportSteps } from "@shared/schema";

import warehouseImage from "@assets/stock_images/coffee_export_wareho_9dc79469.jpg";

const iconMap: Record<string, typeof ClipboardList> = {
  "clipboard-list": ClipboardList,
  "check-circle": CheckCircle,
  "package": Package,
  "file-text": FileText,
  "ship": Ship,
};

export default function ExportProcess() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="section-export-hero">
        <div className="absolute inset-0">
          <img
            src={warehouseImage}
            alt="Coffee export warehouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-export-headline">
              Export Process
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              From product selection to shipment coordination — understanding how we work with international buyers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-export-steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              How We Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our export process is designed for transparency and efficiency, ensuring smooth transactions for international buyers.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            
            <div className="space-y-12 lg:space-y-0">
              {exportSteps.map((step, index) => {
                const Icon = iconMap[step.icon] || ClipboardList;
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={step.step}
                    className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                      index > 0 ? "lg:mt-12" : ""
                    }`}
                    data-testid={`step-${step.step}`}
                  >
                    <div
                      className={`lg:col-span-1 ${
                        isEven ? "lg:text-right" : "lg:col-start-2"
                      }`}
                    >
                      <Card className="inline-block w-full max-w-md hover-elevate">
                        <CardContent className="p-6">
                          <div className={`flex items-start gap-4 ${isEven ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <div className={`flex items-center gap-2 mb-2 ${isEven ? "lg:justify-end" : ""}`}>
                                <Icon className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-foreground">
                                  {step.title}
                                </h3>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-card" data-testid="section-export-docs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Export Documentation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We provide comprehensive documentation support for all export shipments, ensuring compliance with international trade requirements.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Certificate of Origin",
                  "Phytosanitary Certificate",
                  "Quality Certification (ICB-aligned)",
                  "Commercial Invoice & Packing List",
                  "Bill of Lading / Airway Bill",
                  "FSSAI Compliance Documentation",
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" data-testid="link-export-contact">
                <Button>
                  Discuss Your Requirements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={warehouseImage}
                  alt="Export documentation and logistics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-primary" data-testid="section-export-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
            Ready to Start Your Order?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your coffee requirements and begin the export process.
          </p>
          <Link href="/contact" data-testid="link-export-get-started">
            <Button size="lg" variant="secondary">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
