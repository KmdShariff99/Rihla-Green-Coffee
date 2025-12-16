import { Link } from "wouter";
import { MapPin, Gauge, Droplets, Grid, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  arabica: "bg-green-600 dark:bg-green-700",
  robusta: "bg-amber-600 dark:bg-amber-700",
  specialty: "bg-purple-600 dark:bg-purple-700",
};

const categoryLabels: Record<string, string> = {
  arabica: "Arabica",
  robusta: "Robusta",
  specialty: "Specialty",
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover-elevate" data-testid={`card-product-${product.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {product.name}
          </h3>
          <Badge
            size="sm"
            className={`${categoryColors[product.category]} text-white flex-shrink-0`}
          >
            {categoryLabels[product.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-muted-foreground">Origin:</span>{" "}
              <span className="text-foreground">{product.origin}</span>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <Gauge className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-muted-foreground">Grade:</span>{" "}
              <span className="text-foreground">{product.grade}</span>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <Droplets className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-muted-foreground">Moisture:</span>{" "}
              <span className="text-foreground">{product.moisture}</span>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <Grid className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-muted-foreground">Screen Size:</span>{" "}
              <span className="text-foreground">{product.screenSize}</span>
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-muted-foreground">Profile:</span>{" "}
              <span className="text-foreground">{product.technicalProfile}</span>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="w-full">
          <Button className="w-full" data-testid={`button-quote-${product.id}`}>
            Request Quote
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
