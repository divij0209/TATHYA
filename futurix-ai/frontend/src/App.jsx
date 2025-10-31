import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardLayout from './pages/DashboardLayout'
import VerificationPage from './pages/VerificationPage'
import ExtractorPage from './pages/ExtractorPage'
import AnalyticsPage from './pages/AnalyticsPage'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import SignupModal from './components/ui/SignupModal'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SignupModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardLayout />}> 
            <Route index element={<Navigate to="verification" replace />} />
            <Route path="verification" element={<VerificationPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="extractor" element={<ExtractorPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}


