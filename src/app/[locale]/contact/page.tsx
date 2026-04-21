import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Bus } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { RESTAURANT } from '@/lib/constants'
import { getLocalizedUrl } from '@/lib/utils'
import { getRestaurantSchema, getBreadcrumbSchema, getContactPageSchema, getFaqPageSchema } from '@/lib/schema'
import ContactForm from '@/components/contact/ContactForm'
import TrustBar from '@/components/sections/TrustBar'
import ReservationForm from '@/components/contact/ReservationForm'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import EmailLink from '@/components/ui/EmailLink'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Contact Chopras Indian Restaurant Den Haag | Reservations and Enquiries',
    nl: 'Contact Chopras Indiaas Restaurant Den Haag | Reserveringen',
  }
  const descriptions = {
    en: 'Contact Chopras Indian Restaurant Den Haag. Leyweg 986, open Tuesday to Sunday. Reserve a table, call us or send a message. Tram line 2 stops at the door.',
    nl: 'Neem contact op met Chopras Indiaas Restaurant in Den Haag. Bel, mail of gebruik ons formulier voor tafelreserveringen, cateringaanvragen en evenementboekingen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'contact'),
      languages: {
        en: getLocalizedUrl('en', 'contact'),
        nl: getLocalizedUrl('nl', 'contact'),
        'x-default': getLocalizedUrl('en', 'contact'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'contact'),
      images: [{ url: '/og/home-og.jpg', width: 1200, height: 630, alt: 'Chopras Indian Restaurant Den Haag' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/og/home-og.jpg'],
    },
  }
}

const faqsEn = [
  {
    question: 'How do I reserve a table at Chopras Indian Restaurant Den Haag?',
    answer: 'Use the reservation form at the top of this page, call +31 6 30645930 directly, or email info [at] chopras.nl. For groups of four or more, a reservation is recommended. For eight or more guests, call the team so the right table configuration can be arranged. Chopras Indian Restaurant at Leyweg 986 Den Haag is open Tuesday to Sunday from 16:30 to 22:30.',
  },
  {
    question: 'Where is Chopras Indian Restaurant located in Den Haag?',
    answer: 'Chopras Indian Restaurant is at Leyweg 986, 2545 GW Den Haag, in the Leyenburg neighbourhood. Paid parking is available in the Leyweg area. By public transport, tram line 2 and several bus routes stop near the Leyweg stop, a short walk from the restaurant. The nearest major green space is the Zuiderpark, five minutes away on foot.',
  },
  {
    question: 'What are the opening hours of Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag is open Tuesday to Sunday from 16:30 to 22:30. The restaurant is closed on Monday, every Monday without exception. The kitchen opens at 16:30 only and last orders are taken at 22:00.',
  },
  {
    question: 'How do I get to Chopras Indian Restaurant from Den Haag Centraal?',
    answer: 'From Den Haag Centraal, take tram line 2 towards Leyenburg and exit at the Leyweg stop. The journey takes approximately 15 minutes. By car from the city centre, follow the Rijswijkseweg south and turn onto Leyweg. Paid parking is available in the Leyweg area.',
  },
  {
    question: 'Can I book Chopras Indian Restaurant for a private event or catering in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers a private event space at Leyweg 986 Den Haag for between 25 and 80 guests, with full Indian catering included. The team handles weddings, birthday celebrations, and corporate dinners. Send an enquiry via the contact form on this page or call +31 6 30645930 to discuss your requirements.',
  },
]

const faqsNl = [
  {
    question: 'Hoe reserveer ik een tafel bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Gebruik het reserveringsformulier bovenaan deze pagina, bel +31 6 30645930 of stuur een e-mail naar info [at] chopras.nl. Voor groepen van vier of meer personen wordt een reservering aanbevolen. Voor acht of meer gasten belt u het team zodat de juiste tafelopstelling kan worden geregeld. Chopras Indian Restaurant op Leyweg 986 in Den Haag is open van dinsdag tot en met zondag van 16:30 tot 22:30.',
  },
  {
    question: 'Waar is Chopras Indian Restaurant gevestigd in Den Haag?',
    answer: 'Chopras Indian Restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag, in de wijk Leyenburg. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Met het openbaar vervoer stoppen tramlijn 2 en meerdere buslijnen bij of nabij de halte Leyweg, op loopafstand van het restaurant.',
  },
  {
    question: 'Wat zijn de openingstijden van Chopras Indian Restaurant Den Haag?',
    answer: 'Chopras Indian Restaurant Den Haag is open van dinsdag tot en met zondag van 16:30 tot 22:30. Het restaurant is gesloten op maandag, elke maandag zonder uitzondering. De keuken opent om 16:30 en de laatste bestelling wordt opgenomen om 22:00.',
  },
  {
    question: 'Hoe kom ik van Den Haag Centraal naar Chopras Indian Restaurant?',
    answer: 'Neem vanaf Den Haag Centraal tramlijn 2 richting Leyenburg en stap uit bij de halte Leyweg. De rit duurt ongeveer 15 minuten. Met de auto vanuit het centrum volgt u de Rijswijkseweg naar het zuiden en slaat u de Leyweg in. Betaald parkeren is beschikbaar in de omgeving van Leyweg.',
  },
  {
    question: 'Kan ik Chopras Indian Restaurant boeken voor een privé-evenement of catering in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt een evenementenruimte op Leyweg 986 in Den Haag voor 25 tot 80 gasten, inclusief volledig Indiaas catering. Het team verzorgt bruiloften, verjaardagsfeesten en bedrijfsdiners. Stuur een aanvraag via het contactformulier op deze pagina of bel +31 6 30645930 om uw wensen te bespreken.',
  },
]

export default function LocaleContactPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const isNl = locale === 'nl'
  const base = locale === 'nl' ? '/nl' : ''
  const restaurantSchema = getRestaurantSchema(locale)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
    { name: tr.common.nav.contact, item: getLocalizedUrl(locale, 'contact') },
  ])

  const quickCards = [
    {
      Icon: Phone,
      title: isNl ? 'Bel Ons Rechtstreeks' : 'Call Us Directly',
      body: isNl ? 'Voor reserveringen op dezelfde dag of dringende vragen' : 'For same-day bookings or urgent enquiries',
      cta: `${isNl ? 'Bel' : 'Call'} ${RESTAURANT.contact.phoneDisplay}`,
      href: `tel:${RESTAURANT.contact.phone}`,
    },
    {
      Icon: Mail,
      title: isNl ? 'Stuur een Bericht' : 'Send a Message',
      body: isNl ? 'Wij reageren binnen 24 uur' : 'We reply within 24 hours',
      cta: RESTAURANT.contact.email,
      href: `mailto:${RESTAURANT.contact.email}`,
    },
    {
      Icon: MapPin,
      title: isNl ? 'Routebeschrijving' : 'Get Directions',
      body: 'Leyweg 986, Den Haag',
      cta: isNl ? 'Open in Maps' : 'Open in Maps',
      href: 'https://maps.google.com/?q=Leyweg+986+Den+Haag',
    },
  ]

  return (
    <>
      <JsonLd data={restaurantSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={getContactPageSchema(locale)} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* SECTION 1  -  RESERVATION SPLIT */}
      <section
        className="pb-0"
        style={{ background: 'linear-gradient(135deg, #000066 0%, #0000FF 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] items-start gap-0">

            {/* LEFT  -  GHL Form */}
            <div className="bg-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-r-none p-8 md:p-10 shadow-2xl">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
                  • VISIT US · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
                </span>
              </div>
              <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mt-2 mb-2 leading-[1.3]">
                {isNl ? 'Reserveer uw Tafel bij Chopras' : 'Reserve Your Table at Chopras'}
              </h2>
              <p className="text-[#1A1A1A]/60 text-sm mt-2 mb-6">
                {isNl
                  ? 'Open dinsdag t/m zondag · 16:30 tot 22:30 · Leyweg 986, Den Haag'
                  : 'Open Tuesday to Sunday · 16:30 to 22:30 · Leyweg 986, Den Haag'}
              </p>
              <ReservationForm />
            </div>

            {/* RIGHT  -  Contact Details */}
            <div className="bg-transparent text-white p-8 md:p-10 flex flex-col justify-start gap-8">

              {/* Restaurant info card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
                  <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
                    • FIND US •
                  </span>
                </div>
                <h3 className="font-vibes text-3xl text-white mt-2 mb-6 leading-[1.3]">
                  Chopras Indian Restaurant
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="text-white/80 text-sm leading-relaxed">
                      Leyweg 986, 2545 GW Den Haag<br />Netherlands
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0" />
                    <a
                      href={`tel:${RESTAURANT.contact.phone}`}
                      className="text-white/80 text-sm leading-relaxed hover:text-[#D4AF37] transition-colors"
                    >
                      {RESTAURANT.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0" />
                    <a
                      href={`mailto:${RESTAURANT.contact.email}`}
                      className="text-white/80 text-sm leading-relaxed hover:text-[#D4AF37] transition-colors"
                    >
                      {RESTAURANT.contact.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="text-sm leading-relaxed space-y-1">
                      <p className="text-white/80">
                        {isNl ? 'Dinsdag tot en met Zondag: 16:30 tot 22:30' : 'Tuesday to Sunday: 16:30 to 22:30'}
                      </p>
                      <p className="text-white/50">
                        {isNl ? 'Maandag: Gesloten' : 'Monday: Closed'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Bus className="text-[#D4AF37] w-5 h-5 flex-shrink-0" />
                  <p className="text-white/70 text-sm">
                    {isNl
                      ? 'Tram en bus bereikbaar · Halte Leyweg op loopafstand'
                      : 'Tram and bus accessible · Leyweg stop nearby'}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2457.8!2d4.2742654!3d52.0487367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b12ba9dd450d%3A0xf932c69c8e71a16b!2sChopras%20Indian%20Restaurant%20Den%20Haag!5e0!3m2!1sen!2snl!4v1744000000000!5m2!1sen!2snl"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                  title="Chopras Indian Restaurant Den Haag location"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2  -  QUICK ACTION CARDS */}
      <section className="bg-[#F7F8FC] py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {quickCards.map(({ Icon, title, body, cta, href }) => (
            <div
              key={title}
              className="flex flex-col justify-between bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center flex-1 mb-6">
                <Icon className="text-[#D4AF37] w-10 h-10 mx-auto mb-4" />
                <h3 className="font-vibes text-3xl text-[#C7A348] mb-2 leading-[1.3]">{title}</h3>
                <p className="text-[#1A1A1A]/60 text-sm mt-2">{body}</p>
              </div>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full mt-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3  -  PLAN YOUR VISIT PROSE */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Uw Bezoek aan Chopras Indian Restaurant Plannen'
              : 'Plan Your Visit to Chopras Indian Restaurant Den Haag'}
          </h2>
          {isNl ? (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant bevindt zich op Leyweg 986, 2545 GW Den Haag, in de wijk Leyenburg. Betaald parkeren is beschikbaar in de omgeving van Leyweg. Tramlijn 2 en meerdere buslijnen stoppen bij de halte Leyweg op loopafstand van de ingang. Open van dinsdag tot en met zondag van 16:30 tot 22:30, maandag gesloten.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Vanuit Den Haag Centraal duurt de tramrit naar Leyweg ongeveer 15 minuten. Vanuit{' '}
                <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Rijswijk
                </Link>{' '}
                is het restaurant vijf minuten rijden. Gasten die komen uit{' '}
                <Link href={`${base}/indian-restaurant-delft`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Delft
                </Link>{' '}
                bereiken Chopras Indian Restaurant via de A13 in circa 15 minuten. Tramlijn 2 stopt bij halte Leyweg, op loopafstand van het restaurant.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                Voor groepen van vier of meer wordt een reservering aanbevolen, met name op vrijdag- en zaterdagavond. Gebruik het reserveringsformulier bovenaan deze pagina of bel +31 6 30645930. Voor{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indiaas catering in Den Haag
                </Link>{' '}
                of om de{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  feestzaal te huren in Den Haag
                </Link>
                , neemt u contact op via het formulier hieronder.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                Chopras Indian Restaurant is at Leyweg 986, 2545 GW Den Haag, in the Leyenburg neighbourhood. Paid parking is available in the Leyweg area. Tram line 2 and several bus routes stop at the Leyweg stop, a short walk from the restaurant entrance. Open Tuesday to Sunday from 16:30 to 22:30, closed on Monday.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed mb-4">
                From Den Haag Centraal the tram journey to Leyweg takes around 15 minutes. From{' '}
                <Link href={`${base}/indian-restaurant-rijswijk`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Rijswijk
                </Link>{' '}
                the restaurant is five minutes by car. Guests coming from{' '}
                <Link href={`${base}/indian-restaurant-delft`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Delft
                </Link>{' '}
                reach Chopras Indian Restaurant via the A13 in around 15 minutes. Tram line 2 stops at Leyweg, a short walk from the entrance.
              </p>
              <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                For groups of four or more, a reservation is recommended, particularly on Friday and Saturday evenings. Use the reservation form at the top of this page or call +31 6 30645930. For{' '}
                <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  Indian catering in Den Haag
                </Link>{' '}
                or to{' '}
                <Link href={`${base}/feestzaal-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                  hire the event space in Den Haag
                </Link>
                , use the contact form below.
              </p>
            </>
          )}
        </div>
      </section>

      {/* SECTION 4  -  CONTACT FORM */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • SEND A MESSAGE •
            </span>
          </div>
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {tr.contact.formH2}
          </h2>
        </div>
        <ContactForm />
      </section>

      {/* SECTION 5  -  GEO BLOCK */}
      <section className="bg-[#FFFAF5] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Hoe neem ik contact op of reserveer ik bij Chopras Indian Restaurant Den Haag?'
              : 'How do I contact or reserve at Chopras Indian Restaurant Den Haag?'}
          </h2>
          {isNl ? (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant is bereikbaar via{' '}
              <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                +31 6 30645930
              </Link>{' '}
              of <EmailLink />. Het restaurant is gevestigd op Leyweg 986, 2545 GW Den Haag. Reserveringen zijn mogelijk via het formulier bovenaan deze pagina. Open van dinsdag tot en met zondag van 16:30 tot 22:30. Betaald parkeren beschikbaar in de omgeving van Leyweg. Beoordeeld met 4,9 sterren van meer dan 800 gasten op Google. Voor{' '}
              <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indiaas catering of privé-evenementen in Den Haag
              </Link>
              , gebruik het contactformulier hierboven.
            </p>
          ) : (
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              Chopras Indian Restaurant is reachable at{' '}
              <Link href={`tel:${RESTAURANT.contact.phone}`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                +31 6 30645930
              </Link>{' '}
              or <EmailLink />. The restaurant is at Leyweg 986, 2545 GW Den Haag. Reservations can be made using the form at the top of this page. Open Tuesday to Sunday from 16:30 to 22:30. Paid parking is available in the Leyweg area. Rated 4.9 stars from over 800 verified guests on Google. For{' '}
              <Link href={`${base}/catering`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                Indian catering or private events in Den Haag
              </Link>
              , use the contact form above.
            </p>
          )}
        </div>
      </section>

      {/* SECTION 6  -  FAQ */}
      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl
              ? 'Veelgestelde vragen over Chopras Indian Restaurant Den Haag'
              : 'Frequently asked questions about Chopras Indian Restaurant Den Haag'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar locale={locale} />
    </>
  )
}
