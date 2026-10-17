export interface StudioAsset {
  id: string
  title: string
  category:
    | 'residential'
    | 'interior'
    | 'structure'
    | 'detail'
    | 'material'
    | 'presentation'
    | 'digital-resource'
  url: string
  alt: string
  caption?: string
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide'
  dominantColor: string
}

export const ARCHITECTURAL_ASSETS: Record<string, StudioAsset> = {
  // Residential Architecture
  nordicPavilion: {
    id: 'nordic-pavilion',
    title: 'Nordic Forest Pavilion',
    category: 'residential',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Minimalist concrete and timber residential pavilion surrounded by scandinavian pine trees',
    caption: 'Pavilion N-04 — Tectonic timber framing and cast-in-place concrete',
    aspectRatio: 'landscape',
    dominantColor: '#D8D4CA',
  },
  coastalRetreat: {
    id: 'coastal-retreat',
    title: 'Solitary Coastal Residence',
    category: 'residential',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    alt: 'Low-slung limestone residence overlooking an overcast coastal cliff',
    caption: 'Klint House — Monolithic limestone envelope on coastal bluff',
    aspectRatio: 'landscape',
    dominantColor: '#E2DFD6',
  },
  monolithicVilla: {
    id: 'monolithic-villa',
    title: 'Engadin Monolith',
    category: 'residential',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    alt: 'Geometric alpine residence clad in dark charred larch with expansive glass aperture',
    caption: 'Residence S-12 — Alpine orientation and thermal mass optimization',
    aspectRatio: 'landscape',
    dominantColor: '#30322C',
  },

  // Minimalist Interiors
  kyotoAtelier: {
    id: 'kyoto-atelier',
    title: 'Kyoto Private Gallery & Residence',
    category: 'interior',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Spacious minimalist living salon with natural linen upholstery and diffused daylight',
    caption: 'Atelier K — Diffused southern illumination through rice-paper scrims',
    aspectRatio: 'portrait',
    dominantColor: '#ECE7DD',
  },
  sculpturalStair: {
    id: 'sculptural-stair',
    title: 'Helical Travertine Core',
    category: 'interior',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Curvilinear travertine staircase descending into a double-height minimalist foyer',
    caption: 'Vertical Circulation — Precision-milled Italian travertine staircase',
    aspectRatio: 'portrait',
    dominantColor: '#EFECE5',
  },
  rawDiningSpace: {
    id: 'raw-dining-space',
    title: 'Brutalist Penthouse Salon',
    category: 'interior',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Minimalist dining room with monolithic cast concrete table and fluted wall partition',
    caption: 'Dining Enclave — Monolithic cast concrete table and raw plaster finishes',
    aspectRatio: 'landscape',
    dominantColor: '#DDD9CE',
  },

  // Concrete & Stone Structures
  soundSanctuary: {
    id: 'sound-sanctuary',
    title: 'Subterranean Sound Sanctuary',
    category: 'structure',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
    alt: 'Sculptural curved architectural concrete vault with dramatic central skylight opening',
    caption: 'Sanctuary Chamber — Acoustic tuning and micro-ribbed concrete surface modeling',
    aspectRatio: 'landscape',
    dominantColor: '#434641',
  },
  cantileverMuseum: {
    id: 'cantilever-museum',
    title: 'Museum of Spatial Form',
    category: 'structure',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Dramatic architectural cantilever in board-formed architectural concrete',
    caption: 'Civic Wing — 24-meter tensioned concrete cantilever structure',
    aspectRatio: 'landscape',
    dominantColor: '#D1CDC1',
  },
  flutedColonnade: {
    id: 'fluted-colonnade',
    title: 'Sanctuary Colonnade',
    category: 'structure',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Rhythmic concrete colonnade casting linear shadows across polished stone floor',
    caption: 'Rhythmic Colonade — Solar angle studies and spatial rhythm',
    aspectRatio: 'portrait',
    dominantColor: '#C8C4B7',
  },

  // Architectural Details & Material Palettes
  boardFormedTexture: {
    id: 'board-formed-texture',
    title: 'Board-Formed Concrete Detail',
    category: 'detail',
    url: 'https://images.unsplash.com/photo-1590725140246-20afefc16903?auto=format&fit=crop&w=1200&q=80',
    alt: 'Close-up macro detail of board-formed concrete showing grain of cedar formwork',
    caption: 'Material Spec — Douglas fir board grain transfer on curing concrete',
    aspectRatio: 'square',
    dominantColor: '#8C8E84',
  },
  travertineVein: {
    id: 'travertine-vein',
    title: 'Cross-Cut Roman Travertine',
    category: 'material',
    url: 'https://images.unsplash.com/photo-1590725140246-20afefc16903?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm ivory cross-cut travertine slab with natural porous geological striations',
    caption: 'Stone Specimen — Unfilled Roman travertine with honed finish',
    aspectRatio: 'square',
    dominantColor: '#DFD8C9',
  },

  // Digital Products & 3D Assets
  interiorSceneKit: {
    id: 'interior-scene-kit',
    title: 'Minimal Living Room 3D Scene',
    category: 'digital-resource',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    alt: 'Digital 3D render of an architectural living space with photorealistic sunlight',
    caption: 'Asset 3D-01 — Blender 4.2 native scene, Cycles PBR setup, 2.4M polys',
    aspectRatio: 'landscape',
    dominantColor: '#DDD7CD',
  },
  materialPackPbr: {
    id: 'material-pack-pbr',
    title: 'Nordic Concrete & Plaster PBR Kit',
    category: 'digital-resource',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    alt: 'Texture spheres showing seamless 8K architectural concrete and lime wash finishes',
    caption: 'Asset MAT-04 — 16 seamless 8K architectural surface maps (Albedo, Roughness, Normal, Height)',
    aspectRatio: 'landscape',
    dominantColor: '#CAC5B7',
  },
  lightingExrPack: {
    id: 'lighting-exr-pack',
    title: 'Overcast Architectural HDRI Sky Kit',
    category: 'digital-resource',
    url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
    alt: 'High dynamic range panoramic sky for photorealistic architectural exterior rendering',
    caption: 'Asset LGT-02 — 32-bit unclipped EXR captures at overcast noon and dusk',
    aspectRatio: 'landscape',
    dominantColor: '#D7D6D0',
  },
  portfolioTemplate: {
    id: 'portfolio-template',
    title: 'Tectonic Monograph Portfolio Template',
    category: 'presentation',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Minimalist editorial monograph book spread with clean typography and layout grid',
    caption: 'Template PRF-01 — 48-page InDesign & Figma editorial monograph layout',
    aspectRatio: 'landscape',
    dominantColor: '#E6E2D8',
  },
  presentationBoard: {
    id: 'presentation-board',
    title: 'Competition Presentation Board Kit',
    category: 'presentation',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Architectural drawings, axonometric diagrams, and site models arranged on a studio desk',
    caption: 'Template CMP-02 — Modular ISO A0 & A1 competition sheet layout system',
    aspectRatio: 'landscape',
    dominantColor: '#E0DDD4',
  },
  cadDetailPack: {
    id: 'cad-detail-pack',
    title: 'Standard Architectural Joinery CAD & BIM Pack',
    category: 'detail',
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Precise technical architectural section drafting and structural joinery details',
    caption: 'Resource CAD-01 — 120 parametric 2D/3D DWG and Revit detail blocks',
    aspectRatio: 'landscape',
    dominantColor: '#CDC9BD',
  },
  moodboardKit: {
    id: 'moodboard-kit',
    title: 'Tactile Material Curation & Mood Board Kit',
    category: 'material',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Curated architectural palette of limestone, lime plaster, linen, and aged brass',
    caption: 'Resource MAT-02 — 24 studio presentation mood boards in Figma & Photoshop',
    aspectRatio: 'landscape',
    dominantColor: '#E5E1D6',
  },
  scopeSheetMockup: {
    id: 'scope-sheet-mockup',
    title: 'The Ultimate Interior Scope Sheet™ System',
    category: 'digital-resource',
    url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    alt: 'Structured room-by-room architectural scope sheet and deliverables specification sheet',
    caption: 'System ISS-01 — 48-page room-by-room architectural interior specification template',
    aspectRatio: 'landscape',
    dominantColor: '#ECE7DD',
  },
  boqSpreadsheetMockup: {
    id: 'boq-spreadsheet-mockup',
    title: 'Residential Interior BOQ & Cost Estimator',
    category: 'digital-resource',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    alt: 'Parametric financial estimation and BOQ cost tracking spreadsheet workbook',
    caption: 'Workbook BOQ-03 — Excel & Google Sheets automated cost calculation system',
    aspectRatio: 'landscape',
    dominantColor: '#DDD9CF',
  },
  clientOnboardingMockup: {
    id: 'client-onboarding-mockup',
    title: 'Client Onboarding & Project Kickoff Pack',
    category: 'presentation',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Design studio onboarding booklet and client presentation kit',
    caption: 'Template ONB-02 — Studio agreement, workflow timeline, and questionnaire',
    aspectRatio: 'landscape',
    dominantColor: '#E2DFD6',
  },
  cinematicHeroLandscape: {
    id: 'cinematic-hero-landscape',
    title: 'Sanctuary in the Mist — Vals, Graubünden',
    category: 'residential',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Cinematic monolithic concrete and charred timber pavilion nestled in scandinavian forest mist',
    caption: 'Pavilion N-04 — Tectonic timber framing and cast-in-place concrete',
    aspectRatio: 'wide',
    dominantColor: '#20211E',
  },
}
