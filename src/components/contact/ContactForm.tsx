'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle, Send } from 'lucide-react'

interface Props {
  locale: string
}

const subjectOptions = {
  en: [
    'Table Reservation',
    'Catering Enquiry',
    'Feestzaal / Event Venue Hire',
    'Wedding or Nikah Catering',
    'Corporate Dinner or Event',
    'Feedback or Review',
    'General Question',
    'Other',
  ],
  nl: [
    'Tafelreservering',
    'Cateringaanvraag',
    'Feestzaal / Evenementenruimte Huren',
    'Bruiloft of Nikah Catering',
    'Bedrijfsdiner of Evenement',
    'Feedback of Beoordeling',
    'Algemene Vraag',
    'Anders',
  ],
}

const labels = {
  en: {
    name: 'Full Name',
    namePlaceholder: 'Your full name',
    email: 'Email Address',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    phonePlaceholder: '+31 6 ... (optional)',
    subject: 'Subject',
    subjectDefault: 'What is your enquiry about?',
    message: 'Message',
    messagePlaceholder: 'Tell us how we can help...',
    submit: 'Send Message',
    sending: 'Sending...',
    required: 'Required fields are marked with *',
    successEyebrow: 'Message Sent',
    successHeading: 'Thank You!',
    successBody: 'We have received your message and will reply within 24 hours. For urgent matters call +31 6 30645930.',
    errName: 'Please enter your full name',
    errEmail: 'Please enter a valid email address',
    errSubject: 'Please select a subject',
    errMessage: 'Please enter your message',
  },
  nl: {
    name: 'Volledige Naam',
    namePlaceholder: 'Uw volledige naam',
    email: 'E-mailadres',
    emailPlaceholder: 'uw@email.com',
    phone: 'Telefoonnummer',
    phonePlaceholder: '+31 6 ... (optioneel)',
    subject: 'Onderwerp',
    subjectDefault: 'Waar gaat uw vraag over?',
    message: 'Bericht',
    messagePlaceholder: 'Vertel ons hoe we u kunnen helpen...',
    submit: 'Bericht Versturen',
    sending: 'Verzenden...',
    required: 'Verplichte velden zijn gemarkeerd met *',
    successEyebrow: 'Bericht Ontvangen',
    successHeading: 'Bedankt!',
    successBody: 'Wij hebben uw bericht ontvangen en reageren binnen 24 uur. Voor dringende zaken belt u +31 6 30645930.',
    errName: 'Vul uw volledige naam in',
    errEmail: 'Vul een geldig e-mailadres in',
    errSubject: 'Selecteer een onderwerp',
    errMessage: 'Vul uw bericht in',
  },
}

export default function ContactForm({ locale }: Props) {
  const isNl = locale === 'nl'
  const t = isNl ? labels.nl : labels.en
  const subjectOpts = isNl ? subjectOptions.nl : subjectOptions.en

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    if (!form.subject) errors.subject = t.errSubject
    if (!form.message.trim()) errors.message = t.errMessage
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact-enquiry', {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="font-body text-[#1A1A1A]/50 text-sm">{t.required}</p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.name} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange}
            placeholder={t.namePlaceholder} className={fieldClass('name')} />
          {fieldErrors.name && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
            {t.email} <span className="text-[#C7A348]">*</span>
          </label>
          <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange}
            placeholder={t.emailPlaceholder} className={fieldClass('email')} />
          {fieldErrors.email && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.phone}
        </label>
        <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
          placeholder={t.phonePlaceholder} className={fieldClass('phone')} />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.subject} <span className="text-[#C7A348]">*</span>
        </label>
        <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange}
          className={`${fieldClass('subject')} cursor-pointer`}>
          <option value="">{t.subjectDefault}</option>
          {subjectOpts.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {fieldErrors.subject && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block font-body text-sm font-semibold text-[#1B2B5E] mb-2">
          {t.message} <span className="text-[#C7A348]">*</span>
        </label>
        <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={handleChange}
          placeholder={t.messagePlaceholder} className={`${fieldClass('message')} resize-none`} />
        {fieldErrors.message && <p className="font-body text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
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
