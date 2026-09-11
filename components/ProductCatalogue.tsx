"use client";
import { useMemo, useState } from "react";
import { allProducts, officialGradeSource } from "@/lib/products";

const filters = [
  ["all", "All coffees"],
  ["arabica", "Arabica"],
  ["robusta", "Robusta"],
  ["specialty", "Specialty"],
  ["miscellaneous", "Other official grades"],
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
            <span className="product-type">{product.family}</span>
          </div>
          <h2>{product.name}</h2>
          {product.profile && <p className="product-profile">{product.profile}</p>}
          <dl>
            <div><dt>Origin</dt><dd>{product.origin}</dd></div>
            <div><dt>Preparation</dt><dd>{product.preparation}</dd></div>
            <div><dt>Screen</dt><dd>{product.screen}</dd></div>
            <div><dt>Moisture</dt><dd>{product.moisture}</dd></div>
            {product.tolerance && <div><dt>Tolerance</dt><dd>{product.tolerance}</dd></div>}
          </dl>
          <a className="text-link" href={`/contact?product=${encodeURIComponent(product.name)}`}>Request specification ↗</a>
        </article>
      )}
    </div>
    <aside className="catalogue-assurance">
      <p className="kicker">How to read this register</p>
      <p>These are Coffee Board grade designations and their published physical limits—not a claim that every grade is continuously in stock. For an offered lot, Rihla Global confirms the grade, crop/lot reference, origin, moisture, screen retention, defect tolerance, packing, quantity, shipment terms, and pre-shipment sample before contract. The shipment Certificate of Analysis records the agreed physical checks.</p>
      <a className="text-link" href={officialGradeSource.url} target="_blank" rel="noopener noreferrer">Read the Coffee Board source guide ↗</a>
    </aside>
  </div>;
}