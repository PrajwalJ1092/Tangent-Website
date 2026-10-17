export interface StudioSocialLink {
  platform: string
  handle: string
  url: string
}

export interface StudioAddress {
  street: string
  suiteOrFloor?: string
  district?: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  formatted: string
  /**
   * Tracks whether the physical street address was verified from public records
   * or configured as an architectural demonstration placeholder.
   */
  isVerified: boolean
}

export interface StudioBusinessHours {
  days: string
  hours: string
  timezone: string
  consultationNote: string
}

export interface StudioTeamMember {
  id: string
  name: string
  role: string
  discipline: string
  bio: string
  isPlaceholder: boolean
}

export interface StudioConfiguration {
  studioName: string
  collaborativeName: string
  tagline: string
  email: string
  inquiriesEmail: string
  pressEmail: string
  phone?: string
  address: StudioAddress
  businessHours?: StudioBusinessHours
  socialLinks: StudioSocialLink[]
  googleMapsUrl: string
  googleMapsEntityTitle: string
  team: StudioTeamMember[]
}

/**
 * Centralized, authoritative studio configuration.
 * All studio contact, inquiry, location, and team metadata is centralized here
 * to prevent scattering fragmented or fabricated values across components.
 */
export const STUDIO_CONFIG: StudioConfiguration = {
  studioName: 'Tangent Studio',
  collaborativeName: 'The Tangent Collaborative',
  tagline: 'Architecture, Interior Architecture & Computational Spatial Form',
  email: 'dialogue@tangentstudio.com',
  inquiriesEmail: 'commissions@tangentstudio.com',
  pressEmail: 'monographs@tangentstudio.com',
  phone: '+91 (0) 80 4921 7800',
  address: {
    street: '14/2 Lavelle Road',
    suiteOrFloor: 'Studio Pavilion, Level 03',
    district: 'Central Spatial District',
    city: 'Bengaluru',
    stateProvince: 'Karnataka',
    postalCode: '560001',
    country: 'India',
    formatted: '14/2 Lavelle Road, Studio Pavilion Level 03, Bengaluru, Karnataka 560001, India',
    isVerified: false, // Explicitly marked as a prototype demonstration placeholder
  },
  businessHours: {
    days: 'Monday – Friday',
    hours: '09:30 – 18:30',
    timezone: 'IST (UTC +5:30)',
    consultationNote: 'Private monograph reviews, material sampling, and spatial consultations by advance appointment only.',
  },
  socialLinks: [
    {
      platform: 'Instagram',
      handle: '@tangent.spatial',
      url: 'https://instagram.com',
    },
    {
      platform: 'LinkedIn',
      handle: 'The Tangent Collaborative',
      url: 'https://linkedin.com',
    },
    {
      platform: 'ArchDaily',
      handle: 'Tangent Studio Architecture',
      url: 'https://archdaily.com',
    },
  ],
  googleMapsUrl: 'https://share.google/TIgoLTe5QViC8Bict',
  googleMapsEntityTitle: 'The Tangent Collaborative on Google Maps',
  team: [
    {
      id: 'team-principal',
      name: 'Studio Principal (Configurable)',
      role: 'Founding Architect & Design Principal',
      discipline: 'Tectonic Systems & Spatial Composition',
      bio: 'Leading the practice’s architectural direction with a focus on restrained structural order, monolithic materiality, and passive climatic response.',
      isPlaceholder: true,
    },
    {
      id: 'team-interiors',
      name: 'Design Director (Configurable)',
      role: 'Director of Interior Architecture & Tactility',
      discipline: 'Material Scans & Interior Atmosphere',
      bio: 'Overseeing interior architecture, bespoke joinery detailing, and tactile surface curation across residential and gallery commissions.',
      isPlaceholder: true,
    },
    {
      id: 'team-computational',
      name: 'Computational Lead (Configurable)',
      role: 'Lead Computational & BIM Architect',
      discipline: 'Parametric Geometry & Digital Assets',
      bio: 'Directing parametric construction detailing, Revit BIM component standardization, and photorealistic Cycles visual asset production.',
      isPlaceholder: true,
    },
  ],
}
