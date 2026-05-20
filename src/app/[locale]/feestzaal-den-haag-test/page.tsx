import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ShieldCheck, Clock, Award, Star } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema, getCateringServiceSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'
import CateringForm from '@/components/catering/CateringForm'
import EventSelector from '@/components/catering/EventSelector'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant (Test Page)',
    nl: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant (Test Page)',
  }
  const descriptions = {
    en: 'Book our private event hall for hire in Den Haag at Chopras. Perfect for weddings, birthdays, baby showers, and corporate dinners. Custom Halal Indian catering included.',
    nl: 'Huur onze privé feestzaal in Den Haag bij Chopras. Perfect voor bruiloften, verjaardagen, babyshowers en bedrijfsfeesten. Inclusief op maat gemaakt Halal Indiaas catering.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'feestzaal-den-haag-test'),
      languages: {
        en: getLocalizedUrl('en', 'feestzaal-den-haag-test'),
        nl: getLocalizedUrl('nl', 'feestzaal-den-haag-test'),
        'x-default': getLocalizedUrl('en', 'feestzaal-den-haag-test'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'feestzaal-den-haag-test'),
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

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Can I hire a party hall at Chopras Indian Restaurant in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers a private event hall for hire at Leyweg 986 in Den Haag, accommodating 25 to 80 guests. The hall is available for birthdays, weddings, nikah receptions, corporate events, Diwali dinners, and private parties. Full authentic Indian catering from the Chopras kitchen is included. Contact us for a free no-obligation quote.',
  },
  {
    question: 'Is catering included when hiring the feestzaal?',
    answer: 'Yes. Full authentic Indian catering from the Chopras kitchen is included with your feestzaal hire. The menu is customized to your occasion, with buffet or plated dinner service available. Everything is prepared fresh on the day of your event by the same team that earns 4.9 stars on Google from 800+ reviews. No outside caterer and no reheated trays.',
  },
  {
    question: 'What occasions is the feestzaal suitable for?',
    answer: 'The private hall at Chopras Indian Restaurant Den Haag is suitable for birthday parties, weddings, nikah receptions, corporate events, team dinners, staff parties, Diwali celebrations, Eid gatherings, baby showers, and drinks receptions. Every occasion gets a fully customized menu built in consultation with the Chopras team.',
  },
  {
    question: 'How many guests does the event hall at Chopras accommodate?',
    answer: 'The private event hall at Chopras Indian Restaurant Den Haag accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions. Contact us with your guest count and we confirm availability and the best room setup for your event.',
  },
  {
    question: 'How do I book the feestzaal at Chopras Indian Restaurant Den Haag?',
    answer: 'Contact us via the contact page or call +31 6 30645930. Tell us your date, guest count, and occasion type. We discuss menu options and send a free quote within 24 hours. For groups of 25 to 40 guests, contact us at least 2 to 3 weeks ahead. For larger events of 50 to 80 guests, plan 6 to 8 weeks in advance.',
  },
  {
    question: 'Is the food at Chopras Indian Restaurant fully halal certified?',
    answer: 'Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. There is no non-halal meat anywhere on the premises, which means no cross-contamination risk. Muslim families planning a nikah reception, Eid celebration, or any halal event can book with complete confidence.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Kan ik een feestzaal huren bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt een privé feestzaal te huur op Leyweg 986 in Den Haag voor 25 tot 80 gasten. De zaal is beschikbaar voor verjaardagen, bruiloften, nikah-recepties, bedrijfsfeesten, Diwali-diners en privéfeesten. Authentiek Indiaas catering vanuit de Chopras-keuken is inbegrepen. Neem contact op voor een vrijblijvende offerte.',
  },
  {
    question: 'Is er catering inbegrepen bij het huren van de feestzaal?',
    answer: 'Ja. Volledig authentiek Indiaas catering uit de Chopras-keuken is inbegrepen bij uw feestzaal huur. Het menu wordt op maat gemaakt voor uw gelegenheid, met buffet- of bordbediening naar keuze. Alles wordt op de dag zelf vers bereid door hetzelfde team dat 4,9 sterren scoort op Google van 800+ beoordelaars. Geen externe cateraar en geen opgewarmde bakken.',
  },
  {
    question: 'Voor welke gelegenheden is de feestzaal geschikt?',
    answer: 'De privé feestzaal van Chopras Indian Restaurant Den Haag is geschikt voor verjaardagsfeesten, bruiloften, nikah-recepties, bedrijfsfeesten, teamdiners, personeelsfeesten, Diwali-vieringen, Eid-bijeenkomsten, babyshowers en borrels. Elke gelegenheid krijgt een volledig op maat gemaakt menu, samengesteld in overleg met het Chopras-team.',
  },
  {
    question: 'Hoeveel personen passen er in de feestzaal van Chopras Indian Restaurant?',
    answer: 'De privé feestzaal van Chopras Indian Restaurant Den Haag heeft een capaciteit van 25 tot 80 gasten. Dit dekt zowel intieme familiebijeenkomsten als grote bruiloften of bedrijfsrecepties. Neem contact op met uw aantal gasten en wij bevestigen de beschikbaarheid en de beste zaalopstelling voor uw evenement.',
  },
  {
    question: 'Hoe boek ik een feestzaal bij Chopras Indian Restaurant Den Haag?',
    answer: 'Neem contact op via de contactpagina of bel +31 6 30645930. Vertel ons uw datum, aantal gasten en type gelegenheid. Wij bespreken menu-opties en sturen u binnen 24 uur een vrijblijvende offerte. Voor groepen van 25 to 40 gasten neemt u minimaal 2 tot 3 weken van tevoren contact op. Voor grotere evenementen van 50 tot 80 gasten boekt u 6 tot 8 weken vooruit.',
  },
  {
    question: 'Is het eten bij Chopras Indian Restaurant volledig halal gecertificeerd?',
    answer: 'Ja. Elk gerecht bij Chopras Indian Restaurant is volledig halal gecertificeerd. Elke vleesleverancier heeft een halal-certificering. Er is nergens in de keuken niet-halal vlees aanwezig, wat betekent dat er geen risico op kruiscontaminatie bestaat. Moslimfamilies die een nikah-receptie, Eid-viering of ander halal evenement plannen kunnen met volledig vertrouwen boeken.',
  },
]

export default function FeestzaalDenHaagTestPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  return (
    <>
      <JsonLd data={getCateringServiceSchema(locale)} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Feestzaal Huren (Test)' : 'Event Venue (Test)', item: getLocalizedUrl(locale, 'feestzaal-den-haag-test') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* HERO */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center bg-[#1B2B5E] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/catering/party-decor.png"
            alt="Feestzaal Den Haag at Chopras Indian Restaurant"
            fill
            className="object-cover scale-105 animate-[pulse_25s_ease-in-out_infinite_alternate]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2B5E]/70 via-[#1B2B5E]/50 to-[#1B2B5E]/90" />
        
        {/* Luxury Gold Border Details */}
        <div className="absolute inset-6 md:inset-10 border border-[#C7A348]/30 rounded-[2rem] pointer-events-none hidden md:block">
           <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C7A348]/60 rounded-tl-[1.8rem]" />
           <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C7A348]/60 rounded-tr-[1.8rem]" />
           <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C7A348]/60 rounded-bl-[1.8rem]" />
           <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C7A348]/60 rounded-br-[1.8rem]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24 mt-16">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border border-[#C7A348]/40 bg-[#1B2B5E]/50 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(199,163,72,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
            <span className="text-[#C7A348] text-xs font-bold uppercase tracking-[0.25em]">
              {isNl ? 'PRIVÉ FEESTZAAL & EVENT CATERING' : 'PRIVATE EVENT VENUE & CATERING'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight leading-[1.05]">
            {isNl
              ? 'Luxe Feestzaal Huren in Den Haag'
              : 'Luxury Event Venue for Hire in Den Haag'}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10">
            {isNl
              ? 'Een schitterende privézaal voor 25 tot 80 gasten. Gelegen aan de Leyweg 986, inclusief bekroonde, 100% Halal Indiase catering rechtstreeks uit de keuken van Chopras.'
              : 'A stunning private event space accommodating 25 to 80 guests. Located at Leyweg 986, featuring award-winning, 100% Halal Indian catering directly from the Chopras kitchen.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#booking-section"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-[#C7A348] bg-[#C7A348] px-8 py-4.5 text-[#1B2B5E] text-sm font-semibold uppercase tracking-widest transition-all duration-500 hover:bg-white hover:border-white overflow-hidden shadow-lg shadow-[#C7A348]/20"
            >
              <span className="relative z-10">{isNl ? 'Direct Boeken / Offerte' : 'Book Venue / Get Quote'}</span>
            </Link>
            <Link
              href="#events-section"
              className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-transparent px-8 py-4.5 text-white text-sm font-semibold uppercase tracking-widest transition-all duration-500 hover:border-[#C7A348] hover:bg-white/5 overflow-hidden"
            >
              <span className="relative z-10">{isNl ? 'Gelegenheden' : 'Explore Events'}</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-[#C7A348] text-[10px] tracking-[0.3em] uppercase opacity-80">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C7A348] to-transparent opacity-80" />
        </div>
      </section>

      {/* INTRO & AMBIANCE */}
      <section className="relative bg-[#F7F8FC] py-24 md:py-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute -left-64 top-0 w-[800px] h-[800px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-64 bottom-0 w-[800px] h-[800px] bg-[#1B2B5E]/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Left Column: Image with luxury frame */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white">
                 <Image 
                   src="/images/catering/party-hall-ambiance.png" 
                   alt="Redesigned warm event space ambiance at Chopras" 
                   fill 
                   className="object-cover" 
                   sizes="(max-w-768px) 100vw, 50vw"
                 />
                 <div className="absolute inset-0 border-2 border-[#C7A348]/30 rounded-2xl m-3 pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-3 rounded-2xl shadow-xl hidden md:block">
                 <div className="w-full h-full border border-[#D4AF37]/20 rounded-xl bg-[#1B2B5E] text-center p-6 flex flex-col justify-center items-center">
                    <span className="text-4xl font-vibes text-[#C7A348]">25 - 80</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/80 mt-2 font-bold">{isNl ? 'Gasten Capaciteit' : 'Guest Capacity'}</span>
                 </div>
              </div>
            </div>
            
            {/* Right Column: Text Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">{isNl ? 'De Perfecte Match' : 'The Perfect Match'}</span>
              </div>
              <h2 className="font-vibes text-5xl md:text-6xl lg:text-7xl text-[#C7A348] mb-10 leading-[1.1]">
                {isNl
                  ? 'Zaal en Catering Naadloos Onder Eén Dak'
                  : 'Venue and Premium Catering Under One Roof'}
              </h2>
              
              <div className="space-y-6 font-body text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed border-l-2 border-[#D4AF37]/30 pl-6">
                {isNl ? (
                  <>
                  <p>
                    De meeste mensen die een feestzaal zoeken in Den Haag lopen tegen hetzelfde probleem op. Ze vinden een geschikte ruimte, maar moeten vervolgens apart op zoek naar een goede cateraar. Twee contracten, twee planningen en een hoop logistieke stress. Bij{' '}
                    <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                    op Leyweg 986 lossen we dat volledig voor u op. Onze feestzaal en keuken werken als één naadloze operatie.
                  </p>
                  <p>
                    De privé feestzaal biedt ruimte voor <strong>25 tot 80 gasten</strong>. Van een sfeervolle, intieme{' '}
                    <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bruiloft of nikah</Link>{' '}
                    tot een grootschalig bedrijfsevenement of verjaardagsfeest. Het eten wordt vers bereid door exact hetzelfde team dat 4,9 sterren op Google scoort van meer dan 800 geverifieerde beoordelingen.
                  </p>
                  <p>
                    U heeft één aanspreekpunt, één contract en de absolute zekerheid dat zowel de service, de zaal als het eten van het hoogste niveau zijn.
                  </p>
                  </>
                ) : (
                  <>
                  <p>
                    Most people searching for a feestzaal in Den Haag face the same hurdle: finding a room they love, only to start a second search for a reliable caterer. This means managing multiple contracts, schedules, and unnecessary stress. At{' '}
                    <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                    on Leyweg 986, we combine both. Our event hall and kitchen function as a single, coordinated operation.
                  </p>
                  <p>
                    Our private space accommodates <strong>25 to 80 guests</strong>. Whether it is an intimate{' '}
                    <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">wedding reception or nikah</Link>
                    , a lively family reunion, or a corporate dinner, the catering comes from the same kitchen rated 4.9 stars on Google from over 800 verified reviewers.
                  </p>
                  <p>
                    With a single point of contact and unified logistics, you can focus on enjoying your guests while we handle the setup, styling, and dinner services.
                  </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14 EVENTS SELECTOR SECTION */}
      <section id="events-section" className="py-24 px-6 md:px-16 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C7A348]/30 bg-[#F7F8FC] mb-6">
              <span className="text-[#C7A348] text-[10px] font-bold uppercase tracking-widest">
                {isNl ? 'ONZE MOGELIJKHEDEN' : 'WHAT WE HOST'}
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B2B5E] mb-6 leading-tight">
              {isNl ? '14 Exclusieve Gelegenheden' : '14 Premium Event Services'}
            </h2>
            <p className="font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
              {isNl
                ? 'Van intieme familievieringen en romantische verlovingen tot zakelijke meetings en yoga-meditatie retraites. Ontdek hoe wij onze luxe zaal op maat inrichten.'
                : 'From intimate family milestones and romantic proposals to corporate presentations and yoga sessions. See how we style our premium space for you.'}
            </p>
            <div className="w-16 h-px bg-[#C7A348] mx-auto mt-8" />
          </div>

          {/* Interactive Selector Component */}
          <EventSelector locale={locale} />
        </div>
      </section>

      {/* MENUS & CATERING CUSTOMISATION */}
      <section className="bg-[#1B2B5E] py-24 md:py-32 px-6 md:px-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -left-48 bottom-0 w-[600px] h-[600px] bg-[#C7A348]/[0.05] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">{isNl ? 'Op Maat Gemaakt' : 'Tailored For You'}</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                {isNl
                  ? 'Indiase Menus op Maat voor Elke Gelegenheid'
                  : 'Tailored Indian Menus for Every Occasion'}
              </h2>
              
              <p className="font-body text-white/80 text-lg leading-relaxed mb-10">
                {isNl
                  ? 'Onze menu\'s zijn volledig aanpasbaar aan uw smaak en budget. Van knapperige live pani puri stands en rokerige tandoori grills tot traditionele curry\'s en desserts. We zorgen dat uw gasten smullen, inclusief alle starters en zoetigheden.'
                  : 'Our custom event menus are built to fit your tastes and budget. From live crispy pani puri stalls and smoky clay-oven tandoori grills to traditional curries and desserts. Starters and desserts are fully included in every plan.'}
              </p>

              {/* Dietary Requirements Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: isNl ? 'Vegetarisch & Vegan' : 'Vegetarian & Vegan',
                    desc: isNl ? 'Ruim 40 rijke traditionele plant-based gerechten.' : 'Over 40 flavorful traditional plant-based dishes.'
                  },
                  {
                    title: isNl ? '100% Halal Gecertificeerd' : '100% Halal Certified',
                    desc: isNl ? 'Volledig halal vlees van gecertificeerde leveranciers.' : 'Entire kitchen and suppliers are fully halal certified.'
                  },
                  {
                    title: isNl ? 'Glutenvrij & Allergenen' : 'Gluten-Free & Allergies',
                    desc: isNl ? 'Zorgvuldige aanpassingen voor alle dieetwensen.' : 'Careful accommodations for all dietary needs.'
                  },
                  {
                    title: isNl ? 'Non-Vegetarische Specialiteiten' : 'Non-Vegetarian Specialties',
                    desc: isNl ? 'Boterzachte tandoori kip, biryani\'s en curries.' : 'Butter-tender tandoori chicken, biryanis, and curries.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C7A348]/40 transition-colors duration-300">
                    <CheckCircle className="text-[#C7A348] w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white text-base mb-1">{item.title}</h4>
                      <p className="text-white/60 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl border border-white/10">
                <Image 
                  src="/images/catering/wedding-celebrations---1.png" 
                  alt="Luxurious Indian wedding catering setup at Chopras" 
                  fill 
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#1B2B5E]/90 border border-[#C7A348]/30 backdrop-blur-sm">
                  <h4 className="font-heading text-lg text-[#C7A348] font-semibold mb-2">
                    {isNl ? 'Versbereide Gastvrijheid' : 'Freshly Prepared Hospitality'}
                  </h4>
                  <p className="text-white/80 text-xs leading-relaxed font-light">
                    {isNl
                      ? 'Geen opgewarmde buffetbakken of externe catering. Alles wordt op de dag van uw evenement vers gekookt met specerijen rechtstreeks geïmporteerd uit India.'
                      : 'No reheated catering trays or outsourced food. Everything is prepared fresh on the day of your event with spices imported directly from India.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED FEATURES / WHY CHOPRAS */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gray-200 bg-[#F7F8FC] mb-6">
              <span className="text-[#1B2B5E] text-[10px] font-bold uppercase tracking-widest">
                {isNl ? 'DE CHOPRAS STANDAARD' : 'THE CHOPRAS ADVANTAGE'}
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1B2B5E] mb-6 leading-tight">
              {isNl ? 'Waarom Kiest U Voor Onze Feestzaal?' : 'Why Choose Our Event Venue?'}
            </h2>
            <div className="w-16 h-px bg-[#C7A348] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="text-[#C7A348] w-6 h-6" />,
                title: isNl ? '4.9 Google Beoordeling' : '4.9 Star Google Rating',
                desc: isNl 
                  ? 'Gesteund door meer dan 800+ tevreden gasten. Dezelfde topkwaliteit voor uw privéfeest.'
                  : 'Supported by over 800+ positive reviews. The same top-tier dining experience for your event.'
              },
              {
                icon: <Award className="text-[#C7A348] w-6 h-6" />,
                title: isNl ? 'Inclusief Live Stations' : 'Live Station Options',
                desc: isNl 
                  ? 'Geef uw evenement cachet met een live pani puri stand, streetfood bar of tandoori tandoor.'
                  : 'Elevate your event with interactive live pani puri stands, chaat tables, or fresh clay-oven tandoor.'
              },
              {
                icon: <ShieldCheck className="text-[#C7A348] w-6 h-6" />,
                title: isNl ? '100% Halal Keuken' : '100% Halal-Certified',
                desc: isNl 
                  ? 'Volledige scheiding en gecertificeerde leveranciers. Geen risico op kruiscontaminatie.'
                  : 'Zero cross-contamination risk. Safe, verified Halal meat sourcing for all Muslim receptions.'
              },
              {
                icon: <Clock className="text-[#C7A348] w-6 h-6" />,
                title: isNl ? '24-Uurs Offerte' : '24-Hour Quote',
                desc: isNl 
                  ? 'Vul ons formulier in en ontvang binnen 24 uur een heldere, vrijblijvende prijsopgave.'
                  : 'Submit your requirements and receive a detailed, transparent proposal within 24 hours.'
              }
            ].map((item, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-[#F7F8FC] border border-gray-100 hover:border-[#C7A348]/20 transition-all duration-300 hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#C7A348]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1B2B5E] mb-3">{item.title}</h3>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBIANCE GALLERY GRID */}
      <section className="py-24 px-6 md:px-16 bg-[#F7F8FC] border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348]">
              {isNl ? 'Sfeer & Decoratie' : 'Atmosphere & Styling'}
            </h2>
            <p className="font-body text-[#1A1A1A]/70 text-sm mt-3 uppercase tracking-widest">
              {isNl ? 'Zaalopstellingen en Sfeerimpressies' : 'Real Event Setups at Leyweg 986'}
            </p>
            <div className="w-24 h-px bg-[#C7A348]/40 mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 h-[320px] md:h-[450px] relative rounded-3xl overflow-hidden group shadow-lg">
              <Image 
                src="/images/catering/proposal---1.png" 
                alt="Proposal dinner setup at Chopras private hall" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/60 to-transparent opacity-60" />
            </div>
            <div className="md:col-span-6 h-[320px] md:h-[450px] relative rounded-3xl overflow-hidden group shadow-lg">
              <Image 
                src="/images/catering/proposal---2.png" 
                alt="Intimate candlelit event dinner styling at Chopras" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/60 to-transparent opacity-60" />
            </div>
            <div className="md:col-span-12 h-[350px] md:h-[550px] relative rounded-3xl overflow-hidden group shadow-xl">
              <Image 
                src="/images/catering/party-hall-ambiance.png" 
                alt="Main party hall overview decorated with floral arches" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/80 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 border border-white/20 backdrop-blur-md bg-white/10 px-8 py-4 rounded-2xl max-w-md">
                 <p className="text-white font-vibes text-4xl">{isNl ? 'Elk detail tot in de puntjes verzorgd' : 'Every single detail made perfect'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM SECTION */}
      <section id="booking-section" className="py-24 md:py-32 px-6 md:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Form Info Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">{isNl ? 'Reserveren' : 'Reservation'}</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1B2B5E] mb-6 leading-tight">
                {isNl ? 'Vraag een Vrijblijvende Offerte Aan' : 'Request Your Free Quote'}
              </h2>
              <p className="font-body text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed mb-8">
                {isNl
                  ? 'Plan uw verjaardag, bruiloft, Kitty Party of bedrijfsdiner eenvoudig via onze boekingsaanvraag. Laat ons uw gewenste datum en gastenaantal weten en we nemen binnen 24 uur contact met u op.'
                  : 'Plan your birthday, wedding, Kitty Party, or corporate dinner through our booking system. Provide your date and guest count, and we will send a custom proposal within 24 hours.'}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[#C7A348] w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#1B2B5E]">{isNl ? 'Gratis & vrijblijvend adviesgesprek' : 'Free consultation and menu walkthrough'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[#C7A348] w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#1B2B5E]">{isNl ? 'Op maat gemaakte menu-indicaties' : 'Customized budget configurations'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[#C7A348] w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#1B2B5E]">{isNl ? 'Capaciteit van 25 tot 80 personen' : 'Accommodates groups from 25 to 80'}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {isNl
                    ? 'Liever direct contact? Bel ons op +31 6 30645930 of stuur een e-mail naar info@chopras.nl'
                    : 'Prefer direct contact? Call us at +31 6 30645930 or email info@chopras.nl'}
                </p>
              </div>
            </div>

            {/* Form Embed Column */}
            <div className="lg:col-span-7 bg-[#F7F8FC] p-8 md:p-12 rounded-[2.5rem] border border-[#C7A348]/20 shadow-2xl relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#C7A348]/50 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#C7A348]/50 rounded-br-2xl pointer-events-none" />
              
              <div className="mb-8 text-center lg:text-left">
                <h3 className="font-heading text-2xl font-bold text-[#1B2B5E] mb-2">{isNl ? 'Evenement Aanvraag' : 'Event Booking Form'}</h3>
                <p className="text-xs text-[#1A1A1A]/60">{isNl ? 'Vul het formulier in om uw datum vast te leggen.' : 'Fill out the form below to secure your event date.'}</p>
              </div>

              {/* LeadConnector Form Component */}
              <CateringForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F8FC] py-24 px-6 md:px-16 border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-vibes text-5xl md:text-6xl text-[#C7A348] mb-6">
               {isNl
                 ? 'Veelgestelde Vragen over de Feestzaal in Den Haag'
                 : 'Frequently Asked Questions About the Event Hall in Den Haag'}
             </h2>
             <div className="w-16 h-px bg-[#1B2B5E]/20 mx-auto" />
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative bg-[#1B2B5E] py-24 px-6 md:px-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/catering/party-decor.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E] via-[#1B2B5E]/90 to-[#1B2B5E]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-vibes text-5xl md:text-6xl text-white mb-6 leading-[1.2]">
            {isNl
              ? 'Wilt u uw feestzaal reserveren bij Chopras?'
              : 'Secure Your Venue Booking Today'}
          </h2>
          <p className="text-white/70 font-body text-base md:text-lg mb-10 max-w-xl mx-auto font-light">
            {isNl
              ? 'Neem direct contact op of vul hierboven het formulier in om uw datum en offerte te bevestigen.'
              : 'Get in touch directly or fill out the booking form above to request availability.'}
          </p>
          <Link
            href="#booking-section"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-[#C7A348] bg-[#C7A348] px-10 py-5 text-[#1B2B5E] text-sm font-semibold uppercase tracking-widest transition-all duration-500 hover:bg-white hover:border-white overflow-hidden shadow-lg shadow-[#C7A348]/20"
          >
            <span className="relative z-10">{isNl ? 'Offerte Aanvragen' : 'Request a Quote'}</span>
          </Link>
        </div>
      </section>
    </>
  )
}
