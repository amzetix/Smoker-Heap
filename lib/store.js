import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, qty = 1) => {
        const { items } = get()
        const key = `${product.id}-${variant?.id ?? 'default'}`
        const existing = items.find((i) => i.key === key)
        if (existing) {
          set({ items: items.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i) })
        } else {
          set({ items: [...items, { key, productId: product.id, productName: product.name, productSlug: product.slug, image: product.images?.[0] ?? '', variantId: variant?.id ?? null, variantName: variant?.name ?? null, price: variant?.price ?? product.salePrice ?? product.basePrice, qty }] })
        }
      },
      updateQty: (key, qty) => {
        if (qty < 1) { get().removeItem(key); return }
        set({ items: get().items.map((i) => (i.key === key ? { ...i, qty } : i)) })
      },
      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),
      clearCart: () => set({ items: [] }),
      get total() { return get().items.reduce((sum, i) => sum + i.price * i.qty, 0) },
      get count() { return get().items.reduce((sum, i) => sum + i.qty, 0) },
    }),
    { name: 'smoker-heap-cart' }
  )
)

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const { ids } = get()
        if (ids.includes(productId)) { set({ ids: ids.filter((id) => id !== productId) }) }
        else { set({ ids: [...ids, productId] }) }
      },
      has: (productId) => get().ids.includes(productId),
    }),
    { name: 'smoker-heap-wishlist' }
  )
)
