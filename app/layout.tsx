import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { Footer, Header, RevealObserver } from "@/components/SiteChrome";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter=Inter({subsets:["latin"],variable:"--font-sans",display:"swap"});
const fraunces=Fraunces({subsets:["latin"],variable:"--font-display",display:"swap"});
export const metadata:Metadata={metadataBase:new URL("https://www.rihlaglobal.com"),title:{default:"Indian Green Coffee Exporter | Rihla Global",template:"%s | Rihla Global"},description:"Indian green coffee exporter supplying Arabica, Robusta and specialty grades from Chikkamagalur and Kodagu.",alternates:{canonical:"/"},openGraph:{type:"website",siteName:"Rihla Global",images:["/images/origin.jpg"]},twitter:{card:"summary_large_image"}};

export default function RootLayout({children}:{children:React.ReactNode}){
 const ga=process.env.NEXT_PUBLIC_GA_ID;
 return <html lang="en" className={`${inter.variable} ${fraunces.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/><RevealObserver/><OrganizationJsonLd/><div className="grain" aria-hidden="true"/>
 {process.env.NODE_ENV==="production"&&ga&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive"/><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}')`}</Script></>}</body></html>
}