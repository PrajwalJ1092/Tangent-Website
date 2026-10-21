import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '@/App'

describe('The Tangent Collaborative Global Layout & Homepage', () => {
  it('renders global navigation with all required items and cart indicator', () => {
    render(<App />)

    const header = screen.getByRole('banner')
    expect(within(header).getByRole('link', { name: /The Tangent Collaborative Home/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /^Home$/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /^Projects$/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /^Studio$/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /^Digital Shop$/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /^Contact$/i })).toBeInTheDocument()
    expect(within(header).getByRole('link', { name: /Shopping bag/i })).toBeInTheDocument()
  })

  it('renders the complete homepage composition from Hero through Footer', () => {
    render(<App />)

    // A. Hero section
    expect(
      screen.getByRole('heading', {
        name: /The space between an idea\s+and the place it becomes\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore Projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Discover the Shop/i })).toBeInTheDocument()

    // B. Studio intro section
    expect(
      screen.getByText(/We believe architecture is the quiet dialogue/i),
    ).toBeInTheDocument()

    // C. Selected projects section
    expect(screen.getByText(/Architectural Commissions & Built Works/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Nordic Forest Pavilion/i)[0]).toBeInTheDocument()

    // D. Services section
    expect(screen.getByRole('heading', { name: /^Architecture$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Interior Design$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Spatial Planning$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Architectural Visualization$/i })).toBeInTheDocument()

    // E. Featured digital products section in INR
    expect(screen.getByText(/Digital 3D Assets & Scene Files/i)).toBeInTheDocument()
    expect(screen.getByText(/Minimal Living Room 3D Scene/i)).toBeInTheDocument()
    expect(screen.getByText(/₹11,990/i)).toBeInTheDocument()

    // F. Design process section
    expect(screen.getByRole('heading', { name: /The Design Process/i })).toBeInTheDocument()
    expect(screen.getByText(/Phase 01/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Discover$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Develop$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Refine$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^Deliver$/i })).toBeInTheDocument()

    // G. Contact CTA section
    expect(
      screen.getByRole('heading', {
        name: /Have a spatial commission or digital asset licensing project in mind\?/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Initiate Project Dialogue/i })).toBeInTheDocument()

    // H. Footer section
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText(/The Tangent Collaborative/i)).toBeInTheDocument()
    expect(within(footer).getByText(/Bangalore/i)).toBeInTheDocument()
  })
})
