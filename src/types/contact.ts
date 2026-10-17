export type ConsultationType =
  | 'architectural-design'
  | 'interior-transformation'
  | 'spatial-consultancy'
  | 'digital-asset-licensing'
  | 'press-speaking'

export interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  projectType: ConsultationType
  budgetRange: string
  location?: string
  message: string
  timeline?: string
}
