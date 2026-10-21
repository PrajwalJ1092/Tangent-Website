import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Maximize2 } from 'lucide-react'
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import {
  Container,
  Breadcrumbs,
  Badge,
  Button,
  Metadata,
  EmptyState,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  MaskedText,
  ImageReveal,
  ParallaxWrapper,
  CardHover,
  StaggerGroup,
  StaggerItem,
} from '@/components/motion'
import { ProjectLightbox, type LightboxImage } from '@/components/projects'
import { formatCategoryLabel } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const adjacent = slug ? getAdjacentProjects(slug) : null

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Consolidate all project images (cover + gallery) for the lightbox
  const allImages: LightboxImage[] = useMemo(() => {
    if (!project) return []
    const list: LightboxImage[] = [
      {
        id: project.coverImage.id || 'cover',
        url: project.coverImage.url,
        alt: project.coverImage.alt,
        caption: project.coverImage.caption || `${project.title} — Primary Elevation`,
      },
    ]

    if (project.galleryImages) {
      project.galleryImages.forEach((img) => {
        list.push({
          id: img.id,
          url: img.url,
          alt: img.alt,
          caption: img.caption,
        })
      })
    }
    return list
  }, [project])

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Graceful 404 handler for invalid slugs
  if (!project) {
    return (
      <div className="py-24">
        <Container size="narrow">
          <EmptyState
            title="Project Monograph Not Found"
            description={`The architectural record corresponding to "${slug}" does not exist in the studio archive.`}
            actionLabel="Return to Projects Archive"
            actionNode={
              <Link to="/projects">
                <Button variant="primary" size="md">
                  Return to Projects Archive
                </Button>
              </Link>
            }
          />
        </Container>
      </div>
    )
  }

  // Split narrative into paragraphs
  const narrativeParagraphs = project.fullDescription.split('\n\n')

  return (
    <article className="py-10 space-y-16 sm:space-y-24">
      <SEO
        title={project.title}
        description={project.shortDescription}
        ogImage={project.coverImage.url}
      />
      {/* 1. Breadcrumb Navigation & Top Return Link */}
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E5DC]">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Commissions', to: '/projects' },
              { label: project.title },
            ]}
          />
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#797C72] hover:text-[#20211E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
          </Link>
        </div>
      </Container>

      {/* 2. Hero Headline & Meta Strip with Staggered Entrance */}
      <Container>
        <div className="space-y-6 max-w-4xl text-left">
          <StaggerGroup stagger={0.08} className="flex flex-wrap items-center gap-3">
            <StaggerItem>
              <Badge variant="accent">
                {formatCategoryLabel(project.category)}
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-[#797C72]">
                {project.location} · {project.year}
              </span>
            </StaggerItem>
            <StaggerItem>
              {project.status === 'concept' ? (
                <Badge variant="outline">Concept Phase</Badge>
              ) : (
                <Badge variant="muted">Built &amp; Commissioned</Badge>
              )}
            </StaggerItem>
          </StaggerGroup>

          <MaskedText
            as="h1"
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05]"
          >
            {project.title}
          </MaskedText>

          <ScrollReveal delay={0.2}>
            <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>
          </ScrollReveal>
        </div>
      </Container>

      {/* 3. Hero Architectural Photograph with Lightbox Trigger */}
      <Container size="wide">
        <ScrollReveal>
          <div className="relative group rounded-xl overflow-hidden border border-[#E9E5DC] bg-[#E9E5DC]">
            <ParallaxWrapper offset={18}>
              <div
                onClick={() => openLightboxAt(0)}
                className="relative aspect-[16/9] sm:aspect-[21/9] w-full cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightboxAt(0)
                  }
                }}
                aria-label={`Enlarge cover image: ${project.coverImage.alt}`}
              >
                <ImageReveal
                  src={project.coverImage.url}
                  alt={project.coverImage.alt}
                  direction="center"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[#20211E]/0 group-hover:bg-[#20211E]/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-[#20211E]/80 backdrop-blur-md text-[#F6F4EF] text-xs font-sans uppercase tracking-widest flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5" /> Enlarge Plate
                  </div>
                </div>
              </div>
            </ParallaxWrapper>

            {project.coverImage.caption && (
              <div className="p-3 bg-[#FCFAF6] border-t border-[#E9E5DC] flex items-center justify-between text-xs text-[#797C72] font-serif italic">
                <span>{project.coverImage.caption}</span>
                <span className="font-mono not-italic text-[10px] uppercase tracking-wider text-[#777B60]">
                  Plate 01 / {allImages.length}
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>

      {/* 4. Specifications & Scope Overview */}
      <Container>
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-12 pt-6 items-start">
            {/* Left Column: Scope & Services */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60] block">
                Project Parameters
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-[#20211E]">
                  Disciplines &amp; Scope
                </h3>
                <ul className="divide-y divide-[#E9E5DC] border-y border-[#E9E5DC]">
                  {project.services.map((service) => (
                    <li key={service} className="py-2.5 flex items-center gap-2 text-sm text-[#53554D] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#777B60]" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.client && (
                <div className="pt-2 text-xs font-sans text-[#797C72]">
                  <span className="uppercase tracking-wider block">Commissioning Entity:</span>
                  <span className="text-[#20211E] font-medium text-sm">{project.client}</span>
                </div>
              )}
            </div>

            {/* Right Column: Key Specifications */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60] block">
                Architectural Specifications
              </span>
              {project.specifications && project.specifications.length > 0 ? (
                <Metadata layout="stacked" items={project.specifications} />
              ) : (
                <Metadata
                  layout="stacked"
                  items={[
                    { label: 'Enclosed Footprint', value: project.area || 'N/A' },
                    { label: 'Location', value: project.location },
                    { label: 'Year Completed', value: project.year.toString() },
                  ]}
                />
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* 5. Design Concept & Architectural Narrative with Line-by-Line Revelations */}
      <Container size="narrow">
        <ScrollReveal>
          <div className="space-y-6 text-left border-t border-[#E9E5DC] pt-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60] block">
              Spatial Concept
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20211E] tracking-tight leading-tight">
              Tectonic Integrity and Light Modulation
            </h2>
            <div className="space-y-5 font-sans text-base sm:text-lg text-[#53554D] font-light leading-relaxed">
              {narrativeParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* 6. Curated Visual Plates & Diptych Gallery with Lightbox Enlarge */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section aria-label="Project Gallery" className="space-y-12">
          <Container>
            <div className="border-t border-[#E9E5DC] pt-12 flex items-baseline justify-between">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#777B60]">
                Visual Plates &amp; Detailing
              </span>
              <span className="font-sans text-xs text-[#797C72] uppercase tracking-wider">
                {project.galleryImages.length} Plates Documented
              </span>
            </div>
          </Container>

          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.galleryImages.map((img, idx) => {
                const globalImageIndex = idx + 1 // Offset by 1 since index 0 is coverImage
                const aspectClass =
                  img.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : img.aspectRatio === 'square'
                    ? 'aspect-square'
                    : 'aspect-[16/10]'

                return (
                  <ScrollReveal key={img.id} delay={idx * 0.1}>
                    <CardHover lift={3} className="space-y-2 text-left">
                      <div
                        onClick={() => openLightboxAt(globalImageIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightboxAt(globalImageIndex)
                          }
                        }}
                        className="group relative rounded-lg overflow-hidden border border-[#E9E5DC] bg-[#E9E5DC] cursor-pointer"
                        aria-label={`Enlarge plate: ${img.alt}`}
                      >
                        <div className={cn('relative w-full overflow-hidden', aspectClass)}>
                          <ImageReveal
                            src={img.url}
                            alt={img.alt}
                            direction="center"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="absolute inset-0 bg-[#20211E]/0 group-hover:bg-[#20211E]/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 rounded-full bg-[#20211E]/80 backdrop-blur-md text-[#F6F4EF]">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {img.caption && (
                        <p className="font-serif italic text-xs sm:text-sm text-[#797C72] pt-1 leading-snug">
                          {img.caption}
                        </p>
                      )}
                    </CardHover>
                  </ScrollReveal>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 7. Next & Previous Project Navigation */}
      {adjacent && (
        <Container>
          <ScrollReveal>
            <div className="border-y border-[#E9E5DC] py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Previous Project */}
              <CardHover lift={3}>
                <Link
                  to={`/projects/${adjacent.prev.slug}`}
                  className="group flex flex-col gap-2 text-left p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC] hover:border-[#D3CDC0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] h-full"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-sans text-[#797C72] uppercase tracking-wider group-hover:text-[#20211E]">
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Commission</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors">
                    {adjacent.prev.title}
                  </h4>
                  <span className="font-sans text-xs text-[#797C72]">
                    {adjacent.prev.location} · {adjacent.prev.year}
                  </span>
                </Link>
              </CardHover>

              {/* Next Project */}
              <CardHover lift={3}>
                <Link
                  to={`/projects/${adjacent.next.slug}`}
                  className="group flex flex-col gap-2 text-left p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC] hover:border-[#D3CDC0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E] h-full"
                >
                  <div className="inline-flex items-center justify-end gap-1.5 text-xs font-sans text-[#797C72] uppercase tracking-wider group-hover:text-[#20211E]">
                    <span>Next Commission</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#20211E] group-hover:text-[#777B60] transition-colors sm:text-right">
                    {adjacent.next.title}
                  </h4>
                  <span className="font-sans text-xs text-[#797C72] sm:text-right">
                    {adjacent.next.location} · {adjacent.next.year}
                  </span>
                </Link>
              </CardHover>
            </div>
          </ScrollReveal>
        </Container>
      )}

      {/* 8. Studio Inquiry CTA */}
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center py-12 px-8 rounded-xl bg-[#EFECE3] border border-[#E9E5DC] space-y-6">
            <span className="w-10 h-10 rounded-full bg-[#E9E5DC] inline-flex items-center justify-center text-[#777B60]">
              <Compass className="w-5 h-5" />
            </span>
            <div className="space-y-2">
              <h3 className="font-serif text-3xl text-[#20211E]">
                Commission a Contextual Spatial Work
              </h3>
              <p className="font-sans text-sm text-[#53554D] max-w-md mx-auto leading-relaxed font-light">
                We collaborate with private clients and cultural institutions worldwide on bespoke architecture and interior transformations.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="md" className="gap-2">
                  Initiate Project Dialogue <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="md" variant="outline">
                  All Projects
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* 9. Accessible Fullscreen Image Lightbox Modal */}
      <ProjectLightbox
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  )
}
