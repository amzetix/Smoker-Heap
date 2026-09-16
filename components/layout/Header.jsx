'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, User, Menu, X, MessageCircle, ChevronDown } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import CategoryNavBar from './CategoryNavBar'
import FilterTagsBar from './FilterTagsBar'

const allCategories = [
  'Disposable', 'Kits & Pods', 'Vaporizers', 'E-Liquids',
  'Salt Nic', 'Nicotine Pouches', 'Raw Papers', 'Ashtrays',
  'Accessories', 'CBD', 'Batteries', 'Glass',
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0))
  const cartTotal = useCartStore((s) => s.items.reduce((t, i) => t + i.price * i.qty, 0))
  const wishlistCount = useWishlistStore((s) => s.ids.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Nicotine Warning */}
      <div className="nicotine-bar">
        THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-4">

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-600 hover:text-brand-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">SH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-brand-primary text-lg leading-tight">
                  SMOKER
                </div>
                <div className="font-display font-bold text-brand-accent text-sm leading-tight tracking-widest">
                  HEAP
                </div>
              </div>
            </div>
          </Link>

          {/* All Categories dropdown */}
          <div className="relative hidden lg:block flex-shrink-0">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center gap-2 bg-brand-primary text-white font-semibold
                         text-sm px-4 py-2.5 rounded-lg hover:bg-brand-navy transition-colors"
            >
              <Menu size={16} />
              All Categories
              <ChevronDown size={14} className={`transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoryOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200
                              rounded-xl shadow-xl z-50 py-2 animate-fade-in">
                {allCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                    onClick={() => setCategoryOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50
                               hover:text-brand-primary transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="w-full border-2 border-gray-200 rounded-lg pl-4 pr-12 py-2.5
                           text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-brand-primary text-white
                           rounded-r-lg hover:bg-brand-navy transition-colors"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* WhatsApp community */}
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex flex-col items-center text-brand-green hover:opacity-80 transition-opacity"
            >
              <MessageCircle size={20} />
              <span className="text-[10px] font-medium">Community</span>
            </a>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex flex-col items-center text-gray-600 hover:text-brand-accent transition-colors">
              <Heart size={20} />
              <span className="text-[10px] font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px]
                                 font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link href="/account" className="hidden sm:flex flex-col items-center text-gray-600 hover:text-brand-primary transition-colors">
              <User size={20} />
              <span className="text-[10px] font-medium">Account</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-brand-primary text-white
                         px-3 py-2 rounded-lg hover:bg-brand-navy transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px]
                                   font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-gray-300">CART</div>
                <div className="text-sm font-bold leading-tight">
                  ${cartTotal.toFixed(2)}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 py-2 px-4 bg-white animate-slide-up">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-brand-primary"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </button>
              </div>
            </form>
            <div className="grid grid-cols-2 gap-1">
              {allCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-gray-700 hover:text-brand-primary py-1.5 px-2 rounded hover:bg-gray-50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category nav bar */}
      <CategoryNavBar />

      {/* Filter tags sub-bar */}
      <FilterTagsBar />
    </header>
  )
}
