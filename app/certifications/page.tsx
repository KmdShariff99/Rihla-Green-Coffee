import type { Metadata } from "next";

export const metadata: Metadata = { title: "Certifications & Registrations", description: "Review Rihla Global business registrations and coffee-export documentation.", alternates: { canonical: "/certifications" } };

export default function CertificationsPage() {
  return <main className="min-h-screen bg-background px-5 pb-12 pt-20 lg:px-8"><div className="mx-auto max-w-7xl"><iframe title="Rihla Global Certifications and Registrations" src="/certifications-document.html" className="h-[min(88vh,1100px)] w-full border-0" /></div></main>;
}
