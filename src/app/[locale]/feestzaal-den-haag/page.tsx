import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle,
  Gift,
  Heart,
  Users,
  Star,
  Briefcase,
  Globe,
  BookOpen,
  Leaf,
  Sparkles,
  Camera,
  Rocket,
  Book,
  GraduationCap,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import BookingInquiryForm from '@/components/sections/BookingInquiryForm'
import HeroEnquiryForm from '@/components/sections/HeroEnquiryForm'
import { getLocalizedUrl } from '@/lib/utils'
import { getBreadcrumbSchema, getFaqPageSchema } from '@/lib/schema'
import { getTranslations, type Locale } from '@/lib/useTranslations'

type Props = { params: { locale: Locale } }

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params
  const titles = {
    en: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant',
    nl: 'Feestzaal Huren Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Feestzaal huren Den Haag bij Chopras Indian Restaurant. Verjaardagen, bruiloften en bedrijfsfeesten. Indiaas catering inbegrepen. Offerte aanvragen.',
    nl: 'Feestzaal huren Den Haag bij Chopras Indian Restaurant. Verjaardagen, bruiloften en bedrijfsfeesten. Indiaas catering inbegrepen. Offerte aanvragen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'feestzaal-den-haag'),
      languages: {
        en: getLocalizedUrl('en', 'feestzaal-den-haag'),
        nl: getLocalizedUrl('nl', 'feestzaal-den-haag'),
        'x-default': getLocalizedUrl('en', 'feestzaal-den-haag'),
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'feestzaal-den-haag'),
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

// ─── EVENT CARDS DATA ────────────────────────────────────────────────────────

interface EventCard {
  icon: React.ElementType
  titleEn: string
  titleNl: string
  descEn: string
  descNl: string
  image: string | null
  altEn: string
  altNl: string
}

const events: EventCard[] = [
  {
    icon: Gift,
    titleEn: 'Birthday Parties & Anniversaries',
    titleNl: 'Verjaardagen & Jubilea',
    descEn: 'Elegant private hall with golden lighting, decorated tables, and guests enjoying authentic Indian food together.',
    descNl: 'Elegante privézaal met gouden verlichting, gedecoreerde tafels en authentiek Indiaas eten.',
    image: '/images/catering/birthday-party.png',
    altEn: 'Birthday party at Chopras Indian Restaurant private hall Den Haag',
    altNl: 'Verjaardagsfeest bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Heart,
    titleEn: 'Proposals, Engagements & Weddings',
    titleNl: 'Aanzoeken, Verlovingen & Bruiloften',
    descEn: 'Romantic candlelit setup with roses, floral arches, and an intimate Indian luxury ambiance.',
    descNl: 'Romantische kaarslichtopstelling met rozen, bloemenboegen en een intieme luxe sfeer.',
    image: '/images/catering/proposal---1.png',
    altEn: 'Proposal and wedding setup at Chopras Indian Restaurant Den Haag',
    altNl: 'Aanzoek en bruiloft opstelling bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Users,
    titleEn: 'Baby Showers, Family Milestones & Reunions',
    titleNl: 'Babyshowers, Familiemijlpalen & Reunies',
    descEn: 'Warm family gathering with pastel decor, floral table styling, and multi-generational Indian buffet.',
    descNl: 'Warme familiebijeenkomst met pastelkleuren, bloemtafelstyling en meergenerationeel Indiaas buffet.',
    image: '/images/catering/baby-shower-pic-1.png',
    altEn: 'Baby shower and family gathering at Chopras Indian Restaurant Den Haag',
    altNl: 'Babyshower en familiebijeenkomst bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Star,
    titleEn: 'Kitty Parties',
    titleNl: 'Kitty Parties',
    descEn: 'Stylish ladies gathering with chaat platters, mocktails, laughter, and a warm mix of cultures.',
    descNl: 'Stijlvolle damesbijeenkomst met chaat platters, mocktails en een warme cultuurmix.',
    image: null,
    altEn: 'Kitty party at Chopras Indian Restaurant Den Haag',
    altNl: 'Kitty party bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Briefcase,
    titleEn: 'Corporate Dinners & Meetings',
    titleNl: 'Bedrijfsdiners & Vergaderingen',
    descEn: 'Professional private dining space with elegant seating, team discussions, and premium Indian catering.',
    descNl: 'Professionele privézaal met elegante stoelen, teamdiscussies en premium Indiaas catering.',
    image: '/images/catering/corporate-dinners-at-chopras.png',
    altEn: 'Corporate dinner at Chopras Indian Restaurant Den Haag private hall',
    altNl: 'Bedrijfsdiner bij Chopras Indian Restaurant Den Haag privézaal',
  },
  {
    icon: Globe,
    titleEn: 'Networking Events & Meet-ups',
    titleNl: 'Netwerkevenementen & Meet-ups',
    descEn: 'Professionals connecting over appetizers in a warm ambient setting with sophisticated event decor.',
    descNl: 'Professionals die contact maken bij hapjes in een warme sfeer met verfijnd evenementdecor.',
    image: '/images/catering/team-dinners.png',
    altEn: 'Networking event at Chopras Indian Restaurant Den Haag',
    altNl: 'Netwerkevenement bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: BookOpen,
    titleEn: 'Workshops, Team Building & Brainstorming',
    titleNl: 'Workshops, Teambuilding & Brainstorming',
    descEn: 'Creative collaborative setup with presentation screen, discussion tables, and interactive team activities.',
    descNl: 'Creatieve samenwerkingsopstelling met presentatiescherm, discussietafels en interactieve activiteiten.',
    image: null,
    altEn: 'Workshop and team building at Chopras Indian Restaurant Den Haag',
    altNl: 'Workshop en teambuilding bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Leaf,
    titleEn: 'Yoga & Meditation Sessions',
    titleNl: 'Yoga- & Meditatiesessies',
    descEn: 'Peaceful indoor setup with yoga mats, candles, calming earthy decor, and serene wellness atmosphere.',
    descNl: 'Rustige binnenopstelling met yogamatten, kaarsen, aardse decoratie en serene wellnesssfeer.',
    image: null,
    altEn: 'Yoga and meditation session at Chopras Indian Restaurant Den Haag',
    altNl: 'Yoga- en meditatiesessie bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Sparkles,
    titleEn: 'Festive Celebrations',
    titleNl: 'Feestelijke Vieringen',
    descEn: 'Vibrant festive decor for Diwali, Eid, Holi, Easter, and Christmas with fairy lights and colorful food spreads.',
    descNl: 'Levendig feestdecor voor Diwali, Eid, Holi, Pasen en Kerstmis met lichtjes en kleurrijke spreads.',
    image: null,
    altEn: 'Festive celebration Diwali Eid at Chopras Indian Restaurant Den Haag',
    altNl: 'Feestelijke viering Diwali Eid bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Camera,
    titleEn: 'Photo & Video Shoots',
    titleNl: 'Foto- & Videoshoots',
    descEn: 'Cinematic restaurant ambiance with professional cameras, plated dishes, and mood lighting.',
    descNl: 'Cinematische restaurantsfeer met professionele cameras, opgediste gerechten en sfeerlicht.',
    image: null,
    altEn: 'Photo and video shoot at Chopras Indian Restaurant Den Haag',
    altNl: 'Foto- en videoshoot bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Rocket,
    titleEn: 'Product Launches',
    titleNl: 'Productlanceringen',
    descEn: 'Trendy launch event with branded backdrop, spotlight presentation, and media photography for startups.',
    descNl: 'Trendy lanceringsevenement met merkachtergrond, spotlightpresentatie en mediafotografie.',
    image: null,
    altEn: 'Product launch event at Chopras Indian Restaurant Den Haag',
    altNl: 'Productlancering evenement bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Book,
    titleEn: 'Book Launches',
    titleNl: 'Boeklanceringen',
    descEn: 'Cozy sophisticated event with author book signing, intimate audience seating, and warm lighting.',
    descNl: 'Gezellig en verfijnd evenement met auteurssignering, intiem publiek, warm licht en bloemenaccenten.',
    image: null,
    altEn: 'Book launch event at Chopras Indian Restaurant Den Haag',
    altNl: 'Boeklancering evenement bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: GraduationCap,
    titleEn: 'Student Events & Expat Gatherings',
    titleNl: 'Studentenevenementen & Expat-bijeenkomsten',
    descEn: 'Young crowd enjoying Indian food, casual networking, cultural exchange, and a lively social atmosphere.',
    descNl: 'Jonge groep die geniet van Indiaas eten, casual netwerken en een levendige sociale sfeer.',
    image: null,
    altEn: 'Student event and expat gathering at Chopras Indian Restaurant Den Haag',
    altNl: 'Studentenevenement en expat-bijeenkomst bij Chopras Indian Restaurant Den Haag',
  },
  {
    icon: Heart,
    titleEn: 'Charity Dinners & Fundraisers',
    titleNl: 'Charitatieve Diners & Fondsenwerving',
    descEn: 'Elegant gala-style dinner with speeches, donation moments, candlelit tables, and refined hospitality.',
    descNl: 'Elegant galadiner met toespraken, donatiemomenten, kaarslicht tafels en verfijnde gastvrijheid.',
    image: null,
    altEn: 'Charity dinner and fundraiser at Chopras Indian Restaurant Den Haag',
    altNl: 'Charitatief diner en fondsenwerving bij Chopras Indian Restaurant Den Haag',
  },
]

// ─── DIETARY OPTIONS ─────────────────────────────────────────────────────────

const menuDietary = {
  en: [
    { label: 'Vegetarian & Vegan Catering', detail: 'Full plant-based menu including soya chaap, dal makhani, paneer dishes, and more.' },
    { label: 'Halal-Certified Catering', detail: 'Every meat supplier holds halal certification. No cross-contamination risk anywhere on premises.' },
    { label: 'Gluten-Free Options', detail: 'Rice-based mains, lentil dishes, and tandoori grills available without wheat ingredients.' },
    { label: 'Non-Vegetarian Indian Specialities', detail: 'Butter chicken, mutton rogan josh, seekh kebab, biryani, and tandoori platters.' },
  ],
  nl: [
    { label: 'Vegetarische & Veganistische Catering', detail: 'Volledig plantaardig menu inclusief soya chaap, dal makhani, paneergerechten en meer.' },
    { label: 'Halal-Gecertificeerde Catering', detail: 'Elke vleesleverancier heeft halal-certificering. Geen kruiscontaminatierisico aanwezig.' },
    { label: 'Glutenvrije Opties', detail: 'Rijstgerechten, linzenschotels en tandoori gerechten beschikbaar zonder tarwe-ingredienten.' },
    { label: 'Niet-Vegetarische Indiaase Specialiteiten', detail: 'Butter chicken, mutton rogan josh, seekh kebab, biryani en tandoori platters.' },
  ],
}

// ─── WHAT'S INCLUDED ─────────────────────────────────────────────────────────

const whatsIncluded = {
  en: [
    'Fully private hall for 25 to 80 guests',
    'Fresh Indian starters (chaat, samosas, seekh kebab, pani puri)',
    'Full main course from the restaurant menu',
    'Fresh Indian desserts (gulab jamun, rasmalai, kheer)',
    'Custom seating arrangement of your choice',
    'Professional service staff throughout the event',
    '100% halal certified food',
    'No hidden cleaning or setup fees',
  ],
  nl: [
    'Volledig privé feestzaal voor 25 tot 80 gasten',
    'Verse Indiaase starters (chaat, samosas, seekh kebab, pani puri)',
    'Volledig hoofdmenu van het restaurantmenu',
    'Verse Indiaase desserts (gulab jamun, rasmalai, kheer)',
    'Tafelschikking naar uw wens',
    'Professionele bediening gedurende het evenement',
    '100% halal gecertificeerd eten',
    'Geen verborgen schoonmaak- of opstelkosten',
  ],
}

// ─── BENEFITS ────────────────────────────────────────────────────────────────

const benefits = {
  en: [
    {
      title: 'Restaurant Quality Food',
      desc: 'The same chefs, recipes, and spices as the restaurant. Freshly ground spices sourced directly from India. 4.9 stars on Google from 800+ reviewers. No separate event kitchen.',
    },
    {
      title: 'Everything Under One Roof',
      desc: 'Venue, catering, and service in one booking. No separate caterer. No double contracts. One point of contact for the entire event.',
    },
    {
      title: 'Fully Halal Certified',
      desc: 'Every dish, every supplier, every preparation is halal certified. No exceptions. No cross-contamination risk. Book with complete confidence.',
    },
    {
      title: '25 to 80 Guests',
      desc: 'The private hall adapts to your group size. Intimate family dinner or large reception - the space works for your occasion without mandatory fixed packages.',
    },
  ],
  nl: [
    {
      title: 'Restaurantkwaliteit Eten',
      desc: 'Dezelfde chefs, recepten en specerijen als in het restaurant. Vers gemalen specerijen rechtstreeks uit India. 4,9 sterren op Google van 800+ beoordelaars. Geen aparte evenementenkeuken.',
    },
    {
      title: 'Alles Onder Een Dak',
      desc: 'Ruimte, catering en service in een boeking. Geen aparte cateraar. Geen dubbele contracten. Een aanspreekpunt voor het hele evenement.',
    },
    {
      title: 'Volledig Halal Gecertificeerd',
      desc: 'Elk gerecht, elke leverancier, elke bereiding is halal gecertificeerd. Geen uitzonderingen. Geen kruiscontaminatierisico. Boek met volledige zekerheid.',
    },
    {
      title: '25 tot 80 Gasten',
      desc: 'De privézaal past zich aan uw groepsgrootte aan. Intiem familiediner of grote receptie - de ruimte werkt voor uw gelegenheid zonder verplichte vaste pakketten.',
    },
  ],
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqsEn: Array<{ question: string; answer: string }> = [
  {
    question: 'Can I hire a party hall at Chopras Indian Restaurant in Den Haag?',
    answer: 'Yes. Chopras Indian Restaurant offers a private event hall for hire at Leyweg 986 in Den Haag, accommodating 25 to 80 guests. The hall is available for birthdays, weddings, nikah receptions, kitty parties, corporate events, Diwali dinners, yoga sessions, product launches, and all private events. Full authentic Indian catering with starters, mains, and desserts is included. Contact us for a free no-obligation quote.',
  },
  {
    question: 'Are starters and desserts included in the catering?',
    answer: 'Yes. Every booking includes fresh Indian starters such as chaat, samosas, seekh kebab, and pani puri, a full main course selection from the restaurant menu, and fresh Indian desserts including gulab jamun, rasmalai, and kheer. The complete menu is built in consultation with our team to match your occasion and guest preferences.',
  },
  {
    question: 'What types of events can I host at Chopras feestzaal?',
    answer: 'The private hall at Chopras Indian Restaurant Den Haag is suitable for 14 types of events: birthday parties, anniversaries, proposals, engagements, weddings, nikah receptions, baby showers, family reunions, kitty parties, corporate dinners, networking events, workshops, yoga and meditation sessions, festive celebrations (Diwali, Eid, Holi, Easter, Christmas), photo and video shoots, product launches, book launches, student and expat gatherings, and charity dinners.',
  },
  {
    question: 'How many guests does the event hall at Chopras accommodate?',
    answer: 'The private event hall at Chopras Indian Restaurant Den Haag accommodates between 25 and 80 guests. This covers intimate family dinners and large wedding or corporate receptions. Contact us with your guest count and we confirm availability and the best room setup for your event.',
  },
  {
    question: 'How do I book the feestzaal at Chopras Indian Restaurant Den Haag?',
    answer: 'Fill in the booking enquiry form on this page or call +31 6 30645930. Tell us your date, guest count, and occasion type. We discuss menu options and send a free quote within 24 hours. For groups of 25 to 40 guests, contact us at least 2 to 3 weeks ahead. For larger events of 50 to 80 guests, plan 6 to 8 weeks in advance.',
  },
  {
    question: 'Is the food at Chopras Indian Restaurant fully halal certified?',
    answer: 'Yes. Every dish at Chopras Indian Restaurant is fully halal certified. Every meat supplier holds halal certification. There is no non-halal meat anywhere on the premises, which means no cross-contamination risk. Muslim families planning a nikah reception, Eid celebration, or any halal event can book with complete confidence.',
  },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  {
    question: 'Kan ik een feestzaal huren bij Chopras Indian Restaurant in Den Haag?',
    answer: 'Ja. Chopras Indian Restaurant biedt een privé feestzaal te huur op Leyweg 986 in Den Haag voor 25 tot 80 gasten. De zaal is beschikbaar voor verjaardagen, bruiloften, nikah-recepties, kitty parties, bedrijfsfeesten, Diwali-diners, yogasessies, productlanceringen en alle privé-evenementen. Volledig Indiaas catering met starters, hoofdgerechten en desserts is inbegrepen. Neem contact op voor een vrijblijvende offerte.',
  },
  {
    question: 'Zijn starters en desserts inbegrepen in het catering?',
    answer: 'Ja. Elke boeking omvat verse Indiaase starters zoals chaat, samosas, seekh kebab en pani puri, een volledig hoofdmenu van het restaurantmenu, en verse Indiaase desserts zoals gulab jamun, rasmalai en kheer. Het volledige menu wordt samengesteld in overleg met ons team.',
  },
  {
    question: 'Welke soorten evenementen kan ik organiseren bij de Chopras feestzaal?',
    answer: 'De privézaal van Chopras Indian Restaurant Den Haag is geschikt voor 14 typen evenementen: verjaardagsfeesten, jubilea, aanzoeken, verlovingen, bruiloften, nikah-recepties, babyshowers, familiereunies, kitty parties, bedrijfsdiners, netwerkevenementen, workshops, yoga- en meditatiesessies, feestelijke vieringen (Diwali, Eid, Holi, Pasen, Kerstmis), foto- en videoshoots, productlanceringen, boeklanceringen, studenten- en expatbijeenkomsten, en charitatieve diners.',
  },
  {
    question: 'Hoeveel personen passen er in de feestzaal van Chopras Indian Restaurant?',
    answer: 'De privé feestzaal van Chopras Indian Restaurant Den Haag heeft een capaciteit van 25 tot 80 gasten. Neem contact op met uw aantal gasten en wij bevestigen de beschikbaarheid en de beste zaalopstelling voor uw evenement.',
  },
  {
    question: 'Hoe boek ik een feestzaal bij Chopras Indian Restaurant Den Haag?',
    answer: 'Vul het formulier op deze pagina in of bel +31 6 30645930. Vertel ons uw datum, aantal gasten en type gelegenheid. Wij bespreken menu-opties en sturen u binnen 24 uur een vrijblijvende offerte. Voor groepen van 25 tot 40 gasten neemt u minimaal 2 tot 3 weken van tevoren contact op. Voor grotere evenementen van 50 tot 80 gasten boekt u 6 tot 8 weken vooruit.',
  },
  {
    question: 'Is het eten bij Chopras Indian Restaurant volledig halal gecertificeerd?',
    answer: 'Ja. Elk gerecht bij Chopras Indian Restaurant is volledig halal gecertificeerd. Elke vleesleverancier heeft een halal-certificering. Er is nergens niet-halal vlees aanwezig, wat betekent dat er geen risico op kruiscontaminatie bestaat. Moslimfamilies kunnen met volledig vertrouwen boeken.',
  },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function FeestzaalPage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const dietary = isNl ? menuDietary.nl : menuDietary.en
  const included = isNl ? whatsIncluded.nl : whatsIncluded.en
  const bens = isNl ? benefits.nl : benefits.en

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Feestzaal Huren Den Haag' : 'Event Venue Den Haag', item: getLocalizedUrl(locale, 'feestzaal-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      {/* ══ HERO — SPLIT LAYOUT ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#1B2B5E] overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-[#C7A348]/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0F1F4B]/60 blur-[80px] pointer-events-none" />

        {/* Gold corner frame — desktop only */}
        <div className="absolute inset-4 border border-[#C7A348]/12 rounded-3xl pointer-events-none hidden lg:block">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#C7A348]/50 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#C7A348]/50 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#C7A348]/50 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#C7A348]/50 rounded-br-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-8 lg:pt-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-16 items-start">

          {/* ── LEFT: Headline ── */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#C7A348]/35 bg-white/5 backdrop-blur-sm mb-2 lg:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348] animate-pulse" />
              <span className="text-[#C7A348] text-[10px] font-bold uppercase tracking-[0.22em]">
                {isNl ? 'FEESTZAAL HUREN · DEN HAAG' : 'PRIVATE EVENT HALL · DEN HAAG'}
              </span>
            </div>

            {/* Mobile headline — single line, tight */}
            <h1 className="lg:hidden font-heading text-[2.1rem] font-semibold text-white leading-[1.1] mb-3 tracking-tight">
              {isNl
                ? <><span className="text-[#C7A348]">Feestzaal Huren</span> in Den Haag</>
                : <><span className="text-[#C7A348]">Private Hall Hire</span> in Den Haag</>
              }
            </h1>

            {/* Desktop headline — multi-line, expressive */}
            <h1 className="hidden lg:block font-heading text-5xl xl:text-6xl font-semibold text-white leading-[1.08] mb-6 tracking-tight">
              {isNl
                ? <>Uw Feest, Uw Stijl.<br /><span className="text-[#C7A348]">Feestzaal Huren</span><br />in Den Haag</>
                : <>Your Event,<br />Your Style.<br /><span className="text-[#C7A348]">Private Hall Hire</span><br />in Den Haag</>
              }
            </h1>

            {/* Subtitle — hidden on mobile to bring form into view */}
            <p className="hidden lg:block font-body text-white/70 text-lg leading-relaxed max-w-lg mb-8">
              {isNl
                ? 'Privé feestzaal voor 25 tot 80 gasten. Verse Indiaase starters, hoofdgerechten en desserts inbegrepen. 14+ evenementtypes. Alles onder één dak.'
                : 'Private hall for 25 to 80 guests. Fresh Indian starters, mains and desserts included. 14+ event types. Venue and catering under one roof.'}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-3 lg:mb-10">
              {[
                { icon: '★', text: isNl ? '4,9 Google · 800+ reviews' : '4.9 Google · 800+ reviews' },
                { icon: '✓', text: isNl ? 'Volledig halal' : 'Fully halal certified' },
                { icon: '●', text: isNl ? '25 - 80 gasten' : '25 - 80 guests' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
                  <span className="text-[#C7A348] text-xs font-bold">{b.icon}</span>
                  <span className="font-body text-white/75 text-[11px] lg:text-xs font-medium">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Scroll cue — desktop only */}
            <div className="hidden lg:flex items-center gap-3 text-white/35">
              <div className="w-6 h-px bg-white/25" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em]">
                {isNl ? 'Scroll voor meer' : 'Scroll to explore'}
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent ml-1" />
            </div>
          </div>

          {/* ── RIGHT: Enquiry form card ── */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <HeroEnquiryForm locale={locale} />
          </div>
        </div>
      </section>

      {/* ══ TRUST STATS ══════════════════════════════════════════════════ */}
      <section className="bg-[#0F1F4B] py-8 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '25 - 80', label: isNl ? 'Gasten' : 'Guests' },
            { value: '14+', label: isNl ? 'Evenementtypes' : 'Event Types' },
            { value: '4.9★', label: isNl ? 'Google Beoordeling' : 'Google Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-vibes text-3xl md:text-4xl text-[#C7A348]">{s.value}</p>
              <p className="font-body text-white/55 text-[11px] md:text-sm uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ EVENTS WE HOST ═══════════════════════════════════════════════ */}
      <section className="bg-[#F7F8FC] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#C7A348]" />
              <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">
                {isNl ? 'Uw Gelegenheid' : 'Your Occasion'}
              </span>
              <div className="w-10 h-px bg-[#C7A348]" />
            </div>
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl ? 'Evenementen Die Wij Organiseren' : 'Events We Host at Chopras'}
            </h2>
            <p className="font-body text-[#1A1A1A]/60 text-lg max-w-2xl mx-auto leading-relaxed">
              {isNl
                ? 'Onze flexibele feestzaal kan worden aangepast voor alle onderstaande gelegenheden. Geen vaste pakketten.'
                : 'Our flexible event hall can be customised for all occasions below. No fixed packages - every event is tailored.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {events.map((ev) => {
              const Icon = ev.icon
              const title = isNl ? ev.titleNl : ev.titleEn
              const desc = isNl ? ev.descNl : ev.descEn
              const alt = isNl ? ev.altNl : ev.altEn

              return (
                <div
                  key={ev.titleEn}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1B2B5E]/5 to-[#1B2B5E]/10">
                    {ev.image ? (
                      <Image
                        src={ev.image}
                        alt={alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Camera className="w-7 h-7 text-[#C7A348]/30 mb-1.5" />
                        <p className="text-[9px] text-[#1B2B5E]/30 uppercase tracking-widest font-semibold">
                          {isNl ? 'Foto volgt' : 'Photo coming'}
                        </p>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#1B2B5E]/80 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-[#C7A348]" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm font-semibold text-[#1B2B5E] mb-1.5 leading-snug">{title}</h3>
                    <p className="font-body text-[#1A1A1A]/50 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <p className="font-body text-[#1A1A1A]/55 text-base mb-5">
              {isNl
                ? 'Staat uw evenement er niet bij? Neem contact met ons op.'
                : 'Do not see your event type? Contact us and we will make it work.'}
            </p>
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 rounded-full border border-[#C7A348] px-7 py-3 text-[#C7A348] text-sm font-semibold uppercase tracking-widest hover:bg-[#C7A348] hover:text-[#1B2B5E] transition-all duration-300 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              {isNl ? 'Bespreek Uw Evenement' : 'Discuss Your Event'}
            </a>
          </div>
        </div>
      </section>

      {/* ══ INTRO COPY — venue + catering under one roof ═════════════════ */}
      <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute -left-64 top-0 w-[700px] h-[700px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Image column */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <Image
                  src="/images/catering/proposal---2.png"
                  alt={isNl ? 'Feestzaal bij Chopras Indian Restaurant Leyweg 986 Den Haag' : 'Event hall at Chopras Indian Restaurant Leyweg 986 Den Haag'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 border-[6px] border-white/20 rounded-3xl m-4 pointer-events-none" />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white p-2 rounded-2xl shadow-xl hidden md:flex">
                <div className="w-full h-full border border-[#D4AF37]/20 rounded-[0.85rem] bg-[#F7F8FC] flex flex-col items-center justify-center text-center p-4">
                  <span className="text-4xl font-vibes text-[#C7A348]">25-80</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#1B2B5E] mt-2 font-semibold">
                    {isNl ? 'Gasten' : 'Guests'}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">
                  {isNl ? 'De Locatie' : 'The Venue'}
                </span>
              </div>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-10 leading-[1.3]">
                {isNl
                  ? 'Feestzaal Huren Den Haag - Zaal en Catering Onder Een Dak'
                  : 'Feestzaal Huren Den Haag - Venue and Catering Under One Roof'}
              </h2>

              <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed pl-6 border-l-2 border-[#D4AF37]/30">
                {isNl ? (
                  <>
                    <p>
                      De meeste mensen die een feestzaal zoeken in Den Haag lopen tegen hetzelfde probleem op. Ze vinden een geschikte ruimte. Dan beginnen ze aan een tweede zoektocht naar een cateraar. Ze onderhandelen twee contracten, stemmen twee planningen op elkaar af, en steken de week voor het feest door met logistiek. Bij{' '}
                      <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                      op Leyweg 986 in Den Haag zijn de feestzaal en de keuken één operatie. U belt eenmaal. Alles wordt geregeld.
                    </p>
                    <p>
                      De privé feestzaal biedt ruimte voor <strong>25 tot 80 gasten</strong>. Van een intieme{' '}
                      <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">nikah-receptie</Link>{' '}
                      voor de naaste familie tot een groot bedrijfsdiner voor tachtig medewerkers: het bereik dekt het allemaal. Het eten komt uit dezelfde keuken die 4,9 sterren verdient van 800+ Google-beoordelaars. Geen aparte cateraar. Geen coördinatieproblemen.
                    </p>
                    <p>
                      Of u nu een verjaardagsfeest, een{' '}
                      <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali-viering</Link>{' '}
                      of een{' '}
                      <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bedrijfsevenement</Link>{' '}
                      organiseert: vertel ons uw datum, uw aantal gasten en uw gelegenheid. Wij regelen het menu, de opstelling en de service.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Most people searching for a feestzaal in Den Haag run into the same problem. They find a room they like. Then they begin a second search for a caterer. They negotiate two contracts, coordinate two schedules, and spend the week before the event managing logistics. At{' '}
                      <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Chopras Indian Restaurant</Link>{' '}
                      at Leyweg 986 in Den Haag, the event hall and the kitchen are a single operation. You make one call. Everything is handled.
                    </p>
                    <p>
                      The private hall seats between <strong>25 and 80 guests</strong>. From an intimate{' '}
                      <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">nikah reception</Link>{' '}
                      for close family to a corporate dinner for eighty, that range covers everything. The food comes from the same kitchen that earns 4.9 stars on Google from 800+ reviewers every week. No separate caterer. No coordination gap.
                    </p>
                    <p>
                      Whether you are planning a birthday party, a{' '}
                      <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali celebration</Link>
                      , or a{' '}
                      <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate event</Link>
                      , the starting point is the same: tell us your date, your guest count, and your occasion. We handle the menu, the setup, and the service.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TAILORED MENUS ═══════════════════════════════════════════════ */}
      <section className="bg-[#1B2B5E] py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#C7A348]/60" />
              <span className="text-[#C7A348]/80 text-xs font-semibold uppercase tracking-widest">
                {isNl ? 'Het Menu' : 'The Menu'}
              </span>
              <div className="w-10 h-px bg-[#C7A348]/60" />
            </div>
            <h2 className="font-vibes text-4xl md:text-5xl text-white mb-4 leading-[1.3]">
              {isNl ? 'Indiaas Menu op Maat voor Elke Gelegenheid' : 'Tailored Indian Menus for Every Occasion'}
            </h2>
            <p className="font-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              {isNl
                ? "Onze menu's zijn aanpasbaar en ontworpen voor elke voedingswens. Van pani puri stands tot Indiaase desserts - alles vers bereid."
                : 'Our menus are customisable and designed to meet every dietary preference. From pani puri stands to Indian desserts - all prepared fresh.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dietary.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#C7A348]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C7A348]/10 border border-[#C7A348]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#C7A348]" />
                </div>
                <div>
                  <h3 className="font-body text-white font-semibold text-base mb-1.5">{item.label}</h3>
                  <p className="font-body text-white/55 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#C7A348]/10 border border-[#C7A348]/20 rounded-2xl px-8 py-6 text-center">
            <p className="font-body text-white/75 text-base leading-relaxed">
              {isNl ? (
                <>
                  Bekijk het{' '}
                  <Link href={`${base}/menu`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">volledige restaurantmenu</Link>
                  {' '}voor uw evenement, van{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">butter chicken</Link>
                  {' '}en{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">biryani</Link>
                  {' '}tot{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">chaat starters</Link>
                  {' '}en verse Indiaase desserts.
                </>
              ) : (
                <>
                  Browse the{' '}
                  <Link href={`${base}/menu`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">full restaurant menu</Link>
                  {' '}for your event, from{' '}
                  <Link href={`${base}/butter-chicken-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">butter chicken</Link>
                  {' '}and{' '}
                  <Link href={`${base}/biryani-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">biryani</Link>
                  {' '}to{' '}
                  <Link href={`${base}/chaat-den-haag`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">chaat starters</Link>
                  {' '}and fresh Indian desserts.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ══════════════════════════════════════════════ */}
      <section className="bg-[#F7F8FC] py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">
                  {isNl ? 'Standaard' : 'Standard'}
                </span>
              </div>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-8 leading-[1.3]">
                {isNl
                  ? 'De Privé Feestzaal op Leyweg 986 - Capaciteit, Catering en Standaard'
                  : 'The Private Hall at Leyweg 986 - Capacity, Catering, and Standard'}
              </h2>

              <div className="space-y-6 font-body text-[#1A1A1A]/70 text-lg leading-relaxed">
                {isNl ? (
                  <>
                    <p>
                      De feestzaal van Chopras Indian Restaurant Den Haag heeft een capaciteit van <strong>25 tot 80 gasten</strong>. De ruimte is volledig privé tijdens uw evenement: uw gasten delen de zaal niet met andere diners. De opstelling wordt aangepast aan uw gelegenheid.
                    </p>
                    <p>
                      Volledige catering is inbegrepen bij elke boeking, van verse starters tot desserts. Het menu wordt samengesteld in overleg met ons team en kan alles bevatten van het{' '}
                      <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">volledige restaurantmenu</Link>
                      :{' '}
                      <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>
                      ,{' '}
                      <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>
                      , tandoorige gerechten, vegetarische en veganistische opties. Elk vleesgerecht is{' '}
                      <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal gecertificeerd</Link>
                      . Geen risico op kruiscontaminatie.
                    </p>
                    <p>
                      De keukenstandaard op uw evenement is gelijk aan die van het restaurant. Specerijen worden rechtstreeks uit India betrokken en elke ochtend vers gemalen. De tandoor brandt op <strong>400 graden Celsius</strong>. De gerechten zijn bereid door dezelfde chefs die van Chopras het{' '}
                      <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">best beoordeelde Indiaas restaurant in Den Haag</Link>{' '}
                      hebben gemaakt.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The feestzaal at Chopras Indian Restaurant Den Haag holds between <strong>25 and 80 guests</strong>. The space is entirely private during your event. Your guests do not share the hall with other diners. The layout is configured for your occasion.
                    </p>
                    <p>
                      Full catering is included with every booking, from fresh starters through to desserts. The menu is built in consultation with our team and can draw from the{' '}
                      <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">full restaurant menu</Link>
                      :{' '}
                      <Link href={`${base}/butter-chicken-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">butter chicken</Link>
                      ,{' '}
                      <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>
                      , tandoori dishes, vegetarian and vegan options. Every meat dish is{' '}
                      <Link href={`${base}/halal-food-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">halal certified</Link>
                      . No cross-contamination risk.
                    </p>
                    <p>
                      The kitchen standard at your event matches the restaurant. Spices are sourced directly from India and ground fresh every morning. The tandoor fires to <strong>400 degrees Celsius</strong>. The dishes are prepared by the same chefs who made Chopras Indian Restaurant the{' '}
                      <Link href={`${base}/beste-indiaas-restaurant-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">strongly rated Indian restaurant in Den Haag</Link>
                      . That standard does not drop for events.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Checklist card */}
            <div className="rounded-3xl bg-white p-10 lg:p-12 border border-[#D4AF37]/20 shadow-sm sticky top-24">
              <h3 className="font-vibes text-3xl text-[#C7A348] mb-7">
                {isNl ? 'Wat Is Inbegrepen?' : 'What Is Included?'}
              </h3>
              <ul className="space-y-3.5">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-[#1B2B5E]/5 pb-3.5 last:border-0 last:pb-0">
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-[#C7A348]" />
                    </div>
                    <span className="font-body text-[#1A1A1A]/70 text-[15px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-5 border-t border-gray-100">
                <p className="font-body text-[#1A1A1A]/50 text-sm leading-relaxed">
                  {isNl ? (
                    <>
                      Volledige{' '}
                      <Link href={`${base}/catering`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">cateringdetails</Link>
                      {' '}beschikbaar op de cateringpagina.
                    </>
                  ) : (
                    <>
                      Full{' '}
                      <Link href={`${base}/catering`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">catering details</Link>
                      {' '}available on the catering page.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OCCASIONS COPY ═══════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl
                ? 'Verjaardag, Bruiloft, Bedrijfsdiner en Meer in Den Haag'
                : 'Birthday, Wedding, Corporate Dinner and More in Den Haag'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Weddings card */}
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed bg-[#F7F8FC] p-10 md:p-12 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <h3 className="font-heading text-xl text-[#C7A348] font-semibold">
                {isNl ? 'Trouwen en Recepties' : 'Weddings and Receptions'}
              </h3>
              {isNl ? (
                <>
                  <p>
                    Stel u voor: een verjaardagsdiner voor dertig personen op Leyweg 986. De gasten arriveren, de zaal is gereed, het eten staat klaar. De gastheer heeft de week ervoor niet besteed aan het afstemmen van twee aparte bedrijven. Dat is wat het huren van de feestzaal bij Chopras Indian Restaurant in de praktijk inhoudt.
                  </p>
                  <p>
                    Voor{' '}
                    <Link href={`${base}/bruiloft-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bruiloft catering in Den Haag</Link>{' '}
                    wordt het menu het middelpunt. Een nikah-receptie voor zeventig gasten kan worden opgezet als een overvloedig buffet met meerdere stations:{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>{' '}
                    in grote karahi potten, tandoori platters en een volledig vegetarisch aanbod. Een walimahdiner kan worden gestructureerd als formele bordbediening.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Picture a birthday dinner for thirty guests at Leyweg 986 in Den Haag. Guests arrive, the hall is set, the food is ready. The host did not spend the week before coordinating two separate companies. That is what hiring the feestzaal at Chopras Indian Restaurant actually looks like.
                  </p>
                  <p>
                    For{' '}
                    <Link href={`${base}/indian-wedding-catering-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Indian wedding catering in Den Haag</Link>
                    , the menu becomes the centrepiece. A nikah reception for seventy guests can run as a generous buffet with multiple stations:{' '}
                    <Link href={`${base}/biryani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">biryani</Link>{' '}
                    in large karahi pots, tandoori platters, and a full vegetarian spread so every guest is covered.
                  </p>
                </>
              )}
            </div>

            {/* Corporate + Diwali card */}
            <div className="space-y-5 font-body text-[#1A1A1A]/70 text-lg leading-relaxed bg-[#F7F8FC] p-10 md:p-12 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <h3 className="font-heading text-xl text-[#C7A348] font-semibold">
                {isNl ? 'Bedrijfsdiners & Feestelijke Vieringen' : 'Corporate Events & Festive Celebrations'}
              </h3>
              {isNl ? (
                <>
                  <p>
                    Bedrijfsevenementen vragen om iets anders. Een teamdiner bij Chopras Indian Restaurant Den Haag is gedenkwaardiger dan een vergaderkamer met cateringboxen. De privézaal laat uw team ontspannen weg van een drukke eetzaal.
                  </p>
                  <p>
                    Voor{' '}
                    <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali-diners in Den Haag</Link>{' '}
                    staan traditionele gerechten centraal:{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link>
                    , paneer tikka en de biryani die de gelegenheid verdient. Bekijk ons volledige aanbod voor{' '}
                    <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">bedrijfsevenementen in Den Haag</Link>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Corporate events need something different. A team dinner at Chopras Indian Restaurant Den Haag is more memorable than a standard catered meeting room. The private hall lets your group relax away from a public dining room.
                  </p>
                  <p>
                    For{' '}
                    <Link href={`${base}/diwali-dinner-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">Diwali dinners in Den Haag</Link>
                    , traditional dishes take centre stage:{' '}
                    <Link href={`${base}/dal-makhani-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">dal makhani</Link>
                    , paneer tikka, and the biryani the occasion deserves. Explore our full{' '}
                    <Link href={`${base}/corporate-events-den-haag`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">corporate events offering in Den Haag</Link>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F8FC] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl ? 'Sfeerimpressie' : 'Atmosphere'}
            </h2>
            <div className="w-16 h-px bg-[#C7A348]/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 h-72 md:h-96 relative rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src="/images/catering/proposal---1.png"
                alt={isNl ? 'Aanzoek opstelling bij Chopras Indian Restaurant Den Haag' : 'Proposal setup at Chopras Indian Restaurant Den Haag'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5">
                <span className="font-vibes text-xl text-white">{isNl ? 'Aanzoeken & Bruiloften' : 'Proposals & Weddings'}</span>
              </div>
            </div>
            <div className="md:col-span-7 h-72 md:h-96 relative rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src="/images/catering/birthday-party---2.png"
                alt={isNl ? 'Verjaardagsfeest bij Chopras Indian Restaurant Den Haag' : 'Birthday party at Chopras Indian Restaurant Den Haag'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5">
                <span className="font-vibes text-xl text-white">{isNl ? 'Verjaardagen' : 'Birthdays'}</span>
              </div>
            </div>
            <div className="md:col-span-7 h-64 relative rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src="/images/catering/corporate-dinners-at-chopras.png"
                alt={isNl ? 'Bedrijfsdiner bij Chopras Indian Restaurant Den Haag' : 'Corporate dinner at Chopras Indian Restaurant Den Haag'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5">
                <span className="font-vibes text-xl text-white">{isNl ? 'Bedrijfsdiners' : 'Corporate Dinners'}</span>
              </div>
            </div>
            <div className="md:col-span-5 h-64 relative rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src="/images/catering/baby-shower-pic-1.png"
                alt={isNl ? 'Babyshower bij Chopras Indian Restaurant Den Haag' : 'Baby shower at Chopras Indian Restaurant Den Haag'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B5E]/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5">
                <span className="font-vibes text-xl text-white">{isNl ? 'Babyshowers' : 'Baby Showers'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ═════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl
                ? 'Waarom Chopras Indian Restaurant Kiezen voor Uw Evenement'
                : 'Why Choose Chopras Indian Restaurant for Your Event'}
            </h2>
            <div className="w-16 h-px bg-[#1B2B5E]/20 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bens.map((b) => (
              <div
                key={b.title}
                className="group relative rounded-3xl bg-[#F7F8FC] p-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-colors duration-500" />
                <div className="relative h-full rounded-[1.25rem] bg-white p-10 flex flex-col border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/8 flex items-center justify-center mb-7 ring-1 ring-[#D4AF37]/15 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="text-[#C7A348] w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl text-[#C7A348] font-semibold mb-3">{b.title}</h3>
                  <p className="font-body text-[#1A1A1A]/65 text-base leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FULL BOOKING FORM ════════════════════════════════════════════ */}
      <section id="booking-form" className="bg-[#F7F8FC] py-24 px-6 md:px-16 scroll-mt-20 border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Left info panel */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-10 h-px bg-[#C7A348]" />
                <span className="text-[#C7A348] text-xs font-semibold uppercase tracking-widest">
                  {isNl ? 'Gedetailleerde Aanvraag' : 'Detailed Enquiry'}
                </span>
              </div>
              <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
                {isNl ? 'Vertel Ons Meer Over Uw Gelegenheid' : 'Tell Us More About Your Occasion'}
              </h2>
              <p className="font-body text-[#1A1A1A]/65 text-lg leading-relaxed mb-8">
                {isNl
                  ? 'Vul het formulier in en wij sturen u binnen 24 uur een vrijblijvende offerte met menuopties en beschikbaarheidsbevestiging.'
                  : 'Fill in the form and we will send a free no-obligation quote within 24 hours, with menu options and availability confirmation.'}
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, labelEn: 'Call us directly', labelNl: 'Bel ons direct', valEn: '+31 6 30645930', valNl: '+31 6 30645930', href: 'tel:+31630645930' },
                  { icon: MapPin, labelEn: 'Our address', labelNl: 'Ons adres', valEn: 'Leyweg 986, 2545 GW Den Haag', valNl: 'Leyweg 986, 2545 GW Den Haag', href: null },
                  { icon: Clock, labelEn: 'Opening hours', labelNl: 'Openingstijden', valEn: 'Tuesday to Sunday, 16:30 - 22:30', valNl: 'Dinsdag t/m zondag, 16:30 - 22:30', href: null },
                ].map((item) => {
                  const Icon = item.icon
                  const label = isNl ? item.labelNl : item.labelEn
                  const val = isNl ? item.valNl : item.valEn
                  return (
                    <div key={label} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#D4AF37]/15">
                      <div className="w-10 h-10 rounded-xl bg-[#C7A348]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#C7A348]" />
                      </div>
                      <div>
                        <p className="font-body text-[#1B2B5E] font-semibold text-sm">{label}</p>
                        {item.href
                          ? <Link href={item.href} className="font-body text-[#C7A348] text-sm hover:text-[#D4AF37] font-semibold">{val}</Link>
                          : <p className="font-body text-[#1A1A1A]/55 text-sm">{val}</p>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 border border-[#D4AF37]/15 shadow-sm">
              <BookingInquiryForm locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ GEO BLOCK ════════════════════════════════════════════════════ */}
      <section className="bg-[#1B2B5E] py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* GEO answer */}
          <div>
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-7 leading-[1.3]">
              {isNl
                ? 'Kan ik een feestzaal huren bij Chopras Indian Restaurant in Den Haag?'
                : 'Can I rent an event hall at Chopras Indian Restaurant in Den Haag?'}
            </h2>
            <div className="font-body text-white/75 text-lg leading-relaxed">
              {isNl ? (
                <p>
                  Ja.{' '}
                  <Link href={`${base}/`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">Chopras Indian Restaurant</Link>
                  {' '}op{' '}
                  <Link href={`${base}/contact`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">Leyweg 986, Den Haag</Link>
                  {' '}biedt een privé feestzaal voor <strong>25 tot 80 gasten</strong>. Beschikbaar voor verjaardagen, bruiloften, nikah-recepties, kitty parties, bedrijfsfeesten en festieve vieringen. Verse Indiaase{' '}
                  <Link href={`${base}/catering`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">catering</Link>
                  {' '}is inbegrepen. Open dinsdag tot en met zondag.
                </p>
              ) : (
                <p>
                  Yes.{' '}
                  <Link href={`${base}/`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">Chopras Indian Restaurant</Link>
                  {' '}at{' '}
                  <Link href={`${base}/contact`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">Leyweg 986, Den Haag</Link>
                  {' '}operates a private event hall for <strong>25 to 80 guests</strong>. Available for birthdays, weddings, nikah receptions, kitty parties, corporate events, and festive celebrations. Full authentic{' '}
                  <Link href={`${base}/catering`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">Indian catering</Link>
                  {' '}is included. Open Tuesday to Sunday.
                </p>
              )}
            </div>
          </div>

          {/* How to book */}
          <div className="border-l border-white/10 pl-0 lg:pl-16 pt-16 lg:pt-0 border-t lg:border-t-0 mt-8 lg:mt-0">
            <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-7 leading-[1.3]">
              {isNl
                ? 'Hoe Boek Je een Feestzaal bij Chopras Indian Restaurant Den Haag'
                : 'How to Book the Event Hall at Chopras Indian Restaurant Den Haag'}
            </h2>
            <div className="font-body text-white/75 text-lg leading-relaxed space-y-5">
              {isNl ? (
                <>
                  <p>
                    Het boekingsproces is eenvoudig. Vul het formulier op deze pagina in, of neem contact op via de{' '}
                    <Link href={`${base}/contact`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">contactpagina</Link>
                    {' '}of bel <strong>+31 6 30645930</strong>. Vertel ons uw datum, uw verwachte aantal gasten en het type gelegenheid.
                  </p>
                  <p>
                    Wij sturen u binnen <strong>24 uur</strong> een vrijblijvende offerte. Voor evenementen van 25 tot 40 gasten raden wij aan minimaal <strong>2 tot 3 weken van tevoren</strong> contact op te nemen. Voor grotere bruiloften en bedrijfsfeesten van 50 tot 80 gasten is <strong>6 tot 8 weken vooruit</strong> het juiste moment.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The booking process is straightforward. Fill in the form on this page, or contact us via the{' '}
                    <Link href={`${base}/contact`} className="text-[#C7A348] hover:text-[#D4AF37] font-semibold">contact page</Link>
                    {' '}or call <strong>+31 6 30645930</strong>. Tell us your date, your expected guest count, and the type of occasion.
                  </p>
                  <p>
                    We send a free no-obligation quote within <strong>24 hours</strong>. For events of 25 to 40 guests, reaching out at least <strong>2 to 3 weeks in advance</strong> is recommended. For larger weddings and corporate dinners of 50 to 80 guests, <strong>6 to 8 weeks ahead</strong> is the right window.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F8FC] py-24 px-6 md:px-16 border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl ? 'Veelgestelde Vragen over de Feestzaal in Den Haag' : 'Frequently Asked Questions About the Event Hall in Den Haag'}
            </h2>
            <div className="w-16 h-px bg-[#1B2B5E]/20 mx-auto mt-4" />
          </div>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      {/* ══ INTERNAL LINKS ═══════════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-4 leading-[1.3]">
              {isNl ? 'Meer Over Onze Diensten' : 'Learn More About Our Services'}
            </h2>
            <div className="w-16 h-px bg-[#1B2B5E]/10 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: `${base}/`, cat: 'Restaurant', en: 'Chopras Indian Restaurant - best Indian restaurant in Den Haag', nl: 'Chopras Indian Restaurant - beste Indiaas restaurant in Den Haag' },
              { href: `${base}/menu`, cat: 'Menu', en: 'View our full menu for your event', nl: 'Bekijk ons volledige menu voor uw evenement' },
              { href: `${base}/catering`, cat: 'Catering', en: 'Indian catering Den Haag', nl: 'Indiaas catering Den Haag' },
              { href: `${base}/contact`, cat: 'Contact', en: 'Request a no-obligation quote', nl: 'Vraag een vrijblijvende offerte aan' },
              { href: `${base}/indian-wedding-catering-den-haag`, cat: 'Wedding', en: 'Indian wedding catering Den Haag', nl: 'Indiaas bruiloft catering Den Haag' },
              { href: `${base}/indian-birthday-catering-den-haag`, cat: 'Birthday', en: 'Birthday catering Den Haag', nl: 'Verjaardag catering Den Haag' },
              { href: `${base}/corporate-events-den-haag`, cat: 'Corporate', en: 'Corporate events Den Haag', nl: 'Bedrijfsfeest Den Haag' },
              { href: `${base}/diwali-dinner-den-haag`, cat: 'Diwali', en: 'Diwali dinner Den Haag', nl: 'Diwali dinner Den Haag' },
              { href: `${base}/bruiloft-catering-den-haag`, cat: 'Bruiloft', en: 'Wedding catering Den Haag', nl: 'Bruiloft catering Den Haag' },
              { href: `${base}/zaal-huren-den-haag`, cat: 'Venue', en: 'Hall for hire Den Haag', nl: 'Zaal huren Den Haag' },
              { href: `${base}/evenementenruimte-den-haag`, cat: 'Event', en: 'Event venue Den Haag', nl: 'Evenementenruimte Den Haag' },
              { href: `${base}/halal-food-den-haag`, cat: 'Halal', en: 'Halal food Den Haag', nl: 'Halal eten Den Haag' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block p-5 bg-[#F7F8FC] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <p className="text-[#C7A348] text-[10px] font-bold uppercase tracking-widest mb-1.5 group-hover:translate-x-0.5 transition-transform duration-200">
                  {link.cat}
                </p>
                <p className="text-[#1B2B5E] font-medium text-sm leading-snug">
                  {isNl ? link.nl : link.en}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative bg-[#1B2B5E] py-32 px-6 md:px-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F4B] via-[#1B2B5E] to-[#0F1F4B]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C7A348]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C7A348]/30 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
            <span className="text-[#C7A348] text-[10px] font-bold uppercase tracking-[0.22em]">
              {isNl ? 'RESERVEER UW DATUM' : 'RESERVE YOUR DATE'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
          </div>
          <h2 className="font-vibes text-5xl md:text-6xl text-white mb-6 leading-[1.2]">
            {isNl ? 'Klaar om uw evenement te plannen?' : 'Ready to Plan Your Event?'}
          </h2>
          <p className="font-body text-white/60 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
            {isNl
              ? 'Gratis offerte binnen 24 uur. Open dinsdag tot en met zondag op Leyweg 986, Den Haag.'
              : 'Free quote within 24 hours. Open Tuesday to Sunday at Leyweg 986, Den Haag.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 rounded-full bg-[#C7A348] px-10 py-5 text-[#1B2B5E] text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#D4AF37] hover:shadow-xl hover:shadow-[#C7A348]/25 cursor-pointer"
            >
              {isNl ? 'Offerte Aanvragen' : 'Request a Quote'}
            </a>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-10 py-5 text-white text-sm font-semibold uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              {isNl ? 'Contactpagina' : 'Contact Page'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
