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
          <div><p className="eyebrow">Buyer resource</p><h1 className="mt-3 font-serif text-4xl">Rihla Global E-Catalogue</h1><p className="mt-3 max-w-2xl text-muted-foreground">Browse the current Indian green coffee catalogue in your browser, or download a copy for your procurement team.</p></div>
          <a href="/e-catalogue.html" download="rihla-global-e-catalogue.html" className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Download catalogue</a>
        </div>
        <div className="overflow-hidden border border-primary/15 bg-card shadow-sm"><iframe title="Rihla Global E-Catalogue" src="/catalogue-document.html" className="h-[min(78vh,900px)] w-full" /></div>
      </div>
    </main>
  );
}
