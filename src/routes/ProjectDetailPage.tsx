import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass } from 'lucide-react'
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import {
  Container,
  Breadcrumbs,
  ImageFrame,
  Badge,
  Button,
  Metadata,
  EmptyState,
} from '@/components/ui'
import { formatCategoryLabel } from '@/lib/formatters'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const adjacent = slug ? getAdjacentProjects(slug) : null

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
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#797C72] hover:text-[#20211E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all projects
          </Link>
        </div>
      </Container>

      {/* 2. Hero Headline & Meta Strip */}
      <Container>
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">
              {formatCategoryLabel(project.category)}
            </Badge>
            <span className="font-sans text-xs uppercase tracking-[0.16em] text-[#797C72]">
              {project.location} · {project.year}
            </span>
            {project.status === 'concept' ? (
              <Badge variant="outline">Concept Phase</Badge>
            ) : (
              <Badge variant="muted">Built &amp; Commissioned</Badge>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#20211E] leading-[1.05] text-balance">
            {project.title}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-[#53554D] font-light leading-relaxed max-w-3xl text-pretty">
            {project.shortDescription}
          </p>
        </div>
      </Container>

      {/* 3. Hero Architectural Photograph */}
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg overflow-hidden border border-[#E9E5DC]"
        >
          <ImageFrame
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            aspectRatio="wide"
            priority
            hoverZoom={false}
            caption={project.coverImage.caption}
          />
        </motion.div>
      </Container>

      {/* 4. Specifications & Scope Overview */}
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 pt-6 items-start">
          {/* Left Column: Scope & Services */}
          <div className="lg:col-span-5 space-y-6">
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
          <div className="lg:col-span-7 space-y-6">
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
      </Container>

      {/* 5. Design Concept & Architectural Narrative */}
      <Container size="narrow">
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
      </Container>

      {/* 6. Gallery Images (If available) */}
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
              {project.galleryImages.map((img) => (
                <div key={img.id} className="space-y-2">
                  <ImageFrame
                    src={img.url}
                    alt={img.alt}
                    aspectRatio={img.aspectRatio || 'landscape'}
                    caption={img.caption}
                    hoverZoom
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 7. Next & Previous Project Navigation */}
      {adjacent && (
        <Container>
          <div className="border-y border-[#E9E5DC] py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Previous Project */}
            <Link
              to={`/projects/${adjacent.prev.slug}`}
              className="group flex flex-col gap-2 text-left p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC] hover:border-[#D3CDC0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
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

            {/* Next Project */}
            <Link
              to={`/projects/${adjacent.next.slug}`}
              className="group flex flex-col gap-2 text-left p-6 rounded-lg bg-[#FCFAF6] border border-[#E9E5DC] hover:border-[#D3CDC0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20211E]"
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
          </div>
        </Container>
      )}

      {/* 8. Studio Inquiry CTA */}
      <Container size="narrow">
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
      </Container>
    </article>
  )
}
