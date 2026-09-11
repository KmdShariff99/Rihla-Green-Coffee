export type Grade = {
  name: string; origin: string; moisture: string; screen: string;
  tolerance: string; packaging: string;
};

export type Category = {
  slug: "arabica" | "robusta" | "specialty";
  title: string; eyebrow: string; description: string; seo: string; grades: Grade[];
};

const westernGhats = "Western Ghats, India (Chikkamagalur/Kodagu)";

export const categories: Category[] = [
  {
    slug: "arabica", title: "Arabica", eyebrow: "Washed plantation coffee",
    description: "Clean, carefully garbled Indian Arabica for roasters seeking structure, sweetness, and dependable physical preparation.",
    seo: "Arabica Plantation AA green coffee India — washed grades from Chikkamagalur and Kodagu.",
    grades: [
      { name:"Plantation AA", origin:westernGhats, moisture:"10.5% (±0.5% permissible)", screen:"≥90% Screen 18 (7.10 mm); 100% Screen 17", tolerance:"Clean garbled; PB ≤2%, triage ≤3%", packaging:"60 kg jute; GrainPro/Eco-Tact liner on request" },
      { name:"Plantation A", origin:westernGhats, moisture:"10.5% (±0.5% permissible)", screen:"≥90% Screen 17 (6.65 mm); ≤1.5% passes Screen 15", tolerance:"Clean garbled; PB ≤2%, triage ≤3%", packaging:"60 kg jute; liner on request" },
      { name:"Plantation B", origin:westernGhats, moisture:"10.5% (±0.5% permissible)", screen:"≥75% Screen 15 (6.00 mm); ≤1.5% passes Screen 14", tolerance:"Clean garbled; PB ≤2%, triage ≤3%", packaging:"60 kg jute; liner on request" },
      { name:"Plantation C", origin:westernGhats, moisture:"10.5% (±0.5% permissible)", screen:"≥75% Screen 14; 100% stands Screen 13", tolerance:"Free from blacks & damaged beans", packaging:"60 kg jute" },
      { name:"Plantation Bulk", origin:westernGhats, moisture:"10.5% (±0.5% permissible)", screen:"Ungraded", tolerance:"Blacks/browns/bits ≤2%", packaging:"60 kg jute" },
    ],
  },
  {
    slug: "robusta", title: "Robusta", eyebrow: "Washed and natural grades",
    description: "Structured Indian Robusta prepared for espresso, soluble, and blend programmes with clear screen and defect tolerances.",
    seo: "Robusta parchment supplier India — washed and cherry grades from the Western Ghats.",
    grades: [
      { name:"Kaapi Royale (washed)", origin:"Mysore, Kodagu, Wayanad, Travancore, Shevaroy, Bababudan", moisture:"9.0–10.5%", screen:"≥90% Screen 17 (6.70 mm); 100% Screen 15", tolerance:"Free from defects & foreign matter; medium-well polished", packaging:"60 kg jute; liner on request" },
      { name:"Parchment AB", origin:westernGhats, moisture:"10.5%", screen:"≥90% Screen 15; ≤1.5% passes Screen 14", tolerance:"Clean garbled; PB ≤2%, triage ≤3%", packaging:"60 kg jute; liner on request" },
      { name:"Cherry AA", origin:westernGhats, moisture:"11.5%", screen:"≥90% Screen 18 (7.10 mm); 100% Screen 17", tolerance:"Clean garbled; PB ≤2%, triage ≤1%", packaging:"60 kg jute" },
      { name:"Cherry AB", origin:westernGhats, moisture:"11.5%", screen:"≥90% Screen 15", tolerance:"Clean garbled", packaging:"60 kg jute" },
    ],
  },
  {
    slug: "specialty", title: "Specialty", eyebrow: "Distinctive Indian preparations",
    description: "Recognisable Indian profiles shaped by monsooning, origin, and exceptional screen selection.",
    seo: "Monsooned Malabar exporter — distinctive Indian green coffee grades for global buyers.",
    grades: [
      { name:"Monsooned Malabar AA", origin:"India (West Coast monsooning)", moisture:"13.0–14.5%", screen:"≥90% Screen 19 (7.50 mm); ≤1.5% passes Screen 18", tolerance:"Clean garbled; triage ≤3%", packaging:"50–60 kg jute on request" },
      { name:"Monsooned Malabar A", origin:"India (West Coast monsooning)", moisture:"13.0–14.5%", screen:"≥75% Screen 17; ≤1.5% passes Screen 15", tolerance:"Triage ≤3%", packaging:"50–60 kg jute on request" },
      { name:"Mysore Nuggets Extra Bold", origin:"Mysore, Biligiris, Shevaroy", moisture:"9.0–10.5%", screen:"≥90% Screen 19; 100% Screen 17", tolerance:"Defects absent", packaging:"60 kg jute; liner on request" },
    ],
  },
];

export const fields: [keyof Grade, string][] = [
  ["origin","Origin"],["name","Grade"],["moisture","Moisture Content"],
  ["screen","Screen Size"],["tolerance","Defect Tolerance"],["packaging","Packaging"],
];

export const siteUrl = "https://www.rihlaglobal.com";