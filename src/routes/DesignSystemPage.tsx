import { useState } from 'react'
import {
  Container,
  SectionHeading,
  PageHeading,
  Button,
  Badge,
  Card,
  TextLink,
  Breadcrumbs,
  Metadata,
  ImageFrame,
  ProjectCard,
  ProductCard,
  EmptyState,
  FormInput,
  FormTextarea,
  FormSelect,
  Spinner,
  Skeleton,
} from '@/components/ui'
import { ARCHITECTURAL_ASSETS } from '@/data/assets'
import { SAMPLE_PROJECT, SAMPLE_PRODUCT } from '@/data/mockData'

export function DesignSystemPage() {
  const [btnLoading, setBtnLoading] = useState(false)

  return (
    <div className="py-12 space-y-24">
      {/* 1. Page Header */}
      <Container>
        <PageHeading
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Studio', to: '/' },
                { label: 'Design System & Art Direction' },
              ]}
            />
          }
          title="Architectural Design System"
          subtitle="Tectonic clarity, editorial restraint, and museum-grade typographic precision for The Tangent Collaborative."
        />
      </Container>

      {/* 2. Color Palette Swatches */}
      <Container>
        <SectionHeading
          eyebrow="Color Architecture"
          title="Editorial Palette & Contrast"
          description="Curated high-contrast palette grounded in warm ivory and deep architectural charcoal."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-8">
          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-[#F6F4EF] space-y-2">
            <div className="h-16 rounded bg-[#F6F4EF] border border-[#E9E5DC]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Warm Ivory</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#F6F4EF · Page Base</span>
            </div>
          </div>

          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-white space-y-2">
            <div className="h-16 rounded bg-[#20211E]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Charcoal</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#20211E · Primary Ink</span>
            </div>
          </div>

          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-white space-y-2">
            <div className="h-16 rounded bg-[#777B60]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Muted Olive</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#777B60 · Accent</span>
            </div>
          </div>

          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-white space-y-2">
            <div className="h-16 rounded bg-[#E9E5DC]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Warm Stone</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#E9E5DC · Tectonic Line</span>
            </div>
          </div>

          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-white space-y-2">
            <div className="h-16 rounded bg-white border border-[#E9E5DC]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Pure White</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#FFFFFF · Surface Card</span>
            </div>
          </div>

          <div className="border border-[#E9E5DC] rounded-lg p-4 bg-white space-y-2">
            <div className="h-16 rounded bg-[#53554D]" />
            <div className="space-y-0.5">
              <span className="font-sans text-xs font-semibold text-[#20211E] block">Charcoal Muted</span>
              <span className="font-mono text-[11px] text-[#797C72] block">#53554D · Secondary Text</span>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. Typography Specimen */}
      <Container>
        <SectionHeading
          eyebrow="Typographic Scale"
          title="Editorial Monograph Specimen"
          description="Cormorant Garamond editorial serif paired with Plus Jakarta Sans geometric sans."
        />
        <div className="space-y-8 pt-8 border-b border-[#E9E5DC] pb-12">
          <div className="space-y-1">
            <span className="font-sans text-xs uppercase tracking-widest text-[#797C72]">Display Hero Headline</span>
            <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#20211E] leading-[1.05]">
              Spatial Architecture &amp; Minimalist Craft
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-sans text-xs uppercase tracking-widest text-[#797C72]">Section Headline (H2)</span>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20211E]">
              Selected Architectural Commissions
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-sans text-xs uppercase tracking-widest text-[#797C72]">Sub-Headline (H3)</span>
            <p className="font-serif text-2xl sm:text-3xl font-normal text-[#20211E]">
              Tectonic Timber Framing and Granite Substructures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <span className="font-sans text-xs uppercase tracking-widest text-[#797C72]">Body Paragraph (65ch limit)</span>
              <p className="font-sans text-base text-[#53554D] leading-relaxed max-w-prose">
                Architecture begins when we place two bricks carefully together. Our practice explores tectonic honesty, microclimatic responsive envelopes, and the tactile interplay between coarse board-formed concrete and warm timber grain.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-sans text-xs uppercase tracking-widest text-[#797C72]">Editorial Monograph Caption</span>
              <p className="font-serif italic text-lg text-[#53554D] leading-relaxed">
                “Light does not create space; light defines the boundary between the physical enclosure and the limitless void.”
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Interactive UI Controls: Buttons & Links */}
      <Container>
        <SectionHeading
          eyebrow="Interactive Elements"
          title="Buttons, Badges &amp; Links"
          description="Tactile, accessible interactive primitives with distinct focus rings."
        />
        <div className="space-y-8 pt-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="editorial">Editorial Text Button</Button>
            <Button
              variant="primary"
              isLoading={btnLoading}
              onClick={() => {
                setBtnLoading(true)
                setTimeout(() => setBtnLoading(false), 1500)
              }}
            >
              Click For Loading State
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E9E5DC]">
            <Badge variant="default">Residential</Badge>
            <Badge variant="accent">3D Scene Kit</Badge>
            <Badge variant="outline">Blender 4.2</Badge>
            <Badge variant="muted">280 m² Area</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-[#E9E5DC]">
            <TextLink to="/projects" showArrow>Explore Project Portfolio</TextLink>
            <TextLink to="/shop" showArrow>Browse Digital 3D Store</TextLink>
            <TextLink to="https://example.com" external showArrow>External Publication</TextLink>
          </div>
        </div>
      </Container>

      {/* 5. Form Field Primitives */}
      <Container>
        <SectionHeading
          eyebrow="Form Controls"
          title="Accessible Architectural Forms"
          description="Precision inputs designed for design brief submissions and checkout."
        />
        <div className="grid md:grid-cols-2 gap-8 pt-8 max-w-4xl">
          <FormInput
            label="Client Full Name"
            placeholder="e.g. Henrik Lindqvist"
            helper="Please provide your full legal or studio name"
            required
          />
          <FormInput
            label="Email Address"
            type="email"
            placeholder="henrik@lindqvist.se"
            error="Please enter a valid architectural inquiry email"
            required
          />
          <FormSelect label="Inquiry Scope" required>
            <option>Architectural Commission (Full Service)</option>
            <option>Interior Spatial Transformation</option>
            <option>Digital 3D Asset Studio Licensing</option>
          </FormSelect>
          <FormInput
            label="Estimated Project Budget"
            placeholder="e.g. $250,000 — $500,000 USD"
          />
          <div className="md:col-span-2">
            <FormTextarea
              label="Design Brief Details"
              placeholder="Describe the architectural site, topography, program requirements, and timeline..."
            />
          </div>
        </div>
      </Container>

      {/* 6. Image Frame & Aspect Ratios */}
      <Container>
        <SectionHeading
          eyebrow="Media Presentation"
          title="Image Frames &amp; Aspect Enforcements"
          description="Consistent architectural ratios with lazy loading, shimmer skeletons, and fallback states."
        />
        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <ImageFrame
            src={ARCHITECTURAL_ASSETS.nordicPavilion!.url}
            alt={ARCHITECTURAL_ASSETS.nordicPavilion!.alt}
            aspectRatio="landscape"
            caption="16:10 Landscape — Nordic Forest Pavilion"
          />
          <ImageFrame
            src={ARCHITECTURAL_ASSETS.kyotoAtelier!.url}
            alt={ARCHITECTURAL_ASSETS.kyotoAtelier!.alt}
            aspectRatio="portrait"
            caption="3:4 Portrait — Kyoto Private Gallery"
          />
          <ImageFrame
            src={ARCHITECTURAL_ASSETS.boardFormedTexture!.url}
            alt={ARCHITECTURAL_ASSETS.boardFormedTexture!.alt}
            aspectRatio="square"
            caption="1:1 Square — Board-Formed Concrete Material"
          />
        </div>

        {/* Failed image graceful fallback test */}
        <div className="pt-8">
          <span className="font-sans text-xs uppercase tracking-widest text-[#797C72] block mb-3">
            Graceful Failure State Demonstration (Broken Image URL handling)
          </span>
          <ImageFrame
            src="https://invalid-non-existent-image-source.com/broken.jpg"
            alt="Simulated missing architectural site plan plate"
            aspectRatio="landscape"
            caption="Automatic fallback prevents layout shift or broken image icon"
          />
        </div>
      </Container>

      {/* 7. Asymmetric Project Card vs Digital Product Card */}
      <Container>
        <SectionHeading
          eyebrow="Domain Components"
          title="Editorial Project Card &amp; Marketplace Product Card"
          description="Clear architectural distinction: projects prioritize monograph storytelling; products prioritize discoverability and checkout."
          align="split"
        />
        <div className="grid lg:grid-cols-2 gap-12 pt-8 items-start">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#777B60] block">
              Editorial Project Card (Monograph Style)
            </span>
            <ProjectCard project={SAMPLE_PROJECT} />
          </div>

          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#777B60] block">
              Marketplace Product Card (Commerce Style)
            </span>
            <div className="max-w-md">
              <ProductCard product={SAMPLE_PRODUCT} />
            </div>
          </div>
        </div>
      </Container>

      {/* 8. Metadata Layouts */}
      <Container>
        <SectionHeading
          eyebrow="Data Presentation"
          title="Specification &amp; Metadata Rows"
          description="Tabular architectural data displayed with rigorous alignment."
        />
        <div className="space-y-8 pt-8">
          <span className="font-sans text-xs uppercase tracking-widest text-[#797C72] block">
            Grid Metadata Layout
          </span>
          <Metadata
            layout="grid"
            items={[
              { label: 'Year Built', value: '2025' },
              { label: 'Location', value: 'Oslo, Norway' },
              { label: 'Site Footprint', value: '280 m²' },
              { label: 'Principal Architect', value: 'K. Vestergaard' },
            ]}
          />

          <span className="font-sans text-xs uppercase tracking-widest text-[#797C72] block pt-4">
            Horizontal Metadata Strip
          </span>
          <Metadata
            layout="horizontal"
            items={[
              { label: 'File Size', value: '420 MB' },
              { label: 'Polygon Count', value: '1,850,000' },
              { label: 'Native Engine', value: 'Blender Cycles' },
              { label: 'PBR Maps', value: '8K Textures' },
            ]}
          />
        </div>
      </Container>

      {/* 9. Card Surfaces & Empty State */}
      <Container>
        <SectionHeading
          eyebrow="Surfaces &amp; Feedback"
          title="Cards, Skeletons &amp; Empty State"
          description="State containers and architectural elevation surfaces."
        />
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card variant="surface" hoverable>
            <h4 className="font-serif text-xl font-normal text-[#20211E] mb-2">Surface Card</h4>
            <p className="font-sans text-sm text-[#53554D] leading-relaxed">
              Elevated white surface on ivory background with subtle stone border.
            </p>
          </Card>
          <Card variant="stone" hoverable>
            <h4 className="font-serif text-xl font-normal text-[#20211E] mb-2">Stone Card</h4>
            <p className="font-sans text-sm text-[#53554D] leading-relaxed">
              Warm stone tint surface `#F2EFE8` for secondary groupings and specifications.
            </p>
          </Card>
          <Card variant="bordered" hoverable>
            <h4 className="font-serif text-xl font-normal text-[#20211E] mb-2">Bordered Card</h4>
            <p className="font-sans text-sm text-[#53554D] leading-relaxed">
              Transparent background with subtle charcoal outline for understated sections.
            </p>
          </Card>
        </div>

        <div className="pt-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-widest text-[#797C72] block">
              Architectural Loading Shimmer &amp; Spinner
            </span>
            <div className="flex items-center gap-4">
              <Spinner />
              <span className="font-sans text-xs text-[#53554D]">Loading 3D asset manifest...</span>
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>

          <div>
            <EmptyState
              title="No Project Records Found"
              description="There are currently no architectural commissions matching the selected filter parameters."
              actionLabel="Reset Filter Parameters"
              onAction={() => alert('Filter reset action triggered')}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
