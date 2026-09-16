'use client'
import { useWishlistStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const { ids } = useWishlistStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ids.length) return
    setLoading(true)
    Promise.all(ids.map((id) => fetch(`/api/products/id/${id}`).then((r) => r.json())))
      .then((data) => setProducts(data.filter((p) => p && !p.error)))
      .finally(() => setLoading(false))
  }, [ids])

  if (!ids.length) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <Heart size={64} className="mx-auto text-gray-200 mb-4" />
        <h1 className="text-2xl font-display font-bold text-brand-primary mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-6">Save products you love by clicking the ♡ icon.</p>
        <Link href="/" className="btn-primary inline-block">← Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold text-brand-primary mb-6">
        My Wishlist <span className="text-gray-400 font-normal text-lg">({ids.length})</span>
      </h1>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {ids.map((id) => (
            <div key={id} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
