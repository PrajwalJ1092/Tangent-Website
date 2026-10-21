import { useState, useEffect } from 'react'
import { Star, ShieldAlert, Plus, MessageSquare } from 'lucide-react'
import type { ProductReview } from '@/types/product'
import { Button } from '@/components/ui'

interface ProductReviewsSectionProps {
  productId: string
  productName: string
  initialReviews?: ProductReview[]
}

export function ProductReviewsSection({
  productId,
  productName,
  initialReviews = [],
}: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(() => initialReviews)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent')

  // Form state for review submission simulation
  const [newAuthor, setNewAuthor] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Accessible Escape key listener for the review modal
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAuthor.trim() || !newContent.trim()) return

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      productId,
      authorName: newAuthor.trim(),
      authorRole: newRole.trim() || 'Architectural Practitioner',
      rating: newRating,
      title: newTitle.trim() || 'Verified Studio Evaluation',
      content: newContent.trim(),
      createdAt: 'Just now (Simulated Submission)',
      verifiedPurchase: false,
      moderationStatus: 'approved',
    }

    setReviews((prev) => [newReview, ...prev])
    setSubmitSuccess(true)
    setTimeout(() => {
      setSubmitSuccess(false)
      setIsModalOpen(false)
      setNewAuthor('')
      setNewRole('')
      setNewTitle('')
      setNewContent('')
      setNewRating(5)
    }, 1500)
  }

  // Calculated values from actual review data
  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0

  // Real star counts
  const starCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  // Sorted reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating
    if (sortBy === 'lowest') return a.rating - b.rating
    // 'recent': newest submissions first
    return (b.id || '').localeCompare(a.id || '')
  })

  return (
    <div className="space-y-10 border-t border-[#E9E5DC] pt-12 text-left" id="reviews-section">
      {/* Editorial Header & Verification Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E9E5DC] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
            <MessageSquare className="w-4 h-4" />
            <span>Studio Feedback &amp; Peer Evaluations</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] font-normal pt-1">
            Customer Reviews &amp; Ratings
          </h2>
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#777B60] bg-[#FCFAF6] px-2.5 py-1 border border-[#E9E5DC]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#777B60]" />
            <span>Honest Peer Evaluations</span>
          </div>
          <span className="text-[11px] text-[#797C72] font-sans">
            Ratings calculated dynamically from verified evaluation records.
          </span>
        </div>
      </div>

      {totalReviews === 0 ? (
        /* Empty Reviews State */
        <div className="p-8 sm:p-12 border border-[#E9E5DC] bg-[#FCFAF6] rounded-sm text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-[#777B60] mx-auto opacity-60" />
          <h3 className="font-serif text-xl text-[#20211E]">
            No Studio Evaluations Yet
          </h3>
          <p className="font-sans text-xs text-[#53554D] max-w-md mx-auto leading-relaxed">
            Have you integrated {productName} into your studio workflow? Share your architectural critique, documentation experience, and project outcomes.
          </p>
          <div className="pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 text-xs font-mono uppercase cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Submit First Evaluation
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Score & Distribution Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FCFAF6] p-6 sm:p-8 border border-[#E9E5DC]">
            {/* Left: Overall Score (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#E9E5DC] pb-6 md:pb-0 md:pr-8">
              <span className="font-serif text-5xl sm:text-6xl text-[#20211E] font-normal">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 my-2" aria-label={`Average rating ${averageRating.toFixed(1)} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? 'fill-[#20211E] text-[#20211E]'
                        : 'text-[#D3CDC0]'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-[#53554D]">
                Based on {totalReviews} {totalReviews === 1 ? 'evaluation' : 'evaluations'}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 gap-2 text-xs font-mono uppercase cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Submit Evaluation
              </Button>
            </div>

            {/* Right: Distribution Bars (8 cols) */}
            <div className="md:col-span-8 space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars as keyof typeof starCounts] || 0
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs font-mono">
                    <span className="w-12 text-[#53554D] flex items-center gap-1">
                      {stars} <Star className="w-3 h-3 fill-current text-[#797C72]" />
                    </span>
                    <div className="flex-1 h-2 bg-[#E9E5DC] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#20211E] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[#797C72] text-[11px]">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#53554D]">
              Displaying {sortedReviews.length} {sortedReviews.length === 1 ? 'evaluation' : 'evaluations'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#797C72] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest' | 'lowest')}
                className="bg-white border border-[#E9E5DC] text-[#20211E] px-2.5 py-1 rounded text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#20211E] cursor-pointer"
                aria-label="Sort customer reviews"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Reviews Cards List */}
          <div className="space-y-4">
            {sortedReviews.map((rev) => (
              <article
                key={rev.id}
                className="p-6 bg-white border border-[#E9E5DC] rounded-sm space-y-3 shadow-editorial text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E5DC]/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center" aria-label={`Rating: ${rev.rating} of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'fill-[#20211E] text-[#20211E]'
                              : 'text-[#D3CDC0]'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-[#20211E]">
                      {rev.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#797C72]">
                    <span>{rev.createdAt}</span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#53554D] leading-relaxed">
                  {rev.content}
                </p>

                <div className="pt-2 text-[11px] font-mono text-[#777B60]">
                  <span className="font-medium text-[#20211E]">{rev.authorName}</span>
                  {rev.authorRole && <span> · {rev.authorRole}</span>}
                  {rev.authorLocation && <span> ({rev.authorLocation})</span>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* Review Submission Modal with Keyboard Escape Handler */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-review-heading"
        >
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-sm border border-[#E9E5DC] shadow-2xl space-y-6 text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#777B60]">
                  Peer Review Submission
                </span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-mono text-[#797C72] hover:text-[#20211E] cursor-pointer"
                >
                  Close [ESC]
                </button>
              </div>
              <h3 id="submit-review-heading" className="font-serif text-2xl text-[#20211E]">
                Evaluate {productName}
              </h3>
              <p className="text-xs text-[#797C72] font-sans">
                Notice: In this demo phase, evaluations update local component state without persistent backend storage.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono space-y-1">
                <p className="font-semibold">Review Recorded Successfully</p>
                <p>Thank you for contributing your architectural evaluation.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#53554D] mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewRating(s)}
                        className="p-1 focus:outline-none cursor-pointer"
                        aria-label={`Select ${s} stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            s <= newRating
                              ? 'fill-[#20211E] text-[#20211E]'
                              : 'text-[#D3CDC0]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-xs text-[#20211E]">
                      {newRating} / 5
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#53554D] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Mia Althaus"
                      className="w-full text-xs font-sans p-2.5 border border-[#E9E5DC] focus:outline-none focus:ring-1 focus:ring-[#20211E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#53554D] mb-1">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Project Architect"
                      className="w-full text-xs font-sans p-2.5 border border-[#E9E5DC] focus:outline-none focus:ring-1 focus:ring-[#20211E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#53554D] mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Concise summary of your experience"
                    className="w-full text-xs font-sans p-2.5 border border-[#E9E5DC] focus:outline-none focus:ring-1 focus:ring-[#20211E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#53554D] mb-1">
                    Evaluation Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="How did this digital resource perform in your studio workflow?"
                    className="w-full text-xs font-sans p-2.5 border border-[#E9E5DC] focus:outline-none focus:ring-1 focus:ring-[#20211E]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="cursor-pointer">
                    Publish Evaluation
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
