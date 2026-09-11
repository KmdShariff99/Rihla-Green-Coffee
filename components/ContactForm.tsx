"use client";
import { FormEvent, useRef, useState } from "react";

export function ContactForm() {
  const opened=useRef(Date.now()), [busy,setBusy]=useState(false), [message,setMessage]=useState("");
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); const form=e.currentTarget, data=new FormData(form);
    if(data.get("website") || Date.now()-opened.current<3000){setMessage("Please wait a moment and try again.");return}
    setBusy(true);
    const product=new URLSearchParams(location.search).get("product")||data.get("product")||"Green coffee";
    const text=`Hello Rihla Global, I would like specifications. Product: ${product}. Quantity: ${data.get("quantity")}. Destination: ${data.get("destination")}. Company: ${data.get("company")}. Email: ${data.get("email")}.`;
    window.open(`https://api.whatsapp.com/send?phone=919398540256&text=${encodeURIComponent(text)}`,"_blank","noopener,noreferrer");
    setMessage("Your request is ready in WhatsApp."); setBusy(false);
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label>Company<input name="company" required autoComplete="organization" placeholder="Your company"/></label>
    <label>Business email<input type="email" name="email" required autoComplete="email" placeholder="name@company.com"/></label>
    <label>Product interest<input name="product" placeholder="Arabica, Robusta, or Specialty"/></label>
    <div className="form-row"><label>Quantity (kg)<input type="number" name="quantity" min="500" defaultValue="500" required/></label><label>Destination<input name="destination" required placeholder="Country / port"/></label></div>
    <button className="button dark" disabled={busy}>{busy?"Preparing…":"Continue on WhatsApp"} <span>↗</span></button>
    <p className="form-status" role="status">{message}</p>
  </form>;
}