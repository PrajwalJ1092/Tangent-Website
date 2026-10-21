import { useState } from 'react'
import {
  Compass,
  ExternalLink,
  Navigation,
  Info,
  ArrowUpRight,
} from 'lucide-react'
import { STUDIO_CONFIG } from '@/data/studioInfo'
import { Badge } from './Badge'

interface ArchitecturalLocationMapProps {
  className?: string
  defaultLocationId?: string
}

export function ArchitecturalLocationMap({
  className = '',
  defaultLocationId = 'bangalore',
}: ArchitecturalLocationMapProps) {
  const [selectedId, setSelectedId] = useState<string>(defaultLocationId)
  const [isInteractiveView, setIsInteractiveView] = useState<boolean>(true)

  const locations = STUDIO_CONFIG.serviceAreas
  const selectedLocation =
    locations.find((l) => l.id === selectedId) ?? locations[0]!

  /**
   * Karnataka Cartographic Projection Matrix
   * Karnataka bounds:
   * Lat: ~11.6° N to 18.5° N
   * Lng: ~74.0° E to 78.6° E
   *
   * Normalized SVG ViewBox: 0 0 600 680
   * X = ((lng - 73.8) / (78.8 - 73.8)) * 600
   * Y = ((18.5 - lat) / (18.5 - 11.5)) * 680
   */
  const projectCoordinates = (lat: number, lng: number) => {
    const minLat = 11.5
    const maxLat = 18.5
    const minLng = 73.8
    const maxLng = 78.8

    const x = ((lng - minLng) / (maxLng - minLng)) * 540 + 30
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600 + 40

    return { x, y }
  }

  return (
    <div
      className={`border border-[#E9E5DC] bg-[#FCFAF6] overflow-hidden ${className}`}
      role="region"
      aria-label="The Tangent Collaborative Service Areas and Geographic Coordinates"
    >
      {/* Map Header & Architectural Reference Strip */}
      <div className="p-4 sm:p-5 border-b border-[#E9E5DC] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
            <Compass className="w-4 h-4 text-[#777B60]" />
            <span>State of Karnataka, India</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-[#20211E]">
            Our Regional Service Areas
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge
            variant="outline"
            className="text-[10px] font-mono text-[#777B60] border-[#E9E5DC] bg-[#FCFAF6]"
          >
            Karnataka State Matrix
          </Badge>
          <button
            type="button"
            onClick={() => setIsInteractiveView(!isInteractiveView)}
            className="text-[11px] font-mono uppercase tracking-wider text-[#777B60] hover:text-[#20211E] underline underline-offset-4 ml-2"
            aria-label={
              isInteractiveView
                ? 'Switch to accessible list view'
                : 'Switch to architectural map view'
            }
          >
            {isInteractiveView ? 'List View' : 'Map View'}
          </button>
        </div>
      </div>

      {/* City Selector Tabs */}
      <div className="px-4 py-3 bg-[#F6F4EF] border-b border-[#E9E5DC] flex flex-wrap gap-2">
        {locations.map((loc) => {
          const isSelected = loc.id === selectedLocation.id
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedId(loc.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-[#20211E] text-white border-[#20211E] shadow-sm'
                  : 'bg-white text-[#53554D] border-[#E9E5DC] hover:border-[#20211E]'
              }`}
              aria-pressed={isSelected}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-[#777B60]' : 'bg-[#D3CDC0]'
                }`}
              />
              <span>{loc.displayName}</span>
            </button>
          )
        })}
      </div>

      {/* Main Map Body: Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Vector Cartography (7 Cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-[#FCFAF6] border-b lg:border-b-0 lg:border-r border-[#E9E5DC] relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
          {isInteractiveView ? (
            <div className="w-full max-w-[480px] aspect-[6/7] relative select-none">
              <svg
                viewBox="0 0 600 680"
                className="w-full h-full drop-shadow-sm"
                aria-hidden="true"
              >
                {/* Lat/Long Gridlines */}
                <g stroke="#E9E5DC" strokeWidth="0.8" strokeDasharray="3 3">
                  <line x1="30" y1="120" x2="570" y2="120" />
                  <text x="35" y="115" fontSize="10" fill="#99978E" fontFamily="monospace">
                    17°00′ N — Vijayapura Belt
                  </text>

                  <line x1="30" y1="280" x2="570" y2="280" />
                  <text x="35" y="275" fontSize="10" fill="#99978E" fontFamily="monospace">
                    15°30′ N — Hubballi Corridor
                  </text>

                  <line x1="30" y1="520" x2="570" y2="520" />
                  <text x="35" y="515" fontSize="10" fill="#99978E" fontFamily="monospace">
                    13°00′ N — Bangalore Region
                  </text>

                  <line x1="180" y1="40" x2="180" y2="640" />
                  <text x="185" y="635" fontSize="10" fill="#99978E" fontFamily="monospace">
                    75°00′ E
                  </text>

                  <line x1="420" y1="40" x2="420" y2="640" />
                  <text x="425" y="635" fontSize="10" fill="#99978E" fontFamily="monospace">
                    77°30′ E
                  </text>
                </g>

                {/* Stylized Karnataka Regional Outline */}
                <path
                  d="M 230 60 
                     L 340 70 
                     L 390 140 
                     L 430 200 
                     L 420 300 
                     L 520 400 
                     L 510 540 
                     L 430 620 
                     L 350 640 
                     L 240 580 
                     L 160 500 
                     L 140 380 
                     L 160 260 
                     L 180 160 Z"
                  fill="#F4F0E8"
                  stroke="#D3CDC0"
                  strokeWidth="1.5"
                  className="transition-colors"
                />

                {/* Regional Connecting Triangulation Vector */}
                <path
                  d={`M ${projectCoordinates(16.8302, 75.71).x} ${
                    projectCoordinates(16.8302, 75.71).y
                  } 
                      L ${projectCoordinates(15.3647, 75.124).x} ${
                    projectCoordinates(15.3647, 75.124).y
                  } 
                      L ${projectCoordinates(12.9716, 77.5946).x} ${
                    projectCoordinates(12.9716, 77.5946).y
                  } Z`}
                  fill="none"
                  stroke="#777B60"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                {/* Interactive Markers */}
                {locations.map((loc) => {
                  const { x, y } = projectCoordinates(
                    loc.coordinates.lat,
                    loc.coordinates.lng,
                  )
                  const isSelected = loc.id === selectedLocation.id

                  return (
                    <g
                      key={loc.id}
                      onClick={() => setSelectedId(loc.id)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse Ring for Selected Marker */}
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="16"
                          fill="none"
                          stroke="#777B60"
                          strokeWidth="1.2"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="r"
                            from="10"
                            to="24"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            from="0.8"
                            to="0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Marker Base Ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '7' : '5'}
                        fill={isSelected ? '#20211E' : '#FFFFFF'}
                        stroke={isSelected ? '#777B60' : '#20211E'}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />

                      {/* Center Point */}
                      <circle
                        cx={x}
                        cy={y}
                        r="2.5"
                        fill={isSelected ? '#FFFFFF' : '#777B60'}
                      />

                      {/* Callout Label */}
                      <text
                        x={x + 12}
                        y={y + 4}
                        fontFamily="serif"
                        fontSize={isSelected ? '14' : '12'}
                        fontWeight={isSelected ? '600' : '400'}
                        fill={isSelected ? '#20211E' : '#53554D'}
                        className="transition-all select-none"
                      >
                        {loc.displayName}
                      </text>

                      {/* Coordinates subtitle */}
                      <text
                        x={x + 12}
                        y={y + 16}
                        fontFamily="monospace"
                        fontSize="9"
                        fill="#777B60"
                        className="select-none"
                      >
                        {loc.coordinates.formatted}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm border border-[#E9E5DC] p-2.5 text-[10px] font-mono space-y-1">
                <div className="text-[#20211E] font-medium uppercase tracking-wider">
                  Cartographic Legend
                </div>
                <div className="flex items-center gap-1.5 text-[#53554D]">
                  <span className="w-2 h-2 rounded-full bg-[#20211E]" />
                  <span>Selected Service Area</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#777B60]">
                  <span className="w-2 h-0.5 bg-[#777B60]" />
                  <span>Regional Practice Triangulation</span>
                </div>
              </div>
            </div>
          ) : (
            /* Accessible Text List Fallback */
            <div className="w-full space-y-3 py-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`p-4 border cursor-pointer transition-colors ${
                    loc.id === selectedLocation.id
                      ? 'border-[#20211E] bg-white'
                      : 'border-[#E9E5DC] bg-[#FCFAF6] hover:border-[#777B60]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-[#20211E]">
                      {loc.displayName}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {loc.type}
                    </Badge>
                  </div>
                  <div className="text-xs font-mono text-[#777B60] pt-1">
                    {loc.coordinates.formatted}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Selected Location Detail Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-white flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-[#E9E5DC] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777B60] block">
                  Location Focus
                </span>
                <h4 className="font-serif text-2xl text-[#20211E] pt-0.5">
                  {selectedLocation.displayName}
                </h4>
                <div className="text-xs text-[#53554D] font-mono">
                  {selectedLocation.formattedRegion}
                </div>
              </div>

              <Badge
                variant="outline"
                className="text-[10px] text-[#777B60] border-[#E9E5DC] shrink-0"
              >
                Service Area
              </Badge>
            </div>

            {/* Geocode Coordinates */}
            <div className="p-3 bg-[#FCFAF6] border border-[#E9E5DC] space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#777B60]">Geocode:</span>
                <span className="text-[#20211E] font-medium">
                  {selectedLocation.coordinates.formatted}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#777B60]">Role:</span>
                <span className="text-[#20211E]">{selectedLocation.type}</span>
              </div>
            </div>

            {/* Scope Narrative */}
            <p className="text-xs font-sans text-[#53554D] leading-relaxed">
              {selectedLocation.description}
            </p>

            {/* Verification Notice Rule 2 / Rule 3 */}
            <div className="p-3 bg-[#F6F4EF] border-l-2 border-l-[#777B60] text-[11px] text-[#53554D] space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[#20211E] font-medium text-[10px] uppercase">
                <Info className="w-3.5 h-3.5 text-[#777B60]" />
                <span>Geographic Precision Disclosure</span>
              </div>
              <p className="leading-relaxed">
                Coordinates designate verified city-centre markers representing active practice service areas across Karnataka. Physical atelier consultations are arranged by direct brief appointment.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#E9E5DC]">
            {/* Get Directions Link for Selected City */}
            <a
              href={selectedLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-mono uppercase tracking-wider bg-[#20211E] text-white hover:bg-[#3A3B36] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions to {selectedLocation.displayName}</span>
              <ExternalLink className="w-3 h-3 text-[#E9E5DC]" />
            </a>

            {/* Google Maps Master Entity Link */}
            <a
              href={STUDIO_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 text-[11px] font-mono text-[#53554D] hover:text-[#20211E] hover:bg-[#FCFAF6] border border-[#E9E5DC] transition-colors"
            >
              <span>Explore Studio Entity on Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#777B60]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
