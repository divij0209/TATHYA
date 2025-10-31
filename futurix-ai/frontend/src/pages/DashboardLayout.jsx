import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import Chatbot from '../components/core/Chatbot'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-6 py-6">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <Outlet />
          <Footer />
        </main>
      </div>
      <Chatbot />
    </div>
  )
}


