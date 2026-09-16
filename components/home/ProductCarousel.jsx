'use client'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import ProductCard from '@/components/product/ProductCard'
import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductCarousel({ title, accentWord, products = [], viewAllHref = '/', autoplay = false }) {
  if (!products.length) return null

  return (
    <section className="py-8 px-4 max-w-screen-2xl mx-auto">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-heading">
          {title.replace(accentWord, '')}
          <span> {accentWord}</span>
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-brand-primary hover:text-brand-accent
                     transition-colors flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      <Swiper
        modules={[Navigation, ...(autoplay ? [Autoplay] : [])]}
        navigation
        spaceBetween={12}
        slidesPerView={2}
        autoplay={autoplay ? { delay: 3500, disableOnInteraction: false } : false}
        breakpoints={{
          480:  { slidesPerView: 2 },
          640:  { slidesPerView: 3 },
          768:  { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="!pb-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
