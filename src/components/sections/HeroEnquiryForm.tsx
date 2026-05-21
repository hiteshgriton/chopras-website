'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

interface Props {
  locale: string
}

const eventTypes = {
  en: [
    'Birthday Party or Anniversary',
    'Wedding or Nikah Reception',
    'Proposal or Engagement',
    'Baby Shower or Family Reunion',
    'Kitty Party',
    'Corporate Dinner or Meeting',
    'Networking Event or Meet-up',
    'Workshop or Team Building',
    'Yoga or Meditation Session',
    'Festive Celebration (Diwali, Eid, Holi)',
    'Photo or Video Shoot',
    'Product Launch',
    'Book Launch',
    'Student or Expat Gathering',
    'Charity Dinner or Fundraiser',
    'Other',
  ],
  nl: [
    'Verjaardagsfeest of Jubileum',
    'Bruiloft of Nikah-receptie',
    'Aanzoek of Verloving',
    'Babyshower of Familiebijeenkomst',
    'Kittyparty',
    'Bedrijfsdiner of Vergadering',
    'Netwerkevenement of Meet-up',
    'Workshop of Teambuilding',
    'Yoga- of Meditatiesessie',
    'Feestviering (Diwali, Eid, Holi)',
    'Foto- of Videoshoot',
    'Productlancering',
    'Boeklancering',
    'Studenten- of Expatbijeenkomst',
    'Charitatief Diner of Fondsenwervend Evenement',
    'Anders',
  ],
}

const guestOptions = {
  en: ['25 to 40 guests', '41 to 60 guests', '61 to 80 guests'],
  nl: ['25 tot 40 gasten', '41 tot 60 gasten', '61 tot 80 gasten'],
}

const t = {
  en: {
    eyebrow: 'Free Quote — No Obligation',
    heading: 'Plan Your Event',
    sub: 'Response within 24 hours',
    name: 'Full Name',
    namePh: 'Your name',
    email: 'Email Address',
    emailPh: 'your@email.com',
    phone: 'Phone Number',
    phonePh: '+31 6 ...',
    phoneNote: 'Optional — helps us call you back faster',
    date: 'Preferred Date',
    eventType: 'Type of Event',
    eventTypePh: 'Select occasion',
    guests: 'Number of Guests',
    guestsPh: 'Select guest count',
    cta: 'Get Free Quote',
    sending: 'Sending...',
    trust1: 'No obligation',
    trust2: '100% halal certified',
    trust3: '24hr response',
    successBadge: 'Enquiry Received',
    successHeading: 'Thank You!',
    successBody: 'We will send your free quote within 24 hours. You can also call us directly on +31 6 30645930.',
    errName: 'Please enter your full name',
    errEmail: 'Please enter a valid email address',
    errDate: 'Please select a preferred date',
    errGuests: 'Please select the number of guests',
    errEventType: 'Please select the type of event',
  },
  nl: {
    eyebrow: 'Gratis Offerte - Geen Verplichtingen',
    heading: 'Plan Uw Evenement',
    sub: 'Reactie binnen 24 uur',
    name: 'Volledige Naam',
    namePh: 'Uw naam',
    email: 'E-mailadres',
    emailPh: 'uw@email.com',
    phone: 'Telefoonnummer',
    phonePh: '+31 6 ...',
    phoneNote: 'Optioneel - helpt ons u sneller terug te bellen',
    date: 'Gewenste Datum',
    eventType: 'Type Evenement',
    eventTypePh: 'Selecteer gelegenheid',
    guests: 'Aantal Gasten',
    guestsPh: 'Selecteer aantal gasten',
    cta: 'Gratis Offerte Aanvragen',
    sending: 'Verzenden...',
    trust1: 'Geen verplichtingen',
    trust2: '100% halal gecertificeerd',
    trust3: 'Reactie binnen 24 uur',
    successBadge: 'Aanvraag Ontvangen',
    successHeading: 'Bedankt!',
    successBody: 'Wij sturen u binnen 24 uur een gratis offerte. U kunt ons ook direct bellen op +31 6 30645930.',
    errName: 'Vul uw volledige naam in',
    errEmail: 'Vul een geldig e-mailadres in',
    errDate: 'Selecteer een gewenste datum',
    errGuests: 'Selecteer het aantal gasten',
    errEventType: 'Selecteer het type evenement',
  },
}

export default function HeroEnquiryForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const tr = isNl ? t.nl : t.en
  const eventOpts = isNl ? eventTypes.nl : eventTypes.en
  const guestOpts = isNl ? guestOptions.nl : guestOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', eventType: '', guests: '' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = tr.errName
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = tr.errEmail
    if (!form.date) errors.date = tr.errDate
    if (!form.guests) errors.guests = tr.errGuests
    if (!form.eventType) errors.eventType = tr.errEventType
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/feestzaal-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'hero' }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setApiError('Something went wrong. Please call us on +31 6 30645930.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setApiError('Something went wrong. Please call us on +31 6 30645930.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = [
    'w-full rounded-xl border bg-white px-3.5 py-2.5 md:px-4 md:py-3',
    'font-body text-[#1A1A1A] text-[14px] md:text-[15px] placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-[#C7A348]/30 focus:border-[#C7A348]',
    'transition-colors duration-200',
  ].join(' ')

  const fieldCls = (name: string) =>
    `${inputCls} ${fieldErrors[name] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200'}`

  // ── Success state ──
  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-[#D4AF37]/25 shadow-2xl shadow-[#1B2B5E]/20 overflow-hidden">
        {/* Top gold bar — same as the form card */}
        <div className="h-1.5 bg-gradient-to-r from-[#C7A348] via-[#D4AF37] to-[#C7A348]" />

        <div className="p-8 md:p-10 text-center">
          {/* Checkmark circle */}
          <div className="w-16 h-16 rounded-full bg-[#1B2B5E]/8 ring-4 ring-[#1B2B5E]/12 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#1B2B5E]" />
          </div>

          {/* Badge — navy pill, high contrast */}
          <div className="inline-flex items-center gap-2 bg-[#1B2B5E]/8 border border-[#1B2B5E]/15 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348] flex-shrink-0" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B2B5E]">
              {tr.successBadge}
            </span>
          </div>

          {/* Heading — dark, heavy, clearly readable */}
          <h3 className="font-heading text-3xl font-bold text-gray-900 mb-3">
            {tr.successHeading}
          </h3>

          {/* Body — dark gray, solid contrast */}
          <p className="font-body text-gray-700 text-sm leading-relaxed">
            {tr.successBody}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-[#D4AF37]/25 shadow-2xl shadow-[#1B2B5E]/20 overflow-hidden">
      {/* Gold accent bar at top */}
      <div className="h-1.5 bg-gradient-to-r from-[#C7A348] via-[#D4AF37] to-[#C7A348]" />

      <div className="p-5 md:p-7 lg:p-8">
        {/* Card heading */}
        <div className="mb-4 md:mb-5">
          <p className="font-body text-[#C7A348] text-[11px] font-bold uppercase tracking-[0.18em] mb-0.5">
            {tr.eyebrow}
          </p>
          <h2 className="font-vibes text-2xl md:text-3xl text-[#1B2B5E] leading-tight">
            {tr.heading}
          </h2>
          <p className="font-body text-[#1A1A1A]/50 text-sm mt-0.5">{tr.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3" noValidate>

          {/* Name */}
          <div>
            <label htmlFor="hero-name" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
              {tr.name} <span className="text-[#C7A348]">*</span>
            </label>
            <input
              id="hero-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={tr.namePh}
              className={fieldCls('name')}
            />
            {fieldErrors.name && (
              <p className="font-body text-red-500 text-[11px] mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="hero-email" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
              {tr.email} <span className="text-[#C7A348]">*</span>
            </label>
            <input
              id="hero-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={tr.emailPh}
              className={fieldCls('email')}
            />
            {fieldErrors.email && (
              <p className="font-body text-red-500 text-[11px] mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Phone — optional */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="hero-phone" className="font-body text-xs font-semibold text-[#1B2B5E] uppercase tracking-wide">
                {tr.phone}
              </label>
              <span className="font-body text-[10px] text-gray-400 italic">{tr.phoneNote}</span>
            </div>
            <input
              id="hero-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={tr.phonePh}
              className={fieldCls('phone')}
            />
          </div>

          {/* Date + Guests — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-date" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
                {tr.date} <span className="text-[#C7A348]">*</span>
              </label>
              <input
                id="hero-date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={fieldCls('date')}
              />
              {fieldErrors.date && (
                <p className="font-body text-red-500 text-[11px] mt-1">{fieldErrors.date}</p>
              )}
            </div>
            <div>
              <label htmlFor="hero-guests" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
                {tr.guests} <span className="text-[#C7A348]">*</span>
              </label>
              <select
                id="hero-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className={`${fieldCls('guests')} cursor-pointer`}
              >
                <option value="">{tr.guestsPh}</option>
                {guestOpts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {fieldErrors.guests && (
                <p className="font-body text-red-500 text-[11px] mt-1">{fieldErrors.guests}</p>
              )}
            </div>
          </div>

          {/* Event type */}
          <div>
            <label htmlFor="hero-event-type" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
              {tr.eventType} <span className="text-[#C7A348]">*</span>
            </label>
            <select
              id="hero-event-type"
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              className={`${fieldCls('eventType')} cursor-pointer`}
            >
              <option value="">{tr.eventTypePh}</option>
              {eventOpts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            {fieldErrors.eventType && (
              <p className="font-body text-red-500 text-[11px] mt-1">{fieldErrors.eventType}</p>
            )}
          </div>

          {/* API error */}
          {apiError && (
            <p className="font-body text-red-600 text-xs text-center bg-red-50 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={[
              'w-full flex items-center justify-center gap-2.5 mt-0.5',
              'rounded-xl bg-[#C7A348] px-6 py-3 md:py-4',
              'font-body text-[#1B2B5E] text-sm font-bold uppercase tracking-wider',
              'transition-all duration-300 hover:bg-[#D4AF37] hover:shadow-lg hover:shadow-[#C7A348]/30',
              'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[#C7A348] focus:ring-offset-2',
            ].join(' ')}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {tr.sending}
              </>
            ) : (
              <>
                {tr.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        {/* Trust signals */}
        <div className="flex items-center justify-between mt-3 pt-3 md:mt-4 md:pt-4 border-t border-gray-100">
          {[tr.trust1, tr.trust2, tr.trust3].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C7A348] flex-shrink-0" />
              <span className="font-body text-[#1A1A1A]/50 text-[10px] uppercase tracking-wide font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
