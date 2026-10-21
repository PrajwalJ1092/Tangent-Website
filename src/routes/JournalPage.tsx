import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  ImageFrame,
  Badge,
  SEO,
} from '@/components/ui'
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
  CardHover,
} from '@/components/motion'
import { JOURNAL_ARTICLES } from '@/data/journal'

export function JournalPage() {
  const featuredArticle = JOURNAL_ARTICLES[0]
  const archiveArticles = JOURNAL_ARTICLES.slice(1)

  return (
    <div className="py-10 space-y-20">
      <SEO
        title="Journal &amp; Spatial Research"
        description="Essays, material studies, and computational field notes from The Tangent Collaborative's ongoing architectural commissions across Bangalore, Vijayapura, and Hubballi."
      />
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <PageHeading
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: 'Studio Home', to: '/' },
                  { label: 'Journal & Spatial Research' },
                ]}
              />
            }
            title="Journal & Spatial Research"
            subtitle="Essays, material studies, and computational field notes from The Tangent Collaborative's ongoing architectural commissions across Bangalore, Vijayapura, and Hubballi."
          />
        </ScrollReveal>

        {/* Featured Editorial Essay Lead */}
        {featuredArticle && (
          <ScrollReveal variant="clip-up" duration={0.8} delay={0.2} className="mt-10">
            <CardHover lift={4}>
              <div className="border border-[#E9E5DC] bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 bg-[#EFECE6]/40 p-4">
                  <Link
                    to={`/journal/${featuredArticle.slug}`}
                    className="block overflow-hidden"
                    aria-label={`Read article: ${featuredArticle.title}`}
                  >
                    <ImageFrame
                      src={featuredArticle.coverImage.url}
                      alt={featuredArticle.coverImage.alt}
                      aspectRatio="landscape"
                      hoverZoom
                      className="w-full"
                    />
                  </Link>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[10px] font-mono text-[#777B60] border-[#E9E5DC]">
                        Featured Monograph Note
                      </Badge>
                      <span className="text-[11px] font-mono text-[#777B60] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredArticle.readingTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] leading-tight hover:text-[#777B60] transition-colors">
                      <Link to={`/journal/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[#53554D] leading-relaxed font-sans line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#E9E5DC] flex items-center justify-between text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#777B60] block">Author</span>
                      <span className="text-[#20211E] font-medium">{featuredArticle.author.name}</span>
                    </div>

                    <Link
                      to={`/journal/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#20211E] text-white hover:bg-[#3A3B36] transition-colors uppercase text-[11px] tracking-wider"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardHover>
          </ScrollReveal>
        )}
      </Container>

      {/* Archive Articles Grid */}
      <Container>
        <div className="border-t border-[#E9E5DC] pt-12">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#20211E]">
              Recent Research Notes &amp; Observations
            </h3>
            <span className="text-xs font-mono text-[#777B60]">
              {JOURNAL_ARTICLES.length} Published Papers
            </span>
          </div>

          <StaggerGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {archiveArticles.map((article) => (
              <StaggerItem key={article.id}>
                <CardHover lift={3} className="h-full">
                  <div className="border border-[#E9E5DC] bg-white p-6 space-y-4 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <Link
                        to={`/journal/${article.slug}`}
                        className="block overflow-hidden"
                        aria-label={`Read article: ${article.title}`}
                      >
                        <ImageFrame
                          src={article.coverImage.url}
                          alt={article.coverImage.alt}
                          aspectRatio="landscape"
                          hoverZoom
                        />
                      </Link>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#777B60]">
                          <span className="uppercase tracking-wider">{article.category}</span>
                          <span>•</span>
                          <span>{article.readingTime}</span>
                        </div>

                        <h4 className="font-serif text-xl text-[#20211E] hover:text-[#777B60] transition-colors leading-snug">
                          <Link to={`/journal/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>

                        <p className="text-xs text-[#53554D] leading-relaxed line-clamp-3 font-sans">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E9E5DC] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#777B60]">{article.publishedAt}</span>
                      <Link
                        to={`/journal/${article.slug}`}
                        className="inline-flex items-center gap-1 text-[#20211E] hover:text-[#777B60] font-medium"
                      >
                        <span>Full Study</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </div>
  )
}
