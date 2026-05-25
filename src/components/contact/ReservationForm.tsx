'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle, Send } from 'lucide-react'

interface Props {
  locale: string
}

const timeSlots = [
  '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
]

const guestOptions = {
  en: ['1 guest', '2 guests', '3 guests', '4 guests', '5 to 6 guests', '7 to 8 guests', '9 to 10 guests', 'Large group (11 or more)'],
  nl: ['1 gast', '2 gasten', '3 gasten', '4 gasten', '5 tot 6 gasten', '7 tot 8 gasten', '9 tot 10 gasten', 'Grote groep (11 of meer)'],
}

const labels = {
  en: {
    name: 'Full Name',
    namePlaceholder: 'Your full name',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    phonePlaceholder: '+31 6 ...',
    date: 'Preferred Date',
    time: 'Preferred Time',
    timeDefault: 'Select a time',
    guests: 'Number of Guests',
    guestsDefault: 'Select guest count',
    requests: 'Special Requests or Dietary Requirements',
    requestsPlaceholder: 'Allergies, dietary requirements, high chair needed, occasion...',
    submit: 'Request Reservation',
    sending: 'Sending...',
    required: 'Required fields are marked with *',
    successEyebrow: 'Request Received',
    successHeading: 'Thank You!',
    successBody: 'We will confirm your table within a few hours. You can also reach us directly on +31 6 30645930.',
    errName: 'Please enter your full name',
    errEmail: 'Please enter a valid email address',
    errPhone: 'Please enter your phone number',
    errDate: 'Please select a preferred date',
    errTime: 'Please select a preferred time',
    errGuests: 'Please select the number of guests',
  },
  nl: {
    name: 'Volledige Naam',
    namePlaceholder: 'Uw volledige naam',
    email: 'E-mailadres',
    emailPlaceholder: 'uw@email.com',
    phone: 'Telefoonnummer',
    phonePlaceholder: '+31 6 ...',
    date: 'Gewenste Datum',
    time: 'Gewenste Tijd',
    timeDefault: 'Selecteer een tijd',
    guests: 'Aantal Gasten',
    guestsDefault: 'Selecteer aantal gasten',
    requests: 'Speciale Wensen of Dieetwensen',
    requestsPlaceholder: 'Allergieën, dieetwensen, kinderstoel nodig, gelegenheid...',
    submit: 'Reservering Aanvragen',
    sending: 'Verzenden...',
    required: 'Verplichte velden zijn gemarkeerd met *',
    successEyebrow: 'Aanvraag Ontvangen',
    successHeading: 'Bedankt!',
    successBody: 'Wij bevestigen uw tafel binnen enkele uren. U kunt ons ook direct bellen op +31 6 30645930.',
    errName: 'Vul uw volledige naam in',
    errEmail: 'Vul een geldig e-mailadres in',
    errPhone: 'Vul uw telefoonnummer in',
    errDate: 'Selecteer een gewenste datum',
    errTime: 'Selecteer een gewenste tijd',
    errGuests: 'Selecteer het aantal gasten',
  },
}

export default function ReservationForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const t = isNl ? labels.nl : labels.en
  const guestOpts = isNl ? guestOptions.nl : guestOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
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
    if (!form.time) errors.time = t.errTime
    if (!form.guests) errors.guests = t.errGuests
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/reservation-enquiry', {
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
      <div className="flex flex-col items-center justify-center text-center py-10 px-6">
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
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="font-body text-[#1A1A1A]/50 text-sm">{t.required}</p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-name" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.name} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="res-name" type="text" name="name" value={form.name} onChange={handleChange}
            placeholder={t.namePlaceholder} className={fieldClass('name')} />
          {fieldErrors.name && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="res-email" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.email} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="res-email" type="email" name="email" value={form.email} onChange={handleChange}
            placeholder={t.emailPlaceholder} className={fieldClass('email')} />
          {fieldErrors.email && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="res-phone" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.phone} <span className="text-[#C7A348]">*</span>
        </label>
        <input id="res-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
          placeholder={t.phonePlaceholder} className={fieldClass('phone')} />
        {fieldErrors.phone && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-date" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.date} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="res-date" type="date" name="date" value={form.date} onChange={handleChange}
            min={today} className={fieldClass('date')} />
          {fieldErrors.date && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.date}</p>}
        </div>
        <div>
          <label htmlFor="res-time" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.time} <span className="text-[#C7A348]">*</span>
          </label>
          <select id="res-time" name="time" value={form.time} onChange={handleChange}
            className={`${fieldClass('time')} cursor-pointer`}>
            <option value="">{t.timeDefault}</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {fieldErrors.time && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.time}</p>}
        </div>
      </div>

      {/* Guests */}
      <div>
        <label htmlFor="res-guests" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.guests} <span className="text-[#C7A348]">*</span>
        </label>
        <select id="res-guests" name="guests" value={form.guests} onChange={handleChange}
          className={`${fieldClass('guests')} cursor-pointer`}>
          <option value="">{t.guestsDefault}</option>
          {guestOpts.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {fieldErrors.guests && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.guests}</p>}
      </div>

      {/* Special requests */}
      <div>
        <label htmlFor="res-requests" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.requests}
        </label>
        <textarea id="res-requests" name="specialRequests" rows={3} value={form.specialRequests}
          onChange={handleChange} placeholder={t.requestsPlaceholder}
          className={`${fieldClass('specialRequests')} resize-none`} />
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
  )
}
