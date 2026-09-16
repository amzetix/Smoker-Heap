'use client'

const messages = [
  '★ All Sales Are Final',
  '★ No Returns',
  '★ No Exchanges',
  '★ Free Shipping on Orders Over $150',
  '★ Age Verification Required',
  '★ Wholesale Prices for Retailers',
]

export default function MarqueeBar() {
  const repeated = [...messages, ...messages, ...messages]
  return (
    <div className="bg-brand-primary text-gray-300 text-xs py-1.5 overflow-hidden whitespace-nowrap">
      <div className="marquee-track">
        {repeated.map((msg, i) => (
          <span key={i} className="mx-6 font-medium">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
