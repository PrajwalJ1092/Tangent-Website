# TANGENT STUDIO — GLOBAL MOTION DESIGN SYSTEM & INVENTORY
**Specification & Implementation Reference for Architectural Motion Excellence**
*Version 1.0 · Phase 1 Foundation*

---

## 1. Design Philosophy & Architectural Rationale

Tangent Studio's motion language is rooted in **tectonic weight, calm deceleration, and editorial arrival**. Motion is never used as decorative garnish; it functions as spatial choreography that establishes depth, material authenticity, and calm focus.

### The Five Core Motion Directives:
1. **Fluid Deceleration (`cinematic: [0.22, 1, 0.36, 1]`)**: Elements enter with confident inertia and settle gently into place.
2. **Clipping & Massing (`mask: [0.77, 0, 0.175, 1]`)**: Images and typography emerge from strict architectural boundaries rather than simple generic opacity fades.
3. **Restrained Typography**: Headings reveal line-by-line through overflow-hidden masks. Paragraphs use subtle opacity and micro-translation.
4. **Zero Layout Shifts**: All image containers maintain fixed aspect ratios (`aspect-[16/10]`, `aspect-[3/4]`, `aspect-square`). Animations occur strictly on hardware-accelerated transforms (`transform: translate3d / scale`) and `opacity`.
5. **Universal Accessibility (`prefers-reduced-motion: reduce`)**: Users requesting reduced motion receive instant, complete content visibility with zero delay, zero motion disorientation, and 100% functionality.

---

## 2. Motion Token Architecture

### 2.1 Easing Curves
| Token Name | Cubic Bezier | Description | Primary Application |
| :--- | :--- | :--- | :--- |
| `MOTION_EASINGS.cinematic` | `[0.22, 1, 0.36, 1]` | Fluid, high-inertia architectural deceleration | Hero typography, page transitions, card reveals |
| `MOTION_EASINGS.editorial` | `[0.16, 1, 0.3, 1]` | Crisp, precise spatial arrival | Hairline dividers, card lift, navigation links |
| `MOTION_EASINGS.mask` | `[0.77, 0, 0.175, 1]` | Quartic curtain wipe | Image clipping masks, chapter curtains |
| `MOTION_EASINGS.gentle` | `[0.25, 0.1, 0.25, 1]` | Ambient atmospheric transition | Paragraph text, background color shifts |
| `MOTION_EASINGS.snappy` | `[0.4, 0, 0.2, 1]` | Responsive micro-interaction | Button active states, animated underlines |

### 2.2 Duration Scale
| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `MOTION_DURATIONS.micro` | `0.20s` | Quick feedback: buttons, quantity counters, pills, toggle switches |
| `MOTION_DURATIONS.standard` | `0.35s` | Navigation drawers, modal overlays, card hover states |
| `MOTION_DURATIONS.medium` | `0.55s` | Paragraph arrivals, supporting metadata, specification rows |
| `MOTION_DURATIONS.reveal` | `0.85s` | Masked headlines, image clipping reveals, section introductions |
| `MOTION_DURATIONS.cinematic`| `1.25s` | Hero canvas entrance, full-section atmospheric shifts |
| `MOTION_DURATIONS.page` | `0.30s` | Route transitions between pages (non-blocking) |

### 2.3 Stagger Cadence
| Token Name | Delay Interval | Application |
| :--- | :--- | :--- |
| `MOTION_STAGGERS.tight` | `0.06s` | Short badge lists, category pills |
| `MOTION_STAGGERS.standard` | `0.10s` | Product cards, project grids, navigation items |
| `MOTION_STAGGERS.relaxed` | `0.16s` | Large editorial chapters, philosophical statements |

---

## 3. Reusable Component Primitives

The system provides 9 self-contained, strongly-typed components in `@/components/motion`:

1. **`ScrollReveal`**: Scroll-triggered viewport wrapper supporting `fade-up`, `fade-in`, `scale-subtle`, and `clip-up` with reverse-scroll safety.
2. **`MaskedText`**: Editorial text reveal that splits by line or phrase behind an `overflow-hidden` mask.
3. **`ImageReveal`**: Architectural image reveal using directional clip-path (`up`, `down`, `left`, `right`) with subtle inner scale drift.
4. **`StaggerGroup` & `StaggerItem`**: Rhythmic child coordination for grids, tables, and lists.
5. **`ParallaxWrapper`**: Scroll-linked differential rate movement with mobile dampening.
6. **`ScrollScaleImage`**: Continuous scroll scrub scale from 1.0 to 1.08 with touch safety.
7. **`SectionTransition`**: Architectural hairline drawing, coordinate badge, and gradient masks linking zones.
8. **`PageTransition`**: Global route transition with scroll restoration and accessible focus management.
9. **`HoverMotion` (`HoverUnderline`, `MagneticHover`, `CardHover`)**: Micro-interaction suite for links, buttons, and cards.

---

## 4. Comprehensive Route & Section Motion Inventory

| Route | Page & Section | Elements to Animate | Trigger Type | Animation Type | Duration / Sequence | Desktop Behavior | Mobile Alternative | Reduced-Motion Alternative |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **All Routes** | Global Navigation | Header bar, logo, links, cart badge | Mount & Hover | Blur backdrop, `HoverUnderline`, spring badge | `0.20s`–`0.35s` | Underline expands on hover; badge springs on item add | Compact hamburger menu with smooth slide-down drawer | Instant active highlight, static badge count |
| **All Routes** | Page Route Transition | Entire main view container | Route Change | `PageTransition` (opacity `0→1`, `y: 8px→0`) | `0.30s` | Seamless crossfade with immediate top scroll reset | Identical non-blocking crossfade | Instant page swap (`opacity: 1`, `duration: 0`) |
| `/` | Hero Section | Architectural canvas, title, monograph badge | Mount / Load | Scale drift (`1.08→1.0`), `MaskedText`, line draw | `1.25s`, stagger `0.12s` | Subtle ambient parallax on scroll, masked line reveal | Scale drift disabled, simple fade-in | Static image, instant text display |
| `/` | Studio Statement | Philosophical headline, metadata coordinates, specimen | Scroll In-View | `MaskedText`, `ScrollReveal (fade-up)` | `0.85s`, delay `0.15s` | Line-by-line editorial rise, hairline border growth | Simple block fade-up | Instant visibility |
| `/` | Project Index | Architectural table rows, hover preview card | Scroll & Hover | Row stagger, floating thumbnail tracker | Stagger `0.08s`, hover `0.2s` | Cursor-following image portal with smooth lerp | Static thumbnails embedded inside rows | Hover tracker disabled |
| `/` | Monograph Study | Anatomy of Engadin Monolith (3 Chapters) | Click / Tab / Autoplay | `AnimatePresence` image crossfade, specs slide | `0.45s` ease-out | Smooth crossfade of figure photo & technical specs | Touch-friendly tab buttons with horizontal swipe | Instant chapter swap |
| `/` | Services Grid | 4 Disciplines (Architecture, Interior, Planning, Vis) | Scroll In-View | `StaggerGroup` (`fade-up`) | Stagger `0.10s` | Staggered card entrance with hover border highlight | Standard vertical stack entrance | Instant grid rendering |
| `/` | Digital Products | Featured 3D asset cards, pricing in INR, Quick Add | Scroll In-View & Click | `CardHover (lift 3px)`, badge spring, quick-add tick | `0.35s` hover, `0.2s` click | Tactile card elevation, add button morphs to checkmark | Standard touch tap feedback | Instant state changes without lift |
| `/` | Design Process | 4 Phases (Discover, Develop, Refine, Deliver) | Scroll In-View | `StaggerGroup` with hairline connector | Stagger `0.14s` | Sequential phase appearance with subtle indicator pulse | Vertically stacked phases | Static timeline |
| `/` | Journal / Editorial | Journal articles, reading time, publication dates | Scroll In-View | `ImageReveal (up)`, `HoverUnderline` | `0.75s` reveal | Image curtain wipe with title underline hover | Standard fade-up | Instant image display |
| `/` | Studio CTA | Dark canvas banner, inquiry button | Scroll In-View | `ScrollReveal (scale-subtle)` | `0.85s` | Atmospheric dark container subtle scale arrival | Standard container entrance | Instant visibility |
| `/projects` | Commissions Gallery | Category filter pills, project cards grid | Mount & Tab click | Filter transition, `CardHover`, `ImageReveal` | `0.35s` filter, `0.75s` image | Category pill morphs active state; card lifts subtly | Full-width mobile card list | Instant filter changes |
| `/projects/:slug` | Project Detail | Hero cover image, technical spec sheet, gallery | Mount & Scroll | `ScrollScaleImage`, `MaskedText`, lightbox | `1.20s` cover, `0.6s` specs | Cover image drifts slightly on scroll; gallery opens lightbox | Parallax disabled on mobile | Static cover image |
| `/shop` | Digital Marketplace | Search input, filter pills, product grid | Input & Filter | Dynamic grid reflow, `CardHover`, badge spring | `0.25s` search debounce | Instant reactive filtering with subtle fade | Sticky filter pills bar | Static layout |
| `/shop/:slug` | Product Detail | Image gallery, lightbox, license radio, sticky bar | Scroll & Click | Lightbox zoom, license pill switch, sticky bar pop-up | `0.30s` license, `0.25s` bar | Sticky purchase bar slides up when hero CTA scrolls off | Sticky purchase bar pinned to bottom viewport | Instant bar visibility |
| `/cart` | Cart Management | Cart line items, seat increment stepper, coupon input | State Change | Row exit/enter animation, subtotal count | `0.20s` stepper | Smooth height collapse on item removal | Mobile-optimized cart drawers | Instant removal without height animation |
| `/checkout` | Checkout Flow | Two-column billing form, live order breakdown | Form Validation | Error message accordion, simulated purchase loader | `0.25s` accordion | Smooth inline validation error reveals | Single-column form stack | Instant validation text |
| `/checkout/confirmation` | Order Complete | Success checkmark, license key reveal, download triggers | Mount | Checkmark draw, `StaggerGroup` items | `0.65s` check, `0.1s` stagger | Coordinated celebratory reveal | Stacked license keys | Instant receipt display |
| `/about` | Studio Monograph | 3 Spatial pillars, atelier timeline, leadership | Scroll In-View | `EditorialHeading`, `ParallaxWrapper` | `0.85s` heading | Layered parallax between photography and philosophy text | Parallax dampened by 65% | Static text and images |
| `/contact` | Atelier Inquiries | Inquiry form, atelier coordinates, FAQ accordion | Form Interaction | Floating focus ring, accordion expand, submission badge | `0.25s` expand | Accordion smooth height expansion | Full touch targets (min 44px) | Instant accordion toggle |

---

## 5. Developer Guide: How Subsequent Phases Must Use This System

When implementing features in future phases:
1. **Never create ad-hoc keyframes or inline CSS transitions**:
   Always import from `@/components/motion` or use `MOTION_EASINGS` / `MOTION_DURATIONS`.
2. **For Headings**:
   Use `<MaskedText as="h2">` or `<EditorialHeading title="..." />`.
3. **For Image Figures**:
   Use `<ImageReveal src={...} alt={...} aspectRatio="landscape" />`.
4. **For Cards & Grids**:
   Wrap the container in `<StaggerGroup>` and each card in `<StaggerItem>` with `<CardHover>`.
5. **For Route Pages**:
   `<PageTransition>` is already globally bound in `RootLayout.tsx`. Ensure all new pages export clean, accessible semantic structures.
6. **For GSAP / ScrollTrigger Sequences**:
   Always use the `useGSAPContext(callback, deps, scopeRef)` hook from `@/lib/gsapConfig` to guarantee that triggers are safely garbage collected and reverted upon route changes.

---

## 6. Phase 4 Implementation Reference: Digital-Product Store

### 6.1 Product Catalogue (`/shop`)
- **Editorial Typography**: Headings reveal with `MaskedText` and fluid cubic bezier easing.
- **Natural Stagger**: Product cards render in rhythmic cadence with `StaggerGroup` and `StaggerItem`.
- **Zero-Flicker Layout Transitions**: Dynamic category pill switching and search input reflow use Framer Motion's `layout` and `<AnimatePresence mode="popLayout">` to eliminate abrupt jumps.
- **Refined Card Mockups**: `ProductCard` integrates `CardHover` (subtle 3px elevation + border highlight), format badge pills, and instant reactive quick-add state with animated confirmation.

### 6.2 Product Detail Page (`/shop/:slug`)
- **Coordinated Entrance**: Editorial title with `MaskedText`, metadata specs, and purchase panel animate in sequential harmony.
- **Interactive Preview Gallery**: Thumbnail switcher crossfades active imagery with smooth transitions, plus accessible fullscreen lightbox overlay.
- **Collapsible FAQ Accordion**: Animated height expansion using `AnimatePresence` with complete keyboard accessibility.
- **Sticky Purchase Bar**: Automatically slides into view on desktop and mobile when the primary hero CTA scrolls out of the viewport.

### 6.3 Cart & Checkout Experience (`/cart`, `/checkout`, `/checkout/confirmation`)
- **Interactive Bag (`/cart`)**: Item additions and removals animate with `AnimatePresence mode="popLayout"`, maintaining focus and updating authoritative INR subtotal calculations instantly.
- **Truthful Demo Checkout (`/checkout`)**: Subtle inline error validation animations, loading state with spinning SVG indicator, and clear disclaimer that this is a simulated design demonstration (no real card data or payment).
- **Celebratory Confirmation (`/checkout/confirmation`)**: Masked title reveal, animated order reference banner, simulated license key display, and simulated asset package download trigger.

---

## 7. Phase 5 Implementation Reference: Universal Motion Integration

Every route and shared component across Tangent Studio is now integrated into the architectural motion system:

### 7.1 Studio Practice Monograph (`/about`, `/studio`)
- **Editorial Monograph Cover**: Cinematic clip-up reveal on Nordic Forest Pavilion banner with subtle scale expansion.
- **Tectonic Philosophy Pillars**: Staggered cards with `CardHover` (4px elevation + border highlight), custom iconography, and responsive grid reflow.
- **Methodology & Leadership**: 4-stage architectural journey and studio leadership cards choreographed with `StaggerGroup`.

### 7.2 Services & Disciplines (`/services`)
- **Disciplinary Showcase**: Four comprehensive architectural discipline profiles (Bespoke Residential, Cultural & Civic, Interior Architecture & Joinery, Computational Visualization & Licensing).
- **Deliverables & Specifications**: Alternating layout with `ScrollReveal`, BIM sub-millimeter metrics, and direct inquiry actions.

### 7.3 Journal & Spatial Research (`/journal`, `/journal/:slug`)
- **Article Index**: Publication-grade lead essay with interactive cover zoom, reading time badges, and staggered archive cards.
- **Comfortable Reading Layout**: Max-width typographic measures, masked headlines, drop quotes, figure captions, and related research recommendations.

### 7.4 Frequently Asked Questions (`/faq`)
- **Categorized Tabs**: Architectural Practice, Digital Products, and Billing operations.
- **Accessible Accordion**: Animated height transitions with Framer Motion `AnimatePresence`, full keyboard navigation, and aria-expanded state attributes.

### 7.5 Contact & Simulated Inquiries (`/contact`)
- **Accessible Form Feedback**: Animated inline error message reveals with zero layout displacement.
- **Receipt Transition**: Coordinated state swap between inquiry brief and verified prototype receipt with reference codes.
- **Verified Coordinates**: Interactive cards with verified Google Maps navigation links.

### 7.6 404 Architectural Disconnection (`*`)
- **Editorial Identity**: Masked 404 headline, spinning coordinate compass, and direct links to Studio Main, Built Projects, and Digital Shop.

### 7.7 Shared Navigation & Global Footer
- **Mobile Menu Drawer**: Smooth slide-down with keyboard trapping, escape dismissal, and quick-links to Research & Practice (Services, Journal, FAQ).
- **Global Footer**: Staggered columns with `HoverUnderline` active indicators, studio coordinates, and comprehensive monograph sitemap.
- **Shared States**: `EmptyState` and `LoadingState` enhanced with smooth entrance animations and consistent warm ivory architectural styling.


