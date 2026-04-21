import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from '@/components/sections/FaqAccordion'
import { RESTAURANT } from '@/lib/constants'
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
    en: 'Party Venue Den Haag | Chopras Indian Restaurant',
    nl: 'Feestlocatie Den Haag | Chopras Indian Restaurant',
  }
  const descriptions = {
    en: 'Hire Chopras private event hall in Den Haag for 25 to 80 guests. Full Indian catering included. Perfect for weddings, parties and corporate events.',
    nl: 'Feestzaal huren Den Haag bij Chopras. Privézaal voor 25 tot 80 gasten met Indiaas catering. Ideaal voor bruiloften en feesten. Offerte aanvragen.',
  }
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: getLocalizedUrl(locale, 'party-venue-den-haag'),
      languages: { en: getLocalizedUrl('en', 'party-venue-den-haag'), nl: getLocalizedUrl('nl', 'party-venue-den-haag'), 'x-default': getLocalizedUrl('en', 'party-venue-den-haag') },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getLocalizedUrl(locale, 'party-venue-den-haag'),
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
  { question: 'Can I hire an event space at Chopras Indian Restaurant in Den Haag?', answer: 'Yes. Chopras Indian Restaurant has a private event hall available for hire in Den Haag. It is suitable for birthdays, corporate events, weddings, anniversaries, and all celebrations.' },
  { question: 'How many guests can the Chopras Indian Restaurant event hall accommodate?', answer: 'The private event hall at Chopras Indian Restaurant Den Haag can accommodate groups of various sizes. Contact us directly to discuss capacity for your specific event.' },
  { question: 'What occasions can I host at Chopras Indian Restaurant Den Haag?', answer: 'You can host birthdays, anniversaries, weddings, bruiloft, corporate dinners, Diwali parties, team building events, product launches, and private gatherings at Chopras Indian Restaurant Den Haag.' },
]

const faqsNl: Array<{ question: string; answer: string }> = [
  { question: 'Kan ik een evenementenruimte huren bij Chopras Indian Restaurant in Den Haag?', answer: 'Ja. Chopras Indian Restaurant heeft een privé-evenementenhal beschikbaar voor huur in Den Haag. Deze is geschikt voor verjaardagen, zakelijke evenementen, bruiloften, jubileums en alle vieringen.' },
  { question: 'Hoeveel gasten kan de evenementenhal van Chopras Indian Restaurant herbergen?', answer: 'De privé-evenementenhal van Chopras Indian Restaurant Den Haag kan groepen van verschillende grootte herbergen. Neem rechtstreeks contact met ons op om capaciteit voor uw specifieke evenement te bespreken.' },
  { question: 'Welke gelegenheden kan ik organiseren bij Chopras Indian Restaurant Den Haag?', answer: 'U kunt verjaardagen, jubileums, bruiloften, bruiloft, zakelijke diners, Diwali-feesten, teambuilding-evenementen, productlanceringen en privébijeenkomsten organiseren bij Chopras Indian Restaurant Den Haag.' },
]

export default function PartyVenuePage({ params }: Props) {
  const { locale } = params
  const tr = getTranslations(locale)
  const base = locale === 'nl' ? '/nl' : ''
  const isNl = locale === 'nl'

  const eventVenueSchema = {
    '@context': 'https://schema.org', '@type': 'EventVenue',
    name: isNl ? 'Chopras Privé-Evenementenhal' : 'Chopras Private Event Hall',
    address: { '@type': 'PostalAddress', streetAddress: RESTAURANT.address.street, addressLocality: RESTAURANT.address.city, postalCode: RESTAURANT.address.postcode, addressCountry: 'NL' },
    telephone: RESTAURANT.contact.phone,
    maximumAttendeeCapacity: 80,
    url: 'https://chopras.nl/party-venue-den-haag',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Indian Catering Included', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'AV Equipment Welcome', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Photo Shoots Welcome', value: true },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '800', bestRating: '5', worstRating: '1' },
    sameAs: [
      'https://www.tripadvisor.com/Restaurant_Review-g188633-d27464805-Reviews-Chopras_Indian_Restaurant-The_Hague_South_Holland_Province.html',
      'https://www.google.com/maps/place/Chopras+Indian+Restaurant/@52.0583,4.2932,17z/',
      'https://www.facebook.com/choprasrestaurant',
      'https://www.instagram.com/choprasrestaurant',
      'https://www.youtube.com/@choprasrestaurant',
    ],
  }

  const venueFeatures = isNl ? [
    { title: 'Locatie', desc: 'Leyweg 986, 2545 GW Den Haag  -  goed bereikbaar per tram (lijn 4 en 9), bus en auto. Het winkelgebied Leyweg is een bekend punt.' },
    { title: 'Capaciteit', desc: '25 tot 80 gasten afhankelijk van de opstellingsvorm  -  zittend diner, staande receptie of gecombineerd formaat.' },
    { title: 'Inrichting', desc: 'Levendig Indiaas thema  -  origineel kunstwerk, warm amber licht, rijkgekleurde textiel die een onderscheidende sfeer creëert.' },
    { title: 'AV-Opstelling', desc: 'Breng uw eigen projector, luidsprekers en laptopapparatuur mee. De zaal heeft stroomaansluiting en voldoende ruimte voor een volledige AV-opstelling.' },
    { title: 'Catering', desc: 'Volledige Indiase catering standaard inbegrepen bij elke evenementenboeking  -  buffet of bediening op bord, uw keuze.' },
    { title: 'Professioneel Personeel', desc: 'Een team van bedienden voor de volledige duur van uw evenement  -  van opbouw tot de laatste gast vertrekt.' },
    { title: 'Opbouw en Afbouw', desc: 'Volledig beheerd door Chopras. U arriveert in een zaal die klaar is voor uw gasten. U vertrekt en wij regelen de rest.' },
    { title: 'Per Tram', desc: 'Tramlijn 2 stopt bij halte Leyweg, op loopafstand van de ingang. Betaald parkeren is beschikbaar in de omgeving van Leyweg.' },
  ] : [
    { title: 'Location', desc: 'Leyweg 986, 2545 GW Den Haag  -  easily reached by tram (line 4 and 9), bus, and car. The Leyweg shopping area is a landmark guests know.' },
    { title: 'Capacity', desc: '25 to 80 guests depending on layout  -  seated dinner, standing reception, or mixed format.' },
    { title: 'Décor', desc: 'Vibrant Indian theme  -  original artwork, warm amber lighting, richly coloured textiles that create a distinctive atmosphere and a beautiful backdrop for event photography.' },
    { title: 'AV Setup', desc: 'Bring your own projector, speakers, and laptop. The hall has power access and enough space for a full AV setup.' },
    { title: 'Catering', desc: 'Full Indian catering included as standard with every event hire - buffet or plated service, your choice, built around your event and guest list.' },
    { title: 'Professional Staff', desc: 'A team of servers for the full duration of your event - setup through to the last guest leaving.' },
    { title: 'Setup and Breakdown', desc: 'Fully managed by Chopras. You arrive to a room ready for your guests. You leave and we handle everything after.' },
  ]

  const eventTypes = isNl ? [
    { title: 'Verjaardagsfeesten', desc: 'Of u nu een 30e, 50e of het eerste verjaardag van een kind viert  -  de zaal creëert een warme, onderscheidende sfeer die verjaardagen werkelijk memorabel maakt.' },
    { title: 'Bruiloftsrecepties', desc: 'Nikah-recepties, diners na de ceremonie, bruiloftsbrunches, Sangeet-avonden. De levendige inrichting past prachtig bij elk onderdeel van Indiase, Pakistaanse en multiculturele bruiloften.' },
    { title: 'Verlovingsfeesten', desc: 'De formele aankondiging verdient een passende omgeving. Een verlovingsfeest bij Chopras heeft het eten, de sfeer en de intimiteit die hotels en generieke locaties niet kunnen bieden.' },
    { title: 'Babyshowers', desc: 'Een groeiende gelegenheid in Den Haag\'s Zuid-Aziatische gemeenschap. Een babyshower in een Indiase omgeving met prachtig eten voelt echt speciaal.' },
    { title: 'Bedrijfsdiners', desc: 'Klantentertainment, teamvieringen, eindejaarsdiners. Indiaas eten creëert gesprekken. Generiek hoteleten niet.' },
    { title: 'Diwali en Festiviteiten', desc: 'Diwali-diners, Holi-feesten, Eid-vieringen, Baisakhi-bijeenkomsten  -  Chopras begrijpt de culturele betekenis van deze gelegenheden.' },
    { title: 'Gemeenschapsbijeenkomsten', desc: 'Diners van religieuze organisaties, goede doelen, culturele verenigingen. De zaal verwelkomt groepen van alle soorten.' },
    { title: 'Productlanceringen en Netwerken', desc: 'Maak uw lancering of netwerkevenement memorabel met een Indiaas canapé-assortiment of een street food station.' },
  ] : [
    { title: 'Birthday Parties', desc: 'Whether you are celebrating a 30th, 50th, or a child\'s first  -  the hall creates a warm, distinctive atmosphere that makes birthdays genuinely memorable.' },
    { title: 'Wedding Receptions', desc: 'Nikah receptions, after-ceremony dinners, wedding brunches, Sangeet nights. The vibrant décor works beautifully for every stage of Indian, Pakistani and multicultural weddings.' },
    { title: 'Engagement Parties', desc: 'The formal announcement deserves a proper setting. An engagement party at Chopras has the food, the atmosphere, and the intimacy that hotels and generic venues cannot offer.' },
    { title: 'Baby Showers', desc: 'A growing occasion in Den Haag\'s South Asian community. A baby shower in an Indian setting with beautiful food feels genuinely special.' },
    { title: 'Corporate Dinners', desc: 'Client entertainment, team celebrations, year-end dinners. Indian food creates conversations. Generic hotel food does not.' },
    { title: 'Diwali and Festival Celebrations', desc: 'Diwali dinners, Holi parties, Eid celebrations, Baisakhi gatherings  -  Chopras understands the cultural significance of these occasions.' },
    { title: 'Community Gatherings', desc: 'Religious organisation dinners, charity fundraisers, cultural association events. The hall accommodates groups of all kinds.' },
    { title: 'Product Launches and Networking', desc: 'Make your launch or networking event memorable with a street food station or a cocktail-style Indian canape spread.' },
  ]

  return (
    <>
      <JsonLd data={eventVenueSchema as Record<string, unknown>} />
      <JsonLd data={getBreadcrumbSchema([
        { name: tr.common.nav.home, item: getLocalizedUrl(locale) },
        { name: isNl ? 'Party Venue Den Haag' : 'Party Venue Den Haag', item: getLocalizedUrl(locale, 'party-venue-den-haag') },
      ])} />
      <JsonLd data={getFaqPageSchema(isNl ? faqsNl : faqsEn)} />

      <section className="bg-[#1B2B5E] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#C7A348]/40 bg-white/10 backdrop-blur-sm mb-4">
            <span className="text-[#C7A348] text-xs font-medium uppercase tracking-widest">
              • FEESTZAAL · CHOPRAS INDIAN RESTAURANT · DEN HAAG •
            </span>
          </div>
          <h1
            className="font-vibes text-4xl md:text-6xl text-white leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {isNl ? 'Feestlocatie in Den Haag  -  Huur een Evenementenruimte met Ziel' : 'Party Venue in Den Haag  -  Hire an Event Space That Actually Has Soul'}
          </h1>
          <p className="text-xl text-white/75 mt-6 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
            {isNl ? 'Privé-evenementenhal voor 25 tot 80 gasten. Levendige Indiase inrichting. Volledige catering vanuit onze eigen keuken. Professioneel personeel. Leyweg 986, Den Haag.' : 'Private event hall for 25 to 80 guests. Vibrant Indian décor. Full catering from our own kitchen. Professional staff. Leyweg 986, Den Haag.'}
          </p>
          <Link href={`${base}/catering#catering-form`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
            {isNl ? 'Offerte Aanvragen' : 'Get a Quote'}
          </Link>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-8">
            {isNl ? 'Meer Dan Vier Muren en een Luidspreker' : 'More Than Four Walls and a Speaker'}
          </h2>
          <div className="prose prose-lg max-w-none text-[#1A1A1A] space-y-5">
            {isNl ? (
              <>
                <p>De meeste evenementenlocaties in Den Haag zijn uitwisselbaar. Neutrale muren. Generiek wit tafellinnen. Catering van een bedrijf dat gespecialiseerd is in volume boven kwaliteit. De functionele ruimte van een ketenhotel. Deze plaatsen hebben een doel  -  ze zijn beschikbaar, veilig en vergeetbaar. De foto&apos;s van de avond zien er uit als foto&apos;s van elke andere avond in elke andere neutrale ruimte.</p>
                <p>Een locatie moet karakter hebben. De privé-evenementenhal van Chopras is ingericht met levendige Indiase decoraties die elk evenement onderscheidend maken  -  met de hand geselecteerd kunstwerk, warm amber licht dat elk gezicht in de zaal flattert, rijkgekleurde textiel en accessoires die een sfeer creëren die gasten opvalt als ze binnenlopen.</p>
                <p>Het eten is geen bijzaak. Wanneer u Chopras inhuurt als uw feestlocatie, komt de catering uit dezelfde keuken die het restaurant elke week bedient  -  dezelfde chefs, dezelfde kruiden die dagelijks vers worden gemalen, dezelfde recepten. Er is geen cateringpartner of externe leverancier. Wat u proeft als u ons restaurant bezoekt, is wat uw gasten eten op uw evenement.</p>
              </>
            ) : (
              <>
                <p>Most event halls in Den Haag are interchangeable. Neutral walls. Generic cream tablecloths. Catering from a box company that specialises in volume over quality. The function room at a chain hotel. These places serve a purpose  -  they are available, they are safe, and they are forgettable.</p>
                <p>A venue should have character. Chopras&apos; private event hall is set in vibrant Indian décor that makes every event distinctive  -  hand-picked artwork, warm amber lighting that flatters every face in the room, richly coloured textiles that create an atmosphere guests actually notice when they walk in.</p>
                <p>The food is not an afterthought. When you hire Chopras as your party venue, the catering comes from the same kitchen that serves the restaurant every week  -  the same chefs, the same spices ground fresh daily, the same recipes. There is no catering partner or third-party supplier. What you taste when you visit our restaurant is what your guests eat at your event.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-10 text-center">
            {isNl ? 'De Chopras Evenementenhal  -  Wat U Krijgt' : 'The Chopras Event Hall  -  What You Get'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venueFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <span className="text-[#D4AF37] font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <span className="font-bold text-[#1B2B5E]">{feature.title}:</span>{' '}
                  <span className="text-gray-700 leading-relaxed">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-10 text-center">
            {isNl ? 'Soorten Evenementen die Wij Organiseren' : 'Types of Events We Host'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
                <h3 className="font-vibes font-bold text-[#C7A348] text-base mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8FC] py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-vibes text-4xl md:text-5xl text-[#C7A348] mb-6 leading-[1.3]">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <FaqAccordion faqs={isNl ? faqsNl : faqsEn} locale={locale} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-6">
            {isNl ? 'Boek Uw Feestlocatie in Den Haag' : 'Book Your Party Venue in Den Haag'}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            {isNl ? 'Klaar om te boeken? Stuur ons uw datum en het aantal gasten  -  wij bevestigen de beschikbaarheid en hebben binnen 24 uur een volledige offerte voor u.' : 'Ready to book? Send us your date and guest count  -  we will confirm availability and have a full quote back to you within 24 hours.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${base}/catering#catering-form`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
              {isNl ? 'Offerte Aanvragen' : 'Get a Quote'}
            </Link>
            <a href={`tel:${RESTAURANT.contact.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C7A348] bg-[rgba(199,163,72,0.1)] px-6 py-3 text-[#C7A348] text-sm font-medium uppercase tracking-wide transition-all duration-200 ease-out hover:bg-[#C7A348] hover:text-white active:scale-[0.98] min-h-[48px]">
              {isNl ? 'Bel Ons Nu' : 'Call Us Now'}
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-vibes text-3xl md:text-4xl text-[#C7A348] mb-10 text-center">
            {isNl ? 'Andere Cateringmogelijkheden' : 'Other Catering Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href={`${base}/indian-wedding-catering-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Bruiloft' : 'Wedding'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Nikah-recepties en bruiloftsfestiviteiten' : 'Nikah receptions and wedding festivities'}</p>
            </Link>
            <Link href={`${base}/corporate-events-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Zakelijk' : 'Corporate'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Bedrijfsdiners en teamvieringen' : 'Corporate dinners and team celebrations'}</p>
            </Link>
            <Link href={`${base}/indian-birthday-catering-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Verjaardag' : 'Birthday'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Verjaardagsfeesten en jubileums' : 'Birthday parties and celebrations'}</p>
            </Link>
            <Link href={`${base}/diwali-dinner-den-haag`} className="block p-6 bg-[#F7F8FC] rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">{isNl ? 'Diwali' : 'Diwali'}</p>
              <p className="text-[#1B2B5E] font-semibold">{isNl ? 'Diwali-diners en festiviteiten' : 'Diwali dinners and festival celebrations'}</p>
            </Link>
          </div>
          <div className="mt-8 text-center space-y-4">
            <p className="text-[#1A1A1A] text-base">
              <Link href={`${base}/`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">
                {isNl ? 'Chopras Indiaas Restaurant - beste Indiaas restaurant in Den Haag' : 'Chopras Indian Restaurant - best Indian restaurant in Den Haag'}
              </Link>
            </p>
            <p className="text-[#1A1A1A] text-base">
              {isNl ? 'Voor meer catering mogelijkheden, zie ons' : 'For more catering options, see our'} <Link href={`${base}/menu`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">{tr.common.viewMenu}</Link> {isNl ? 'of' : 'or'} <Link href={`${base}/contact`} className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold">{isNl ? 'maak een afspraak' : 'contact us'}</Link> {isNl ? 'om uw evenement te bespreken.' : 'to discuss your event.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
