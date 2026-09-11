import { Category, siteUrl } from "@/lib/products";
export function OrganizationJsonLd(){
  const data={"@context":"https://schema.org","@type":"Organization",name:"Rihla Global",url:siteUrl,logo:`${siteUrl}/logo.jpeg`,address:{"@type":"PostalAddress",addressLocality:"Bengaluru",addressCountry:"IN"},sameAs:["https://api.whatsapp.com/send?phone=919398540256"],keywords:"Indian green coffee exporter, Chikmagalur coffee, Coorg coffee"};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}
export function CategoryJsonLd({category}:{category:Category}){
  const data=[{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:siteUrl},{"@type":"ListItem",position:2,name:"Products",item:`${siteUrl}/products/${category.slug}`} ]},...category.grades.map(g=>({"@context":"https://schema.org","@type":"Product",name:g.name,category:`Green coffee / ${category.title}`,brand:{"@type":"Brand",name:"Rihla Global"},additionalProperty:fieldsFor(g)}))];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}
function fieldsFor(g:Category["grades"][number]){return Object.entries(g).filter(([k])=>k!=="name").map(([name,value])=>({"@type":"PropertyValue",name,value}))}