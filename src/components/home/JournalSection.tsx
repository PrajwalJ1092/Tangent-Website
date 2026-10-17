import { Container, SectionHeading } from '@/components/ui'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'

interface JournalArticle {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  image: string
  imageAlt: string
}

const ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    title: 'The Physics of Diffused Light: Calibrating Deep Clerestory Apertures',
    category: 'Spatial Research',
    date: 'February 2026',
    readTime: '6 min read',
    excerpt:
      'How micro-textured lime plaster and calibrated ceiling cantilevers transform direct solar radiation into an even, glare-free luminous plane across living pavilions.',
    image: ARCHITECTURAL_ASSETS.kyotoAtelier!.url,
    imageAlt: ARCHITECTURAL_ASSETS.kyotoAtelier!.alt,
  },
  {
    id: 'art-02',
    title: 'Why Standardizing Interior Scope Sheets Saves 120+ Hours per Project',
    category: 'Documentation Practice',
    date: 'January 2026',
    readTime: '8 min read',
    excerpt:
      'Contractor friction and change orders almost always stem from vague client onboarding. A room-by-room architectural deliverables system establishes definitive boundaries.',
    image: ARCHITECTURAL_ASSETS.scopeSheetMockup?.url || ARCHITECTURAL_ASSETS.portfolioTemplate!.url,
    imageAlt: 'Interior design scope sheet specification documentation on studio desk',
  },
  {
    id: 'art-03',
    title: 'Geological Permanence: Cross-Cut Roman Travertine and Board-Formed Concrete',
    category: 'Material Monographs',
    date: 'December 2025',
    readTime: '5 min read',
    excerpt:
      'Examining tactile surface interactions between porous geological stone and the grain transfer of 150mm Douglas fir formwork.',
    image: ARCHITECTURAL_ASSETS.travertineVein!.url,
    imageAlt: ARCHITECTURAL_ASSETS.travertineVein!.alt,
  },
]

export function JournalSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F6F4EF] border-t border-[#E9E5DC]">
      <Container>
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Studio Journal &amp; Insights"
            title="Monographs, Research &amp; Digital Craft"
            description="Reflections on tectonic construction, photometric daylight simulation, and modern project documentation."
            action={
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#777B60] hover:text-[#20211E] transition-colors"
              >
                <span>Read All Monographs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            }
            align="split"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {ARTICLES.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between bg-white border border-[#E9E5DC] rounded-sm overflow-hidden p-5 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#EFECE6]">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#20211E]/80 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">
                      {article.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#797C72]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#777B60]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#53554D] leading-relaxed line-clamp-3 font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E9E5DC] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#777B60] group-hover:text-[#20211E] flex items-center gap-1.5 transition-colors">
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Dispatch
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#797C72] group-hover:text-[#20211E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
