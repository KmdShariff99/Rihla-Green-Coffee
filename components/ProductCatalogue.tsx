"use client";
import { useMemo, useState } from "react";
import { allProducts } from "@/lib/products";

const filters = [
  ["all", "All coffees"],
  ["arabica", "Arabica"],
  ["robusta", "Robusta"],
  ["specialty", "Specialty"],
] as const;

export function ProductCatalogue() {
  const [active, setActive] = useState<(typeof filters)[number][0]>("all");
  const products = useMemo(
    () => active === "all" ? allProducts : allProducts.filter(product => product.category === active),
    [active],
  );

  return <div>
    <div className="catalogue-toolbar">
      <div className="filter-group" role="group" aria-label="Filter coffees by category">
        {filters.map(([value, label]) =>
          <button key={value} className={active === value ? "active" : ""} aria-pressed={active === value} onClick={() => setActive(value)}>
            {label}
          </button>
        )}
      </div>
      <p aria-live="polite"><strong>{products.length}</strong> products shown</p>
    </div>
    <div className="product-grid">
      {products.map((product, index) =>
        <article className="product-list-card reveal" key={`${product.category}-${product.name}`}>
          <div className="product-card-head">
            <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="product-type">{product.preparation}</span>
          </div>
          <h2>{product.name}</h2>
          {product.profile && <p className="product-profile">{product.profile}</p>}
          <dl>
            <div><dt>Origin</dt><dd>{product.origin}</dd></div>
            <div><dt>Screen</dt><dd>{product.screen}</dd></div>
            <div><dt>Moisture</dt><dd>{product.moisture}</dd></div>
            {product.tolerance && <div><dt>Tolerance</dt><dd>{product.tolerance}</dd></div>}
            {product.packaging && <div><dt>Packaging</dt><dd>{product.packaging}</dd></div>}
          </dl>
          <a className="text-link" href={`/contact?product=${encodeURIComponent(product.name)}`}>Request specification ↗</a>
        </article>
      )}
    </div>
  </div>;
}