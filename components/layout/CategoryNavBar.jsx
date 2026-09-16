'use client'
import Link from 'next/link'

const categories = [
  { name: 'Disposable',             slug: 'disposable',            emoji: '💨' },
  { name: 'Kits & Pods',            slug: 'kits-pods',             emoji: '🔋' },
  { name: 'Vaporizers',             slug: 'vaporizers',            emoji: '🌬️' },
  { name: 'E-Liquids',              slug: 'e-liquids',             emoji: '🧪' },
  { name: 'Salt Nic',               slug: 'salt-nic',              emoji: '💧' },
  { name: 'Nicotine Pouches',       slug: 'nicotine-pouches',      emoji: '📦' },
  { name: 'Raw Papers',             slug: 'raw-papers',            emoji: '📜' },
  { name: 'Ashtrays',               slug: 'ashtrays',              emoji: '🪣' },
  { name: 'Accessories',            slug: 'accessories',           emoji: '🔧' },
  { name: 'CBD',                    slug: 'cbd',                   emoji: '🌿' },
  { name: 'Batteries',              slug: 'batteries',             emoji: '⚡' },
  { name: 'Glass',                  slug: 'glass',                 emoji: '🔬' },
]

export default function CategoryNavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center overflow-x-auto scrollbar-hide px-4 gap-1 py-1">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center min-w-[70px] px-3 py-2 rounded-lg
                       text-gray-600 hover:text-brand-primary hover:bg-gray-50
                       transition-colors duration-150 group"
          >
            <span className="text-xl mb-0.5">{cat.emoji}</span>
            <span className="text-[10px] font-medium text-center leading-tight whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        ))}

        {/* Brand Highlights button */}
        <Link
          href="/brands"
          className="ml-auto flex-shrink-0 bg-brand-accent text-white text-xs font-bold
                     px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
        >
          🔥 Brand Highlights
        </Link>
      </div>
    </nav>
  )
}
