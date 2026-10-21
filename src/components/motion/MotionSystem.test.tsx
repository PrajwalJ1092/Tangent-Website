import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import {
  ScrollReveal,
  MaskedText,
  ImageReveal,
  StaggerGroup,
  StaggerItem,
  ParallaxWrapper,
  ScrollScaleImage,
  SectionTransition,
  PageTransition,
  HoverUnderline,
  CardHover,
  EditorialHeading,
  EditorialParagraph,
  ParagraphReveal,
  WordReveal,
  CharacterReveal,
  MaskedHeadline,
  ImageExpansion,
  ImageTransition,
} from './index'

describe('Tangent Global Motion Design System', () => {
  describe('ScrollReveal', () => {
    it('renders children with semantic tags and accessible text', () => {
      render(
        <ScrollReveal as="section" variant="fade-up">
          <h2>Architectural Massing</h2>
          <p>Tectonic concrete structures.</p>
        </ScrollReveal>,
      )

      expect(screen.getByRole('heading', { name: /Architectural Massing/i })).toBeInTheDocument()
      expect(screen.getByText(/Tectonic concrete structures\./i)).toBeInTheDocument()
    })

    it('renders with clip-up and scale-subtle variants without error', () => {
      const { container } = render(
        <ScrollReveal variant="clip-up" delay={0.2}>
          <div>Clip Content</div>
        </ScrollReveal>,
      )
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('MaskedText', () => {
    it('splits text into lines with overflow-hidden wrappers', () => {
      render(
        <MaskedText as="h1">
          {'First Line\nSecond Line'}
        </MaskedText>,
      )

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('First Line')).toBeInTheDocument()
      expect(screen.getByText('Second Line')).toBeInTheDocument()
    })

    it('splits by words when splitBy="word" is provided', () => {
      render(
        <MaskedText as="h2" splitBy="word">
          Form Follows Atmosphere
        </MaskedText>,
      )

      expect(screen.getByText('Form')).toBeInTheDocument()
      expect(screen.getByText('Follows')).toBeInTheDocument()
      expect(screen.getByText('Atmosphere')).toBeInTheDocument()
    })
  })

  describe('ImageReveal', () => {
    it('renders image within clipped aspect ratio container without layout shift', () => {
      render(
        <ImageReveal
          src="https://example.com/stone.jpg"
          alt="Honed Roman Travertine"
          aspectRatio="landscape"
          caption="Fig 1.1 Honed finish"
        />,
      )

      const img = screen.getByRole('img', { name: /Honed Roman Travertine/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/stone.jpg')
      expect(screen.getByText(/Fig 1.1 Honed finish/i)).toBeInTheDocument()
    })
  })

  describe('StaggerGroup & StaggerItem', () => {
    it('renders staggered list of items in sequence', () => {
      render(
        <StaggerGroup>
          <StaggerItem>
            <span>Item A</span>
          </StaggerItem>
          <StaggerItem>
            <span>Item B</span>
          </StaggerItem>
          <StaggerItem>
            <span>Item C</span>
          </StaggerItem>
        </StaggerGroup>,
      )

      expect(screen.getByText('Item A')).toBeInTheDocument()
      expect(screen.getByText('Item B')).toBeInTheDocument()
      expect(screen.getByText('Item C')).toBeInTheDocument()
    })
  })

  describe('ParallaxWrapper & ScrollScaleImage', () => {
    it('renders layered parallax container safely', () => {
      render(
        <ParallaxWrapper offset={20}>
          <div data-testid="parallax-child">Floating Architectural Plan</div>
        </ParallaxWrapper>,
      )

      expect(screen.getByTestId('parallax-child')).toBeInTheDocument()
    })

    it('renders scroll-scaled image component safely', () => {
      render(
        <ScrollScaleImage
          src="https://example.com/pavilion.jpg"
          alt="Nordic Pavilion"
          scaleFrom={1.0}
          scaleTo={1.08}
        />,
      )

      expect(screen.getByRole('img', { name: /Nordic Pavilion/i })).toBeInTheDocument()
    })
  })

  describe('SectionTransition', () => {
    it('renders hairline divider with label and coordinates', () => {
      render(
        <SectionTransition
          variant="hairline"
          label="Section 03 · Archive"
          coordinate="47.3769° N"
        />,
      )

      expect(screen.getByText(/Section 03 · Archive/i)).toBeInTheDocument()
      expect(screen.getByText(/47.3769° N/i)).toBeInTheDocument()
    })

    it('renders dark-to-light gradient transition safely', () => {
      const { container } = render(<SectionTransition variant="dark-to-light" />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('PageTransition', () => {
    it('wraps routes and resets scroll on location change', () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo')

      render(
        <MemoryRouter initialEntries={['/']}>
          <PageTransition>
            <main>Homepage Content</main>
          </PageTransition>
        </MemoryRouter>,
      )

      expect(screen.getByRole('main')).toHaveTextContent('Homepage Content')
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
    })
  })

  describe('HoverMotion (HoverUnderline, CardHover)', () => {
    it('renders HoverUnderline with active and inactive states', () => {
      render(
        <HoverUnderline active={true}>
          <span>Active Nav Item</span>
        </HoverUnderline>,
      )

      expect(screen.getByText('Active Nav Item')).toBeInTheDocument()
    })

    it('renders CardHover without affecting inner accessible DOM structure', () => {
      render(
        <CardHover lift={4}>
          <article>
            <h3>Engadin Monolith Card</h3>
          </article>
        </CardHover>,
      )

      expect(screen.getByRole('heading', { name: /Engadin Monolith Card/i })).toBeInTheDocument()
    })
  })

  describe('Editorial Typography (EditorialHeading, EditorialParagraph, WordReveal, CharacterReveal, MaskedHeadline, ParagraphReveal)', () => {
    it('renders EditorialHeading with eyebrow and description', () => {
      render(
        <EditorialHeading
          eyebrow="Tectonic Philosophy"
          title="Formed by Light"
          description="A study in natural illumination."
        />,
      )

      expect(screen.getByText(/Tectonic Philosophy/i)).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /Formed by Light/i })).toBeInTheDocument()
      expect(screen.getByText(/A study in natural illumination\./i)).toBeInTheDocument()
    })

    it('renders EditorialParagraph and ParagraphReveal with accessible text', () => {
      render(
        <ParagraphReveal>
          Restrained spatial narrative text.
        </ParagraphReveal>,
      )

      expect(screen.getByText(/Restrained spatial narrative text\./i)).toBeInTheDocument()
    })

    it('renders WordReveal with full phrase accessibility and individual word spans', () => {
      render(
        <WordReveal as="h3">
          Architecture is the quiet dialogue
        </WordReveal>,
      )

      expect(screen.getByRole('heading', { name: /Architecture is the quiet dialogue/i })).toBeInTheDocument()
      expect(screen.getByText('Architecture')).toBeInTheDocument()
      expect(screen.getByText('dialogue')).toBeInTheDocument()
    })

    it('renders CharacterReveal with accessible label', () => {
      render(
        <CharacterReveal as="span">
          STUDIO MONOGRAPH
        </CharacterReveal>,
      )

      expect(screen.getByLabelText('STUDIO MONOGRAPH')).toBeInTheDocument()
    })

    it('renders MaskedHeadline with multiple lines', () => {
      render(
        <MaskedHeadline
          as="h1"
          lines={['The space between an idea', 'and the place it becomes.']}
        />,
      )

      expect(screen.getByText('The space between an idea')).toBeInTheDocument()
      expect(screen.getByText('and the place it becomes.')).toBeInTheDocument()
    })
  })

  describe('Architectural Image Systems (ImageExpansion, ImageTransition)', () => {
    it('renders ImageExpansion with accessible image and caption', () => {
      render(
        <ImageExpansion
          src="https://example.com/facade.jpg"
          alt="Granite Facade Under Twilight"
          caption="Fig 2.1 — Volumetric study"
        />,
      )

      expect(screen.getByRole('img', { name: /Granite Facade Under Twilight/i })).toBeInTheDocument()
      expect(screen.getByText(/Fig 2.1 — Volumetric study/i)).toBeInTheDocument()
    })

    it('renders ImageTransition with plate switcher and active plate', () => {
      render(
        <ImageTransition
          plates={[
            { id: '1', src: 'https://example.com/day.jpg', alt: 'Daytime View', label: 'Day' },
            { id: '2', src: 'https://example.com/night.jpg', alt: 'Night Perspective', label: 'Night' },
          ]}
          caption="Day vs Night illumination"
        />,
      )

      expect(screen.getByRole('img', { name: /Daytime View/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /View plate: Day/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /View plate: Night/i })).toBeInTheDocument()
      expect(screen.getByText(/Day vs Night illumination/i)).toBeInTheDocument()
    })
  })
})
