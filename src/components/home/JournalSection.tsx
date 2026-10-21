import { Container, SectionHeading } from '@/components/ui'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { JOURNAL_ARTICLES } from '@/data/journal'
import { StaggerGroup, StaggerItem, ImageReveal, CardHover, HoverUnderline } from '@/components/motion'

export function JournalSection() {
  const displayArticles = JOURNAL_ARTICLES.slice(0, 3)

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
                to="/journal"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#777B60] hover:text-[#20211E] transition-colors"
              >
                <span>Read All Monographs</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            }
            align="split"
          />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {displayArticles.map((article, idx) => (
              <StaggerItem key={article.id} className="h-full">
                <CardHover lift={4} className="h-full">
                  <article className="group flex flex-col justify-between h-full bg-white border border-[#E9E5DC] rounded-sm overflow-hidden p-5 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 text-left">
                    <div className="space-y-4">
                      {/* Image Reveal with Directional Curtain */}
                      <div className="relative">
                        <Link to={`/journal/${article.slug}`} className="block overflow-hidden rounded-sm" aria-label={`Read article: ${article.title}`}>
                          <ImageReveal
                            src={article.coverImage.url}
                            alt={article.coverImage.alt}
                            aspectRatio="landscape"
                            direction={idx % 2 === 0 ? 'up' : 'left'}
                            hoverZoom
                          />
                        </Link>
                        <div className="absolute top-2.5 left-2.5 bg-[#20211E]/80 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 pointer-events-none">
                          {article.category}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#777B60]">
                        <span>{article.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#777B60]" />
                          {article.readingTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#20211E] group-hover:text-[#777B60] transition-colors line-clamp-2">
                        <Link to={`/journal/${article.slug}`}>
                          <HoverUnderline lineColor="bg-[#777B60]">
                            {article.title}
                          </HoverUnderline>
                        </Link>
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-[#53554D] leading-relaxed line-clamp-3 font-light">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E9E5DC] flex items-center justify-between text-xs font-mono">
                      <Link
                        to={`/journal/${article.slug}`}
                        className="text-[#777B60] group-hover:text-[#20211E] flex items-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Dispatch</span>
                      </Link>
                      <Link to={`/journal/${article.slug}`} aria-hidden="true" tabIndex={-1}>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#797C72] group-hover:text-[#20211E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
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
