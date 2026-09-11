export type CoffeeCategory = "arabica" | "robusta" | "specialty" | "miscellaneous";

export type Grade = {
  name: string;
  family: string;
  preparation: string;
  origin: string;
  moisture: string;
  screen: string;
  tolerance: string;
  profile?: string;
};

export type Category = {
  slug: CoffeeCategory;
  title: string;
  eyebrow: string;
  description: string;
  seo: string;
  grades: Grade[];
};

export type CatalogueProduct = Grade & {
  category: CoffeeCategory;
};

const plantationMoisture = "10.5%; +0.5 percentage-point tolerance permitted";
const cherryMoisture = "11.5%; +0.5 percentage-point tolerance permitted";
const specialtyMoisture = "9.0–10.5%; +0.5 percentage-point tolerance permitted";
const monsoonMoisture = "13.0–14.5%; +0.5 percentage-point tolerance permitted";
const noSeparateMoisture = "No separate moisture figure stated for this miscellaneous grade";

function grade(
  name: string,
  family: string,
  preparation: string,
  moisture: string,
  screen: string,
  tolerance: string,
  origin = "India",
): Grade {
  return { name, family, preparation, origin, moisture, screen, tolerance };
}

const plantation = [
  grade("Plantation PB", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "No sieve requirement", "Clean garbled; flats (AB) maximum 2%; PB triage maximum 3% by weight"),
  grade("Plantation A", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "Minimum 90% retained on 6.65 mm (Screen 17); maximum 1.5% passes 6.00 mm (Screen 15)", "Clean garbled; PB maximum 2%; triage maximum 2% by weight"),
  grade("Plantation B", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "Minimum 75% retained on 6.00 mm (Screen 15); maximum 1.5% passes 5.50 mm (Screen 14)", "Clean garbled; PB maximum 2%; triage maximum 3% by weight"),
  grade("Plantation C", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "Minimum 75% retained on 5.50 mm (Screen 14); 100% stands on 5.00 mm (Screen 13)", "May include triage, small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans with less than one-quarter surface affected; free from black and damaged beans"),
  grade("Plantation Blacks", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "100% retained on 5.00 mm (Screen 13)", "May include beans with more than one-quarter surface black, deep blue or dark brown; bleached/spongy, insect-damaged, heavily spotted, stinker and sour beans"),
  grade("Plantation Bits", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "100% passes 5.00 mm (Screen 13)", "Ungarbled; may contain broken beans below one-third bean size and, at the prescribed size, black/brown, bleached/spongy, insect-damaged, heavily spotted, stinker and sour beans"),
  grade("Plantation Bulk", "Commercial · Plantation", "Washed Arabica", plantationMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 2% by weight"),
  grade("Plantation AA", "Premium · Plantation", "Washed Arabica", plantationMoisture, "Minimum 90% retained on 7.10 mm (Screen 18); 100% stands on 6.65 mm (Screen 17); the 10% between these sieves must be whole beans", "Clean garbled; PB maximum 2% by weight; no separate triage allowance stated"),
  grade("Plantation PB Bold", "Premium · Plantation", "Washed Arabica", plantationMoisture, "100% retained on 4.75 mm oblong sieve (Screen 12 oblong)", "Clean garbled; AB maximum 2%; PB triage maximum 2% by weight"),
];

const arabicaCherry = [
  grade("Arabica Cherry PB", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "No sieve requirement", "Clean garbled; flats (AB) maximum 2%; PB triage maximum 3% by weight"),
  grade("Arabica Cherry AB", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "Minimum 90% retained on 6.00 mm (Screen 15); maximum 1.5% passes 5.50 mm (Screen 14)", "Clean garbled; PB maximum 2%; triage maximum 3% by weight"),
  grade("Arabica Cherry C", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "Minimum 75% retained on 5.50 mm (Screen 14); 100% stands on 5.00 mm (Screen 13)", "May include triage, small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans with less than one-quarter surface affected; blacks, browns or bits combined maximum 2%"),
  grade("Arabica Cherry Blacks/Browns", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "100% retained on 5.00 mm (Screen 13)", "May include black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, fungal-damaged, sour and green beans"),
  grade("Arabica Cherry Bits", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "100% passes 5.00 mm (Screen 13)", "Ungarbled; may contain broken beans below one-third bean size and, at the prescribed size, black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, fungal-damaged, sour and green beans"),
  grade("Arabica Cherry Bulk", "Commercial · Arabica Cherry", "Natural Arabica", cherryMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 10% by weight"),
  grade("Arabica Cherry AA", "Premium · Arabica Cherry", "Natural Arabica", cherryMoisture, "Minimum 90% retained on 7.10 mm (Screen 18); 100% retained on 6.65 mm (Screen 17)", "Clean garbled; PB maximum 2%; triage maximum 1% by weight"),
  grade("Arabica Cherry A", "Premium · Arabica Cherry", "Natural Arabica", cherryMoisture, "Minimum 90% retained on 6.65 mm (Screen 17); 100% stands on 6.00 mm (Screen 15)", "Clean garbled; PB maximum 2%; triage maximum 2% by weight"),
  grade("Arabica Cherry PB Bold", "Premium · Arabica Cherry", "Natural Arabica", cherryMoisture, "100% retained on 4.75 mm oblong sieve (Screen 12 oblong)", "Clean garbled; AB maximum 2%; PB triage maximum 2% by weight"),
];

const robustaParchment = [
  grade("Robusta Parchment PB", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "No sieve requirement", "Clean garbled; flats (AB) maximum 2%; PB triage maximum 3% by weight"),
  grade("Robusta Parchment AB", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "Minimum 90% retained on 6.00 mm (Screen 15); maximum 1.5% passes 5.50 mm (Screen 14)", "Clean garbled; PB maximum 2%; triage maximum 3% by weight"),
  grade("Robusta Parchment C", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "Minimum 75% retained on 5.50 mm (Screen 14); 100% retained on 5.00 mm (Screen 13)", "May include triage, small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans with less than one-quarter surface affected; blacks, browns or bits combined maximum 2%"),
  grade("Robusta Parchment Blacks/Browns", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "100% retained on 5.00 mm (Screen 13)", "May include black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, stinker and sour beans"),
  grade("Robusta Parchment Bits", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "100% passes 5.00 mm (Screen 13)", "Ungarbled; may contain broken beans below one-third bean size and, at the prescribed size, black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, stinker and sour beans"),
  grade("Robusta Parchment Bulk", "Commercial · Robusta Parchment", "Washed Robusta", plantationMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 2% by weight"),
  grade("Robusta Parchment A", "Premium · Robusta Parchment", "Washed Robusta", plantationMoisture, "Minimum 90% retained on 6.65 mm (Screen 17); 100% stands on 6.00 mm (Screen 15)", "Clean garbled; PB maximum 2%; no triage tolerance"),
  grade("Robusta Parchment PB Bold", "Premium · Robusta Parchment", "Washed Robusta", plantationMoisture, "100% retained on 4.50 mm oblong sieve (Screen 11 oblong)", "Clean garbled; AB maximum 2%; triage maximum 2% by weight"),
];

const robustaCherry = [
  grade("Robusta Cherry PB", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "No sieve requirement", "Clean garbled; flats (AB) maximum 2%; PB triage maximum 3% by weight"),
  grade("Robusta Cherry AB", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "Minimum 90% retained on 6.00 mm (Screen 15); maximum 1.5% passes 5.50 mm (Screen 14)", "Clean garbled; PB maximum 2%; triage maximum 3% by weight"),
  grade("Robusta Cherry C", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "Minimum 75% retained on 5.50 mm (Screen 14); 100% stands on 5.00 mm (Screen 13)", "May include triage, small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans with less than one-quarter surface affected; blacks, browns or bits combined maximum 2%"),
  grade("Robusta Cherry Blacks/Browns", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "100% retained on 5.00 mm (Screen 13)", "May include black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, fungal-damaged, sour and green beans"),
  grade("Robusta Cherry Bits", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "100% passes 5.00 mm (Screen 13)", "Ungarbled; may contain broken beans below one-third bean size and, at the prescribed size, black/dark-brown, bleached/spongy, insect-damaged, heavily spotted, fungal-damaged, sour and green beans"),
  grade("Robusta Cherry Bulk", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 10% by weight"),
  grade("Robusta Cherry Clean/Bulk", "Commercial · Robusta Cherry", "Natural Robusta", cherryMoisture, "Ungraded", "Free from blacks, browns and bits"),
  grade("Robusta Cherry AA", "Premium · Robusta Cherry", "Natural Robusta", cherryMoisture, "Minimum 90% retained on 7.10 mm (Screen 18); 100% retained on 6.65 mm (Screen 17)", "Clean garbled; PB maximum 2%; triage maximum 1% by weight"),
  grade("Robusta Cherry A", "Premium · Robusta Cherry", "Natural Robusta", cherryMoisture, "Minimum 90% retained on 6.65 mm (Screen 17); 100% stands on 6.00 mm (Screen 15)", "Clean garbled; PB maximum 2%; triage maximum 2% by weight"),
  grade("Robusta Cherry PB Bold", "Premium · Robusta Cherry", "Natural Robusta", cherryMoisture, "100% retained on 4.50 mm oblong sieve (Screen 11 oblong)", "Clean garbled; AB maximum 2%; PB triage maximum 2% by weight"),
];

const specialties = [
  grade("Mysore Nuggets Extra Bold", "Specialty · Extra Bold", "Washed Arabica", specialtyMoisture, "Minimum 90% retained on 7.50 mm (Screen 19); 100% retained on 6.65 mm (Screen 17); the 10% between these sieves must be whole beans", "Medium to well polished and clean garbled; free from PB; brokens including triage and elephant beans; extraneous matter; bleached/spongy, black, brown, insect-damaged, fungal-damaged and pulper-cut beans", "Mysore, Kodagu, Bababudan, Biligiris and Shevaroys"),
  grade("Robusta Kaapi Royale", "Specialty · Kaapi Royale", "Washed Robusta", specialtyMoisture, "Minimum 90% retained on 6.70 mm (Screen 17); 100% retained on 6.00 mm (Screen 15); the 10% between these sieves must be whole beans", "Medium to well polished and clean garbled; free from PB; brokens including triage and elephant beans; extraneous matter; unwashed, bleached/spongy, black, brown, insect-damaged, fungal-damaged and pulper-cut beans", "Mysore, Kodagu, Travancore, Wayanad, Shevaroys, Pulneys and Bababudan"),
  grade("Monsooned Malabar AAA", "Specialty · Monsooned Arabica", "Monsooned Arabica Cherry", monsoonMoisture, "Minimum 90% retained on 7.50 mm (Screen 19); maximum 1.5% passes 7.10 mm (Screen 18)", "Clean garbled; triage maximum 2%; BBB nil", "India · Malabar Coast"),
  grade("Monsooned Malabar AA", "Specialty · Monsooned Arabica", "Monsooned Arabica Cherry", monsoonMoisture, "Minimum 90% retained on 7.10 mm (Screen 18); maximum 1.5% passes 6.70 mm (Screen 17)", "Clean garbled; triage maximum 2%; BBB nil", "India · Malabar Coast"),
  grade("Monsooned Malabar A", "Specialty · Monsooned Arabica", "Monsooned Arabica Cherry", monsoonMoisture, "Minimum 75% retained on 6.70 mm (Screen 17); maximum 1.5% passes 6.00 mm (Screen 15)", "Triage maximum 3%; BBB nil", "India · Malabar Coast"),
  grade("Monsooned Malabar Arabica Triage", "Specialty · Monsooned Arabica", "Monsooned Arabica Cherry", monsoonMoisture, "Minimum 90% retained on 6.00 mm (Screen 15)", "BBB maximum 3%", "India · Malabar Coast"),
  grade("Monsooned Malabar Robusta RR", "Specialty · Monsooned Robusta", "Monsooned Robusta Cherry", monsoonMoisture, "Minimum 90% retained on 7.10 mm (Screen 18); maximum 1.5% passes 6.70 mm (Screen 17)", "Clean garbled; triage maximum 3%; BBB nil", "India · Malabar Coast"),
  grade("Monsooned Malabar Robusta Triage", "Specialty · Monsooned Robusta", "Monsooned Robusta Cherry", monsoonMoisture, "Minimum 90% retained on 6.00 mm (Screen 15)", "BBB maximum 3%", "India · Malabar Coast"),
];

const miscellaneous = [
  grade("Liberia Bulk", "Miscellaneous · Liberica", "Natural Liberica", noSeparateMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 20% by weight"),
  grade("Excelsia Bulk", "Miscellaneous · Excelsa", "Natural Excelsa", noSeparateMoisture, "Ungraded", "Blacks, browns and bits combined: maximum 20% by weight"),
];

export const categories: Category[] = [
  {
    slug: "arabica",
    title: "Arabica",
    eyebrow: "Plantation and Arabica Cherry",
    description: "The complete Coffee Board register for washed Plantation and natural Arabica Cherry grades, including commercial and premium preparations.",
    seo: "Complete Indian Arabica Plantation and Arabica Cherry green coffee grade specifications.",
    grades: [...plantation, ...arabicaCherry],
  },
  {
    slug: "robusta",
    title: "Robusta",
    eyebrow: "Parchment and Robusta Cherry",
    description: "The complete Coffee Board register for washed Robusta Parchment and natural Robusta Cherry grades, including commercial and premium preparations.",
    seo: "Complete Indian Robusta Parchment and Robusta Cherry green coffee grade specifications.",
    grades: [...robustaParchment, ...robustaCherry],
  },
  {
    slug: "specialty",
    title: "Specialty",
    eyebrow: "Distinctive Indian preparations",
    description: "Coffee Board-defined specialty and monsooned grades with named origin, screen, moisture, and physical preparation requirements.",
    seo: "Complete Indian specialty and Monsooned Malabar green coffee grade specifications.",
    grades: specialties,
  },
  {
    slug: "miscellaneous",
    title: "Other official grades",
    eyebrow: "Liberica and Excelsa",
    description: "The Coffee Board's miscellaneous bulk grade designations, shown separately from commercial Arabica, Robusta, and specialty coffees.",
    seo: "Official Indian Liberica and Excelsa miscellaneous coffee grade specifications.",
    grades: miscellaneous,
  },
];

export const fields: [keyof Grade, string][] = [
  ["family", "Classification"],
  ["preparation", "Preparation"],
  ["origin", "Origin"],
  ["name", "Grade"],
  ["moisture", "Moisture"],
  ["screen", "Sieve / screen standard"],
  ["tolerance", "Garbling / tolerance"],
];

export const allProducts: CatalogueProduct[] = categories.flatMap(category =>
  category.grades.map(item => ({ ...item, category: category.slug })),
);

export const officialGradeSource = {
  name: "Coffee Board of India — A Guide to Indian Coffee Quality Specifications",
  url: "https://coffeeboard.gov.in/Indian%20Coffee/coffee%20karma.pdf",
};

export const siteUrl = "https://www.rihlaglobal.com";