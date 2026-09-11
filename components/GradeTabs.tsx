"use client";
import { useState } from "react";
import { Category, fields } from "@/lib/products";

export function GradeTabs({category}:{category:Category}) {
  const [active,setActive]=useState(0);
  return <div className="grade-explorer">
    <div className="tab-list" role="tablist" aria-label={`${category.title} grades`}>
      {category.grades.map((g,i)=><button key={g.name} role="tab" aria-selected={i===active} onClick={()=>setActive(i)}>{g.name}</button>)}
    </div>
    <div className="grade-stack">
      {category.grades.map((g,i)=><article key={g.name} className={`spec-card ${i===active?"active":""}`} aria-hidden={i!==active}>
        <div className="spec-head"><span>0{i+1}</span><h2>{g.name}</h2><p>{category.eyebrow}</p></div>
        <dl>{fields.map(([key,label])=><div key={key}><dt>{label}</dt><dd>{g[key]}</dd></div>)}</dl>
        <a className="text-link" href={`/contact?product=${encodeURIComponent(g.name)}`}>Request this specification <span>↗</span></a>
      </article>)}
    </div>
  </div>;
}