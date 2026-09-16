import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { ChevronRight, LayoutGrid, List } from 'lucide-react'

export async function generateMetadata({ params }) {
  const { slug } = await params
  return {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }
}

async function getCategoryData(slug) {
  try {
    const category = await prisma.category.findUnique({
      where:   { slug },
      include: { children: true },
    })
    if (!category) return null

    const products = await prisma.product.findMany({
      where:   { category: { slug }, isActive: true },
      include: { category: true, brand: true, variants: { take: 1 } },
      orderBy: { createdAt: 'desc' },
    })

    const brands = await prisma.brand.findMany({
      where:   { products: { some: { category: { slug } } } },
      orderBy: { name: 'asc' },
    })

    return { category, products, brands }
  } catch {
    return null
  }
}

const SORT_OPTIONS = [
  { label: 'Latest',        value: 'latest' },
  { label: 'Price: Low–High', value: 'price-asc' },
  { label: 'Price: High–Low', value: 'price-desc' },
  { label: 'Name A–Z',      value: 'name-asc' },
]

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params
  const sp = await searchParams

  const data = await getCategoryData(slug)

  // Fallback for slugs that aren't in DB yet
  const categoryName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const products = data?.products ?? []
  const brands   = data?.brands   ?? []

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">{data?.category?.name ?? categoryName}</span>
      </nav>

      <div className="flex gap-6">
        {/* ── Sidebar ─────────────────────────────────── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          {/* Sub-categories */}
          {(data?.category?.children?.length ?? 0) > 0 && (
            <div className="card p-4 mb-4">
              <h3 className="font-semibold text-sm text-brand-primary mb-3 uppercase tracking-wide">
                Sub-Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/category/${slug}`}
                    className="text-sm text-brand-accent font-medium block py-1.5 px-2 rounded hover:bg-gray-50"
                  >
                    All {data?.category?.name}
                  </Link>
                </li>
                {data?.category?.children?.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={`/category/${sub.slug}`}
                      className="text-sm text-gray-600 hover:text-brand-primary block py-1.5 px-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Brands */}
          {brands.length > 0 && (
            <div className="card p-4">
              <h3 className="font-semibold text-sm text-brand-primary mb-3 uppercase tracking-wide">
                Brands in This Category
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brand/${brand.slug}`}
                    className="text-xs bg-gray-100 hover:bg-brand-primary hover:text-white
                               text-gray-600 px-2.5 py-1 rounded-full transition-colors font-medium"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── Main content ─────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary
                               text-xs font-semibold px-3 py-1 rounded-full">
                {data?.category?.name ?? categoryName}
                <button className="ml-1 hover:text-brand-accent">×</button>
              </span>
              <span className="text-sm text-gray-500">{products.length} products</span>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5
                           focus:outline-none focus:border-brand-primary text-gray-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* Grid / list toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button className="p-1.5 bg-brand-primary text-white">
                  <LayoutGrid size={16} />
                </button>
                <button className="p-1.5 text-gray-500 hover:bg-gray-50">
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-lg font-medium">No products yet in this category.</p>
              <p className="text-sm mt-1">Products will appear here once added from the admin panel.</p>
              <Link href="/" className="mt-5 inline-block btn-primary">
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
