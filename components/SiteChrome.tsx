"use client";
import Link from "next/link";
import { useState } from "react";

const links = [["/about","About"],["/products","Products"],["/insights","Insights"],["/certifications","Certifications"],["/contact","Contact"]];

export function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label="Rihla Global home"><span>RIHLA</span><small>GLOBAL</small></Link>
    <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(!open)}>Menu</button>
    <nav id="site-nav" className={open?"open":""} aria-label="Primary navigation">
      {links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}
      <a className="nav-cta" href="https://api.whatsapp.com/send?phone=919398540256" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
    </nav>
  </header>;
}

export function Footer() {
  return <footer>
    <div className="footer-grid">
      <div><p className="wordmark light"><span>RIHLA</span><small>GLOBAL</small></p><p className="footer-note">Indian green coffee, prepared with clarity for international buyers.</p></div>
      <div><p className="kicker">Navigate</p><Link href="/products/arabica">Arabica</Link><Link href="/products/robusta">Robusta</Link><Link href="/products/specialty">Specialty</Link><Link href="/e-catalogue">E-catalogue</Link></div>
      <div><p className="kicker">Export desk</p><p>Bengaluru, India</p><a href={"mailto:"+"exports"+"@"+"rihlaglobal.com"}>{"exports"+"@"+"rihlaglobal.com"}</a><a href="https://api.whatsapp.com/send?phone=919398540256" target="_blank" rel="noopener noreferrer">WhatsApp +91 93985 40256 ↗</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Rihla Global</span><Link href="/certifications">Registered export credentials</Link></div>
  </footer>;
}
