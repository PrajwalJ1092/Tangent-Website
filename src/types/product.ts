export type MarketplaceCategory =
  | 'portfolio-templates'
  | 'presentation-templates'
  | 'cad-bim-resources'
  | 'material-moodboards'
  | 'visualization-resources'
  | 'digital-bundles'

export interface CategoryDefinition {
  id: MarketplaceCategory
  label: string
  description: string
}

export const MARKETPLACE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'portfolio-templates',
    label: 'Portfolio Templates',
    description: 'Minimalist editorial InDesign, Figma, and PDF monographs for architects.',
  },
  {
    id: 'presentation-templates',
    label: 'Presentation Templates',
    description: 'Competition boards, keynote pitch decks, and spatial proposal layouts.',
  },
  {
    id: 'cad-bim-resources',
    label: 'CAD & BIM Resources',
    description: 'Precision 2D detail libraries, door/window schedules, and Revit components.',
  },
  {
    id: 'material-moodboards',
    label: 'Material & Mood Boards',
    description: 'High-res tactile material scans, surface palettes, and curation templates.',
  },
  {
    id: 'visualization-resources',
    label: 'Visualization Resources',
    description: 'Blender Cycles interior scenes, 8K PBR textures, and 32-bit HDRI skies.',
  },
  {
    id: 'digital-bundles',
    label: 'Digital Bundles',
    description: 'Comprehensive studio asset collections with extended practice licenses.',
  },
]

export type FileFormat =
  | 'blend'
  | 'fbx'
  | 'obj'
  | 'dwg'
  | 'rvt'
  | 'idml'
  | 'fig'
  | 'exr'
  | 'pdf'
  | 'zip'

export type LicenseType = 'standard' | 'commercial' | 'extended'

export interface ProductPreviewMedia {
  id: string
  url: string
  alt: string
  type: 'image' | 'video'
}

export interface DigitalProduct {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  category: MarketplaceCategory
  priceInPaise: number // Integer paise (100 paise = 1 INR)
  compareAtPriceInPaise?: number
  currency: 'INR'
  coverImage: ProductPreviewMedia
  previewImages: ProductPreviewMedia[]
  includedFiles: string[]
  compatibleSoftware: string[]
  licenseType: LicenseType
  licenseSummary: string
  featured: boolean
  tags?: string[]
  fileSize?: string
  lastUpdated?: string

  // Compatibility aliases for existing UI and cart code
  title: string
  headline?: string
  description?: string
  priceInr?: number
  priceUsd: number
  formats: string[]
  fileSizeBytes?: number
  polygonCount?: number
  isPbr?: boolean
  rating?: number
  reviewsCount?: number
  softwareRequirements?: string[]
}

// Deprecated type alias for legacy references
export type ProductCategory = MarketplaceCategory
