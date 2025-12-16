import { z } from "zod";

// Product Categories
export type ProductCategory = "arabica" | "robusta" | "specialty";

// Product Interface
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  origin: string;
  grade: string;
  moisture: string;
  screenSize: string;
  technicalProfile: string;
  slug: string;
}

// Enquiry Schema
export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  requirement: z.string().min(10, "Please describe your requirement"),
  productInterest: z.string().optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type InsertEnquiry = Enquiry;

// Chat Message Interface
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  category: string;
}

// Export Step Interface
export interface ExportStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

// Products Data
export const products: Product[] = [
  // Arabica Coffee
  {
    id: "arabica-plantation-a",
    name: "Plantation A",
    category: "arabica",
    origin: "India",
    grade: "Plantation A",
    moisture: "Within ICB prescribed limits",
    screenSize: "Typically 17+",
    technicalProfile: "Large-screen Arabica suitable for premium roasting",
    slug: "plantation-a"
  },
  {
    id: "arabica-plantation-b",
    name: "Plantation B",
    category: "arabica",
    origin: "India",
    grade: "Plantation B",
    moisture: "Within ICB prescribed limits",
    screenSize: "Typically 15–16",
    technicalProfile: "Stable Arabica for blends and single-origin programs",
    slug: "plantation-b"
  },
  {
    id: "arabica-plantation-c",
    name: "Plantation C",
    category: "arabica",
    origin: "India",
    grade: "Plantation C",
    moisture: "Within ICB prescribed limits",
    screenSize: "As per ICB norms",
    technicalProfile: "Commercial Arabica with consistent physicals",
    slug: "plantation-c"
  },
  {
    id: "arabica-plantation-bulk",
    name: "Plantation Bulk",
    category: "arabica",
    origin: "India",
    grade: "Plantation Bulk",
    moisture: "Within export norms",
    screenSize: "Mixed, lot-specific",
    technicalProfile: "Bulk Arabica supply for volume buyers",
    slug: "plantation-bulk"
  },
  // Robusta Coffee
  {
    id: "robusta-pb",
    name: "Robusta Plantation PB",
    category: "robusta",
    origin: "India (Karnataka / Andhra Pradesh)",
    grade: "Plantation PB",
    moisture: "As per export standards",
    screenSize: "PB (Peaberry)",
    technicalProfile: "Dense Robusta peaberry with uniform roast behavior",
    slug: "robusta-plantation-pb"
  },
  {
    id: "robusta-ab",
    name: "Robusta Plantation AB",
    category: "robusta",
    origin: "India",
    grade: "Plantation AB",
    moisture: "As per export standards",
    screenSize: "Typically 16+",
    technicalProfile: "Clean washed Robusta for espresso and blends",
    slug: "robusta-plantation-ab"
  },
  {
    id: "robusta-c",
    name: "Robusta Plantation C",
    category: "robusta",
    origin: "India",
    grade: "Plantation C",
    moisture: "As per export standards",
    screenSize: "As per ICB norms",
    technicalProfile: "Commercial Robusta for strength-oriented blends",
    slug: "robusta-plantation-c"
  },
  {
    id: "robusta-bulk",
    name: "Robusta Plantation Bulk",
    category: "robusta",
    origin: "India",
    grade: "Plantation Bulk",
    moisture: "Within export norms",
    screenSize: "Mixed, lot-specific",
    technicalProfile: "Volume Robusta supply",
    slug: "robusta-plantation-bulk"
  },
  // Specialty Coffee
  {
    id: "specialty-monsooned",
    name: "Monsooned Coffee",
    category: "specialty",
    origin: "India (Malabar Coast)",
    grade: "Monsooned",
    moisture: "As per specialty export norms",
    screenSize: "As per specialty norms",
    technicalProfile: "Low acidity, monsoon-conditioned physical character",
    slug: "monsooned-coffee"
  },
  {
    id: "specialty-mysore-nuggets",
    name: "Mysore Nuggets EB",
    category: "specialty",
    origin: "Karnataka, India",
    grade: "Extra Bold Arabica",
    moisture: "Within ICB limits",
    screenSize: "18+",
    technicalProfile: "Large, bold Arabica beans with consistent physicals",
    slug: "mysore-nuggets-eb"
  },
  {
    id: "specialty-kaapi-royale",
    name: "Robusta Kaapi Royale",
    category: "specialty",
    origin: "India",
    grade: "Kaapi Royale",
    moisture: "As per export standards",
    screenSize: "Typically 18+",
    technicalProfile: "Premium washed Robusta with low defect count",
    slug: "robusta-kaapi-royale"
  }
];

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Indian Green Coffee Bean Grades",
    slug: "understanding-indian-green-coffee-bean-grades",
    excerpt: "A comprehensive guide to the grading system used for Indian green coffee beans, from Plantation A to specialty grades.",
    content: `India's coffee grading system is regulated by the Coffee Board of India (ICB), ensuring consistency and quality across all exports. Understanding these grades is essential for international buyers seeking the right product for their needs.

## Arabica Grades

**Plantation A** represents the highest grade of washed Arabica, characterized by screen size 17 and above. These beans are selected for their uniformity, low defect count, and suitability for premium roasting applications.

**Plantation B** features screen sizes between 15-16, offering excellent value for specialty roasters and blend programs. The consistent quality makes it a popular choice for single-origin offerings.

**Plantation C** covers smaller screen sizes while maintaining the clean cup profile expected from Indian washed Arabica.

## Robusta Grades

Indian Robusta is primarily grown in Karnataka and Andhra Pradesh. The grading follows similar principles:

- **Plantation PB (Peaberry)**: Dense, uniform beans ideal for espresso blends
- **Plantation AB**: Screen size 16+, clean washed profile
- **Plantation C**: Commercial grade with good strength characteristics

## Specialty Grades

India offers unique specialty coffees including Monsooned Malabar, Mysore Nuggets Extra Bold, and Kaapi Royale - each with distinctive processing methods and flavor profiles.

Understanding these grades helps buyers specify exactly what they need for their roasting programs.`,
    publishedAt: "2024-11-15",
    readTime: "5 min read",
    category: "Grading"
  },
  {
    id: "2",
    title: "Coffee Board of India Export Standards Explained",
    slug: "coffee-board-india-export-standards",
    excerpt: "Learn about the regulatory framework and quality standards that govern Indian coffee exports.",
    content: `The Coffee Board of India (ICB) serves as the primary regulatory authority for coffee production and export in India. Their standards ensure that Indian coffee maintains its reputation in international markets.

## Quality Parameters

### Moisture Content
All export-grade coffee must meet specific moisture requirements:
- Arabica: Maximum 11% moisture
- Robusta: Maximum 12% moisture
- Monsooned: Controlled higher moisture for specific character

### Screen Size Standards
Screen size is measured using standard sieves:
- Bold grades: Screen 17 and above
- Standard grades: Screen 15-16
- Specialty (Mysore Nuggets EB): Screen 18+

### Defect Count
The ICB specifies maximum allowable defects per 300g sample. Lower defect counts indicate higher quality and command better prices.

## Documentation Requirements

Exporters must provide:
- Certificate of Origin
- Quality certification from ICB-approved graders
- Phytosanitary certificate
- FSSAI compliance documentation

## Export Process Compliance

All shipments undergo inspection at ICB-registered warehouses. This multi-step verification ensures buyers receive exactly what they ordered.

Working with ICB-compliant exporters provides peace of mind and reduces the risk of quality discrepancies.`,
    publishedAt: "2024-10-28",
    readTime: "6 min read",
    category: "Regulations"
  },
  {
    id: "3",
    title: "Arabica vs Robusta: Indian Green Coffee Comparison",
    slug: "arabica-vs-robusta-indian-coffee",
    excerpt: "Compare the characteristics, growing regions, and applications of Indian Arabica and Robusta green coffee beans.",
    content: `India produces both Arabica and Robusta coffee, each with distinct characteristics suited to different market needs. Understanding these differences helps buyers make informed sourcing decisions.

## Growing Regions

### Arabica
Grown primarily in the higher elevations of:
- Karnataka (Chikmagalur, Coorg, Hassan)
- Kerala (Wayanad)
- Tamil Nadu (Nilgiris, Yercaud)

Elevation range: 1,000-1,500 meters above sea level

### Robusta
Thrives in lower elevations:
- Karnataka (coastal regions)
- Andhra Pradesh
- Kerala (lower elevation areas)

Elevation range: 500-1,000 meters

## Physical Characteristics

| Feature | Arabica | Robusta |
|---------|---------|---------|
| Bean Shape | Oval, elongated | Round, smaller |
| Screen Size | Typically larger | Variable |
| Density | Lower | Higher |
| Caffeine | 1.2-1.5% | 2.2-2.7% |

## Cup Profile

**Indian Arabica**: Known for low acidity, medium body, and subtle fruit notes. The shade-grown nature adds complexity.

**Indian Robusta**: Full-bodied with earthy, chocolatey notes. Excellent for espresso blends requiring crema and strength.

## Market Applications

- **Arabica**: Specialty roasters, single-origin programs, premium blends
- **Robusta**: Espresso blends, instant coffee, commercial roasting

Both varieties offer excellent value compared to other origins while maintaining consistent quality standards.`,
    publishedAt: "2024-10-10",
    readTime: "7 min read",
    category: "Education"
  },
  {
    id: "4",
    title: "From Bean to Cup: The Journey of Indian Coffee",
    slug: "bean-to-cup-indian-coffee-journey",
    excerpt: "Follow the complete journey of Indian green coffee from plantation to export, understanding each step in the process.",
    content: `The journey of Indian coffee from plantation to export cup involves multiple carefully managed stages. This process ensures the quality and traceability that international buyers require.

## 1. Cultivation

Indian coffee is predominantly shade-grown under a canopy of forest trees. This traditional method:
- Preserves biodiversity
- Provides natural pest control
- Creates unique flavor profiles
- Supports sustainable farming practices

The coffee plants grow alongside cardamom, pepper, and other spices, contributing to India's distinctive coffee character.

## 2. Harvesting

Harvesting typically occurs from November to February:
- **Arabica**: November to January
- **Robusta**: December to February

Both selective hand-picking and strip harvesting are practiced, depending on grade requirements.

## 3. Processing

India employs several processing methods:

**Washed (Plantation)**: Cherries are pulped, fermented, and washed before drying. This produces the classic Plantation grades.

**Natural**: Cherries are dried whole, creating fruit-forward flavors.

**Monsooning**: A unique Indian process where beans are exposed to monsoon winds for several months, creating the distinctive Monsooned Malabar character.

## 4. Milling and Grading

After drying, beans are:
- Hulled to remove parchment
- Sorted by screen size
- Graded for defects
- Quality tested

## 5. Export Preparation

Final steps include:
- Moisture verification
- Packaging in jute or GrainPro bags
- ICB certification
- Container loading and documentation

This meticulous process ensures that every lot meets international quality standards.`,
    publishedAt: "2024-09-20",
    readTime: "8 min read",
    category: "Process"
  }
];

// Export Steps Data
export const exportSteps: ExportStep[] = [
  {
    step: 1,
    title: "Product Selection & Specification",
    description: "Discuss your requirements and select the appropriate coffee grade, origin, and specifications that match your roasting program.",
    icon: "clipboard-list"
  },
  {
    step: 2,
    title: "Quality Checks & Grading",
    description: "All products undergo rigorous quality testing aligned with Coffee Board of India standards including moisture, screen size, and defect analysis.",
    icon: "check-circle"
  },
  {
    step: 3,
    title: "Packaging Preparation",
    description: "Coffee is packaged according to buyer specifications using jute bags, GrainPro liners, or other approved packaging materials.",
    icon: "package"
  },
  {
    step: 4,
    title: "Export Documentation",
    description: "We prepare all required documentation including Certificate of Origin, phytosanitary certificates, and quality certifications.",
    icon: "file-text"
  },
  {
    step: 5,
    title: "Shipment Coordination",
    description: "Full coordination of logistics from warehouse to destination port, with regular updates and tracking information.",
    icon: "ship"
  }
];

// Company Info
export const companyInfo = {
  name: "Rihla Global",
  tagline: "From Bean to Cup",
  email: "exports@rihlaglobal.com",
  phone: "+91 9398540256",
  whatsapp: "+91 9398540256",
  address: "Bangalore, Karnataka, India",
  description: "Rihla Global is an India-based exporter of green coffee beans, working with growers and processors across major coffee-producing regions. We focus on sourcing, grading, and supplying export-ready green coffee beans with transparent specifications and consistent quality."
};
