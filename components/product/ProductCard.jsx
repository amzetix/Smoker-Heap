'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  const wishlist = useWishlistStore()
  const isWishlisted = wishlist.has(product.id)

  const addItem = useCartStore((s) => s.addItem)
  const mainVariant = product.variants?.[0]

  const displayPrice  = product.salePrice ?? product.basePrice
  const originalPrice = product.salePrice ? product.basePrice : null
  const discount = originalPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null

  return (
    <div
      className="card group relative flex flex-col overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Discount badge */}
      {discount && (
        <div className="absolute top-2 left-2 z-10 bg-brand-accent text-white text-xs font-bold px-2 py-0.5 rounded">
          -{discount}%
        </div>
      )}

      {/* New arrival badge */}
      {product.isNewArrival && !discount && (
        <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
          NEW
        </div>
      )}

      {/* Action icons (hover) */}
      <div className={`absolute top-2 right-2 z-10 flex flex-col gap-1.5 transition-all duration-200
                       ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); wishlist.toggle(product.id) }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors
                      ${isWishlisted ? 'bg-brand-accent text-white' : 'bg-white text-gray-500 hover:text-brand-accent'}`}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view */}
        <Link
          href={`/product/${product.slug}`}
          className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-brand-primary
                     flex items-center justify-center shadow-md transition-colors"
        >
          <Eye size={14} />
        </Link>
      </div>

      {/* Product image */}
      <Link href={`/product/${product.slug}`} className="block relative bg-gray-50 overflow-hidden">
        <div className="aspect-square relative">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
              📦
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Price */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-brand-accent font-bold text-base">
            {formatPrice(displayPrice)}
          </span>
          {originalPrice && (
            <span className="text-gray-400 text-xs line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xs font-medium text-gray-700 leading-snug mb-2 line-clamp-2
                         hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* SKU */}
        {product.sku && (
          <p className="text-[10px] text-gray-400 mb-2">SKU: {product.sku}</p>
        )}

        {/* Category / Brand tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.category?.name && (
            <span className="tag-pill">{product.category.name}</span>
          )}
          {product.brand?.name && (
            <span className="tag-pill text-brand-primary">{product.brand.name}</span>
          )}
        </div>

        {/* Add to cart */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-auto btn-primary w-full text-center flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          View Product
        </Link>
      </div>
    </div>
  )
}
