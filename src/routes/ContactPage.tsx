import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  Loader2,
} from 'lucide-react'
import {
  Container,
  PageHeading,
  Breadcrumbs,
  Button,
  Badge,
  SEO,
  ArchitecturalLocationMap,
} from '@/components/ui'
import {
  ScrollReveal,
  CardHover,
} from '@/components/motion'
import { STUDIO_CONFIG } from '@/data/studioInfo'

const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Please enter your full name (at least 2 characters).' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid personal or organizational email address.' }),
  inquiryType: z.enum([
    'residential',
    'cultural',
    'interior',
    'digital-licensing',
    'general',
  ], {
    required_error: 'Please select an architectural commission discipline.',
  }),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Please provide a brief description of your project (at least 10 characters).' }),
  privacyAcknowledged: z.boolean().refine((val) => val === true, {
    message: 'Please acknowledge the confidentiality and prototype terms.',
  }),
})

type InquiryFormData = z.infer<typeof inquirySchema>

export function ContactPage() {
  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error'
    inquiryReference?: string
    data?: InquiryFormData
  }>({ status: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      inquiryType: 'residential',
      budgetRange: 'undisclosed',
      message: '',
      privacyAcknowledged: false,
    },
  })

  const onSubmit = (data: InquiryFormData) => {
    setSubmissionState({ status: 'submitting' })

    // Simulate network transmission
    setTimeout(() => {
      const randomRef = Math.random().toString(36).substring(2, 7).toUpperCase()
      setSubmissionState({
        status: 'success',
        inquiryReference: `INQ-TNG-2026-${randomRef}`,
        data,
      })
    }, 600)
  }

  const handleResetForm = () => {
    reset()
    setSubmissionState({ status: 'idle' })
  }

  return (
    <div className="py-10 space-y-16">
      <SEO
        title="Contact & Inquiries"
        description="Commission an architectural dialogue with The Tangent Collaborative for bespoke residential monographs, cultural pavilions, and spatial architecture across Bangalore, Vijayapura, and Hubballi."
      />
      <Container>
        <ScrollReveal variant="fade-up" duration={0.6}>
          <PageHeading
            breadcrumbs={
              <Breadcrumbs
                items={[
                  { label: 'Studio Home', to: '/' },
                  { label: 'Contact & Inquiries' },
                ]}
              />
            }
            title="Commission a Dialogue"
            subtitle="We welcome inquiries for residential monographs, civic pavilions, and interior spatial commissions. Our partners review all briefs directly."
          />
        </ScrollReveal>

        {/* Demo Mode Notice Banner */}
        <ScrollReveal variant="fade-in" duration={0.5} delay={0.15}>
          <div className="mt-8 p-4 border border-[#777B60]/40 bg-[#FCFAF6] flex items-start gap-3 text-xs text-[#20211E]">
            <ShieldCheck className="w-5 h-5 text-[#777B60] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider font-mono">
                Prototype Inquiry System
              </span>
              <p className="text-[#53554D] leading-relaxed">
                This contact interface is a fully interactive frontend demonstration. Form submissions are validated using Zod and simulated in application state. No external emails or remote server requests are transmitted.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form or Success State (7 cols) */}
          <div className="lg:col-span-7">
            {submissionState.status === 'success' ? (
              <motion.div
                key="success-receipt"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                role="status"
                aria-live="polite"
                className="p-8 border border-emerald-300 bg-emerald-50/70 space-y-6"
              >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold block">
                        Inquiry Transmitted (Simulated)
                      </span>
                      <h3 className="font-serif text-2xl text-[#20211E]">
                        Reference: {submissionState.inquiryReference}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 border border-emerald-200 bg-white text-xs font-sans text-[#53554D] space-y-2 leading-relaxed">
                    <p>
                      Thank you, <strong>{submissionState.data?.fullName}</strong>. Your architectural inquiry has been validated in the demonstration environment.
                    </p>
                    <p>
                      A confirmation receipt has been recorded for <strong>{submissionState.data?.email}</strong> regarding your <strong>{submissionState.data?.inquiryType.replace('-', ' ')}</strong> brief.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetForm}
                      className="text-xs bg-white border-[#E9E5DC] text-[#20211E] hover:bg-[#F6F4EF]"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="inquiry-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="border border-[#E9E5DC] bg-white p-6 sm:p-8 space-y-6"
                >
                  <div className="pb-4 border-b border-[#E9E5DC] flex items-center justify-between">
                    <h3 className="font-serif text-xl text-[#20211E]">
                      Architectural Commission Brief
                    </h3>
                    <span className="text-xs font-mono text-[#777B60]">All fields required unless noted</span>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono uppercase tracking-wider text-[#20211E]"
                    >
                      Client / Architect Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      {...register('fullName')}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                        errors.fullName ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                      } rounded-none focus:outline-none focus:border-[#20211E] text-[#20211E] transition-colors`}
                    />
                    <AnimatePresence>
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          id="fullName-error"
                          className="text-[11px] text-red-600"
                        >
                          {errors.fullName.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#20211E]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. elena@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                        errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                      } rounded-none focus:outline-none focus:border-[#20211E] text-[#20211E] transition-colors`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          id="email-error"
                          className="text-[11px] text-red-600"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Inquiry Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiryType"
                        className="block text-xs font-mono uppercase tracking-wider text-[#20211E]"
                      >
                        Commission Scope <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        {...register('inquiryType')}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-[#E9E5DC] rounded-none focus:outline-none focus:border-[#20211E] text-[#20211E]"
                      >
                        <option value="residential">Residential Architecture</option>
                        <option value="cultural">Civic &amp; Exhibition Space</option>
                        <option value="interior">Interior Architecture &amp; Joinery</option>
                        <option value="digital-licensing">Digital Asset &amp; Practice Licensing</option>
                        <option value="general">Press &amp; Academic Inquiries</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="budgetRange"
                        className="block text-xs font-mono uppercase tracking-wider text-[#53554D]"
                      >
                        Estimated Budget <span className="text-neutral-400 font-sans">(Optional)</span>
                      </label>
                      <select
                        id="budgetRange"
                        {...register('budgetRange')}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-[#E9E5DC] rounded-none focus:outline-none focus:border-[#20211E] text-[#20211E]"
                      >
                        <option value="undisclosed">Undisclosed / Preliminary</option>
                        <option value="under-50l">Under ₹50 Lakhs</option>
                        <option value="50l-1.5cr">₹50 Lakhs – ₹1.5 Crore</option>
                        <option value="1.5cr-5cr">₹1.5 Crore – ₹5 Crore</option>
                        <option value="5cr-plus">₹5 Crore +</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-[#20211E]"
                    >
                      Spatial Brief &amp; Program Notes <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Please describe the site location, programmatic requirements, approximate area, and anticipated timeline..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      {...register('message')}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                        errors.message ? 'border-red-600 ring-1 ring-red-600' : 'border-[#E9E5DC]'
                      } rounded-none focus:outline-none focus:border-[#20211E] text-[#20211E] resize-y transition-colors`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          id="message-error"
                          className="text-[11px] text-red-600"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Privacy Acknowledgement */}
                  <div className="space-y-2 pt-2 border-t border-[#E9E5DC]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('privacyAcknowledged')}
                        className="mt-1 h-4 w-4 rounded-none border-[#E9E5DC] text-[#20211E] focus:ring-[#20211E]"
                      />
                      <span className="text-xs text-[#53554D] leading-relaxed">
                        I understand that {STUDIO_CONFIG.companyName} treats all architectural project briefs with confidentiality. I acknowledge that this form is a <strong>simulated demonstration</strong>.
                      </span>
                    </label>
                    <AnimatePresence>
                      {errors.privacyAcknowledged && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[11px] text-red-600 pl-7"
                        >
                          {errors.privacyAcknowledged.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={submissionState.status === 'submitting'}
                      className="w-full py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 bg-[#20211E] text-white hover:bg-[#3A3B36] transition-all duration-300"
                    >
                      {submissionState.status === 'submitting' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Transmitting Brief (Simulated)...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Commission Brief</span>
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
          </div>

          {/* Right: Studio Details, Hours & Google Maps Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Studio Identity Card */}
            <CardHover lift={3}>
              <div className="border border-[#E9E5DC] bg-white p-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E9E5DC] text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  <Building2 className="w-4 h-4" />
                  <span>Practice Identification</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#20211E]">
                    {STUDIO_CONFIG.studioName}
                  </h3>
                  <div className="text-xs font-mono text-[#777B60]">
                    Operating as {STUDIO_CONFIG.collaborativeName}
                  </div>
                  <p className="text-xs text-[#53554D] leading-relaxed pt-1">
                    {STUDIO_CONFIG.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E9E5DC] space-y-3 text-xs font-mono">
                  <div className="flex items-center gap-3 text-[#20211E]">
                    <Mail className="w-4 h-4 text-[#777B60] shrink-0" />
                    <a
                      href={`mailto:${STUDIO_CONFIG.inquiriesEmail}`}
                      className="hover:text-[#777B60] underline underline-offset-4"
                    >
                      {STUDIO_CONFIG.inquiriesEmail}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-[#20211E]">
                    <Mail className="w-4 h-4 text-[#777B60] shrink-0" />
                    <a
                      href={`mailto:${STUDIO_CONFIG.email}`}
                      className="hover:text-[#777B60]"
                    >
                      General: {STUDIO_CONFIG.email}
                    </a>
                  </div>

                  {STUDIO_CONFIG.phone && (
                    <div className="flex items-center gap-3 text-[#20211E]">
                      <Phone className="w-4 h-4 text-[#777B60] shrink-0" />
                      <span>{STUDIO_CONFIG.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHover>

            {/* Location & Google Maps Card */}
            <CardHover lift={3}>
              <div className="border border-[#E9E5DC] bg-white p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E5DC]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <MapPin className="w-4 h-4" />
                    <span>Regional Service Areas</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-[#777B60] border-[#E9E5DC]">
                    Karnataka, India
                  </Badge>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="text-[#20211E] font-medium font-serif text-sm">
                    {STUDIO_CONFIG.serviceAreasSummary}
                  </div>
                  <div className="divide-y divide-[#E9E5DC] border-y border-[#E9E5DC] py-1 text-xs">
                    {STUDIO_CONFIG.serviceAreas.map((area) => (
                      <div key={area.id} className="py-2 flex items-center justify-between font-mono">
                        <span className="font-medium text-[#20211E]">{area.displayName}</span>
                        <span className="text-[#777B60] text-[11px]">{area.coordinates.formatted}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#777B60] leading-relaxed">
                    Physical studio consultations and monograph sampling are arranged by prior appointment.
                  </p>
                </div>

                {/* Architectural Location Map Box */}
                <div className="border border-[#E9E5DC] bg-[#FCFAF6] p-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#777B60]">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      {STUDIO_CONFIG.googleMapsEntityTitle}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#53554D] leading-relaxed">
                    The verified practice entity is registered on Google Maps as <strong>{STUDIO_CONFIG.collaborativeName}</strong>.
                  </p>

                  {/* Direct Google Maps Action */}
                  <a
                    href={STUDIO_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-mono uppercase tracking-wider bg-[#20211E] text-white hover:bg-[#3A3B36] transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="text-[10px] font-mono text-[#777B60] text-center pt-1">
                    Destination: {STUDIO_CONFIG.googleMapsUrl}
                  </div>
                </div>
              </div>
            </CardHover>

            {/* Business Hours & Appointments */}
            {STUDIO_CONFIG.businessHours && (
              <CardHover lift={3}>
                <div className="border border-[#E9E5DC] bg-white p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777B60]">
                    <Clock className="w-4 h-4" />
                    <span>Studio Hours</span>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-[#20211E]">
                    <div>{STUDIO_CONFIG.businessHours.days}</div>
                    <div className="text-[#777B60]">
                      {STUDIO_CONFIG.businessHours.hours} ({STUDIO_CONFIG.businessHours.timezone})
                    </div>
                  </div>

                  <p className="text-[11px] text-[#53554D] leading-relaxed pt-2 border-t border-[#E9E5DC] font-sans">
                    {STUDIO_CONFIG.businessHours.consultationNote}
                  </p>
                </div>
              </CardHover>
            )}

            {/* Social Links */}
            <CardHover lift={3}>
              <div className="border border-[#E9E5DC] bg-white p-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#777B60]">
                  Publications &amp; Presence
                </div>
                <div className="divide-y divide-[#E9E5DC] text-xs font-mono">
                  {STUDIO_CONFIG.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 flex items-center justify-between text-[#20211E] hover:text-[#777B60] transition-colors"
                    >
                      <span>{social.platform}</span>
                      <span className="flex items-center gap-1 text-[#777B60]">
                        {social.handle}
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </CardHover>
          </div>
        </div>

        {/* Full-width Architectural Cartography & Location Map Section */}
        <ScrollReveal variant="fade-up" duration={0.6} className="pt-12 border-t border-[#E9E5DC]">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#777B60] block">
                  Geographic Tectonics
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#20211E] pt-1">
                  Active Regional Service Matrix
                </h2>
              </div>
              <p className="text-xs font-mono text-[#53554D] max-w-md sm:text-right">
                {STUDIO_CONFIG.serviceAreasShort}
              </p>
            </div>
            <ArchitecturalLocationMap />
          </div>
        </ScrollReveal>
      </Container>
    </div>
  )
}
