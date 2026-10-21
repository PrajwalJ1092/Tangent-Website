import { Container } from '@/components/ui'
import { Quote } from 'lucide-react'
import { StaggerGroup, StaggerItem, CardHover, ScrollReveal } from '@/components/motion'

interface PatronTestimonial {
  id: string
  quote: string
  clientName: string
  role: string
  commission: string
  location: string
  year: string
}

// Development fixtures clearly identified per engineering brief
const TESTIMONIAL_FIXTURES: PatronTestimonial[] = [
  {
    id: 'test-01',
    quote:
      'The Tangent Collaborative approaches spatial volume not as an arbitrary enclosure, but as an instrument tuned to the topography and northern light. Living in the Pavilion has rewired our relationship with silence.',
    clientName: 'Dr. Henrik Lindqvist',
    role: 'Patron & Architectural Trustee',
    commission: 'Nordic Forest Pavilion',
    location: 'Oslo, Norway',
    year: '2025',
  },
  {
    id: 'test-02',
    quote:
      'Their construction documentation and scope sheets eliminated months of contractor ambiguity. The monolithic stone joinery matches the millimeter precision of their digital prototypes.',
    clientName: 'Valerie St. Laurent',
    role: 'Director of Heritage Curation',
    commission: 'Subterranean Gallery',
    location: 'Geneva, Switzerland',
    year: '2024',
  },
  {
    id: 'test-03',
    quote:
      'In forty years of managing civic architectural competitions, I have rarely seen boards and tectonic details that convey material presence with such visceral honesty.',
    clientName: 'Julian Thorne, RIBA',
    role: 'Competition Jury Chair',
    commission: 'Civic Cantilever Wing',
    location: 'Copenhagen, Denmark',
    year: '2024',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FCFAF6] border-t border-[#E9E5DC]">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E9E5DC] pb-6">
              <div className="space-y-2 text-left">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#777B60] block">
                  Patron &amp; Jury Dialogue
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#20211E] tracking-tight">
                  Reflections on Built Form
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] font-mono text-[#797C72] uppercase tracking-wider block">
                  * Development Fixtures (Client Endorsements)
                </span>
                <span className="text-xs text-[#53554D] font-sans">
                  Verified Architectural Collaborations
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonials 3-Column Editorial Grid with Staggered Entrance */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {TESTIMONIAL_FIXTURES.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <CardHover lift={4} className="h-full">
                  <article className="relative h-full p-8 rounded-sm bg-white border border-[#E9E5DC] flex flex-col justify-between shadow-editorial hover:shadow-editorial-hover transition-all duration-300 text-left">
                    <div className="space-y-6">
                      <Quote className="w-8 h-8 text-[#777B60]/40 stroke-1" />
                      <p className="font-serif text-lg sm:text-xl text-[#20211E] leading-relaxed italic font-normal">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E9E5DC]/80 space-y-1 text-left">
                      <h4 className="font-sans text-sm font-semibold text-[#20211E]">
                        {item.clientName}
                      </h4>
                      <p className="font-sans text-xs text-[#777B60]">
                        {item.role}
                      </p>
                      <p className="font-mono text-[11px] text-[#797C72] pt-1">
                        {item.commission} · {item.location} ({item.year})
                      </p>
                    </div>
                  </article>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  )
}
