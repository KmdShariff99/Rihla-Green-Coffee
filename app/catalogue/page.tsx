import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Catalogue | Rihla Global",
  description: "View the Rihla Global Indian green coffee export catalogue online.",
  alternates: { canonical: "/catalogue" },
};

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-12 pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Buyer resource</p><h1 className="mt-3 font-serif text-4xl">Rihla Global E-Catalogue</h1><p className="mt-3 max-w-2xl text-muted-foreground">Open the current Indian green coffee catalogue in a clean browser tab for your procurement team.</p></div>
          <a href="https://www.rihlaglobal.com/e-catalogue.html" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">View catalogue</a>
        </div>
        <div className="border border-primary/15 bg-card p-8 shadow-sm"><p className="eyebrow">Current buyer catalogue</p><h2 className="mt-3 font-serif text-3xl">Indian green coffee programme</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Open the current Rihla Global catalogue in a separate browser tab for a clean, full-page reading experience.</p><a href="https://www.rihlaglobal.com/e-catalogue.html" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">View catalogue</a></div>
      </div>
    </main>
  );
}
