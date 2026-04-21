'use client'

import { useEffect, useState } from 'react'

// Email is stored base64-encoded so the raw address is never present in static HTML.
// btoa('info@chopras.nl') === 'aW5mb0BjaG9wcmFzLm5s'
const ENCODED = 'aW5mb0BjaG9wcmFzLm5s'

export default function EmailLink() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    setEmail(atob(ENCODED))
  }, [])

  if (!email) return null

  return (
    <a
      href={`mailto:${email}`}
      className="text-[#D4AF37] hover:text-[#e8c84a] font-semibold"
    >
      {email}
    </a>
  )
}
