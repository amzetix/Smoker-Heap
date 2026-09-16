import { prisma } from '@/lib/prisma'
import HeroSlider from '@/components/home/HeroSlider'
import CategoryGrid from '@/components/home/CategoryGrid'
import ProductCarousel from '@/components/home/ProductCarousel'
import PromoBanners from '@/components/home/PromoBanners'

async function getHomeData() {
  try {
    const [newArrivals, hotDeals, disposables] = await Promise.all([
      prisma.product.findMany({
        where:   { isNewArrival: true, isActive: true },
        include: { category: true, brand: true, variants: { take: 1 } },
        orderBy: { createdAt: 'desc' },
        take: 12,
      }),
      prisma.product.findMany({
        where:   { salePrice: { not: null }, isActive: true },
        include: { category: true, brand: true, variants: { take: 1 } },
        orderBy: { createdAt: 'desc' },
        take: 12,
      }),
      prisma.product.findMany({
        where:   { category: { slug: 'disposable' }, isActive: true },
        include: { category: true, brand: true, variants: { take: 1 } },
        orderBy: { createdAt: 'desc' },
        take: 12,
      }),
    ])
    return { newArrivals, hotDeals, disposables }
  } catch {
    // DB not connected yet — return empty arrays (site still renders)
    return { newArrivals: [], hotDeals: [], disposables: [] }
  }
}

export default async function HomePage() {
  const { newArrivals, hotDeals, disposables } = await getHomeData()

  return (
    <div>
      {/* Hero slider */}
      <HeroSlider />

      {/* Latest New Arrivals */}
      <ProductCarousel
        title="Latest New Arrivals"
        accentWord="Arrivals"
        products={newArrivals}
        viewAllHref="/category/new-arrivals"
        autoplay
      />

      {/* Promo banners */}
      <PromoBanners />

      {/* Shop By Category grid */}
      <CategoryGrid />

      {/* Today's Hot Deals */}
      <ProductCarousel
        title="Today's Hot Deals"
        accentWord="Deals"
        products={hotDeals}
        viewAllHref="/category/discounts"
      />

      {/* Disposables */}
      <ProductCarousel
        title="Top Disposables"
        accentWord="Disposables"
        products={disposables}
        viewAllHref="/category/disposable"
      />
    </div>
  )
}
