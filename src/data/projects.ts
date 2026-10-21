import type { Project, ProjectCategory } from '@/types/project'
import { ARCHITECTURAL_ASSETS } from './assets'

export const PROJECTS: Project[] = [
  {
    id: 'proj-belagavi-3bhk',
    slug: 'belagavi-3bhk-apartment',
    title: '3BHK Residence at Belagavi',
    shortDescription:
      'A serene contemporary apartment interior blending travertine marble, fluted wall architecture, hand-woven cane joinery, and calibrated ambient illumination in Belagavi, Karnataka.',
    fullDescription:
      'Conceived by The Tangent Collaborative for a private commission in Belagavi, Karnataka, this 3BHK apartment interior embodies contemporary restraint, tactile warmth, and architectural clarity.\n\nThe layout dissolves visual noise through an intentional material palette: natural travertine stone, warm oak millwork, fluted wall accents, and bronze-tinted glass. Beginning at the entrance foyer, vertical fluting and recessed LED cove lighting establish a calm spatial rhythm that carries seamlessly into the main living salon and open dining zone.\n\nIn the private suites, each bedroom is given a bespoke spatial identity. The master suite features an expansive floor-to-ceiling bronze-tinted glass wardrobe with internal illumination, accompanied by a fluted headboard accent wall integrating a tall arched backlit dressing mirror. Bedroom 01 celebrates regional tactile craft with custom wardrobes featuring hand-woven cane mesh inserts set in crisp white architectural frames. At the spiritual heart of the home, the pooja room is framed as a contemplative sanctuary beneath a gently backlit parabolic arch.',
    category: 'interior',
    location: 'Belagavi, Karnataka, India',
    year: 2026,
    status: 'in-progress',
    area: '1,850 sq ft / 172 m²',
    featured: true,
    client: 'Private Residential Commission',
    services: [
      'Interior Architecture & Spatial Planning',
      'Bespoke Millwork & Fluted Paneling',
      'Custom Travertine Media Architecture',
      'Woven Cane & Bronze Glass Joinery',
      'Sacred Pooja Room Sanctum',
      'Cove Lighting & Atmospheric Luminaire Design',
    ],
    coverImage: {
      id: 'belagavi-cover',
      url: '/images/projects/belagavi-3bhk/03-living-room-balcony-view.jpeg',
      alt: 'Living room panoramic view towards sunlit balcony with bespoke modular sofa and travertine coffee table',
      caption: 'Living Salon — Spatial continuity connecting lounge seating, marble coffee table, and lush balcony foliage',
      isCover: true,
      aspectRatio: 'landscape',
    },
    galleryImages: [
      {
        id: 'belagavi-floor-plan',
        url: '/images/projects/belagavi-3bhk/01-floor-plan.jpeg',
        alt: 'Architectural floor plan layout for 3BHK Apartment at Belagavi',
        caption: 'Floor Plan — Spatial circulation mapping 3 bedrooms, living, dining, kitchen, pooja sanctum, and triple balconies',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-foyer',
        url: '/images/projects/belagavi-3bhk/02-entrance-lobby.jpeg',
        alt: 'Entrance foyer with vertical fluted wall paneling, integrated bench shoe console, and textured artwork',
        caption: 'Foyer — Tactile vertical fluted paneling illuminated by warm concealed ceiling LED cove',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-living-media',
        url: '/images/projects/belagavi-3bhk/04-living-media-wall.jpeg',
        alt: 'Living room media wall clad in natural marble with integrated wooden floating credenza and display tower',
        caption: 'Media Architecture — Italian travertine slab paired with illuminated vertical open timber shelving',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-living-dining',
        url: '/images/projects/belagavi-3bhk/05-living-dining-perspective.jpeg',
        alt: 'Expansive open plan view uniting the living salon, continuous perimeter cove lighting, and curved dining suite',
        caption: 'Living & Dining Continuity — Harmonious circulation with concealed warm perimeter lighting',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-living-sofa',
        url: '/images/projects/belagavi-3bhk/06-living-sofa-accent.jpeg',
        alt: 'Living lounge sofa framed by symmetrical fluted wall pilasters, triptych textured art, and brass wall sconces',
        caption: 'Sofa Elevation — Tripartite textured plaster art framed by fluted acoustic wall paneling',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-kitchen-counter',
        url: '/images/projects/belagavi-3bhk/07-kitchen-counter.jpeg',
        alt: 'Minimalist kitchen with handleless flat-panel cabinetry, open wooden display shelf with warm strip lighting, and dark stone worktop',
        caption: 'Culinary Atelier — Handleless warm-grey cabinetry with continuous floating walnut display shelf',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-kitchen-bar',
        url: '/images/projects/belagavi-3bhk/08-kitchen-crockery-niche.jpeg',
        alt: 'Kitchen crockery unit with dark metal-framed fluted glass shutters and internal lighting looking into dining room',
        caption: 'Bar & Crockery Niche — Backlit fluted glass storage framing the transition to the dining area',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-pooja-sanctuary',
        url: '/images/projects/belagavi-3bhk/09-pooja-room-sanctuary.jpeg',
        alt: 'Pooja room sanctum with illuminated arched niche, golden Om emblem, and low teakwood mandir seating',
        caption: 'Sacred Sanctum — Softly backlit parabolic arch framing the traditional teakwood altar',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-pooja-daylight',
        url: '/images/projects/belagavi-3bhk/10-pooja-room-daylight.jpeg',
        alt: 'Pooja room showing natural afternoon sunlight casting leaf shadow patterns across the warm walls',
        caption: 'Daylight Calibration — Organic foliage shadows filtered through louvered blinds into the prayer room',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-master-terrace',
        url: '/images/projects/belagavi-3bhk/11-master-bedroom-terrace.jpeg',
        alt: 'Master bedroom with low-profile timber platform bed, continuous ceiling cove, and expansive balcony view',
        caption: 'Master Suite — Low wooden platform bed aligned with floor-to-ceiling balcony glazing',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-master-mirror',
        url: '/images/projects/belagavi-3bhk/12-master-bed-arched-mirror.jpeg',
        alt: 'Master bed wall with fluted panels, perimeter cove light, and tall arched backlit dressing mirror',
        caption: 'Bed Accent — Monolithic fluted wall detail integrated with monumental arched backlit mirror',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-master-wardrobe-view',
        url: '/images/projects/belagavi-3bhk/13-master-suite-wardrobe.jpeg',
        alt: 'Master suite bronze-tinted glass wardrobe with internal illumination and curved corner shelves',
        caption: 'Dressing Architecture — Floor-to-ceiling bronze tinted glass wardrobe with integrated LED hanger profiles',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-master-wardrobe-detail',
        url: '/images/projects/belagavi-3bhk/14-master-wardrobe-detail.jpeg',
        alt: 'Close-up of master wardrobe showing dark tinted glass doors, rounded end display shelving, and oak wood trim',
        caption: 'Wardrobe Joinery — Curved corner vitrine shelving and flush concealed aluminium frame doors',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-bed1-cane',
        url: '/images/projects/belagavi-3bhk/15-bedroom-01-cane-wardrobe.jpeg',
        alt: 'Bedroom 01 featuring custom wardrobe with natural woven cane mesh inserts set in crisp white frames',
        caption: 'Bedroom 01 — Tactile hand-woven cane inserts paired with warm oak platform bed and floating media ledge',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-bed1-evening',
        url: '/images/projects/belagavi-3bhk/16-bedroom-01-evening-mood.jpeg',
        alt: 'Bedroom 01 evening atmosphere showing warm glow from cove lights contrasting with twilight blue window view',
        caption: 'Twilight Ambiance — Layered indirect lighting creating a restful, contemplative bedroom sanctuary',
        aspectRatio: 'landscape',
      },
      {
        id: 'belagavi-bed1-balcony',
        url: '/images/projects/belagavi-3bhk/17-bedroom-01-terrace-view.jpeg',
        alt: 'Frontal bed view of Bedroom 01 looking past bedside tables toward open glass slider and lush planter balcony',
        caption: 'Indoor-Outdoor Connection — Unobstructed sightline to private planted balcony',
        aspectRatio: 'landscape',
      },
    ],
    specifications: [
      { label: 'Typology', value: '3BHK Contemporary Apartment' },
      { label: 'Enclosed Area', value: '1,850 sq ft / 172 m²' },
      { label: 'Location', value: 'Belagavi, Karnataka' },
      { label: 'Client / Status', value: 'Private Commission / Presentation May 2026' },
      { label: 'Wall Architecture', value: 'Fluted Acoustic Paneling & Travertine Slab' },
      { label: 'Joinery Craft', value: 'Bronze Tinted Glass & Hand-Woven Cane Mesh' },
      { label: 'Lighting Design', value: '3000K Indirect Cove & Backlit Arch Features' },
    ],
    seo: {
      title: '3BHK Residence at Belagavi — The Tangent Collaborative',
      description: 'Contemporary 3BHK residential apartment interior in Belagavi, Karnataka by The Tangent Collaborative featuring fluted paneling, travertine, and cane joinery.',
    },
    excerpt: 'A serene contemporary apartment interior blending travertine marble, fluted wall architecture, hand-woven cane joinery, and calibrated ambient illumination.',
    description: 'Conceived by The Tangent Collaborative for a private commission in Belagavi, Karnataka, this 3BHK apartment interior embodies contemporary restraint.',
  },
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
      title: 'Nordic Forest Pavilion — The Tangent Collaborative',
      description: 'Minimalist concrete and timber residential pavilion in Oslo, Norway by The Tangent Collaborative.',
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
      title: 'Kyoto Private Atelier — The Tangent Collaborative',
      description: 'Introspective interior and residence in Kyoto, Japan by The Tangent Collaborative.',
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
      title: 'Solitary Coastal Residence — The Tangent Collaborative',
      description: 'Monolithic coastal retreat in Bornholm, Denmark by The Tangent Collaborative.',
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
      title: 'Museum of Spatial Form — The Tangent Collaborative',
      description: 'Civic exhibition hall and cantilevered museum in Basel, Switzerland by The Tangent Collaborative.',
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
      title: 'Engadin Alpine Monolith — The Tangent Collaborative',
      description: 'High-altitude charred wood residence in St. Moritz, Switzerland by The Tangent Collaborative.',
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
      title: 'Subterranean Sound Sanctuary — The Tangent Collaborative',
      description: 'Conceptual subterranean acoustics sanctuary in Naoshima, Japan by The Tangent Collaborative.',
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
