import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ShopPage } from './ShopPage'
import { ProductDetailPage } from './ProductDetailPage'
import {
  PRODUCTS,
  getFeaturedProducts,
  getRelatedProducts,
  filterAndSortProducts,
} from '@/data/products'
import { formatPaiseToInr, calculateDiscountPercent } from '@/lib/formatters'
import { CartProvider } from '@/context'

const renderShopRoute = (initialRoute: string) => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('PHASE 04 — Digital Design Marketplace', () => {
  describe('Product Data Model & Pricing Validation', () => {
    it('has at least 8 realistic products with required typed attributes', () => {
      expect(PRODUCTS.length).toBeGreaterThanOrEqual(8)
      PRODUCTS.forEach((product) => {
        expect(product.id).toBeDefined()
        expect(product.slug).toBeDefined()
        expect(product.name).toBeDefined()
        expect(product.category).toBeDefined()
        expect(Number.isInteger(product.priceInPaise)).toBe(true)
        expect(product.priceInPaise).toBeGreaterThan(0)
        expect(product.currency).toBe('INR')
        expect(product.includedFiles.length).toBeGreaterThan(0)
        expect(product.compatibleSoftware.length).toBeGreaterThan(0)
        expect(product.licenseSummary).toBeDefined()
        expect(product.coverImage.url).toBeDefined()
      })
    })

    it('formats integer paise correctly into INR strings and calculates discounts', () => {
      expect(formatPaiseToInr(1199000)).toBe('₹11,990')
      expect(formatPaiseToInr(899000)).toBe('₹8,990')
      expect(formatPaiseToInr(0)).toBe('₹0')

      // Negative or non-integer throws error
      expect(() => formatPaiseToInr(-500)).toThrow()
      expect(() => formatPaiseToInr(12.5)).toThrow()

      // Calculate discount percentage
      const discount = calculateDiscountPercent(1199000, 1499000)
      expect(discount).toBe(20)
    })

    it('retrieves featured and related products properly', () => {
      const featured = getFeaturedProducts()
      expect(featured.length).toBeGreaterThan(0)
      expect(featured.every((p) => p.featured)).toBe(true)

      const related = getRelatedProducts('prod-01', 'visualization-resources', 3)
      expect(related.length).toBe(3)
      expect(related.some((p) => p.id === 'prod-01')).toBe(false)
    })
  })

  describe('Filtering and Sorting Composition Logic', () => {
    it('filters correctly by category', () => {
      const bimProducts = filterAndSortProducts({ category: 'cad-bim-resources' })
      expect(bimProducts.length).toBeGreaterThan(0)
      expect(bimProducts.every((p) => p.category === 'cad-bim-resources')).toBe(true)
    })

    it('filters correctly by keyword across title, description, and tags', () => {
      const results = filterAndSortProducts({ search: 'blender' })
      expect(results.length).toBeGreaterThan(0)
      expect(
        results.some(
          (p) =>
            p.name.toLowerCase().includes('blender') ||
            p.shortDescription.toLowerCase().includes('blender') ||
            p.tags?.includes('blender'),
        ),
      ).toBe(true)
    })

    it('sorts by price low-to-high and high-to-low', () => {
      const lowToHigh = filterAndSortProducts({ sort: 'price-low-to-high' })
      for (let i = 1; i < lowToHigh.length; i++) {
        expect(lowToHigh[i]!.priceInPaise).toBeGreaterThanOrEqual(lowToHigh[i - 1]!.priceInPaise)
      }

      const highToLow = filterAndSortProducts({ sort: 'price-high-to-low' })
      for (let i = 1; i < highToLow.length; i++) {
        expect(highToLow[i]!.priceInPaise).toBeLessThanOrEqual(highToLow[i - 1]!.priceInPaise)
      }
    })

    it('composes category, search, and sorting simultaneously without resetting', () => {
      const composed = filterAndSortProducts({
        category: 'portfolio-templates',
        search: 'monograph',
        sort: 'price-low-to-high',
      })
      expect(composed.length).toBeGreaterThan(0)
      expect(composed[0]!.category).toBe('portfolio-templates')
      expect(composed[0]!.name).toContain('Monograph')
    })
  })

  describe('/shop Catalog Route UI', () => {
    it('renders the editorial header, assurance strip, and all products by default', () => {
      renderShopRoute('/shop')

      expect(
        screen.getByRole('heading', { name: /Digital Tools & Spatial Resources/i }),
      ).toBeInTheDocument()

      expect(screen.getByText(/All Prices in INR/i)).toBeInTheDocument()
      expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 8 resources/i)

      // Sample product titles (featured products appear in both featured banner and main catalog)
      expect(screen.getAllByText(/Minimal Living Room 3D Scene/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Tectonic Monograph Portfolio Template/i).length).toBeGreaterThan(0)
    })

    it('filters products in the UI when category pills are clicked', async () => {
      renderShopRoute('/shop')

      // Click "CAD & BIM Resources" pill
      const cadPill = screen.getByRole('tab', { name: /CAD & BIM Resources/i })
      fireEvent.click(cadPill)

      expect(screen.getByText(/Parametric Joinery CAD & BIM Pack/i)).toBeInTheDocument()
      await waitFor(() => {
        expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 1 resource in CAD & BIM Resources/i)
      })
    })

    it('filters products when search query is entered and allows clearing', async () => {
      renderShopRoute('/shop')

      const searchInput = screen.getByPlaceholderText(/Search templates, CAD details/i)
      fireEvent.change(searchInput, { target: { value: 'tactile' } })

      expect(screen.getByText(/Tactile Material Curation & Mood Board Kit/i)).toBeInTheDocument()

      // Click reset filters button
      const resetBtn = screen.getByRole('button', { name: /Reset filters/i })
      fireEvent.click(resetBtn)

      expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 8 resources/i)
    })

    it('displays empty state when search finds no matches and allows resetting', () => {
      renderShopRoute('/shop')

      const searchInput = screen.getByPlaceholderText(/Search templates, CAD details/i)
      fireEvent.change(searchInput, { target: { value: 'nonexistent-query-xyz' } })

      expect(screen.getByText(/No matching architectural assets/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Reset All Filters/i })).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /Reset All Filters/i }))
      expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 8 resources/i)
    })
  })

  describe('/shop/:slug Product Detail Page UI', () => {
    it('renders the product detail page with breadcrumbs, pricing in INR, specs, and license', () => {
      renderShopRoute('/shop/minimalist-living-room-3d-scene')

      // Main product title
      expect(screen.getByRole('heading', { name: /Minimal Living Room 3D Scene/i })).toBeInTheDocument()

      // Formatted INR price and compare-at discount
      expect(screen.getAllByText('₹11,990').length).toBeGreaterThan(0)
      expect(screen.getByText('₹14,990')).toBeInTheDocument()
      expect(screen.getByText(/Save 20%/i)).toBeInTheDocument()

      // Included files list
      expect(screen.getByText(/tangent_living_v2_cycles.blend/i)).toBeInTheDocument()
      expect(screen.getByText(/textures_8k_pbr.zip/i)).toBeInTheDocument()

      // License information before purchase
      expect(screen.getByText(/Transparent Licensing Summary/i)).toBeInTheDocument()
      expect(screen.getByText(/Standard Studio License/i)).toBeInTheDocument()

      // Compatible software
      expect(screen.getByText(/Blender 4.0\+ \(Cycles\)/i)).toBeInTheDocument()

      // Add to bag button
      expect(screen.getByRole('button', { name: /Add to Studio Bag/i })).toBeInTheDocument()

      // Related products
      expect(screen.getByRole('heading', { name: /Related Architectural Resources/i })).toBeInTheDocument()
    })

    it('triggers add-to-cart interaction with visual confirmation feedback', async () => {
      renderShopRoute('/shop/minimalist-living-room-3d-scene')

      const addToBagBtn = screen.getByRole('button', { name: /Add to Studio Bag/i })
      fireEvent.click(addToBagBtn)

      // Button updates with feedback state
      expect(screen.getByText(/Added to Studio Bag/i)).toBeInTheDocument()
      expect(screen.getByText(/View Bag & Proceed to Checkout/i)).toBeInTheDocument()
    })

    it('renders 404 / empty state when an invalid product slug is accessed', () => {
      renderShopRoute('/shop/unknown-non-existent-product')

      expect(screen.getByText(/Digital Asset Not Found/i)).toBeInTheDocument()
      expect(
        screen.getByText(/We could not locate any product matching the identifier "unknown-non-existent-product"/i),
      ).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Browse All Resources/i })).toBeInTheDocument()
    })
  })
})
