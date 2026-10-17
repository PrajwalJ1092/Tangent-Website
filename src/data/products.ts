import type { DigitalProduct, MarketplaceCategory } from '@/types/product'
import { ARCHITECTURAL_ASSETS } from './assets'

export const PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod-01',
    slug: 'minimalist-living-room-3d-scene',
    name: 'Minimal Living Room 3D Scene',
    title: 'Minimal Living Room 3D Scene',
    shortDescription:
      'Photorealistic architectural interior with calibrated daylighting, bespoke furniture models, and Cycles PBR setup.',
    fullDescription:
      'A complete architectural visualization scene modeled with strict tectonic millimeter precision. Designed for architects, spatial interior designers, and visualization artists seeking a publication-ready living pavilion.\n\nIncludes optimized soft furnishings, bespoke monolithic travertine table, linear diffused lighting rig, and high-resolution texture maps.\n\nAll lighting parameters are balanced to realistic photometric physical sun-sky values.',
    category: 'visualization-resources',
    priceInPaise: 1199000, // ₹11,990
    compareAtPriceInPaise: 1499000, // ₹14,990
    currency: 'INR',
    coverImage: {
      id: 'scene-cover',
      url: ARCHITECTURAL_ASSETS.interiorSceneKit!.url,
      alt: ARCHITECTURAL_ASSETS.interiorSceneKit!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'scene-preview-1',
        url: ARCHITECTURAL_ASSETS.interiorSceneKit!.url,
        alt: ARCHITECTURAL_ASSETS.interiorSceneKit!.alt,
        type: 'image',
      },
      {
        id: 'scene-preview-2',
        url: ARCHITECTURAL_ASSETS.kyotoAtelier!.url,
        alt: 'Secondary camera angle showing afternoon window glare',
        type: 'image',
      },
      {
        id: 'scene-preview-3',
        url: ARCHITECTURAL_ASSETS.rawDiningSpace!.url,
        alt: 'Detail close-up of dining arrangement and cast concrete table',
        type: 'image',
      },
    ],
    includedFiles: [
      'tangent_living_v2_cycles.blend',
      'tangent_living_geometry.fbx',
      'tangent_living_scene.obj',
      'textures_8k_pbr.zip (4.2 GB)',
      'lut_film_profile_kodak.cube',
    ],
    compatibleSoftware: ['Blender 4.0+ (Cycles)', '3ds Max 2024 (Corona / V-Ray via FBX)', 'Unreal Engine 5.4+'],
    licenseType: 'standard',
    licenseSummary: 'Standard Studio License: Use in unlimited personal, commercial, and client visualization projects. Resale or raw asset redistribution prohibited.',
    featured: true,
    tags: ['blender', 'interior', 'cycles', 'pbr', 'minimalism'],
    fileSize: '4.6 GB (uncompressed)',
    lastUpdated: 'October 2025',
    // Compatibility fields
    headline: 'Photorealistic architectural interior with accurate daylight & Cycles PBR setup',
    description: 'Complete interior scene file modeled with architectural precision.',
    priceInr: 11990,
    priceUsd: 140,
    formats: ['blend', 'fbx', 'obj'],
    fileSizeBytes: 420000000,
    polygonCount: 1850000,
    isPbr: true,
    rating: 4.95,
    reviewsCount: 38,
  },
  {
    id: 'prod-02',
    slug: 'tectonic-monograph-portfolio',
    name: 'Tectonic Monograph Portfolio Template',
    title: 'Tectonic Monograph Portfolio Template',
    shortDescription:
      '48-page editorial architecture monograph template with rigorous typography grids in InDesign and Figma.',
    fullDescription:
      'A refined, publication-grade architectural monograph template inspired by Swiss and Scandinavian architecture journals.\n\nEngineered with an underlying 12-column baseline grid, intentional negative space ratios, and predefined typographic hierarchies for project introductions, drawing sheets, site plans, and specification tables.\n\nIncludes both print-ready CMYK PDF export presets with crop marks and interactive digital portfolio layouts.',
    category: 'portfolio-templates',
    priceInPaise: 899000, // ₹8,990
    compareAtPriceInPaise: 1199000, // ₹11,990
    currency: 'INR',
    coverImage: {
      id: 'portfolio-cover',
      url: ARCHITECTURAL_ASSETS.portfolioTemplate!.url,
      alt: ARCHITECTURAL_ASSETS.portfolioTemplate!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'portfolio-preview-1',
        url: ARCHITECTURAL_ASSETS.portfolioTemplate!.url,
        alt: ARCHITECTURAL_ASSETS.portfolioTemplate!.alt,
        type: 'image',
      },
      {
        id: 'portfolio-preview-2',
        url: ARCHITECTURAL_ASSETS.travertineVein!.url,
        alt: 'Editorial spread detailing material specification and site plan',
        type: 'image',
      },
    ],
    includedFiles: [
      'tangent_monograph_a4.indd',
      'tangent_monograph_us_letter.idml',
      'tangent_monograph_figma_system.fig',
      'sample_monograph_preview.pdf',
      'font_pairing_guide.pdf',
    ],
    compatibleSoftware: ['Adobe InDesign 2022+', 'Figma (Desktop & Web)', 'Affinity Publisher 2+'],
    licenseType: 'standard',
    licenseSummary: 'Single Creative License: Publish your personal studio monograph or portfolio across print and web.',
    featured: true,
    tags: ['indesign', 'figma', 'portfolio', 'monograph', 'editorial'],
    fileSize: '380 MB',
    lastUpdated: 'September 2025',
    headline: '48-page editorial monograph template with rigorous typographic grids',
    description: 'A refined, publication-grade architectural monograph template.',
    priceInr: 8990,
    priceUsd: 110,
    formats: ['idml', 'fig', 'pdf'],
  },
  {
    id: 'prod-03',
    slug: 'iso-competition-board-system',
    name: 'Competition Presentation Board Kit',
    title: 'Competition Presentation Board Kit',
    shortDescription:
      'Modular ISO A0 & A1 sheet layouts with architectural diagram styles, axonometric keys, and title blocks.',
    fullDescription:
      'Engineered specifically for high-stakes international architectural design competitions.\n\nProvides a modular paneling system across A0 vertical, A0 horizontal, and multi-sheet A1 configurations. Features crisp tectonic title blocks, universal graphic scale bars, axonometric exploded projection templates, and environmental solar diagram styles.',
    category: 'presentation-templates',
    priceInPaise: 649000, // ₹6,490
    compareAtPriceInPaise: 799000, // ₹7,990
    currency: 'INR',
    coverImage: {
      id: 'board-cover',
      url: ARCHITECTURAL_ASSETS.presentationBoard!.url,
      alt: ARCHITECTURAL_ASSETS.presentationBoard!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'board-preview-1',
        url: ARCHITECTURAL_ASSETS.presentationBoard!.url,
        alt: ARCHITECTURAL_ASSETS.presentationBoard!.alt,
        type: 'image',
      },
      {
        id: 'board-preview-2',
        url: ARCHITECTURAL_ASSETS.cantileverMuseum!.url,
        alt: 'Sample competition submission utilizing the A0 layout system',
        type: 'image',
      },
    ],
    includedFiles: [
      'iso_competition_a0_vertical.indd',
      'iso_competition_a0_horizontal.indd',
      'iso_competition_a1_series.idml',
      'architectural_vector_symbols.ai',
      'figma_presentation_boards.fig',
    ],
    compatibleSoftware: ['Adobe InDesign 2022+', 'Adobe Illustrator 2023+', 'Figma'],
    licenseType: 'standard',
    licenseSummary: 'Standard License: Use on unlimited competition submissions, studio presentations, and exhibition displays.',
    featured: true,
    tags: ['competition', 'boards', 'a0', 'presentation', 'diagrams'],
    fileSize: '490 MB',
    lastUpdated: 'August 2025',
    headline: 'Modular ISO A0 & A1 competition sheet layout system',
    description: 'Engineered specifically for high-stakes architectural competitions.',
    priceInr: 6490,
    priceUsd: 79,
    formats: ['idml', 'fig', 'pdf'],
  },
  {
    id: 'prod-04',
    slug: 'parametric-joinery-cad-bim-pack',
    name: 'Parametric Joinery CAD & BIM Pack',
    title: 'Parametric Joinery CAD & BIM Pack',
    shortDescription:
      '120 precision 2D and 3D architectural details: pocket doors, shadowline reveals, and curtain wall connections.',
    fullDescription:
      'A master library of technical construction details drafted to AIA, RIBA, and DIN standards.\n\nCovers timber-to-concrete shadowline baseboards, flush acoustic door jambs, hidden pivot hinges, recessed motorized curtain tracks, frameless skylight curbs, and thermal break cladding clips.\n\nAll details are provided as cleanly layered 2D DWGs, vector PDFs with lineweights, and parametric 3D Revit detail components.',
    category: 'cad-bim-resources',
    priceInPaise: 999000, // ₹9,990
    currency: 'INR',
    coverImage: {
      id: 'cad-cover',
      url: ARCHITECTURAL_ASSETS.cadDetailPack!.url,
      alt: ARCHITECTURAL_ASSETS.cadDetailPack!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'cad-preview-1',
        url: ARCHITECTURAL_ASSETS.cadDetailPack!.url,
        alt: ARCHITECTURAL_ASSETS.cadDetailPack!.alt,
        type: 'image',
      },
      {
        id: 'cad-preview-2',
        url: ARCHITECTURAL_ASSETS.boardFormedTexture!.url,
        alt: 'Technical drawing sheet corresponding to board-formed concrete reveals',
        type: 'image',
      },
    ],
    includedFiles: [
      '120_parametric_details_master.dwg',
      'tangent_joinery_library.rvt',
      'detail_vector_sheets_1to5.pdf',
      'dxf_cut_profiles.zip',
    ],
    compatibleSoftware: ['AutoCAD 2022+ (DWG/DXF)', 'Autodesk Revit 2023+', 'Rhino 7/8', 'Vectorworks'],
    licenseType: 'commercial',
    licenseSummary: 'Commercial Practice License: Integrate into unlimited live architectural construction sets and office standards.',
    featured: true,
    tags: ['cad', 'bim', 'dwg', 'revit', 'joinery', 'details'],
    fileSize: '820 MB',
    lastUpdated: 'November 2025',
    headline: '120 precision 2D and 3D architectural construction detail blocks',
    description: 'A master library of technical construction details.',
    priceInr: 9990,
    priceUsd: 120,
    formats: ['dwg', 'rvt', 'pdf'],
  },
  {
    id: 'prod-05',
    slug: 'tactile-nordic-materials-moodboard-kit',
    name: 'Tactile Material Curation & Mood Board Kit',
    title: 'Tactile Material Curation & Mood Board Kit',
    shortDescription:
      'High-resolution raw material flat-lays: honed Gotland limestone, charred larch, acoustic felt, and brushed bronze.',
    fullDescription:
      'Curated material palette photography and digital sample swatches for client presentations and concept phase ideation.\n\nCaptured under neutral 5500K studio raking light to preserve genuine micro-textures and reflection characteristics. Includes 24 pre-composed mood board templates in Figma and Photoshop alongside individual transparent PNG cutouts of stones, timbers, and hand-woven fabrics.',
    category: 'material-moodboards',
    priceInPaise: 449000, // ₹4,490
    compareAtPriceInPaise: 599000, // ₹5,990
    currency: 'INR',
    coverImage: {
      id: 'moodboard-cover',
      url: ARCHITECTURAL_ASSETS.moodboardKit!.url,
      alt: ARCHITECTURAL_ASSETS.moodboardKit!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'moodboard-preview-1',
        url: ARCHITECTURAL_ASSETS.moodboardKit!.url,
        alt: ARCHITECTURAL_ASSETS.moodboardKit!.alt,
        type: 'image',
      },
      {
        id: 'moodboard-preview-2',
        url: ARCHITECTURAL_ASSETS.travertineVein!.url,
        alt: 'High-resolution scan of Roman travertine slab with porous cavities',
        type: 'image',
      },
    ],
    includedFiles: [
      '24_moodboard_compositions.fig',
      'material_swatches_psd.zip',
      '96_cutout_textures_png.zip',
      'material_specification_labels.pdf',
    ],
    compatibleSoftware: ['Figma', 'Adobe Photoshop 2022+', 'Canva', 'InDesign'],
    licenseType: 'standard',
    licenseSummary: 'Standard License: Use in client presentations, concept pitches, and studio branding.',
    featured: false,
    tags: ['materials', 'moodboard', 'swatches', 'limestone', 'figma'],
    fileSize: '1.2 GB',
    lastUpdated: 'October 2025',
    headline: 'Curated architectural material flat-lays and presentation swatches',
    description: 'High-resolution raw material flat-lays and mood board templates.',
    priceInr: 4490,
    priceUsd: 55,
    formats: ['fig', 'pdf'],
  },
  {
    id: 'prod-06',
    slug: 'nordic-concrete-plaster-pbr-kit',
    name: 'Nordic Concrete & Plaster PBR Kit',
    title: 'Nordic Concrete & Plaster PBR Kit',
    shortDescription:
      '16 seamless 8K architectural surface maps: board-formed concrete, bush-hammered limestone, and lime wash plasters.',
    fullDescription:
      'Photometrically scanned architectural surfaces with true micro-displacement, roughness, and normal maps.\n\nEvery texture set includes clean 8K, 4K, and 2K resolution exports calibrated for accurate specular response in Blender Cycles, Unreal Engine, and Corona Renderer. Seamlessly tileable over expansive exterior façades without visible repetition patterns.',
    category: 'visualization-resources',
    priceInPaise: 649000, // ₹6,490
    currency: 'INR',
    coverImage: {
      id: 'mat-cover',
      url: ARCHITECTURAL_ASSETS.materialPackPbr!.url,
      alt: ARCHITECTURAL_ASSETS.materialPackPbr!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'mat-preview-1',
        url: ARCHITECTURAL_ASSETS.materialPackPbr!.url,
        alt: ARCHITECTURAL_ASSETS.materialPackPbr!.alt,
        type: 'image',
      },
      {
        id: 'mat-preview-2',
        url: ARCHITECTURAL_ASSETS.boardFormedTexture!.url,
        alt: 'Macro rendering showing board-formed concrete displacement grooves',
        type: 'image',
      },
    ],
    includedFiles: [
      '16_surface_sets_8k.zip (2.8 GB)',
      'blender_asset_browser_materials.blend',
      'unreal_engine_master_shaders.uasset',
    ],
    compatibleSoftware: ['Blender 4.0+', 'Unreal Engine 5.3+', 'Cinema 4D (Redshift)', '3ds Max'],
    licenseType: 'standard',
    licenseSummary: 'Standard License: Commercial rendering use permitted. Redistribution of raw texture maps prohibited.',
    featured: true,
    tags: ['pbr', 'textures', 'concrete', 'plaster', '8k'],
    fileSize: '2.8 GB',
    lastUpdated: 'July 2025',
    headline: '16 seamless 8K architectural surface maps with displacement & roughness',
    description: 'Curated material scans of authentic board-formed concrete and limestone.',
    priceInr: 6490,
    priceUsd: 79,
    formats: ['blend', 'obj', 'exr'],
  },
  {
    id: 'prod-07',
    slug: 'overcast-architectural-hdri-sky-kit',
    name: 'Overcast Architectural HDRI Skies',
    title: 'Overcast Architectural HDRI Skies',
    shortDescription:
      '8 unclipped 32-bit high dynamic range panoramic skies captured in coastal Scandinavia for neutral daylight rendering.',
    fullDescription:
      'Avoid harsh over-saturated sunlight in your exterior renderings. These 32-bit EXR panoramic sky environments provide soft contact shadows, diffuse glass reflections, and neutral color temperature.\n\nCaptured with calibrated bracketed exposures up to 24 EV stops to guarantee realistic illumination without artificial sun hotspots.',
    category: 'visualization-resources',
    priceInPaise: 499000, // ₹4,990
    compareAtPriceInPaise: 649000, // ₹6,490
    currency: 'INR',
    coverImage: {
      id: 'hdri-cover',
      url: ARCHITECTURAL_ASSETS.lightingExrPack!.url,
      alt: ARCHITECTURAL_ASSETS.lightingExrPack!.alt,
      type: 'image',
    },
    previewImages: [
      {
        id: 'hdri-preview-1',
        url: ARCHITECTURAL_ASSETS.lightingExrPack!.url,
        alt: ARCHITECTURAL_ASSETS.lightingExrPack!.alt,
        type: 'image',
      },
      {
        id: 'hdri-preview-2',
        url: ARCHITECTURAL_ASSETS.coastalRetreat!.url,
        alt: 'Exterior architectural test render illuminated exclusively with Overcast 03 HDRI',
        type: 'image',
      },
    ],
    includedFiles: [
      '8_unclipped_32bit_skies.exr (1.8 GB)',
      'tonemapped_jpg_previews.zip',
      'exposure_calibration_notes.pdf',
    ],
    compatibleSoftware: ['Cycles', 'Corona', 'V-Ray', 'Octane', 'Unreal Engine 5'],
    licenseType: 'standard',
    licenseSummary: 'Standard License: Use on unlimited commercial renderings, visual effects, and games.',
    featured: false,
    tags: ['hdri', 'lighting', 'skies', 'exr', 'overcast'],
    fileSize: '1.8 GB',
    lastUpdated: 'September 2025',
    headline: '32-bit high dynamic range lighting captures for serene spatial rendering',
    description: 'Captured in alpine and coastal Scandinavia under subtle cloud cover.',
    priceInr: 4990,
    priceUsd: 59,
    formats: ['exr'],
  },
  {
    id: 'prod-08',
    slug: 'complete-spatial-studio-master-bundle',
    name: 'Complete Spatial Studio Master Bundle',
    title: 'Complete Spatial Studio Master Bundle',
    shortDescription:
      'The definitive Tangent Studio digital toolkit: 3D scene files, InDesign monographs, CAD details, PBR materials, and HDRI skies.',
    fullDescription:
      'An all-encompassing suite combining our six most essential digital architectural resources at an exceptional bundle value.\n\nEquips independent architects, boutique spatial practices, and visualization studios with an integrated, cohesive aesthetic toolkit spanning presentation design, construction drafting, and photorealistic CGI production.\n\nIncludes lifetime version upgrades and priority studio support.',
    category: 'digital-bundles',
    priceInPaise: 2499000, // ₹24,990
    compareAtPriceInPaise: 3499000, // ₹34,990 (save ₹10,000)
    currency: 'INR',
    coverImage: {
      id: 'bundle-cover',
      url: ARCHITECTURAL_ASSETS.nordicPavilion!.url,
      alt: 'Comprehensive studio toolkit collection display',
      type: 'image',
    },
    previewImages: [
      {
        id: 'bundle-preview-1',
        url: ARCHITECTURAL_ASSETS.nordicPavilion!.url,
        alt: 'Composite overview of the 6 included digital studio toolkits',
        type: 'image',
      },
      {
        id: 'bundle-preview-2',
        url: ARCHITECTURAL_ASSETS.portfolioTemplate!.url,
        alt: 'Editorial monograph portfolio preview included in bundle',
        type: 'image',
      },
      {
        id: 'bundle-preview-3',
        url: ARCHITECTURAL_ASSETS.interiorSceneKit!.url,
        alt: 'Full 3D interior scene kit included in bundle',
        type: 'image',
      },
    ],
    includedFiles: [
      'bundle_volume_01_monographs.zip',
      'bundle_volume_02_3d_scenes.zip',
      'bundle_volume_03_cad_bim.zip',
      'bundle_volume_04_8k_pbr_materials.zip',
      'bundle_volume_05_hdri_skies.zip',
      'extended_studio_license_certificate.pdf',
    ],
    compatibleSoftware: ['InDesign', 'Figma', 'Blender', 'Revit', 'AutoCAD', 'Unreal Engine'],
    licenseType: 'extended',
    licenseSummary: 'Extended Studio Enterprise License: Deploy across your entire office, design team, and client commissions with zero user seats cap.',
    featured: true,
    tags: ['bundle', 'complete', 'monograph', 'cad', 'blender', 'pbr'],
    fileSize: '11.4 GB (5 volumes)',
    lastUpdated: 'November 2025',
    headline: 'The definitive Tangent Studio digital toolkit across 5 curated volumes',
    description: 'An all-encompassing suite combining our six most essential digital architectural resources.',
    priceInr: 24990,
    priceUsd: 299,
    formats: ['zip', 'blend', 'fig', 'dwg'],
  },
]

export function getFeaturedProducts(): DigitalProduct[] {
  return PRODUCTS.filter((p) => p.featured)
}

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): DigitalProduct | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getRelatedProducts(
  currentProductId: string,
  category: MarketplaceCategory,
  limit = 3,
): DigitalProduct[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.category === category,
  )
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }
  const otherCategory = PRODUCTS.filter(
    (p) => p.id !== currentProductId && p.category !== category,
  )
  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export interface FilterSortOptions {
  search?: string
  category?: MarketplaceCategory | 'all'
  sort?: 'featured' | 'price-low-to-high' | 'price-high-to-low' | 'name-a-z'
}

export function filterAndSortProducts({
  search = '',
  category = 'all',
  sort = 'featured',
}: FilterSortOptions): DigitalProduct[] {
  let result = [...PRODUCTS]

  // Category filter
  if (category !== 'all') {
    result = result.filter((p) => p.category === category)
  }

  // Search filter (name, shortDescription, fullDescription, tags)
  if (search.trim()) {
    const q = search.toLowerCase().trim()
    result = result.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q)
      const descMatch = p.shortDescription.toLowerCase().includes(q)
      const tagMatch = p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false
      return nameMatch || descMatch || tagMatch
    })
  }

  // Sorting
  switch (sort) {
    case 'price-low-to-high':
      result.sort((a, b) => a.priceInPaise - b.priceInPaise)
      break
    case 'price-high-to-low':
      result.sort((a, b) => b.priceInPaise - a.priceInPaise)
      break
    case 'name-a-z':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'featured':
    default:
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      break
  }

  return result
}
