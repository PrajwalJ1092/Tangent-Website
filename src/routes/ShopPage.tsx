import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal, Sparkles, ShieldCheck, Download, Layers } from 'lucide-react'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  Button,
  EmptyState,
  ProductCard,
} from '@/components/ui'
import {
  MARKETPLACE_CATEGORIES,
  type MarketplaceCategory,
} from '@/types/product'
import {
  PRODUCTS,
  getFeaturedProducts,
  filterAndSortProducts,
} from '@/data/products'

type FilterCategory = MarketplaceCategory | 'all'
type SortOption = 'featured' | 'price-low-to-high' | 'price-high-to-low' | 'name-a-z'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = (searchParams.get('category') as FilterCategory) || 'all'
  const searchQuery = searchParams.get('q') || ''
  const sortBy = (searchParams.get('sort') as SortOption) || 'featured'

  const updateFilters = (updates: {
    category?: FilterCategory
    search?: string
    sort?: SortOption
  }) => {
    const nextCategory = updates.category !== undefined ? updates.category : category
    const nextSearch = updates.search !== undefined ? updates.search : searchQuery
    const nextSort = updates.sort !== undefined ? updates.sort : sortBy

    const params = new URLSearchParams()
    if (nextCategory !== 'all') params.set('category', nextCategory)
    if (nextSearch.trim()) params.set('q', nextSearch.trim())
    if (nextSort !== 'featured') params.set('sort', nextSort)
    setSearchParams(params, { replace: true })
  }

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  const featuredProducts = useMemo(() => getFeaturedProducts(), [])

  // Composable filter & sort
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts({
      category,
      search: searchQuery,
      sort: sortBy,
    })
  }, [category, searchQuery, sortBy])

  const isFiltered = category !== 'all' || searchQuery.trim().length > 0 || sortBy !== 'featured'

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length }
    MARKETPLACE_CATEGORIES.forEach((cat) => {
      counts[cat.id] = PRODUCTS.filter((p) => p.category === cat.id).length
    })
    return counts
  }, [])

  const currentCategoryLabel =
    MARKETPLACE_CATEGORIES.find((c) => c.id === category)?.label

  return (
    <div className="py-10 space-y-16">
      {/* Editorial Header */}
      <Container>
        <PageHeading
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Studio Home', to: '/' },
                { label: 'Digital Marketplace' },
              ]}
            />
          }
          title="Digital Tools &amp; Spatial Resources"
          subtitle="Production-grade CAD libraries, tactile material scans, editorial monograph templates, and calibrated 3D visualization scenes crafted by Tangent Studio architects."
        />

        {/* Catalog Assurance Strip */}
        <div className="mt-8 pt-6 border-t border-[#E9E5DC] flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-[#777B60]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#777B60]" />
            <span>Architecture Practice Standard • All Prices in INR (₹)</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Demo Catalog • 8 Curated Assets</span>
            <span>Commercial License Included</span>
            <span>Instant Zip Delivery</span>
          </div>
        </div>
      </Container>

      {/* Featured Collection Highlight (Shown when not filtering) */}
      {!isFiltered && (
        <section className="bg-[#EFECE6]/50 py-12 border-y border-[#E9E5DC]">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Selection</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#20211E]">
                  Featured Studio Releases
                </h2>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                {featuredProducts.length} Selected Artifacts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Main Catalog Search & Filter Controls */}
      <Container>
        <div className="space-y-6">
          {/* Top Bar: Search Input & Sort Dropdown */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E9E5DC]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="marketplace-search" className="sr-only">
                Search marketplace resources
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777B60]">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="marketplace-search"
                type="text"
                placeholder="Search templates, CAD details, Blender scenes, tags..."
                value={searchQuery}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#E9E5DC] rounded-none focus:outline-none focus:border-[#20211E] transition-colors placeholder:text-[#53554D]/60 text-[#20211E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => updateFilters({ search: '' })}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#53554D] hover:text-[#20211E]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Filter Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#777B60]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </div>
              <label htmlFor="marketplace-sort" className="sr-only">
                Sort products
              </label>
              <select
                id="marketplace-sort"
                value={sortBy}
                onChange={(e) => updateFilters({ sort: e.target.value as SortOption })}
                className="bg-white border border-[#E9E5DC] text-xs font-sans text-[#20211E] py-2.5 px-3 focus:outline-none focus:border-[#20211E] transition-colors cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
              Filter By Discipline
            </div>
            <div
              role="tablist"
              aria-label="Product categories"
              className="flex flex-wrap items-center gap-2"
            >
              <button
                role="tab"
                aria-selected={category === 'all'}
                onClick={() => updateFilters({ category: 'all' })}
                className={`text-xs px-3.5 py-1.5 transition-all uppercase tracking-wider font-mono flex items-center gap-2 border ${
                  category === 'all'
                    ? 'bg-[#20211E] text-white border-[#20211E]'
                    : 'bg-white text-[#53554D] border-[#E9E5DC] hover:border-[#777B60] hover:text-[#20211E]'
                }`}
              >
                <span>All Resources</span>
                <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                  category === 'all' ? 'bg-[#3A3B36] text-[#E9E5DC]' : 'bg-[#EFECE6] text-[#777B60]'
                }`}>
                  {categoryCounts['all']}
                </span>
              </button>

              {MARKETPLACE_CATEGORIES.map((cat) => {
                const isSelected = category === cat.id
                const count = categoryCounts[cat.id] ?? 0
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => updateFilters({ category: cat.id })}
                    className={`text-xs px-3.5 py-1.5 transition-all uppercase tracking-wider font-mono flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#20211E] text-white border-[#20211E]'
                        : 'bg-white text-[#53554D] border-[#E9E5DC] hover:border-[#777B60] hover:text-[#20211E]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-[#3A3B36] text-[#E9E5DC]' : 'bg-[#EFECE6] text-[#777B60]'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Filter Status & Reset Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div data-testid="results-counter" className="text-xs font-mono text-[#53554D]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'resource' : 'resources'}
              {category !== 'all' && ` in ${currentCategoryLabel}`}
              {searchQuery.trim() && ` matching "${searchQuery.trim()}"`}
            </div>

            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-[#777B60] hover:text-[#20211E] h-auto py-1 px-2 gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Reset filters
              </Button>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search className="w-5 h-5" />}
              title="No matching architectural assets"
              description={`We couldn't find any resources matching your current search${
                searchQuery ? ` for "${searchQuery}"` : ''
              }${category !== 'all' ? ` in the selected category` : ''}. Try adjusting your keywords or clearing the active filters.`}
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
              className="my-12 py-16"
            />
          )}
        </div>
      </Container>

      {/* Studio Quality Assurance Section */}
      <section className="border-t border-[#E9E5DC] bg-[#FCFAF6] py-16">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777B60] mb-2">
              Studio Standards
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#20211E]">
              Built by practicing architects for professional production
            </h2>
            <p className="mt-3 text-sm text-[#53554D] leading-relaxed">
              Every digital resource in our catalog has been developed for and vetted on live residential, interior, and civic commissions before public release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-[#E9E5DC] bg-white space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#20211E]">
                Rigorous Tectonic Precision
              </h3>
              <p className="text-xs text-[#53554D] leading-relaxed">
                Millimeter-accurate geometries, standardized layer hierarchies, and clean non-destructive component structures ready for client delivery.
              </p>
            </div>

            <div className="p-6 border border-[#E9E5DC] bg-white space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#20211E]">
                Perpetual Studio License
              </h3>
              <p className="text-xs text-[#53554D] leading-relaxed">
                Unrestricted commercial use across unlimited client presentations, competition monographs, and published renderings. No recurrent subscription fees.
              </p>
            </div>

            <div className="p-6 border border-[#E9E5DC] bg-white space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#20211E]">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#20211E]">
                Direct Source Files
              </h3>
              <p className="text-xs text-[#53554D] leading-relaxed">
                Immediate access to cleanly packaged uncompressed source archives (.blend, .dwg, .idml, .fig, .rvt) with verified texture maps and palettes.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
