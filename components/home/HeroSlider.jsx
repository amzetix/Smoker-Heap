'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Replace these with real banners from your DB / Cloudinary
const slides = [
  {
    id: 1,
    title: 'Premium Disposables',
    subtitle: 'Up to 40K Puffs — Shop the Best Brands',
    cta: 'Shop Now',
    href: '/category/disposable',
    bg: 'from-blue-900 to-indigo-900',
    badge: 'New Arrival',
  },
  {
    id: 2,
    title: 'Salt Nic E-Liquids',
    subtitle: 'Smooth & Satisfying — Premium Salt Nic Flavors',
    cta: 'Browse Flavors',
    href: '/category/salt-nic',
    bg: 'from-purple-900 to-pink-900',
    badge: 'Best Seller',
  },
  {
    id: 3,
    title: 'Kits & Pod Systems',
    subtitle: 'Top Brands, Best Prices — Complete Starter Kits',
    cta: 'Shop Kits',
    href: '/category/kits-pods',
    bg: 'from-gray-900 to-gray-800',
    badge: 'Hot Deal',
  },
  {
    id: 4,
    title: 'Nicotine Pouches',
    subtitle: 'Smoke-Free, Tobacco-Free — All Top Brands',
    cta: 'Shop Pouches',
    href: '/category/nicotine-pouches',
    bg: 'from-teal-900 to-emerald-900',
    badge: 'Popular',
  },
]

export default function HeroSlider() {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
        style={{ '--swiper-navigation-size': '20px' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative h-[300px] sm:h-[380px] lg:h-[460px] bg-gradient-to-r ${slide.bg} flex items-center`}>
              {/* Content */}
              <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
                <div className="max-w-lg">
                  {slide.badge && (
                    <span className="inline-block bg-brand-accent text-white text-xs font-bold
                                     px-3 py-1 rounded-full mb-3 animate-pulse">
                      {slide.badge}
                    </span>
                  )}
                  <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg mb-6">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-2 bg-brand-accent text-white
                               font-bold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors
                               text-sm sm:text-base"
                  >
                    {slide.cta} →
                  </Link>
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
