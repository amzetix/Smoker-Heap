'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Copy, Check, ShoppingCart, Heart, Minus, Plus } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

// ── Variant row component ─────────────────────────────────────
function VariantRow({ variant, qty, onQtyChange }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-2.5 px-3 text-sm font-medium text-gray-800">{variant.name}</td>
      <td className="py-2.5 px-3">
        <span className="text-brand-accent font-bold text-sm">{formatPrice(variant.price)}</span>
      </td>
      <td className="py-2.5 px-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          variant.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}>
          {variant.stock > 0 ? variant.stock : 'Out of Stock'}
        </span>
      </td>
      <td className="py-2.5 px-3">
        {variant.stock > 0 ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onQtyChange(Math.max(0, qty - 1))}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center
                         text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => onQtyChange(Math.min(variant.stock, qty + 1))}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center
                         text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
    </tr>
  )
}

// ── Main product page (client component for interactivity) ────
export default function ProductPage({ params }) {
  const [product, setProduct]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantities, setQuantities]   = useState({})
  const [skuCopied, setSkuCopied]     = useState(false)
  const [added, setAdded]             = useState(false)

  const addItem    = useCartStore((s) => s.addItem)
  const wishlist   = useWishlistStore()

  // Resolve params (Next.js 15)
  const [slug, setSlug] = useState(null)
  useEffect(() => {
    params.then?.((p) => setSlug(p.slug)).catch(() => {})
    if (typeof params.slug === 'string') setSlug(params.slug)
  }, [params])

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data)
        const init = {}
        data.variants?.forEach((v) => { init[v.id] = 0 })
        setQuantities(init)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const handleQtyChange = (variantId, qty) => {
    setQuantities((prev) => ({ ...prev, [variantId]: qty }))
  }

  const subtotal = product?.variants?.reduce((sum, v) => {
    return sum + (quantities[v.id] ?? 0) * v.price
  }, 0) ?? 0

  const handleAddToCart = () => {
    if (!product) return
    let added = false
    product.variants?.forEach((v) => {
      const qty = quantities[v.id] ?? 0
      if (qty > 0) {
        addItem(product, v, qty)
        added = true
      }
    })
    if (!added && product.variants?.length === 0) {
      addItem(product, null, 1)
    }
    if (added || product.variants?.length === 0) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  const copySku = () => {
    if (product?.sku) {
      navigator.clipboard.writeText(product.sku)
      setSkuCopied(true)
      setTimeout(() => setSkuCopied(false), 1500)
    }
  }

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-10 bg-gray-200 rounded w-1/2" />
              <div className="h-48 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
        <Link href="/" className="btn-primary mt-4 inline-block">← Back to Home</Link>
      </div>
    )
  }

  const displayPrice  = product.salePrice ?? product.basePrice
  const originalPrice = product.salePrice ? product.basePrice : null
  const isWishlisted  = wishlist.has(product.id)

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-primary">Home</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link href={`/category/${product.category.slug}`} className="hover:text-brand-primary uppercase text-xs">
              {product.category.name}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-gray-800 font-medium text-xs line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ── Left: Image gallery ─────────────────────── */}
        <div>
          {/* Main image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-3">
            {product.images?.[activeImage] ? (
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200 text-8xl">📦</div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-brand-primary' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-1" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product info ─────────────────────── */}
        <div>
          {/* Warning notice */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-4 text-sm text-amber-800">
            ⚠️ <span>Please note: All purchases are final and non-refundable.</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.isNewArrival && (
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">NEW ARRIVAL</span>
            )}
            {product.category && (
              <Link href={`/category/${product.category.slug}`}>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-gray-200 transition-colors uppercase">
                  {product.category.name}
                </span>
              </Link>
            )}
            {product.isMadeInUSA && (
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">🇺🇸 MADE IN USA</span>
            )}
            {product.isClearance && (
              <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2.5 py-0.5 rounded-full">CLEARANCE</span>
            )}
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Brand: </span>
              <Link
                href={`/brand/${product.brand.slug}`}
                className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold
                           px-2.5 py-0.5 rounded hover:bg-brand-primary hover:text-white transition-colors"
              >
                {product.brand.name}
              </Link>
            </div>
          )}

          {/* Product title */}
          <h1 className="font-display font-bold text-xl sm:text-2xl text-brand-primary leading-tight mb-3">
            {product.name}
          </h1>

          {/* SKU */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">SKU:</span>
            <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
              {product.sku}
            </code>
            <button onClick={copySku} className="text-gray-400 hover:text-brand-primary transition-colors">
              {skuCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-brand-accent font-bold text-3xl">{formatPrice(displayPrice)}</span>
            {originalPrice && (
              <span className="text-gray-400 text-lg line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>

          {/* ── Variants table ──────────────────────────── */}
          {product.variants?.length > 0 && (
            <div className="mb-5">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-brand-primary text-white">
                      <th className="py-2.5 px-3 text-xs font-semibold uppercase tracking-wide">Flavor / Variant</th>
                      <th className="py-2.5 px-3 text-xs font-semibold uppercase tracking-wide">Price</th>
                      <th className="py-2.5 px-3 text-xs font-semibold uppercase tracking-wide">Stock</th>
                      <th className="py-2.5 px-3 text-xs font-semibold uppercase tracking-wide">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((v) => (
                      <VariantRow
                        key={v.id}
                        variant={v}
                        qty={quantities[v.id] ?? 0}
                        onQtyChange={(q) => handleQtyChange(v.id, q)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtotal + actions */}
          <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
              <p className="text-2xl font-bold text-brand-primary">{formatPrice(subtotal)}</p>
            </div>
            <button
              onClick={() => { const init = {}; product.variants?.forEach((v) => { init[v.id] = 0 }); setQuantities(init) }}
              className="text-sm text-gray-500 hover:text-brand-accent transition-colors underline"
            >
              Clear
            </button>
          </div>

          {/* Add to cart + wishlist */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={subtotal === 0 && product.variants?.length > 0}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl
                          transition-all duration-200 text-sm
                          ${added
                            ? 'bg-green-600 text-white'
                            : subtotal === 0 && product.variants?.length > 0
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-brand-primary text-white hover:bg-brand-navy'
                          }`}
            >
              {added ? (
                <><Check size={16} /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={16} /> Add to Cart</>
              )}
            </button>

            <button
              onClick={() => wishlist.toggle(product.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors
                          ${isWishlisted
                            ? 'border-brand-accent bg-brand-accent text-white'
                            : 'border-gray-200 text-gray-500 hover:border-brand-accent hover:text-brand-accent'
                          }`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6 pt-5 border-t border-gray-200">
              <h3 className="font-semibold text-sm text-brand-primary mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
