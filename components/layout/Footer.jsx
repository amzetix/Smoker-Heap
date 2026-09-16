import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, MessageCircle, Shield, Lock, DollarSign } from 'lucide-react'

const shopCategories = [
  { name: 'Disposable',       slug: 'disposable' },
  { name: 'Kits & Pods',      slug: 'kits-pods' },
  { name: 'Vaporizers',       slug: 'vaporizers' },
  { name: 'E-Liquids',        slug: 'e-liquids' },
  { name: 'Salt Nic',         slug: 'salt-nic' },
  { name: 'Nicotine Pouches', slug: 'nicotine-pouches' },
  { name: 'Raw Papers',       slug: 'raw-papers' },
  { name: 'Ashtrays',         slug: 'ashtrays' },
  { name: '$ Dollar Sale',    slug: 'dollar-sale' },
  { name: 'Clearance',        slug: 'clearance' },
  { name: 'New Arrivals',     slug: 'new-arrivals' },
]

const accountLinks = [
  { name: 'My Account',  href: '/account' },
  { name: 'My Orders',   href: '/account/orders' },
  { name: 'Wishlist',    href: '/wishlist' },
  { name: 'Track Order', href: '/account/track' },
]

const supportLinks = [
  { name: 'About Us',          href: '/about' },
  { name: "FAQ's",             href: '/faqs' },
  { name: 'Shipping Policy',   href: '/shipping-policy' },
  { name: 'Return Policy',     href: '/return-policy' },
  { name: 'Terms & Conditions',href: '/terms' },
  { name: 'Privacy Policy',    href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-gray-300">
      {/* Main footer */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">SH</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">SMOKER</div>
                <div className="font-display font-bold text-brand-accent text-sm leading-tight tracking-widest">HEAP</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Your one-stop shop for premium vaping products, disposables, e-liquids, nicotine pouches, and smoking accessories.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold
                         text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={16} />
              Join Our Community
            </a>
          </div>

          {/* Column 2 — Shop By Category */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">
              Shop By Category
            </h3>
            <ul className="space-y-2">
              {shopCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-brand-accent">›</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — My Account */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">
              My Account
            </h3>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-brand-accent">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">
              Company & Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-brand-accent">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Get In Touch */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-brand-accent" />
                </div>
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-brand-accent" />
                </div>
                <a href="mailto:info@smokerheap.com" className="text-sm text-gray-400 hover:text-white transition-colors break-all">
                  info@smokerheap.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-brand-accent" />
                </div>
                <span className="text-sm text-gray-400">
                  Your Address,<br />City, State ZIP
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-brand-accent" />
                </div>
                <span className="text-sm text-gray-400">
                  Mon–Fri: 9am–6pm<br />Sat: 10am–4pm (CST)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Shield size={22} className="text-brand-accent" />
                <div>
                  <div className="text-white text-sm font-semibold">Age-Verified Sales Only</div>
                  <div className="text-gray-500 text-xs">We care about your safety</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock size={22} className="text-brand-accent" />
                <div>
                  <div className="text-white text-sm font-semibold">Secure Checkout (SSL)</div>
                  <div className="text-gray-500 text-xs">Your data is always protected</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign size={22} className="text-brand-accent" />
                <div>
                  <div className="text-white text-sm font-semibold">Best Prices Guaranteed</div>
                  <div className="text-gray-500 text-xs">Competitive retail pricing</div>
                </div>
              </div>
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs mr-2">WE ACCEPT</span>
              {['VISA', 'MC', 'PAYPAL', 'AMEX'].map((p) => (
                <div
                  key={p}
                  className="bg-white text-brand-primary text-[10px] font-bold px-2 py-1 rounded"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Smoker Heap. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms'], ['Shipping Policy', '/shipping-policy']].map(([label, href]) => (
              <Link key={href} href={href} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
