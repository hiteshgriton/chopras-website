'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle, Send } from 'lucide-react'

interface Props {
  locale: string
}

const eventTypeOptions = {
  en: [
    'Birthday Party or Anniversary',
    'Wedding or Nikah Reception',
    'Proposal or Engagement',
    'Baby Shower or Family Reunion',
    'Kitty Party',
    'Corporate Dinner or Meeting',
    'Networking Event or Meet-up',
    'Workshop or Team Building Session',
    'Festive Celebration (Diwali, Eid, Holi, Christmas)',
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
    'Feestviering (Diwali, Eid, Holi, Kerstmis)',
    'Charitatief Diner of Fondsenwervend Evenement',
    'Anders',
  ],
}

const guestOptions = {
  en: ['Up to 25 guests', '25 to 50 guests', '51 to 100 guests', '101 to 150 guests', '151 to 200 guests', 'More than 200 guests'],
  nl: ['Tot 25 gasten', '25 tot 50 gasten', '51 tot 100 gasten', '101 tot 150 gasten', '151 tot 200 gasten', 'Meer dan 200 gasten'],
}

const budgetOptions = {
  en: ['Under €500', '€500 to €1,000', '€1,000 to €2,500', '€2,500 to €5,000', 'Over €5,000', 'To be discussed'],
  nl: ['Onder €500', '€500 tot €1.000', '€1.000 tot €2.500', '€2.500 tot €5.000', 'Meer dan €5.000', 'Nader te bespreken'],
}

const labels = {
  en: {
    name: 'Full Name',
    namePlaceholder: 'Your full name',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    phonePlaceholder: '+31 6 ...',
    date: 'Event Date',
    eventType: 'Type of Event',
    eventTypeDefault: 'Select event type',
    guests: 'Number of Guests',
    guestsDefault: 'Select approximate guest count',
    venue: 'Venue / Location',
    venuePlaceholder: 'e.g. Our restaurant, your home, external venue name...',
    budget: 'Approximate Budget',
    budgetDefault: 'Select budget range (optional)',
    message: 'Additional Details or Special Requests',
    messagePlaceholder: 'Menu preferences, dietary requirements, setup preferences, timeline...',
    submit: 'Request a Free Quote',
    sending: 'Sending...',
    required: 'Required fields are marked with *',
    successEyebrow: 'Enquiry Received',
    successHeading: 'Thank You!',
    successBody: 'We will review your request and send a no-obligation quote within 24 hours. You can also call us directly on +31 6 30645930.',
    errName: 'Please enter your full name',
    errEmail: 'Please enter a valid email address',
    errPhone: 'Please enter your phone number',
    errDate: 'Please select an event date',
    errEventType: 'Please select the type of event',
    errGuests: 'Please select the approximate guest count',
    errVenue: 'Please enter the venue or location',
  },
  nl: {
    name: 'Volledige Naam',
    namePlaceholder: 'Uw volledige naam',
    email: 'E-mailadres',
    emailPlaceholder: 'uw@email.com',
    phone: 'Telefoonnummer',
    phonePlaceholder: '+31 6 ...',
    date: 'Evenementdatum',
    eventType: 'Type Evenement',
    eventTypeDefault: 'Selecteer type evenement',
    guests: 'Aantal Gasten',
    guestsDefault: 'Selecteer het geschatte aantal gasten',
    venue: 'Locatie / Zaal',
    venuePlaceholder: 'bijv. ons restaurant, uw thuis, naam externe locatie...',
    budget: 'Geschat Budget',
    budgetDefault: 'Selecteer budgetrange (optioneel)',
    message: 'Aanvullende Informatie of Speciale Wensen',
    messagePlaceholder: 'Menuvoorkeur, dieetwensen, opstellingsvoorkeur, tijdschema...',
    submit: 'Gratis Offerte Aanvragen',
    sending: 'Verzenden...',
    required: 'Verplichte velden zijn gemarkeerd met *',
    successEyebrow: 'Aanvraag Ontvangen',
    successHeading: 'Bedankt!',
    successBody: 'Wij bekijken uw aanvraag en sturen binnen 24 uur een vrijblijvende offerte. U kunt ons ook direct bellen op +31 6 30645930.',
    errName: 'Vul uw volledige naam in',
    errEmail: 'Vul een geldig e-mailadres in',
    errPhone: 'Vul uw telefoonnummer in',
    errDate: 'Selecteer een evenementdatum',
    errEventType: 'Selecteer het type evenement',
    errGuests: 'Selecteer het geschatte aantal gasten',
    errVenue: 'Vul de locatie of zaal in',
  },
}

export default function CateringForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const t = isNl ? labels.nl : labels.en
  const eventOpts = isNl ? eventTypeOptions.nl : eventTypeOptions.en
  const guestOpts = isNl ? guestOptions.nl : guestOptions.en
  const budgetOpts = isNl ? budgetOptions.nl : budgetOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: '',
    guests: '',
    venue: '',
    budget: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
    if (!form.name.trim()) errors.name = t.errName
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t.errEmail
    if (!form.phone.trim()) errors.phone = t.errPhone
    if (!form.date) errors.date = t.errDate
    if (!form.eventType) errors.eventType = t.errEventType
    if (!form.guests) errors.guests = t.errGuests
    if (!form.venue.trim()) errors.venue = t.errVenue
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/catering-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setApiError(isNl ? 'Er is iets misgegaan. Bel ons op +31 6 30645930.' : 'Something went wrong. Please call us on +31 6 30645930.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setApiError(isNl ? 'Er is iets misgegaan. Bel ons op +31 6 30645930.' : 'Something went wrong. Please call us on +31 6 30645930.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = [
    'w-full rounded-xl border bg-white px-4 py-3',
    'font-body text-[#1A1A1A] text-base placeholder:text-[#1A1A1A]/40',
    'focus:outline-none focus:ring-2 focus:ring-[#C7A348]/40 focus:border-[#C7A348]',
    'transition-colors duration-200',
  ].join(' ')

  const fieldClass = (name: string) =>
    `${inputBase} ${fieldErrors[name] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-[#1B2B5E]/20'}`

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#1B2B5E]/8 ring-4 ring-[#1B2B5E]/12 flex items-center justify-center mb-5">
            <CheckCircle className="w-8 h-8 text-[#1B2B5E]" />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#1B2B5E]/8 border border-[#1B2B5E]/15 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348] flex-shrink-0" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B2B5E]">
              {t.successEyebrow}
            </span>
          </div>
          <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">{t.successHeading}</h3>
          <p className="font-body text-gray-700 text-base leading-relaxed max-w-sm">{t.successBody}</p>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-left">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <p className="font-body text-[#1A1A1A]/50 text-sm">{t.required}</p>

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cat-name" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.name} <span className="text-[#C7A348]">*</span>
            </label>
            <input id="cat-name" type="text" name="name" value={form.name} onChange={handleChange}
              placeholder={t.namePlaceholder} className={fieldClass('name')} />
            {fieldErrors.name && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="cat-email" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.email} <span className="text-[#C7A348]">*</span>
            </label>
            <input id="cat-email" type="email" name="email" value={form.email} onChange={handleChange}
              placeholder={t.emailPlaceholder} className={fieldClass('email')} />
            {fieldErrors.email && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>
        </div>

        {/* Phone + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cat-phone" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.phone} <span className="text-[#C7A348]">*</span>
            </label>
            <input id="cat-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
              placeholder={t.phonePlaceholder} className={fieldClass('phone')} />
            {fieldErrors.phone && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="cat-date" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.date} <span className="text-[#C7A348]">*</span>
            </label>
            <input id="cat-date" type="date" name="date" value={form.date} onChange={handleChange}
              min={today} className={fieldClass('date')} />
            {fieldErrors.date && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.date}</p>}
          </div>
        </div>

        {/* Event Type + Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cat-event-type" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.eventType} <span className="text-[#C7A348]">*</span>
            </label>
            <select id="cat-event-type" name="eventType" value={form.eventType} onChange={handleChange}
              className={`${fieldClass('eventType')} cursor-pointer`}>
              <option value="">{t.eventTypeDefault}</option>
              {eventOpts.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {fieldErrors.eventType && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.eventType}</p>}
          </div>
          <div>
            <label htmlFor="cat-guests" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
              {t.guests} <span className="text-[#C7A348]">*</span>
            </label>
            <select id="cat-guests" name="guests" value={form.guests} onChange={handleChange}
              className={`${fieldClass('guests')} cursor-pointer`}>
              <option value="">{t.guestsDefault}</option>
              {guestOpts.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {fieldErrors.guests && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.guests}</p>}
          </div>
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="cat-venue" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.venue} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="cat-venue" type="text" name="venue" value={form.venue} onChange={handleChange}
            placeholder={t.venuePlaceholder} className={fieldClass('venue')} />
          {fieldErrors.venue && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.venue}</p>}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="cat-budget" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.budget}
          </label>
          <select id="cat-budget" name="budget" value={form.budget} onChange={handleChange}
            className={`${fieldClass('budget')} cursor-pointer`}>
            <option value="">{t.budgetDefault}</option>
            {budgetOpts.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="cat-message" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.message}
          </label>
          <textarea id="cat-message" name="message" rows={4} value={form.message} onChange={handleChange}
            placeholder={t.messagePlaceholder} className={`${fieldClass('message')} resize-none`} />
        </div>

        {apiError && (
          <p className="font-body text-red-600 text-sm text-center bg-red-50 rounded-xl px-4 py-3">{apiError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={[
            'w-full flex items-center justify-center gap-3',
            'rounded-xl bg-[#C7A348] px-8 py-4',
            'font-body text-[#1B2B5E] text-sm font-bold uppercase tracking-widest',
            'transition-all duration-300 hover:bg-[#D4AF37] hover:shadow-lg hover:shadow-[#C7A348]/25',
            'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-[#C7A348] focus:ring-offset-2',
          ].join(' ')}
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-[#1B2B5E]/30 border-t-[#1B2B5E] animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t.submit}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
