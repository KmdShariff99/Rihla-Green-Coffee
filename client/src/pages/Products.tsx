import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductCategory } from "@shared/schema";

import beansImage from "@assets/stock_images/green_coffee_beans_r_0332a1f5.jpg";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "arabica", label: "Arabica" },
  { value: "robusta", label: "Robusta" },
  { value: "specialty", label: "Specialty" },
];

export default function Products() {
  const search = useSearch();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(search);
  const categoryParam = params.get("category") as ProductCategory | null;
  
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    categoryParam && ["arabica", "robusta", "specialty"].includes(categoryParam)
      ? categoryParam
      : "all"
  );

  useEffect(() => {
    if (categoryParam && ["arabica", "robusta", "specialty"].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: ProductCategory | "all") => {
    setActiveCategory(category);
    if (category === "all") {
      setLocation("/products");
    } else {
      setLocation(`/products?category=${category}`);
    }
  };

  const getCategoryDescription = () => {
    switch (activeCategory) {
      case "arabica":
        return "Washed Arabica coffee (Plantation grades) from the highlands of Karnataka, Kerala, and Tamil Nadu.";
      case "robusta":
        return "Washed Robusta coffee (Plantation grades) from Karnataka and Andhra Pradesh.";
      case "specialty":
        return "Premium specialty coffees including Monsooned Malabar, Mysore Nuggets EB, and Kaapi Royale.";
      default:
        return "Export-grade Indian green coffee beans prepared and graded as per Coffee Board of India (ICB) guidelines.";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden" data-testid="section-products-hero">
        <div className="absolute inset-0">
          <img
            src={beansImage}
            alt="Green coffee beans"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-products-headline">
              Indian Green Coffee Beans
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              {getCategoryDescription()}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-background" data-testid="section-products-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.value)}
                data-testid={`button-category-${category.value}`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && ` in ${activeCategory}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 p-6 bg-card rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">
              Product Availability Notice
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All products are export-grade green coffee beans prepared and graded as per Coffee Board of India (ICB) guidelines. Availability may vary by season and lot. No pricing is displayed publicly—please contact us for current availability and specifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
