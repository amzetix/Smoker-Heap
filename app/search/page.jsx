import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams
  return { title: `Search: "${sp.q ?? ''}"` }
}

async function searchProducts(q) {
  if (!q) return []
  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { sku:  { contains: q, mode: 'insensitive' } },
          { brand: { name: { contains: q, mode: 'insensitive' } } },
          { category: { name: { contains: q, mode: 'insensitive' } } },
        ],
      },
      include: { category: true, brand: true, variants: { take: 1 } },
      orderBy: { createdAt: 'desc' },
      take: 40,
    })
  } catch { return [] }
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams
  const q = sp.q ?? ''
  const products = await searchProducts(q)

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold text-brand-primary mb-1">
        Search results for: <span className="text-brand-accent">"{q}"</span>
      </h1>
      <p className="text-gray-500 text-sm mb-6">{products.length} product{products.length !== 1 ? 's' : ''} found</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg font-medium">No products found for "{q}"</p>
          <Link href="/" className="mt-5 inline-block btn-primary">← Back to Home</Link>
        </div>
      )}
    </div>
  )
}
