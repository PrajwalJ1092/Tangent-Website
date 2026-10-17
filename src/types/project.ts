export type ProjectCategory =
  | 'residential'
  | 'interior'
  | 'commercial'
  | 'conceptual'

export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'concept'

export interface ProjectSpecification {
  label: string
  value: string
}

export interface ProjectImage {
  id: string
  url: string
  alt: string
  caption?: string
  isCover?: boolean
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide'
}

export interface ProjectSeo {
  title?: string
  description?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ProjectCategory
  location: string
  year: number
  status: ProjectStatus
  coverImage: ProjectImage
  galleryImages: ProjectImage[]
  services: string[]
  area?: string
  featured: boolean
  client?: string
  specifications?: ProjectSpecification[]
  seo?: ProjectSeo
  // Compatibility helpers
  excerpt?: string
  description?: string
  gallery?: ProjectImage[]
}
