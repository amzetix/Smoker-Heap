'use client'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCartStore()
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0)
  const shipping  = subtotal > 150 ? 0 : 9.99
  const total     = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
        <h1 className="text-2xl font-display font-bold text-brand-primary mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some products to get started.</p>
        <Link href="/" className="btn-primary inline-block">← Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-brand-primary">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-gray-500 hover:text-brand-accent transition-colors">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.key} className="card p-4 flex gap-4">
              {/* Image */}
              <Link href={`/product/${item.productSlug}`} className="relative w-20 h-20 flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.productName} fill className="object-contain rounded-lg" sizes="80px" />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📦</div>
                )}
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.productSlug}`}>
                  <h3 className="text-sm font-medium text-gray-800 hover:text-brand-primary line-clamp-2 transition-colors">
                    {item.productName}
                  </h3>
                </Link>
                {item.variantName && (
                  <p className="text-xs text-gray-500 mt-0.5">Variant: {item.variantName}</p>
                )}
                <p className="text-brand-accent font-bold text-sm mt-1">{formatPrice(item.price)}</p>
              </div>

              {/* Qty controls */}
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <button
                  onClick={() => removeItem(item.key)}
                  className="text-gray-300 hover:text-brand-accent transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div>
                  <p className="text-xs text-gray-500 text-right mb-1">
                    {formatPrice(item.price * item.qty)}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-28">
            <h2 className="font-display font-bold text-lg text-brand-primary mb-5 pb-3 border-b border-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Free shipping on orders over $150 (${(150 - subtotal).toFixed(2)} more needed)
                </p>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg text-brand-primary mb-6 pt-3 border-t border-gray-100">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full btn-accent block text-center py-3 rounded-xl font-bold text-base mb-3"
            >
              Proceed to Checkout →
            </Link>
            <Link href="/" className="w-full block text-center text-sm text-gray-500 hover:text-brand-primary transition-colors">
              <ArrowLeft size={14} className="inline mr-1" />
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
              {['🔒 Secure SSL Checkout', '🛡 Age-Verified Platform', '💳 Multiple Payment Methods'].map((b) => (
                <p key={b} className="text-xs text-gray-400 flex items-center gap-1">{b}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
