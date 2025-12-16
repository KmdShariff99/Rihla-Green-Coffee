# Design Guidelines for Rihla Global - Indian Green Coffee Exporter

## Design Approach
**Reference-Based B2B Export Design** - Drawing inspiration from professional B2B platforms like Alibaba, Made-in-China, and modern export-focused websites. Prioritizing trust, clarity, and international buyer credibility over consumer-facing aesthetics.

## Core Design Elements

### Typography
- **Headings**: Inter or Manrope (modern sans-serif), bold weights for H1/H2
- **Body Text**: Same family, regular weight for optimal readability
- **Hierarchy**: H1 (48px desktop/32px mobile), H2 (36px/28px), H3 (24px/20px), Body (16px/14px)
- **No decorative or script fonts** - maintain professional B2B tone throughout

### Color Palette
- **Primary**: Deep coffee brown (#3E2723 or similar)
- **Secondary**: Plantation/forest green (#2E7D32 or similar)
- **Backgrounds**: Warm beige/off-white (#F5F5F0), pure white sections alternating
- **Text**: Charcoal/dark grey (#333333) for body, brown for headings
- **Accents**: Subtle gold/tan for hover states

### Layout System
**Tailwind Spacing**: Use p-4, p-8, p-12, p-16, p-20 for consistent rhythm
- Section padding: py-16 md:py-20 lg:py-24
- Container max-widths: max-w-7xl for full sections, max-w-4xl for content-focused areas
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for product cards

### Component Library

**Hero Section**
- Full-width with subtle coffee plantation image slider (3-4 images)
- Dark overlay (40% opacity) for text clarity
- Centered content with prominent headline and 3 CTAs
- Height: 85vh on desktop, auto-height mobile

**Product Cards**
- White background with subtle shadow on hover
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Structure: Grade name (bold), origin line, 4-5 specification bullets, CTA button
- Consistent card height with vertical spacing between specs

**Navigation**
- Sticky header with logo left, menu center, WhatsApp/Contact CTAs right
- Mobile: Hamburger menu with full-screen overlay
- Clean, minimal design with subtle bottom border

**Buttons**
- Primary: Brown background, white text, rounded corners (rounded-lg)
- Secondary: Green background for WhatsApp CTAs
- Ghost: Border-only for secondary actions
- All buttons: Implement blur background when placed over images

**Forms**
- Single-column layout, full-width inputs
- Labels above fields, subtle borders
- Validation states with color indicators
- Generous spacing between fields (mb-6)

**Footer**
- Multi-column layout: Company Info, Quick Links, Products, Contact
- Social icons if applicable
- Copyright and compliance statement
- Background: Slightly darker than body (beige tint)

### Images

**Required Images**:
1. **Hero Section**: Large, high-quality coffee plantation images (3-4 for slider) - green hills, coffee plants, beans on trees. Must have darker overlay for text readability
2. **Product Pages**: Professional photos of green coffee beans (different grades) - close-up, realistic, no styling
3. **About Us**: Indian coffee plantation landscapes, possibly workers/farmers (authentic, not stock)
4. **Export Process**: Subtle logistics imagery - coffee bags, containers, quality checking (understated, not prominent)
5. **Blog Articles**: Relevant contextual images for each article topic

**Image Treatment**: 
- Natural, realistic photography (no filters or heavy editing)
- Avoid café interiors, latte art, consumer coffee imagery
- Focus on origin, raw product, and professional export context

### Animations
**Minimal and Purposeful**:
- Subtle fade-in on scroll for sections (once only)
- Smooth transitions on hover states (0.3s)
- Hero slider with slow, elegant transitions (5s intervals)
- No parallax, no complex scroll animations

### Page-Specific Layouts

**Homepage**:
- Hero with slider (85vh)
- Company Introduction (centered, max-w-4xl)
- Trust & Compliance section (icon + text grid, 4 columns)
- Featured Products preview (3 cards)
- CTA section with E-Catalogue download
- Total: 6-7 sections with generous spacing

**Product Pages**:
- Category hero (40vh, plantation image)
- Product grid with filtering options
- Each product card follows standard template
- Sidebar with quick category navigation (desktop)

**About Us**:
- Centered narrative layout (max-w-3xl)
- 2-column split for company values
- Timeline or process visualization if applicable

**Export Process**:
- Step-by-step numbered layout (1-5 steps)
- Alternating left/right image-text blocks
- Clear iconography for each step

**Blog**:
- Card grid layout (3 columns)
- Featured article at top (full-width)
- Sidebar with categories and recent posts (desktop)

**Contact**:
- 2-column layout: Form left, contact details + map right
- WhatsApp prominent, email clearly visible
- No unnecessary fields - keep to 4 inputs max

### AI Chatbot Integration
- Bottom-right floating widget (not intrusive)
- Brown/green theme matching site
- Compact closed state, expandable chat window
- Clear "AI Assistant" labeling

### WhatsApp Integration
- Floating button: bottom-left on desktop, bottom-right mobile
- Green background (#25D366) with WhatsApp icon
- Pulse animation on initial page load only
- Fixed positioning, always visible

### Mobile Responsiveness
- Stack all multi-column layouts to single column
- Reduce padding: py-12 on mobile vs py-20 desktop
- Hero height: auto on mobile, maintain readability
- Touch-friendly buttons (min 44px height)
- Hamburger menu with slide-in navigation

### Critical Design Principles
1. **Trust First**: Professional, fact-based, no exaggeration
2. **Clarity**: Short paragraphs, bullet points, clear hierarchy
3. **Breathing Room**: Generous whitespace, never cramped
4. **B2B Tone**: Export-focused, not consumer-facing
5. **ICB Compliance**: Specifications prominent and accurate