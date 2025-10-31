import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import ThemeSwitcher from '@/components/ui/cinematic-theme-switcher'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500" />
          <span className="font-semibold text-slate-800">Tathya</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button className="p-2 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300">
            <User className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
    </nav>
  )
}


