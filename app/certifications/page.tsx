import type { Metadata } from "next";

export const metadata: Metadata = { title: "Certifications & Registrations", description: "Review Rihla Global business registrations and coffee-export documentation.", alternates: { canonical: "/certifications" }, openGraph: { title: "Certifications & Registrations | Rihla Global", description: "Review Rihla Global business registrations and coffee-export documentation.", type: "website" } };

const certificates = [
  { title: "GST Registration Certificate", identifier: "GSTIN: 29KMSPS9159C1ZY", file: "/certificates/gst-certificate-rihla.pdf" },
  { title: "Coffee Board RCMC", identifier: "Exporter code: 3116 · Valid through 31 March 2030", file: "/certificates/coffee-board-rcmc-rihla.pdf" },
  { title: "Importer-Exporter Code", identifier: "IEC: KMSPS9159C · Issued by DGFT on 18 January 2025", file: "/certificates/iec-rihla.pdf" },
];

export default function CertificationsPage() {
  return <main className="min-h-screen bg-background px-5 pb-20 pt-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="eyebrow">Trust and documentation</p><h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Certifications &amp; Registrations</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Review the registrations and export documentation that support Rihla Global&apos;s buyer conversations.</p></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{certificates.map((certificate) => <article key={certificate.file} className="flex min-h-64 flex-col border border-primary/15 bg-card p-7 shadow-sm"><p className="eyebrow text-accent">Official document</p><h2 className="mt-5 font-serif text-2xl leading-tight">{certificate.title}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{certificate.identifier}</p><div className="mt-auto flex flex-wrap gap-3 pt-8"><a href={certificate.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">View certificate</a><a href={certificate.file} download className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent">Download</a></div></article>)}</div></div></main>;
}
