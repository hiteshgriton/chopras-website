'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type EventItem = {
  id: string
  titleEn: string
  titleNl: string
  descEn: string
  descNl: string
  image: string
  category: 'social' | 'corporate' | 'specialty'
}

const eventList: EventItem[] = [
  {
    id: 'birthday',
    titleEn: 'Birthday Parties & Anniversaries',
    titleNl: 'Verjaardagen & Jubilea',
    descEn: 'Elegant private hall with golden lighting, decorated tables, balloons, and memorable moments.',
    descNl: 'Elegante privézaal met gouden verlichting, prachtig gedecoreerde tafels en onvergetelijke momenten.',
    image: '/images/catering/birthday-party.png',
    category: 'social',
  },
  {
    id: 'proposal',
    titleEn: 'Proposals & Engagements',
    titleNl: 'Huwelijksaanzoeken & Verlovingen',
    descEn: 'Romantic candle-lit dinner setup with roses, floral arches, and an intimate luxury ambiance.',
    descNl: 'Romantische opstelling bij kaarslicht met rozen, bloemstukken en een intieme, luxe sfeer.',
    image: '/images/catering/proposal---1.png',
    category: 'social',
  },
  {
    id: 'baby-shower',
    titleEn: 'Baby Showers & Family Milestones',
    titleNl: 'Babyshowers & Familiebijeenkomsten',
    descEn: 'Warm gathering with pastel décor, floral table styling, and a multi-generational Indian buffet.',
    descNl: 'Warme sfeer met pastelkleurige decoratie, bloemige styling en een uitgebreid Indiaas buffet.',
    image: '/images/catering/baby-shower-new.png',
    category: 'social',
  },
  {
    id: 'kitty-parties',
    titleEn: 'Kitty Parties',
    titleNl: 'Kitty Parties & Vriendinnenbijeenkomsten',
    descEn: 'Stylish gatherings featuring mocktails, fresh chaat platters, laughter, and games.',
    descNl: 'Stijlvolle bijeenkomsten met mocktails, verse chaat platters, gezelligheid en spelletjes.',
    image: '/images/catering/kitty-parties.png',
    category: 'social',
  },
  {
    id: 'corporate',
    titleEn: 'Corporate Dinners & Meetings',
    titleNl: 'Zakelijke Diners & Vergaderingen',
    descEn: 'Professional private space with projector setup, elegant seating, and premium Indian catering.',
    descNl: 'Professionele privéruimte met projectorscherm, comfortabele zitplaatsen en premium catering.',
    image: '/images/catering/corporate-dinners-at-chopras.png',
    category: 'corporate',
  },
  {
    id: 'networking',
    titleEn: 'Networking Events & Meet-ups',
    titleNl: 'Netwerkevenementen & Meetups',
    descEn: 'Socialize with drinks and appetizers in a modern, sophisticated, and warm ambient setting.',
    descNl: 'Netwerken onder het genot van hapjes en drankjes in een modern en sfeervol decor.',
    image: '/images/catering/corporate-networking.png',
    category: 'corporate',
  },
  {
    id: 'workshops',
    titleEn: 'Workshops & Team Building',
    titleNl: 'Workshops & Teambuilding',
    descEn: 'Creative collaborative setups with discussional layouts, screen presentations, and tea/coffee.',
    descNl: 'Creatieve, interactieve opstellingen met presentatiescherm, discussietafels en koffie/thee.',
    image: '/images/catering/cooking-class.png',
    category: 'corporate',
  },
  {
    id: 'yoga',
    titleEn: 'Yoga & Meditation Sessions',
    titleNl: 'Yoga & Meditatie Sessies',
    descEn: 'Peaceful indoor setup with yoga mats, glowing candles, calming earthy décor, and soft lighting.',
    descNl: 'Rustgevende zaalopstelling met yogamatten, kaarsen, kalmerend decor en zacht sfeerlicht.',
    image: '/images/catering/yoga-meditation.png',
    category: 'specialty',
  },
  {
    id: 'festive',
    titleEn: 'Festive Celebrations',
    titleNl: 'Feestelijke Vieringen (Diwali, Eid, Holi)',
    descEn: 'Vibrant festive décor with fairy lights, rangoli, flowers, and colorful Indian spreads.',
    descNl: 'Kleurrijke decoratie met sfeerverlichting, rangoli, bloemen en authentieke feestelijke gerechten.',
    image: '/images/catering/party-decor.png',
    category: 'specialty',
  },
  {
    id: 'shoots',
    titleEn: 'Photo & Video Shoots',
    titleNl: 'Foto- & Videoshoots',
    descEn: 'Cinematic restaurant ambiance with professional lighting, plated dishes, and creator setups.',
    descNl: 'Cinematografische restaurant-ambiance met professionele belichting en mooi opgemaakte borden.',
    image: '/images/catering/proposal---2.png',
    category: 'specialty',
  },
  {
    id: 'product-launches',
    titleEn: 'Product Launches',
    titleNl: 'Productlanceringen',
    descEn: 'Trendy launch events with branded backdrops, spotlight presentations, and modern styling.',
    descNl: 'Trendy lanceringen met merk-achtergronden, spotlights en moderne tafelaankleding.',
    image: '/images/catering/product-launches.png',
    category: 'corporate',
  },
  {
    id: 'book-launches',
    titleEn: 'Book Launches & Cultural Events',
    titleNl: 'Boekpresentaties & Culturele Events',
    descEn: 'Cozy and sophisticated layout with signing desks, warm lighting, and intimate seating.',
    descNl: 'Gezellige en verfijnde opstelling met signeertafels, sfeerverlichting en intieme zithoeken.',
    image: '/images/catering/proposal---3.png',
    category: 'specialty',
  },
  {
    id: 'student-events',
    titleEn: 'Student & Expat Gatherings',
    titleNl: 'Studenten & Expat Bijeenkomsten',
    descEn: 'Lively social atmosphere with casual networking, music, and sharing platters.',
    descNl: 'Levendige sociale sfeer met informele netwerkmogelijkheden, muziek en deelgerechten.',
    image: '/images/catering/tourist-lunch---1.png',
    category: 'social',
  },
  {
    id: 'charity',
    titleEn: 'Charity Dinners & Fundraisers',
    titleNl: 'Charitatieve Diners & Fundraisers',
    descEn: 'Elegant gala-style dinner setups with speeches, candlelit dining, and refined hospitality.',
    descNl: 'Elegante galadiners met toespraken, intieme tafels bij kaarslicht en verfijnde service.',
    image: '/images/catering/wedding-celebrations---2.png',
    category: 'specialty',
  },
]

type Props = {
  locale: 'en' | 'nl'
}

export default function EventSelector({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'corporate' | 'specialty'>('all')
  const isNl = locale === 'nl'

  const tabs = [
    { id: 'all', labelEn: 'All Events', labelNl: 'Alle Gelegenheden' },
    { id: 'social', labelEn: 'Social & Family', labelNl: 'Familie & Sociaal' },
    { id: 'corporate', labelEn: 'Corporate & Professional', labelNl: 'Zakelijk & Teams' },
    { id: 'specialty', labelEn: 'Specialty & Wellness', labelNl: 'Speciaal & Wellness' },
  ] as const

  const filteredEvents = activeTab === 'all' 
    ? eventList 
    : eventList.filter(item => item.category === activeTab)

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#C7A348] text-[#1B2B5E] shadow-lg shadow-[#C7A348]/20'
                : 'bg-white text-[#1B2B5E] border border-gray-200 hover:border-[#C7A348]/40 hover:bg-[#F7F8FC]'
            }`}
          >
            {isNl ? tab.labelNl : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="group relative flex flex-col justify-between rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1.5"
          >
            <div>
              {/* Event Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={isNl ? event.titleNl : event.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2B5E]/80 backdrop-blur-sm border border-[#C7A348]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A348]" />
                  <span className="text-[10px] font-semibold text-[#C7A348] uppercase tracking-wider">
                    {event.category === 'social' 
                      ? (isNl ? 'Sociaal' : 'Social') 
                      : event.category === 'corporate' 
                      ? (isNl ? 'Zakelijk' : 'Corporate') 
                      : (isNl ? 'Wellness' : 'Specialty')}
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-8">
                <h3 className="font-heading text-xl text-[#1B2B5E] font-bold mb-3 group-hover:text-[#C7A348] transition-colors duration-300">
                  {isNl ? event.titleNl : event.titleEn}
                </h3>
                <p className="font-body text-[#1A1A1A]/70 text-sm leading-relaxed">
                  {isNl ? event.descNl : event.descEn}
                </p>
              </div>
            </div>

            {/* Event CTA */}
            <div className="p-8 pt-0">
              <button
                onClick={scrollToBooking}
                className="group/btn inline-flex items-center gap-2 text-xs font-bold text-[#C7A348] hover:text-[#1B2B5E] uppercase tracking-widest transition-colors duration-300"
              >
                {isNl ? 'Reserveer Zaal' : 'Book Venue'}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
