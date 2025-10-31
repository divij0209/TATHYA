import { NavLink } from 'react-router-dom'
import { FileCheck2, BarChart3, FileSearch2 } from 'lucide-react'

const linkBase = 'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300'

export default function Sidebar() {
  const linkClasses = ({ isActive }) => (
    `${linkBase} ${isActive ? 'bg-teal-500 text-white shadow-md' : 'text-slate-700 hover:bg-white hover:shadow-md border border-slate-200 glass-card'}`
  )
  return (
    <aside className="w-64 p-4 space-y-2">
      <NavLink to="/dashboard/verification" className={linkClasses}>
        <FileCheck2 className="w-5 h-5 text-purple-600" />
        <span>Verification</span>
      </NavLink>
      <NavLink to="/dashboard/analytics" className={linkClasses}>
        <BarChart3 className="w-5 h-5 text-purple-600" />
        <span>Analytics</span>
      </NavLink>
      <NavLink to="/dashboard/extractor" className={linkClasses}>
        <FileSearch2 className="w-5 h-5 text-purple-600" />
        <span>Extractor Utility</span>
      </NavLink>
    </aside>
  )
}


