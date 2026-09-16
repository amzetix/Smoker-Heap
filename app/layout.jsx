import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: {
    default: 'Smoker Heap — Premium Vaping & Smoking Products',
    template: '%s | Smoker Heap',
  },
  description:
    'Shop premium disposables, kits, pods, e-liquids, salt nic, nicotine pouches, raw papers, and more at the best prices.',
  keywords: ['disposable vape', 'e-liquid', 'salt nic', 'nicotine pouches', 'vaping', 'kits pods'],
  openGraph: {
    title: 'Smoker Heap',
    description: 'Premium Vaping & Smoking Products',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
