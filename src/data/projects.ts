import type { Project, ProjectCategory } from '@/types/project'
import { ARCHITECTURAL_ASSETS } from './assets'

export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'nordic-forest-pavilion',
    title: 'Nordic Forest Pavilion',
    shortDescription:
      'A low-impact timber pavilion nestled into ancient granite bedrock, exploring daylight diffusion and tactile materiality.',
    fullDescription:
      'Conceived as a seasonal contemplation retreat, the Nordic Forest Pavilion sits on delicate pin foundations designed to leave the surrounding mosses, lichen, and root networks undisturbed.\n\nThe structural framework relies on heavy Danish Douglas fir bents paired with board-formed concrete cores that act as thermal mass anchors during sub-zero Nordic winters. Expansive glazed apertures frame seasonal shifts across the pine canopy while deeply recessed clerestory slots wash honed limestone hearths in soft, indirect southern illumination.',
    category: 'residential',
    location: 'Oslo Outskirts, Norway',
    year: 2025,
    status: 'completed',
    area: '280 m²',
    featured: true,
    client: 'Nordic Cultural Trust',
    services: [
      'Architectural Design',
      'Passivhaus Thermal Engineering',
      'Timber Joinery Detailing',
      'Site Landscape Preservation',
    ],
    coverImage: {
      id: 'nordic-pavilion-cover',
      url: ARCHITECTURAL_ASSETS.nordicPavilion!.url,
      alt: ARCHITECTURAL_ASSETS.nordicPavilion!.alt,
      caption: ARCHITECTURAL_ASSETS.nordicPavilion!.caption,
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'nordic-detail-1',
        url: ARCHITECTURAL_ASSETS.boardFormedTexture!.url,
        alt: ARCHITECTURAL_ASSETS.boardFormedTexture!.alt,
        caption: 'Material Detail — Douglas fir board grain transfer on curing concrete cores.',
        aspectRatio: 'square',
      },
      {
        id: 'nordic-interior-1',
        url: ARCHITECTURAL_ASSETS.rawDiningSpace!.url,
        alt: ARCHITECTURAL_ASSETS.rawDiningSpace!.alt,
        caption: 'Dining Pavilion — Monolithic cast table positioned beneath linear skylight incision.',
        aspectRatio: 'landscape',
      },
      {
        id: 'nordic-stair-1',
        url: ARCHITECTURAL_ASSETS.sculpturalStair!.url,
        alt: ARCHITECTURAL_ASSETS.sculpturalStair!.alt,
        caption: 'Internal Circulation — Travertine steps descending toward bedrock study.',
        aspectRatio: 'portrait',
      },
    ],
    specifications: [
      { label: 'Enclosed Area', value: '280 m²' },
      { label: 'Structural Engineer', value: 'Buro Vektor, Zurich' },
      { label: 'Timber Species', value: 'FSC-Certified Douglas Fir' },
      { label: 'Energy Standard', value: 'Passivhaus Institute Certified' },
    ],
    seo: {
      title: 'Nordic Forest Pavilion — Tangent Studio',
      description: 'Minimalist concrete and timber residential pavilion in Oslo, Norway by Tangent Studio.',
    },
    // Backwards compatibility aliases
    excerpt: 'A low-impact timber pavilion nestled into ancient granite bedrock, exploring daylight diffusion and tactile materiality.',
    description: 'Conceived as a seasonal contemplation retreat, the Nordic Forest Pavilion sits on delicate pin foundations.',
  },
  {
    id: 'proj-02',
    slug: 'kyoto-private-atelier',
    title: 'Kyoto Private Atelier',
    shortDescription:
      'An introspective urban residence mediating between traditional Japanese spatial layering and contemporary cast stone.',
    fullDescription:
      'Situated within a dense historical district of Kyoto, this private studio residence turns inward around a serene moss and gravel courtyard.\n\nHorizontal planes of charred cedar and honed travertine define a sequence of gradated thresholds, recalling classical engawa verandas. Sliding rice-paper screens modulate daylight throughout the day, while unlacquered bronze hardware will develop a subtle verdigris patina across decades of human interaction.',
    category: 'interior',
    location: 'Kyoto, Japan',
    year: 2024,
    status: 'completed',
    area: '195 m²',
    featured: true,
    client: 'Private Collector',
    services: [
      'Interior Spatial Transformation',
      'Courtyard Landscape Integration',
      'Bespoke Hinoki Furniture',
      'Atmospheric Lighting Curation',
    ],
    coverImage: {
      id: 'kyoto-atelier-cover',
      url: ARCHITECTURAL_ASSETS.kyotoAtelier!.url,
      alt: ARCHITECTURAL_ASSETS.kyotoAtelier!.alt,
      caption: ARCHITECTURAL_ASSETS.kyotoAtelier!.caption,
      isCover: true,
      aspectRatio: 'portrait',
    },
    galleryImages: [
      {
        id: 'kyoto-detail-1',
        url: ARCHITECTURAL_ASSETS.travertineVein!.url,
        alt: ARCHITECTURAL_ASSETS.travertineVein!.alt,
        caption: 'Material Selection — Cross-cut unfilled travertine plinth for the tearoom alcove.',
        aspectRatio: 'square',
      },
      {
        id: 'kyoto-view-2',
        url: ARCHITECTURAL_ASSETS.flutedColonnade!.url,
        alt: ARCHITECTURAL_ASSETS.flutedColonnade!.alt,
        caption: 'Garden Screen — Rhythmic timber columns filtering afternoon western glare.',
        aspectRatio: 'portrait',
      },
    ],
    specifications: [
      { label: 'Total Floor Area', value: '195 m²' },
      { label: 'Landscape Design', value: 'Sora Garden Studio' },
      { label: 'Joinery', value: 'Hinoki Cypress & Hand-Forged Bronze' },
      { label: 'Acoustic Rating', value: 'STC 58 Silent Envelope' },
    ],
    seo: {
      title: 'Kyoto Private Atelier — Tangent Studio',
      description: 'Introspective interior and residence in Kyoto, Japan by Tangent Studio.',
    },
    excerpt: 'An introspective urban residence mediating between traditional Japanese spatial layering and contemporary cast stone.',
  },
  {
    id: 'proj-03',
    slug: 'solitary-coastal-residence',
    title: 'Solitary Coastal Residence',
    shortDescription:
      'Low-slung limestone massing overlooking the Baltic Sea, engineered to withstand maritime gale exposure.',
    fullDescription:
      'Perched upon a jagged coastal bluff on Bornholm Island, this residence is designed as a direct geological extension of the limestone cliffs below.\n\nThree stepped terraces shelter private family suites from persistent northerly gales. Deep overhangs protect floor-to-ceiling structural glazing, while raw plaster walls and wide-plank white oak flooring maintain an atmosphere of grounded warmth inside.',
    category: 'residential',
    location: 'Bornholm, Denmark',
    year: 2024,
    status: 'completed',
    area: '410 m²',
    featured: true,
    client: 'Private Commission',
    services: [
      'Full Architectural Commission',
      'Structural Marine Engineering',
      'Custom Oak Joinery',
      'Passive Solar Design',
    ],
    coverImage: {
      id: 'coastal-retreat-cover',
      url: ARCHITECTURAL_ASSETS.coastalRetreat!.url,
      alt: ARCHITECTURAL_ASSETS.coastalRetreat!.alt,
      caption: ARCHITECTURAL_ASSETS.coastalRetreat!.caption,
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'coastal-detail-1',
        url: ARCHITECTURAL_ASSETS.boardFormedTexture!.url,
        alt: ARCHITECTURAL_ASSETS.boardFormedTexture!.alt,
        caption: 'Exterior Wall — Honed limestone masonry with recessed mortar joints.',
        aspectRatio: 'square',
      },
      {
        id: 'coastal-terrace-1',
        url: ARCHITECTURAL_ASSETS.nordicPavilion!.url,
        alt: ARCHITECTURAL_ASSETS.nordicPavilion!.alt,
        caption: 'Upper Terrace — View towards horizon with windbreak screen.',
        aspectRatio: 'landscape',
      },
    ],
    specifications: [
      { label: 'Site Footprint', value: '410 m²' },
      { label: 'Primary Material', value: 'Gotland Limestone & Marine Glass' },
      { label: 'Wind Resistance', value: 'Category 4 Maritime Exposure' },
      { label: 'Heating', value: 'Geothermal Ground-Source Loop' },
    ],
    seo: {
      title: 'Solitary Coastal Residence — Tangent Studio',
      description: 'Monolithic coastal retreat in Bornholm, Denmark by Tangent Studio.',
    },
    excerpt: 'Low-slung limestone massing overlooking the Baltic Sea, engineered to withstand maritime gale exposure.',
  },
  {
    id: 'proj-04',
    slug: 'museum-of-spatial-form',
    title: 'Museum of Spatial Form',
    shortDescription:
      'A civic institution defined by dramatic 24-meter tensioned concrete cantilevers and skylit subterranean chambers.',
    fullDescription:
      'Acting as a tactile civic gateway on the banks of the Rhine in Basel, the Museum of Spatial Form houses large-scale kinetic installations, architectural maquettes, and acoustic sound environments.\n\nThe building volume hovers over a sunken stone courtyard, utilizing post-tensioned self-compacting white concrete to achieve audacious 24-meter column-free cantilevers. Indirect north light washes the main atrium, providing optimal illumination for spatial exhibitions without ultraviolet degradation.',
    category: 'commercial',
    location: 'Basel, Switzerland',
    year: 2023,
    status: 'completed',
    area: '3,200 m²',
    featured: true,
    client: 'Foundation for Contemporary Arts',
    services: [
      'Civic Architecture Masterplan',
      'Exhibition Scenography',
      'Structural Post-Tensioning',
      'Public Plaza Landscape',
    ],
    coverImage: {
      id: 'cantilever-museum-cover',
      url: ARCHITECTURAL_ASSETS.cantileverMuseum!.url,
      alt: ARCHITECTURAL_ASSETS.cantileverMuseum!.alt,
      caption: ARCHITECTURAL_ASSETS.cantileverMuseum!.caption,
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'museum-vault-1',
        url: ARCHITECTURAL_ASSETS.flutedColonnade!.url,
        alt: ARCHITECTURAL_ASSETS.flutedColonnade!.alt,
        caption: 'Public Colonnade — Fluted structural piers framing riverbank promenade.',
        aspectRatio: 'portrait',
      },
      {
        id: 'museum-stair-1',
        url: ARCHITECTURAL_ASSETS.sculpturalStair!.url,
        alt: ARCHITECTURAL_ASSETS.sculpturalStair!.alt,
        caption: 'Grand Atrium — Helical concrete stair connecting ground plaza to gallery level.',
        aspectRatio: 'portrait',
      },
    ],
    specifications: [
      { label: 'Gross Internal Area', value: '3,200 m²' },
      { label: 'Cantilever Span', value: '24.2 Meters Column-Free' },
      { label: 'Concrete Formulation', value: 'White Basalt Self-Compacting Mix' },
      { label: 'Sustainability Rating', value: 'Minergie-P Eco Standard' },
    ],
    seo: {
      title: 'Museum of Spatial Form — Tangent Studio',
      description: 'Civic exhibition hall and cantilevered museum in Basel, Switzerland by Tangent Studio.',
    },
    excerpt: 'A civic institution defined by dramatic 24-meter tensioned concrete cantilevers and skylit subterranean chambers.',
  },
  {
    id: 'proj-05',
    slug: 'engadin-alpine-monolith',
    title: 'Engadin Alpine Monolith',
    shortDescription:
      'Charred larch envelope and thermal stone cores engineered for high-altitude alpine weather and snowshed dynamics.',
    fullDescription:
      'Standing at 1,820 meters elevation in the Swiss Engadin Valley, this compact residential volume is tuned to severe alpine winters and acute solar gain.\n\nThe exterior envelope is clad in flame-treated yakisugi larch that repels moisture and insect intrusion while providing a velvety dark silhouette against snowfields. Three massive granite fireplaces provide radiant thermal storage, complemented by mechanical heat recovery ventilation.',
    category: 'residential',
    location: 'St. Moritz, Switzerland',
    year: 2025,
    status: 'completed',
    area: '340 m²',
    featured: true,
    client: 'Family Estate',
    services: [
      'High-Altitude Alpine Architecture',
      'Thermal Mass Optimization',
      'Charred Wood Cladding Detailing',
      'Winter Solar Geometry Study',
    ],
    coverImage: {
      id: 'monolithic-villa-cover',
      url: ARCHITECTURAL_ASSETS.monolithicVilla!.url,
      alt: ARCHITECTURAL_ASSETS.monolithicVilla!.alt,
      caption: ARCHITECTURAL_ASSETS.monolithicVilla!.caption,
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'alpine-interior-1',
        url: ARCHITECTURAL_ASSETS.rawDiningSpace!.url,
        alt: ARCHITECTURAL_ASSETS.rawDiningSpace!.alt,
        caption: 'Alpine Hearth — Granite fireplace monolith anchoring open-plan living room.',
        aspectRatio: 'landscape',
      },
      {
        id: 'alpine-detail-1',
        url: ARCHITECTURAL_ASSETS.boardFormedTexture!.url,
        alt: ARCHITECTURAL_ASSETS.boardFormedTexture!.alt,
        caption: 'Texture Spec — Deeply charred larch grain next to rough-faced alpine granite.',
        aspectRatio: 'square',
      },
    ],
    specifications: [
      { label: 'Total Enclosed Area', value: '340 m²' },
      { label: 'Elevation', value: '1,820 m a.s.l.' },
      { label: 'Snow Load Capacity', value: '8.5 kN/m²' },
      { label: 'Thermal Envelope', value: 'U-Value 0.11 W/(m²K)' },
    ],
    seo: {
      title: 'Engadin Alpine Monolith — Tangent Studio',
      description: 'High-altitude charred wood residence in St. Moritz, Switzerland by Tangent Studio.',
    },
    excerpt: 'Charred larch envelope and thermal stone cores engineered for high-altitude alpine weather and snowshed dynamics.',
  },
  {
    id: 'proj-06',
    slug: 'subterranean-sound-sanctuary',
    title: 'Subterranean Sound Sanctuary',
    shortDescription:
      'An experimental conceptual acoustics pavilion carved into coastal granite bedrock for spatial audio contemplation.',
    fullDescription:
      'Commissioned as an exploratory conceptual pavilion for the art island of Naoshima, this structure explores the intersection between geological acoustics and absolute architectural silence.\n\nVisitors descend a spiraling ramp into a catenary concrete dome illuminated solely by an oculus oriented towards the equinox solar zenith. Micro-ribbed acoustic fluting along the curved walls diffuses subtle maritime sound reverberations, creating a meditative sensory deceleration chamber.',
    category: 'conceptual',
    location: 'Naoshima, Japan',
    year: 2026,
    status: 'concept',
    area: '520 m²',
    featured: false,
    client: 'Spatial Sound Institute',
    services: [
      'Conceptual Architecture',
      'Acoustic Waveform Simulation',
      'Subterranean Tectonic Modeling',
      'Solar Oculus Calibration',
    ],
    coverImage: {
      id: 'sound-sanctuary-cover',
      url: ARCHITECTURAL_ASSETS.soundSanctuary!.url,
      alt: ARCHITECTURAL_ASSETS.soundSanctuary!.alt,
      caption: ARCHITECTURAL_ASSETS.soundSanctuary!.caption,
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'sound-vault-detail',
        url: ARCHITECTURAL_ASSETS.cantileverMuseum!.url,
        alt: 'Concrete acoustic vault',
        caption: 'Acoustic Vaulting — Catenary concrete curve with integrated diffusion grooves.',
        aspectRatio: 'landscape',
      },
      {
        id: 'sound-stair-view',
        url: ARCHITECTURAL_ASSETS.sculpturalStair!.url,
        alt: 'Descent staircase',
        caption: 'Descent Pathway — Helical stone ramp descending into subterranean silence.',
        aspectRatio: 'portrait',
      },
    ],
    specifications: [
      { label: 'Subterranean Depth', value: '14.5 Meters Below Grade' },
      { label: 'Reverberation Time', value: 'Tunable from 0.8s to 4.2s' },
      { label: 'Primary Envelope', value: 'Precast Curved Basalt Concrete' },
      { label: 'Oculus Diameter', value: '3.6 Meters Open Sky Aperture' },
    ],
    seo: {
      title: 'Subterranean Sound Sanctuary — Tangent Studio',
      description: 'Conceptual subterranean acoustics sanctuary in Naoshima, Japan by Tangent Studio.',
    },
    excerpt: 'An experimental conceptual acoustics pavilion carved into coastal granite bedrock for spatial audio contemplation.',
  },
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getAdjacentProjects(currentSlug: string): { prev: Project; next: Project } | null {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug)
  if (index === -1) return null

  const prevIndex = (index - 1 + PROJECTS.length) % PROJECTS.length
  const nextIndex = (index + 1) % PROJECTS.length

  return {
    prev: PROJECTS[prevIndex]!,
    next: PROJECTS[nextIndex]!,
  }
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') return PROJECTS
  return PROJECTS.filter((p) => p.category === category)
}
