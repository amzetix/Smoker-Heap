import Link from 'next/link'

const categories = [
  { name: 'Disposable',       slug: 'disposable',       emoji: '💨', desc: 'Up to 40K puffs',    span: 'lg:col-span-2 lg:row-span-2', big: true },
  { name: 'Kits & Pods',      slug: 'kits-pods',        emoji: '🔋', desc: 'Starter kits' },
  { name: 'Vaporizers',       slug: 'vaporizers',       emoji: '🌬️', desc: 'Premium devices' },
  { name: 'E-Liquids',        slug: 'e-liquids',        emoji: '🧪', desc: '60ml & 100ml' },
  { name: 'Salt Nic',         slug: 'salt-nic',         emoji: '💧', desc: 'Smooth & satisfying' },
  { name: 'Nicotine Pouches', slug: 'nicotine-pouches', emoji: '📦', desc: 'Smoke-free nic' },
  { name: 'Raw Papers',       slug: 'raw-papers',       emoji: '📜', desc: 'Rolling papers' },
  { name: 'Ashtrays',         slug: 'ashtrays',         emoji: '🪣', desc: 'Glass & ceramic' },
  { name: 'Accessories',      slug: 'accessories',      emoji: '🔧', desc: 'All accessories' },
  { name: 'CBD',              slug: 'cbd',              emoji: '🌿', desc: 'Full spectrum' },
  { name: 'Batteries',        slug: 'batteries',        emoji: '⚡', desc: '510 thread & more' },
  { name: 'Glass',            slug: 'glass',            emoji: '🔬', desc: 'Premium glass' },
]

const colors = [
  'from-blue-900 to-indigo-800',
  'from-purple-900 to-violet-800',
  'from-teal-900 to-emerald-800',
  'from-rose-900 to-red-800',
  'from-amber-900 to-orange-800',
  'from-cyan-900 to-blue-800',
  'from-lime-900 to-green-800',
  'from-fuchsia-900 to-pink-800',
  'from-gray-800 to-gray-700',
  'from-emerald-900 to-teal-800',
  'from-yellow-900 to-amber-800',
  'from-sky-900 to-cyan-800',
]

export default function CategoryGrid() {
  return (
    <section className="py-10 px-4 max-w-screen-2xl mx-auto">
      <h2 className="section-heading mb-6">
        Shop By <span>Category</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors[i]}
                        flex flex-col items-center justify-center text-white text-center
                        transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl
                        ${cat.big ? 'lg:col-span-2 lg:row-span-2 p-8' : 'p-5'}
                        aspect-square`}
          >
            <span className={`${cat.big ? 'text-6xl mb-3' : 'text-4xl mb-2'}`}>{cat.emoji}</span>
            <h3 className={`font-display font-bold leading-tight ${cat.big ? 'text-2xl' : 'text-sm'}`}>
              {cat.name}
            </h3>
            {cat.desc && (
              <p className={`text-white/70 mt-1 ${cat.big ? 'text-base' : 'text-xs'}`}>
                {cat.desc}
              </p>
            )}
            {cat.big && (
              <span className="mt-4 inline-block bg-white text-brand-primary font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition-colors">
                Shop Now →
              </span>
            )}
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  )
}
