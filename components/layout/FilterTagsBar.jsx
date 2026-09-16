'use client'
import Link from 'next/link'

const filterTags = [
  { label: 'DOLLAR SALE',   slug: 'dollar-sale',   color: 'bg-yellow-500 hover:bg-yellow-600',  icon: '$' },
  { label: 'DISCOUNTS',     slug: 'discounts',      color: 'bg-purple-600 hover:bg-purple-700',  icon: '✂' },
  { label: 'NEW ARRIVALS',  slug: 'new-arrivals',   color: 'bg-pink-500 hover:bg-pink-600',      icon: '✨' },
  { label: 'STOCK UPDATE',  slug: 'stock-update',   color: 'bg-green-600 hover:bg-green-700',    icon: '↑' },
  { label: 'MADE IN USA',   slug: 'made-in-usa',    color: 'bg-blue-600 hover:bg-blue-700',      icon: '🇺🇸' },
  { label: 'CLEARANCE',     slug: 'clearance',      color: 'bg-teal-600 hover:bg-teal-700',      icon: '🏷' },
]

export default function FilterTagsBar() {
  return (
    <div className="bg-brand-navy py-2 px-4">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {/* New Arrival badge */}
        <Link
          href="/category/new-arrivals"
          className="flex-shrink-0 flex items-center gap-2 bg-brand-gold text-brand-primary
                     font-bold text-xs px-3 py-1.5 rounded-full mr-2"
        >
          <span className="text-base">🆕</span>
          <span>NEW ARRIVAL</span>
        </Link>

        <div className="w-px h-5 bg-gray-600 flex-shrink-0" />

        {/* Filter tags */}
        {filterTags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/category/${tag.slug}`}
            className={`flex-shrink-0 flex items-center gap-1.5 text-white text-xs
                        font-bold px-3 py-1.5 rounded-full transition-colors ${tag.color}`}
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
