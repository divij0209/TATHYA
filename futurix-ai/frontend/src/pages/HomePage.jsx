import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Hero } from '@/components/ui/animated-hero'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}


