import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProjectsPage } from './ProjectsPage'
import { ProjectDetailPage } from './ProjectDetailPage'
import { PROJECTS, getFeaturedProjects, getAdjacentProjects } from '@/data/projects'
import { CartProvider } from '@/context'

const renderRoute = (initialRoute: string) => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('Portfolio & Projects Architecture', () => {
  it('selects featured projects correctly from domain data', () => {
    const featured = getFeaturedProjects()
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.every((p) => p.featured)).toBe(true)

    // Subterranean sound sanctuary is not featured
    const soundSanctuary = PROJECTS.find((p) => p.slug === 'subterranean-sound-sanctuary')
    expect(soundSanctuary?.featured).toBe(false)
  })

  it('renders all commissions by default on /projects and displays project count', () => {
    renderRoute('/projects')

    expect(
      screen.getByRole('heading', { name: /Selected Commissions & Spatial Works/i }),
    ).toBeInTheDocument()

    expect(screen.getByText(new RegExp(`Showing ${PROJECTS.length} Projects of ${PROJECTS.length}`, 'i'))).toBeInTheDocument()

    // Key project cards rendered
    expect(screen.getByText(/Nordic Forest Pavilion/i)).toBeInTheDocument()
    expect(screen.getByText(/Museum of Spatial Form/i)).toBeInTheDocument()
  })

  it('filters projects dynamically by category tab clicks', async () => {
    renderRoute('/projects')

    // Click Residential filter
    const residentialTab = screen.getByRole('tab', { name: /^Residential$/i })
    fireEvent.click(residentialTab)

    expect(screen.getByText(/Nordic Forest Pavilion/i)).toBeInTheDocument()
    expect(screen.getByText(/Solitary Coastal Residence/i)).toBeInTheDocument()
    
    // Commercial project should exit and disappear
    await waitFor(() => {
      expect(screen.queryByText(/Museum of Spatial Form/i)).not.toBeInTheDocument()
    })

    // Click Conceptual filter
    const conceptualTab = screen.getByRole('tab', { name: /^Conceptual$/i })
    fireEvent.click(conceptualTab)

    expect(screen.getByText(/Subterranean Sound Sanctuary/i)).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText(/Nordic Forest Pavilion/i)).not.toBeInTheDocument()
    })
  })

  it('renders full project detail page for valid slug with specifications, narrative, and gallery', () => {
    renderRoute('/projects/nordic-forest-pavilion')

    // Project title
    expect(screen.getByRole('heading', { name: /Nordic Forest Pavilion/i })).toBeInTheDocument()

    // Location and year
    expect(screen.getByText(/Oslo Outskirts, Norway · 2025/i)).toBeInTheDocument()

    // Services
    expect(screen.getByText(/Passivhaus Thermal Engineering/i)).toBeInTheDocument()

    // Architectural narrative
    expect(screen.getByText(/Conceived as a seasonal contemplation retreat/i)).toBeInTheDocument()

    // Gallery count badge
    expect(screen.getByText(/3 Plates Documented/i)).toBeInTheDocument()
  })

  it('provides working adjacent next and previous commission links on detail page', () => {
    const adjacent = getAdjacentProjects('nordic-forest-pavilion')
    expect(adjacent).not.toBeNull()

    renderRoute('/projects/nordic-forest-pavilion')

    // Check previous project link
    expect(screen.getByText(/Previous Commission/i)).toBeInTheDocument()
    expect(screen.getByText(adjacent!.prev.title)).toBeInTheDocument()

    // Check next project link
    expect(screen.getByText(/Next Commission/i)).toBeInTheDocument()
    expect(screen.getByText(adjacent!.next.title)).toBeInTheDocument()
  })

  it('gracefully renders an empty/404 state when slug is invalid', () => {
    renderRoute('/projects/invalid-non-existent-project')

    expect(screen.getByText(/Project Monograph Not Found/i)).toBeInTheDocument()
    expect(screen.getByText(/The architectural record corresponding to "invalid-non-existent-project"/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Return to Projects Archive/i })).toBeInTheDocument()
  })

  it('switches between Grid view and interactive Monograph Index view', async () => {
    renderRoute('/projects')

    // Find view switcher buttons
    const indexViewButton = screen.getByRole('button', { name: /Index view/i })
    const gridViewButton = screen.getByRole('button', { name: /Grid view/i })

    expect(gridViewButton).toHaveAttribute('aria-pressed', 'true')
    expect(indexViewButton).toHaveAttribute('aria-pressed', 'false')

    // Switch to index view
    fireEvent.click(indexViewButton)
    expect(indexViewButton).toHaveAttribute('aria-pressed', 'true')

    // Should render the interactive index with numbered entries
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/Open Case Study Monograph/i)).toBeInTheDocument()

    // Switch back to grid view
    fireEvent.click(gridViewButton)
    expect(gridViewButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens accessible lightbox on plate interaction, navigates plates, and closes on Escape', async () => {
    renderRoute('/projects/nordic-forest-pavilion')

    // Click on the cover image plate button to open lightbox
    const coverButton = screen.getByRole('button', { name: /Enlarge cover image/i })
    fireEvent.click(coverButton)

    // Lightbox modal dialog should be rendered
    const dialog = await screen.findByRole('dialog', { name: /Image gallery lightbox/i })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText(/Plate 1 of 4/i)).toBeInTheDocument()

    // Navigate to next image
    const nextButton = screen.getByRole('button', { name: /Next image/i })
    fireEvent.click(nextButton)
    expect(screen.getByText(/Plate 2 of 4/i)).toBeInTheDocument()

    // Press Escape to close
    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Image gallery lightbox/i })).not.toBeInTheDocument()
    })
  })

  it('renders the Belagavi 3BHK apartment project monograph with floor plan and full gallery', () => {
    renderRoute('/projects/belagavi-3bhk-apartment')

    // Heading and location
    expect(screen.getByRole('heading', { name: /3BHK Residence at Belagavi/i })).toBeInTheDocument()
    expect(screen.getByText(/Belagavi, Karnataka, India/i)).toBeInTheDocument()
    expect(screen.getByText(/1,850 sq ft \/ 172 m²/i)).toBeInTheDocument()

    // Key architectural specifications
    expect(screen.getByText(/3BHK Contemporary Apartment/i)).toBeInTheDocument()
    expect(screen.getByText(/Fluted Acoustic Paneling & Travertine Slab/i)).toBeInTheDocument()
    expect(screen.getByText(/Bronze Tinted Glass & Hand-Woven Cane Mesh/i)).toBeInTheDocument()

    // Gallery plates including floor plan, living, pooja, master suite
    expect(screen.getByAltText(/Architectural floor plan layout for 3BHK Apartment at Belagavi/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Pooja room sanctum with illuminated arched niche/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Bedroom 01 featuring custom wardrobe with natural woven cane mesh inserts/i)).toBeInTheDocument()
  })
})

