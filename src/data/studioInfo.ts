export interface StudioSocialLink {
  platform: string
  handle: string
  url: string
}

export interface StudioAddress {
  street?: string
  suiteOrFloor?: string
  district?: string
  city: string
  stateProvince: string
  postalCode?: string
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

export interface ServiceLocation {
  id: string
  city: string
  displayName: string
  stateProvince: string
  country: string
  formattedRegion: string
  coordinates: {
    lat: number
    lng: number
    formatted: string
  }
  type: 'Principal Atelier & Service Area' | 'Regional Service Area'
  isOfficeConfirmed: boolean
  description: string
  directionsUrl: string
}

export interface StudioConfiguration {
  companyName: string
  studioName: string
  collaborativeName: string
  wordmark: {
    prefix: string
    suffix: string
  }
  tagline: string
  email: string
  inquiriesEmail: string
  pressEmail: string
  phone?: string
  serviceAreas: ServiceLocation[]
  serviceAreasSummary: string
  serviceAreasShort: string
  address: StudioAddress
  businessHours?: StudioBusinessHours
  socialLinks: StudioSocialLink[]
  googleMapsUrl: string
  googleMapsEntityTitle: string
  googleMapsNote: string
  team: StudioTeamMember[]
}

/**
 * Centralized, authoritative brand and studio configuration.
 * All company identity, locations, contact, inquiry, and team metadata is centralized here
 * to ensure consistency across headers, footers, metadata, and maps.
 */
export const STUDIO_CONFIG: StudioConfiguration = {
  companyName: 'The Tangent Collaborative',
  studioName: 'The Tangent Collaborative',
  collaborativeName: 'The Tangent Collaborative',
  wordmark: {
    prefix: 'The Tangent',
    suffix: 'Collaborative',
  },
  tagline: 'Architecture, Interior Design & Computational Spatial Systems',
  email: 'dialogue@thetangentcollaborative.com',
  inquiriesEmail: 'commissions@thetangentcollaborative.com',
  pressEmail: 'monographs@thetangentcollaborative.com',
  phone: '+91 (0) 80 4921 7800',
  serviceAreasSummary: 'Serving Bangalore, Vijayapura and Hubballi (Hubli), Karnataka, India',
  serviceAreasShort: 'Bangalore · Vijayapura · Hubballi (Hubli)',
  serviceAreas: [
    {
      id: 'bangalore',
      city: 'Bangalore',
      displayName: 'Bangalore',
      stateProvince: 'Karnataka',
      country: 'India',
      formattedRegion: 'Bangalore, Karnataka, India',
      coordinates: {
        lat: 12.9716,
        lng: 77.5946,
        formatted: '12.9716° N, 77.5946° E',
      },
      type: 'Principal Atelier & Service Area',
      isOfficeConfirmed: false,
      description:
        'Our principal spatial atelier and research practice, serving bespoke residential commissions, cultural pavilions, and interior architecture across the greater Bangalore metropolitan region.',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=Bangalore,+Karnataka,+India',
    },
    {
      id: 'vijayapura',
      city: 'Vijayapura',
      displayName: 'Vijayapura',
      stateProvince: 'Karnataka',
      country: 'India',
      formattedRegion: 'Vijayapura, Karnataka, India',
      coordinates: {
        lat: 16.8302,
        lng: 75.7100,
        formatted: '16.8302° N, 75.7100° E',
      },
      type: 'Regional Service Area',
      isOfficeConfirmed: false,
      description:
        'Providing architectural monographs, stone masonry tectonics, and contextual heritage-responsive private residences throughout Vijayapura and North Karnataka.',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=Vijayapura,+Karnataka,+India',
    },
    {
      id: 'hubballi',
      city: 'Hubballi',
      displayName: 'Hubballi (Hubli)',
      stateProvince: 'Karnataka',
      country: 'India',
      formattedRegion: 'Hubballi (Hubli), Karnataka, India',
      coordinates: {
        lat: 15.3647,
        lng: 75.1240,
        formatted: '15.3647° N, 75.1240° E',
      },
      type: 'Regional Service Area',
      isOfficeConfirmed: false,
      description:
        'Serving commercial architecture, corporate workspaces, and tactile interior design across the Hubballi-Dharwad urban corridor.',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=Hubballi,+Karnataka,+India',
    },
  ],
  address: {
    city: 'Bangalore',
    stateProvince: 'Karnataka',
    country: 'India',
    formatted: 'Serving Bangalore, Vijayapura & Hubballi (Hubli), Karnataka, India',
    isVerified: false, // Explicitly marked: Regional service areas active; physical street addresses pending confirmation
  },
  businessHours: {
    days: 'Monday – Friday',
    hours: '09:30 – 18:30',
    timezone: 'IST (UTC +5:30)',
    consultationNote:
      'Private monograph reviews, material sampling, and spatial consultations by advance appointment only.',
  },
  socialLinks: [
    {
      platform: 'Instagram',
      handle: '@thetangentcollaborative',
      url: 'https://instagram.com',
    },
    {
      platform: 'LinkedIn',
      handle: 'The Tangent Collaborative',
      url: 'https://linkedin.com',
    },
    {
      platform: 'ArchDaily',
      handle: 'The Tangent Collaborative',
      url: 'https://archdaily.com',
    },
  ],
  googleMapsUrl: 'https://share.google/TIgoLTe5QViC8Bict',
  googleMapsEntityTitle: 'The Tangent Collaborative on Google Maps',
  googleMapsNote:
    'Destination link provided by studio; individual city markers represent approximate city-centre coordinates as physical branch street addresses remain unconfirmed.',
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
