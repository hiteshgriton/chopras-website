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
    successHeading: 'Enquiry Received',
    successBody: 'We will send your free quote within 24 hours. You can also call us directly on +31 6 30645930.',
  },
  nl: {
    eyebrow: 'Gratis Offerte - Geen Verplichtingen',
    heading: 'Plan Uw Evenement',
    sub: 'Reactie binnen 24 uur',
    name: 'Volledige Naam',
    namePh: 'Uw naam',
    email: 'E-mailadres',
    emailPh: 'uw@email.com',
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
    successHeading: 'Aanvraag Ontvangen',
    successBody: 'Wij sturen u binnen 24 uur een gratis offerte. U kunt ons ook direct bellen op +31 6 30645930.',
  },
}

export default function HeroEnquiryForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const tr = isNl ? t.nl : t.en
  const eventOpts = isNl ? eventTypes.nl : eventTypes.en
  const guestOpts = isNl ? guestOptions.nl : guestOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', date: '', eventType: '', guests: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/feestzaal-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'hero' }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError('Something went wrong. Please call us on +31 6 30645930.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Something went wrong. Please call us on +31 6 30645930.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Shared input class ──
  const inputCls = [
    'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 md:px-4 md:py-3',
    'font-body text-[#1A1A1A] text-[14px] md:text-[15px] placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-[#C7A348]/30 focus:border-[#C7A348]',
    'transition-colors duration-200',
  ].join(' ')

  // ── Success state ──
  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-[#D4AF37]/25 shadow-2xl shadow-[#1B2B5E]/20 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 ring-4 ring-[#C7A348]/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-[#C7A348]" />
        </div>
        <h3 className="font-vibes text-3xl text-[#C7A348] mb-3">{tr.successHeading}</h3>
        <p className="font-body text-[#1A1A1A]/65 text-base leading-relaxed">{tr.successBody}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-[#D4AF37]/25 shadow-2xl shadow-[#1B2B5E]/20 overflow-hidden">
      {/* Gold accent bar at top */}
      <div className="h-1.5 bg-gradient-to-r from-[#C7A348] via-[#D4AF37] to-[#C7A348]" />

      <div className="p-5 md:p-7 lg:p-8">
        {/* Card heading */}
        <div className="mb-4 md:mb-6">
          <p className="font-body text-[#C7A348] text-[11px] font-bold uppercase tracking-[0.18em] mb-0.5">
            {tr.eyebrow}
          </p>
          <h2 className="font-vibes text-2xl md:text-3xl text-[#1B2B5E] leading-tight">
            {tr.heading}
          </h2>
          <p className="font-body text-[#1A1A1A]/50 text-sm mt-0.5">{tr.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3.5" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="hero-name" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
              {tr.name} <span className="text-[#C7A348]">*</span>
            </label>
            <input
              id="hero-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={tr.namePh}
              className={inputCls}
            />
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
              required
              value={form.email}
              onChange={handleChange}
              placeholder={tr.emailPh}
              className={inputCls}
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
                required
                value={form.date}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="hero-guests" className="block font-body text-xs font-semibold text-[#1B2B5E] mb-1 uppercase tracking-wide">
                {tr.guests} <span className="text-[#C7A348]">*</span>
              </label>
              <select
                id="hero-guests"
                name="guests"
                required
                value={form.guests}
                onChange={handleChange}
                className={`${inputCls} cursor-pointer`}
              >
                <option value="">{tr.guestsPh}</option>
                {guestOpts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
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
              required
              value={form.eventType}
              onChange={handleChange}
              className={`${inputCls} cursor-pointer`}
            >
              <option value="">{tr.eventTypePh}</option>
              {eventOpts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Error message */}
          {error && (
            <p className="font-body text-red-600 text-xs text-center bg-red-50 rounded-lg px-3 py-2">
              {error}
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Trust signals */}
        <div className="flex items-center justify-between mt-3 pt-3 md:mt-5 md:pt-5 border-t border-gray-100">
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
