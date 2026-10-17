export interface JournalArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  publishedAt: string
  readingTime: string
  category: 'Spatial Research' | 'Materiality' | 'Computation' | 'Monograph Notes'
  author: {
    name: string
    role: string
  }
  coverImage: {
    url: string
    alt: string
    caption: string
  }
  excerpt: string
  content: Array<{
    heading?: string
    paragraphs: string[]
    quote?: string
    figure?: {
      url: string
      alt: string
      caption: string
    }
  }>
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'the-poetics-of-mass',
    title: 'The Poetics of Mass: Cast Concrete & Solar Daylighting',
    subtitle: 'Observations on thermal mass, deep reveals, and solar orientation across high-altitude alpine terrain.',
    publishedAt: 'October 14, 2026',
    readingTime: '6 min read',
    category: 'Spatial Research',
    author: {
      name: 'Prajwal J.',
      role: 'Principal Architect & Spatial Strategist',
    },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
      alt: 'Monolithic concrete ceiling with circular skylight illuminating stone walls',
      caption: 'Figure 1.0 — Incident solar daylighting across board-formed concrete mass.',
    },
    excerpt:
      'In an era characterized by paper-thin cladding and rapid novelty, mass remains our most enduring medium. By casting thick architectural concrete walls, we construct not merely an enclosure, but a thermal capacitor and a quiet acoustic sanctuary.',
    content: [
      {
        heading: 'I. The Primacy of Architectural Mass',
        paragraphs: [
          'Modern construction has largely surrendered to the logic of the curtain wall—an assembly of composite panels, vapor membranes, and insulated glass units suspended from lightweight steel ribs. While engineered for rapid assembly, such skins inevitably lack the deep tectonic inertia that grounds architecture in geological time.',
          'At Tangent Studio, our exploration begins with the opposite premise: what happens when walls possess genuine physical depth? In our high-altitude commissions, cast-in-place concrete forms an unbroken structural shell. The 450mm wall assembly buffers extreme diurnal temperature swings, absorbing low winter sunlight and releasing stored calories throughout the sub-zero alpine nights.',
        ],
        quote: 'Mass is not inert matter; it is a temporal instrument that registers the passage of hours through light and temperature.',
      },
      {
        heading: 'II. Calibrating the Aperture',
        paragraphs: [
          'A puncture through a 450mm concrete wall operates very differently from a standard window cutout. The depth of the reveal becomes an architectural light scoop. By beveling the jambs at a 15-degree angle aligned with the solstice azimuth, morning light washes gently into the interior without creating severe glare.',
          'We study these aperture geometries first through physical scale casts in gypsum plaster, followed by photometric ray-tracing simulations. This dual workflow ensures that computational precision serves sensory delight.',
        ],
        figure: {
          url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
          alt: 'Rhythmic concrete colonnade and light patterns',
          caption: 'Figure 1.1 — Beveled jamb studies under low-angle morning illumination.',
        },
      },
      {
        heading: 'III. Material Aging and Weathering',
        paragraphs: [
          'Unpainted architectural concrete is an active register of climate. Over decades, local rainwater, lichen, and atmospheric exposure deposit minerals across its surface. Rather than viewing this as deterioration, we design joint reveals and drip edges to guide weathering into deliberate, painterly striations.',
          'When paired with raw cedar formwork that leaves its grain embossed upon the cured slurry, the resulting mass speaks of both the forest that shaped it and the mountain that cradles it.',
        ],
      },
    ],
  },
  {
    id: 'art-02',
    slug: 'geological-memory-roman-travertine',
    title: 'Geological Memory: Cross-Cut Roman Travertine',
    subtitle: 'Extracting spatial clarity from sedimentary stone strata in contemporary residential envelopes.',
    publishedAt: 'September 28, 2026',
    readingTime: '5 min read',
    category: 'Materiality',
    author: {
      name: 'Elena Rostova',
      role: 'Director of Tectonics & Material Research',
    },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      alt: 'Travertine spiral staircase descending into a double-height minimalist foyer',
      caption: 'Figure 2.0 — Helical staircase milled from monolithic Roman travertine blocks.',
    },
    excerpt:
      'Travertine is the petrified record of geothermal springs—a sedimentary stone layered over millennia. When selected with reverence and laid with hairline tolerances, its porous channels lend rooms a primordial warmth that synthetic finishes cannot simulate.',
    content: [
      {
        heading: 'I. Sedimentary Origins',
        paragraphs: [
          'Unlike igneous granites born of volcanic tumult, travertine is formed slowly at thermal water margins. Each pore and vein documents an era when mineral-rich springs precipitated calcium carbonate across ancient mosses and reeds.',
          'When quarrying Roman travertine for our coastal and urban residences, we insist on cross-cutting across the sedimentary bed. This orientation reveals undulating horizontal strata, grounding vertical wall planes with a natural terrestrial datum.',
        ],
        quote: 'To step onto cross-cut travertine is to place one’s feet upon thirty thousand years of quiet mineral accumulation.',
      },
      {
        heading: 'II. The Honed Finish and Tactile Friction',
        paragraphs: [
          'High-gloss polishing strips natural stone of its soul. For all interior living surfaces and bathroom sanctuaries, we specify a matte honed finish (200-grit diamond diamond abrasion) left unfilled in non-wet zones.',
          'The micro-cavities absorb acoustic energy, dampening sharp echoes and imparting a library-like serenity to double-height volumes. Under bare feet, the unheated stone maintains a comfortable, skin-like temperature balance.',
        ],
      },
    ],
  },
  {
    id: 'art-03',
    slug: 'digital-physical-reciprocity',
    title: 'Digital-Physical Reciprocity: From BIM to Artisan Joinery',
    subtitle: 'How 1:1 physical material mockups and sub-millimeter parametric models co-inform tectonic realization.',
    publishedAt: 'September 10, 2026',
    readingTime: '7 min read',
    category: 'Computation',
    author: {
      name: 'Marcus Vance',
      role: 'Lead Computational Architect',
    },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      alt: 'Minimalist interior gallery with diffused lighting and precision joinery',
      caption: 'Figure 3.0 — Precision joinery and parametric datum alignment in Kyoto Atelier.',
    },
    excerpt:
      'Too often, digital architecture remains detached from the grain of physical reality, while traditional craftsmanship resists computational optimization. We explore the fertile middle ground where 3D coordinate geometry empowers generational carpenters.',
    content: [
      {
        heading: 'I. The Limitations of Virtual Perfection',
        paragraphs: [
          'Inside a 3D modeling environment, two surfaces intersect with mathematical zero-tolerance. In the physical realm, timber swells with humidity, concrete shrinks during cure, and steel tolerances fluctuate by millimeters. The naive translation of CAD models to construction sites inevitably produces clumsy caulk joints and trim cover-ups.',
          'At Tangent Studio, we reject trim pieces. Every shadow gap, reveal line, and acoustic slat is planned with intentional breathing room. We test these interfaces in physical 1:1 prototypes before issuing final shop drawings.',
        ],
        quote: 'True craftsmanship is not the denial of material tolerance, but the artful accommodation of it.',
      },
      {
        heading: 'II. Democratizing 3D Architectural Resources',
        paragraphs: [
          'Our digital product archive was born from this exact studio workflow. The 3D scene files, PBR material packs, and HDRI sky calibrations we offer in our marketplace are the identical assets utilized in our active masterplanning projects.',
          'By releasing these tools to the international architecture and visualization community, we aim to elevate the standard of spatial representation globally.',
        ],
      },
    ],
  },
]
