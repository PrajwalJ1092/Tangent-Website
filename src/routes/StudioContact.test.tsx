import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AboutPage } from './AboutPage'
import { ContactPage } from './ContactPage'
import { STUDIO_CONFIG } from '@/data/studioInfo'
import { CartProvider } from '@/context'

const renderRoute = (initialRoute: string) => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/studio" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  )
}

describe('PHASE 06 — Studio Page & Monograph', () => {
  it('renders the editorial introduction, headline, and monograph lead banner', () => {
    renderRoute('/about')

    expect(
      screen.getByRole('heading', { name: /Monolithic Restraint & Material Honesty/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/The Tangent Collaborative is an architectural practice and spatial research atelier/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Practice Monograph • Founded on Architectural Craft/i)).toBeInTheDocument()
  })

  it('renders the three spatial philosophy pillars', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /01\. Tectonic Honesty/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /02\. Calibrated Daylighting/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /03\. Digital-Physical Reciprocity/i })).toBeInTheDocument()
  })

  it('renders the 4-stage architectural journey', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /Inquiry & Context/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Tectonic Studies/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Computational Rigor/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Precision Realization/i })).toBeInTheDocument()
  })

  it('renders configurable team members from STUDIO_CONFIG with clear disclosures', () => {
    renderRoute('/about')

    expect(screen.getByText(/Configurable Studio Roles/i)).toBeInTheDocument()
    STUDIO_CONFIG.team.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument()
      expect(screen.getByText(member.role)).toBeInTheDocument()
    })
  })

  it('renders selected architectural commissions and a contact CTA button', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /Selected Architectural Commissions/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Initiate a spatial dialogue with our practice/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Commission an Inquiry/i })).toBeInTheDocument()
  })

  it('resolves /studio alias to the same AboutPage component', () => {
    renderRoute('/studio')

    expect(
      screen.getByRole('heading', { name: /Monolithic Restraint & Material Honesty/i }),
    ).toBeInTheDocument()
  })
})

describe('PHASE 06 — Contact Page & Inquiry Experience', () => {
  it('renders inquiry form fields, accessible labels, and centralized studio details', () => {
    renderRoute('/contact')

    // Editorial Heading
    expect(screen.getByRole('heading', { name: /Commission a Dialogue/i })).toBeInTheDocument()

    // Centralized contact info
    expect(screen.getAllByText(STUDIO_CONFIG.studioName).length).toBeGreaterThan(0)
    expect(screen.getAllByText(new RegExp(STUDIO_CONFIG.collaborativeName, 'i')).length).toBeGreaterThan(0)
    expect(screen.getByText(STUDIO_CONFIG.inquiriesEmail)).toBeInTheDocument()
    expect(screen.getAllByText(new RegExp(STUDIO_CONFIG.email, 'i')).length).toBeGreaterThan(0)

    // Form inputs with accessible labels
    expect(screen.getByLabelText(/Client \/ Architect Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Commission Scope/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Estimated Budget/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Spatial Brief & Program Notes/i)).toBeInTheDocument()
  })

  it('renders the verified Google Maps external link and location card', () => {
    renderRoute('/contact')

    const mapsLink = screen.getByRole('link', { name: /View on Google Maps/i })
    expect(mapsLink).toBeInTheDocument()
    expect(mapsLink).toHaveAttribute('href', STUDIO_CONFIG.googleMapsUrl)
    expect(mapsLink).toHaveAttribute('target', '_blank')
    expect(mapsLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('validates fields and displays accessible error messages on invalid submit', async () => {
    renderRoute('/contact')

    const submitBtn = screen.getByRole('button', { name: /Submit Commission Brief/i })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/Please enter your full name \(at least 2 characters\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Please enter a valid personal or organizational email address/i)).toBeInTheDocument()
      expect(screen.getByText(/Please provide a brief description of your project/i)).toBeInTheDocument()
      expect(screen.getByText(/Please acknowledge the confidentiality and prototype terms/i)).toBeInTheDocument()
    })
  })

  it('simulates inquiry submission and displays confirmation with reference ID', async () => {
    renderRoute('/contact')

    fireEvent.change(screen.getByLabelText(/Client \/ Architect Name/i), {
      target: { value: 'Ar. Tadao Ando' },
    })
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'tadao@ando-architects.jp' },
    })
    fireEvent.change(screen.getByLabelText(/Spatial Brief & Program Notes/i), {
      target: { value: 'Proposed contemplative meditation pavilion in natural stone and cast concrete.' },
    })
    fireEvent.click(screen.getByRole('checkbox'))

    const submitBtn = screen.getByRole('button', { name: /Submit Commission Brief/i })
    fireEvent.click(submitBtn)

    await waitFor(
      () => {
        expect(screen.getByText(/Inquiry Transmitted \(Simulated\)/i)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    expect(screen.getByText(/Reference: INQ-TNG-2026-/i)).toBeInTheDocument()
    expect(screen.getByText(/Ar. Tadao Ando/i)).toBeInTheDocument()
    expect(screen.getByText(/tadao@ando-architects.jp/i)).toBeInTheDocument()

    // Allows resetting to send another inquiry
    const resetBtn = screen.getByRole('button', { name: /Submit Another Inquiry/i })
    fireEvent.click(resetBtn)

    expect(screen.getByRole('button', { name: /Submit Commission Brief/i })).toBeInTheDocument()
  })
})
