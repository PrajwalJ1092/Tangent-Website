import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import {
  Container,
  Breadcrumbs,
  ImageFrame,
  Badge,
  SEO,
} from '@/components/ui'
import { ScrollReveal, MaskedText, CardHover } from '@/components/motion'
import { JOURNAL_ARTICLES } from '@/data/journal'

export function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    return <Navigate to="/journal" replace />
  }

  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2)

  return (
    <article className="py-10 space-y-16">
      <SEO
        title={article.title}
        description={article.excerpt}
        ogType="article"
        ogImage={article.coverImage.url}
      />
      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Studio Home', to: '/' },
              { label: 'Journal', to: '/journal' },
              { label: article.category },
            ]}
          />
        </div>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-[#777B60]">
            <Badge variant="outline" className="border-[#E9E5DC] text-[10px] text-[#777B60] uppercase">
              {article.category}
            </Badge>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>

          <MaskedText as="h1" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#20211E] leading-tight">
            {article.title}
          </MaskedText>

          <p className="font-serif text-base sm:text-lg text-[#777B60] italic max-w-2xl mx-auto leading-relaxed">
            "{article.subtitle}"
          </p>

          {/* Author Card */}
          <div className="pt-4 border-t border-[#E9E5DC] flex items-center justify-center gap-3 text-xs font-mono">
            <span className="text-[#777B60]">Written by</span>
            <span className="text-[#20211E] font-medium">{article.author.name}</span>
            <span className="text-[#777B60]">— {article.author.role}</span>
          </div>
        </header>

        {/* Hero Figure */}
        <ScrollReveal variant="clip-up" duration={0.9} delay={0.2} className="mt-12 max-w-4xl mx-auto">
          <div className="border border-[#E9E5DC] bg-[#EFECE6]/40 p-3">
            <ImageFrame
              src={article.coverImage.url}
              alt={article.coverImage.alt}
              aspectRatio="wide"
              className="w-full object-cover"
            />
            <p className="p-3 text-[11px] font-mono text-[#777B60] text-center border-t border-[#E9E5DC] bg-white">
              {article.coverImage.caption}
            </p>
          </div>
        </ScrollReveal>

        {/* Article Body with Comfortable Reading Width */}
        <div className="max-w-2xl mx-auto mt-16 space-y-12 text-[#20211E]">
          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg font-serif text-[#20211E] leading-relaxed border-l-2 border-[#777B60] pl-6 italic">
            {article.excerpt}
          </p>

          {/* Structured Sections */}
          {article.content.map((section, idx) => (
            <ScrollReveal key={idx} variant="fade-up" duration={0.6} className="space-y-6">
              {section.heading && (
                <h2 className="font-serif text-2xl text-[#20211E] pt-4 border-t border-[#E9E5DC]">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm leading-relaxed text-[#53554D] font-sans">
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-8 p-6 border-y border-[#E9E5DC] bg-[#FCFAF6] text-center">
                  <p className="font-serif text-lg text-[#20211E] italic leading-relaxed">
                    "{section.quote}"
                  </p>
                  <cite className="block text-[11px] font-mono text-[#777B60] uppercase tracking-wider mt-3 not-italic">
                    — The Tangent Collaborative Monograph Notes
                  </cite>
                </blockquote>
              )}

              {section.figure && (
                <div className="my-8 border border-[#E9E5DC] bg-[#FCFAF6] p-2 space-y-2">
                  <ImageFrame
                    src={section.figure.url}
                    alt={section.figure.alt}
                    aspectRatio="landscape"
                    className="w-full"
                  />
                  <p className="text-[11px] font-mono text-[#777B60] px-2 py-1 text-center">
                    {section.figure.caption}
                  </p>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Article Footer & Return Action */}
        <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-[#E9E5DC] flex items-center justify-between">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#20211E] hover:text-[#777B60] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Journal Index</span>
          </Link>

          <Link
            to="/contact"
            className="text-xs font-mono uppercase tracking-wider text-[#777B60] hover:text-[#20211E] transition-colors"
          >
            Inquire About Spatial Research →
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-[#E9E5DC]">
            <h3 className="font-serif text-2xl text-[#20211E] mb-8 text-center">
              Related Spatial Research
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <CardHover key={rel.id} lift={3}>
                  <div className="border border-[#E9E5DC] bg-white p-6 space-y-3 h-full flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#777B60]">
                        {rel.category} • {rel.readingTime}
                      </span>
                      <h4 className="font-serif text-lg text-[#20211E] hover:text-[#777B60] transition-colors line-clamp-1">
                        <Link to={`/journal/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                      <p className="text-xs text-[#53554D] line-clamp-2 leading-relaxed font-sans">
                        {rel.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/journal/${rel.slug}`}
                      className="pt-2 text-xs font-mono text-[#20211E] hover:text-[#777B60] inline-flex items-center gap-1"
                    >
                      <span>Read Study</span>
                      <span>→</span>
                    </Link>
                  </div>
                </CardHover>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  )
}
