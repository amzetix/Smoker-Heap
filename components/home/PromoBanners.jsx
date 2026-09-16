import Link from 'next/link'

const banners = [
  {
    id: 1,
    title: 'Disposables Mega Sale',
    subtitle: 'Up to 30% off on all top brands',
    cta: 'Shop Disposables',
    href: '/category/disposable',
    bg: 'from-blue-900 via-blue-800 to-indigo-900',
    full: true,
  },
  {
    id: 2,
    title: 'Salt Nic Liquids',
    subtitle: '60ml & 100ml bottles from top brands',
    cta: 'Shop Salt Nic',
    href: '/category/salt-nic',
    bg: 'from-purple-900 to-pink-900',
    full: false,
  },
  {
    id: 3,
    title: 'Lil\' MFs & Mushroom',
    subtitle: 'Specialty gummies & botanicals',
    cta: 'Explore Now',
    href: '/category/accessories',
    bg: 'from-teal-900 to-emerald-800',
    full: false,
  },
]

function BannerCard({ banner }) {
  return (
    <Link
      href={banner.href}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.bg}
                  flex items-center p-8 group hover:shadow-2xl transition-shadow duration-300
                  ${banner.full ? 'h-48' : 'h-44'}`}
    >
      <div className="relative z-10">
        <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-2">
          {banner.title}
        </h3>
        <p className="text-white/80 text-sm mb-5">{banner.subtitle}</p>
        <span className="inline-block bg-white text-brand-primary font-bold text-sm
                         px-5 py-2 rounded-full group-hover:bg-brand-accent group-hover:text-white
                         transition-colors duration-200">
          {banner.cta} →
        </span>
      </div>
      {/* Decorative shapes */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full
                       translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute right-10 bottom-0 w-40 h-40 bg-white/5 rounded-full
                       translate-x-0 translate-y-10 group-hover:scale-110 transition-transform duration-500" />
    </Link>
  )
}

export default function PromoBanners() {
  const [full, ...halves] = banners
  return (
    <section className="py-8 px-4 max-w-screen-2xl mx-auto space-y-4">
      {/* Full-width banner */}
      <BannerCard banner={full} />

      {/* Half banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {halves.map((b) => (
          <BannerCard key={b.id} banner={b} />
        ))}
      </div>
    </section>
  )
}
