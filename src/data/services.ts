export interface StudioService {
  id: string
  slug: string
  code: string
  title: string
  tagline: string
  description: string
  deliverables: string[]
  processStages: string[]
  technicalStandards: string[]
  suitableFor: string
  imageUrl: string
  imageAlt: string
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'srv-01',
    slug: 'residential-architecture',
    code: 'DISCIPLINE 01',
    title: 'Bespoke Residential Architecture',
    tagline: 'Custom private monographs, alpine sanctuaries, and contemplative coastal pavilions.',
    description:
      'We design one-of-a-kind private residences tuned to their surrounding topography. From initial geological surveying through turnkey handover, our practice oversees all structural engineering, daylighting studies, and envelope realization.',
    deliverables: [
      'Comprehensive architectural schematic & conceptual massing models',
      'Solar azimuth & daylighting photometric simulation packages',
      'Structural engineering coordination & concrete casting schedules',
      '1:5 millwork & envelope joinery detail sets',
      'Full-time construction site administration & material QA',
    ],
    processStages: [
      'Site Exploration & Climate Survey',
      'Tectonic Modeling & Material Board Selection',
      'BIM Coordination & Municipal Permitting',
      'Artisan Procurement & Site Supervision',
    ],
    technicalStandards: [
      'Passivhaus thermal envelope standards',
      'Sub-millimeter BIM coordination in Revit / ArchiCAD',
      'Embodied carbon life-cycle assessment (LCA)',
    ],
    suitableFor:
      'Private clients seeking timeless, heirloom architecture crafted from raw stone, cast concrete, and timber.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Nordic residential pavilion with floor-to-ceiling glass and timber beams',
  },
  {
    id: 'srv-02',
    slug: 'cultural-civic',
    code: 'DISCIPLINE 02',
    title: 'Cultural & Civic Architecture',
    tagline: 'Public galleries, sound sanctuaries, and institutional exhibition pavilions.',
    description:
      'Civic architecture must balance acoustic performance, robust public durability, and quiet reverence. We conceives cultural institutions that invite contemplative gathering while weathering gracefully across generations.',
    deliverables: [
      'Master planning & public circulation feasibility reports',
      'Acoustic reverberation modeling & micro-ribbed surface design',
      'Tensioned concrete cantilever & large-span structural schema',
      'Curatorial gallery lighting & climate-control integration',
      'Stakeholder & municipal competition presentation packages',
    ],
    processStages: [
      'Public Program & Flow Analysis',
      'Acoustic & Volumetric Parametric Study',
      'Civic Engineering & Life-Safety Compliance',
      'Phased Construction Realization',
    ],
    technicalStandards: [
      'ISO 3382-1 acoustic measurement compliance',
      'Seismic performance code optimization',
      'Universal accessibility (ADA / NBC standard compliance)',
    ],
    suitableFor:
      'Museum trusts, cultural foundations, and universities seeking iconic yet disciplined public buildings.',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Acoustic concrete sound chamber with dramatic skylight',
  },
  {
    id: 'srv-03',
    slug: 'interior-architecture',
    code: 'DISCIPLINE 03',
    title: 'Spatial Interior Architecture & Joinery',
    tagline: 'Tactile residential sanctuaries, bespoke furniture schedules, and integrated lighting.',
    description:
      'We reject superficial decoration in favor of interior architecture that grows organically from the building shell. Every bespoke joinery reveal, travertine bath basin, and concealed luminaire is custom designed to our datum.',
    deliverables: [
      'Comprehensive interior architectural plan & elevation packages',
      'Bespoke joinery & millwork shop fabrication drawings',
      'Natural stone, plaster, and timber finish schedules',
      'Custom architectural hardware & luminaire detailing',
      'FF&E curation, vintage collector pieces & tactile fabrics',
    ],
    processStages: [
      'Spatial Flow & Ergonomic Calibration',
      '1:1 Joinery Reveal Prototype Review',
      'Millwork Fabrication & Shop Inspection',
      'Turnkey Installation & Art Curation',
    ],
    technicalStandards: [
      'Low-VOC bio-mineral plasters & non-toxic oil finishes',
      'CRI 98+ museum-grade architectural lighting fixtures',
      'FSC-certified generational hardwood sourcing',
    ],
    suitableFor:
      'Private homeowners and developers seeking ultra-refined, serene interior environments with bespoke craftsmanship.',
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Minimalist living salon with bespoke joinery and warm daylight',
  },
  {
    id: 'srv-04',
    slug: 'computational-3d-assets',
    code: 'DISCIPLINE 04',
    title: 'Computational Visualization & Digital Licensing',
    tagline: 'High-fidelity 3D scene files, PBR material scans, and digital twin assets.',
    description:
      'Bridging spatial design and digital simulation, we develop production-ready 3D scene files and physical-based material shaders used by international visualizers, film studios, and forward-thinking architectural practices.',
    deliverables: [
      'Full Blender 4.2+ native scenes with Cycles / EEVEE lighting',
      '8K PBR seamless texture maps (albedo, roughness, normal, displacement)',
      'Custom calibrated HDRI skies captured at architectural sites',
      'Enterprise and commercial distribution licensing rights',
      'Custom procedural material shader graphs and asset libraries',
    ],
    processStages: [
      'Physical Material Photogrammetry & Surface Scanning',
      'Sub-Millimeter Geometry Modeling & Topology Optimization',
      'Photometric Lighting Balance & Spectral Calibration',
      'Multi-Format Export & Asset Packaging',
    ],
    technicalStandards: [
      'ACEScg color space workflow compatibility',
      'Physically accurate IOR and Fresnel reflectance curves',
      'Micro-bevel edge weighting for photorealistic render speculars',
    ],
    suitableFor:
      'Architects, 3D artists, game studios, and creative agencies requiring master-grade architectural assets.',
    imageUrl:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Digital 3D architectural living room scene with realistic sunlight',
  },
]
