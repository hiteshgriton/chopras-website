'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle, Send } from 'lucide-react'

interface Props {
  locale: string
}

const guestOptions = {
  en: ['25 to 40 guests', '41 to 60 guests', '61 to 80 guests'],
  nl: ['25 tot 40 gasten', '41 tot 60 gasten', '61 tot 80 gasten'],
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
    'Yoga or Meditation Session',
    'Festive Celebration (Diwali, Eid, Holi, Christmas)',
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
    'Feestviering (Diwali, Eid, Holi, Kerstmis)',
    'Foto- of Videoshoot',
    'Productlancering',
    'Boeklancering',
    'Studenten- of Expatbijeenkomst',
    'Charitatief Diner of Fondsenwervend Evenement',
    'Anders',
  ],
}

const labels = {
  en: {
    heading: 'Request a Free Quote',
    sub: 'Tell us about your event and we will send a no-obligation quote within 24 hours.',
    name: 'Full Name',
    namePlaceholder: 'Your full name',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    phonePlaceholder: '+31 6 ...',
    date: 'Preferred Event Date',
    guests: 'Number of Guests',
    guestsDefault: 'Select guest count',
    eventType: 'Type of Event',
    eventTypeDefault: 'Select event type',
    message: 'Special Requests or Questions',
    messagePlaceholder: 'Any dietary requirements, layout preferences, or questions for the team...',
    submit: 'Send Enquiry',
    sending: 'Sending...',
    successEyebrow: 'Enquiry Received',
    successHeading: 'Thank You!',
    successBody: 'Thank you. We will review your request and send a quote within 24 hours. You can also call us directly on +31 6 30645930.',
    required: 'Required fields are marked with *',
    errName: 'Please enter your full name',
    errEmail: 'Please enter a valid email address',
    errDate: 'Please select a preferred date',
    errGuests: 'Please select the number of guests',
    errEventType: 'Please select the type of event',
  },
  nl: {
    heading: 'Vraag een Gratis Offerte Aan',
    sub: 'Vertel ons over uw evenement en wij sturen u binnen 24 uur een vrijblijvende offerte.',
    name: 'Volledige Naam',
    namePlaceholder: 'Uw volledige naam',
    email: 'E-mailadres',
    emailPlaceholder: 'uw@email.com',
    phone: 'Telefoonnummer',
    phonePlaceholder: '+31 6 ...',
    date: 'Gewenste Evenementdatum',
    guests: 'Aantal Gasten',
    guestsDefault: 'Selecteer aantal gasten',
    eventType: 'Type Evenement',
    eventTypeDefault: 'Selecteer type evenement',
    message: 'Speciale Wensen of Vragen',
    messagePlaceholder: 'Dieetwensen, opstellingsvoorkeur of vragen voor het team...',
    submit: 'Verstuur Aanvraag',
    sending: 'Verzenden...',
    successEyebrow: 'Aanvraag Ontvangen',
    successHeading: 'Bedankt!',
    successBody: 'Dank u. Wij bekijken uw aanvraag en sturen binnen 24 uur een offerte. U kunt ons ook direct bellen op +31 6 30645930.',
    required: 'Verplichte velden zijn gemarkeerd met *',
    errName: 'Vul uw volledige naam in',
    errEmail: 'Vul een geldig e-mailadres in',
    errDate: 'Selecteer een gewenste datum',
    errGuests: 'Selecteer het aantal gasten',
    errEventType: 'Selecteer het type evenement',
  },
}

export default function BookingInquiryForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const t = isNl ? labels.nl : labels.en
  const guestOpts = isNl ? guestOptions.nl : guestOptions.en
  const eventOpts = isNl ? eventTypeOptions.nl : eventTypeOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    eventType: '',
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
    if (!form.date) errors.date = t.errDate
    if (!form.guests) errors.guests = t.errGuests
    if (!form.eventType) errors.eventType = t.errEventType
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
        body: JSON.stringify({ ...form, source: 'booking' }),
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
      <div className="flex flex-col items-center justify-center text-center py-12 px-8">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 ring-2 ring-[#C7A348]/30">
          <CheckCircle className="w-8 h-8 text-[#C7A348]" />
        </div>
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#C7A348] mb-2">
          {t.successEyebrow}
        </p>
        <h3 className="font-heading text-2xl font-semibold text-[#1B2B5E] mb-4">
          {t.successHeading}
        </h3>
        <p className="font-body text-gray-600 text-base leading-relaxed max-w-md">
          {t.successBody}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <p className="font-body text-[#1A1A1A]/50 text-sm">{t.required}</p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-name" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.name} <span className="text-[#C7A348]">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            className={fieldClass('name')}
          />
          {fieldErrors.name && (
            <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="booking-email" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.email} <span className="text-[#C7A348]">*</span>
          </label>
          <input
            id="booking-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            className={fieldClass('email')}
          />
          {fieldErrors.email && (
            <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Phone + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-phone" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.phone}
          </label>
          <input
            id="booking-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
            className={fieldClass('phone')}
          />
        </div>
        <div>
          <label htmlFor="booking-date" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.date} <span className="text-[#C7A348]">*</span>
          </label>
          <input
            id="booking-date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={fieldClass('date')}
          />
          {fieldErrors.date && (
            <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.date}</p>
          )}
        </div>
      </div>

      {/* Guests + Event type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-guests" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.guests} <span className="text-[#C7A348]">*</span>
          </label>
          <select
            id="booking-guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className={`${fieldClass('guests')} cursor-pointer`}
          >
            <option value="">{t.guestsDefault}</option>
            {guestOpts.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.guests && (
            <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.guests}</p>
          )}
        </div>
        <div>
          <label htmlFor="booking-event-type" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.eventType} <span className="text-[#C7A348]">*</span>
          </label>
          <select
            id="booking-event-type"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className={`${fieldClass('eventType')} cursor-pointer`}
          >
            <option value="">{t.eventTypeDefault}</option>
            {eventOpts.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.eventType && (
            <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.eventType}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="booking-message" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.message}
        </label>
        <textarea
          id="booking-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          className={`${fieldClass('message')} resize-none`}
        />
      </div>

      {/* API error message */}
      {apiError && (
        <p className="font-body text-red-600 text-sm text-center bg-red-50 rounded-xl px-4 py-3">
          {apiError}
        </p>
      )}

      {/* Submit */}
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
  )
}
