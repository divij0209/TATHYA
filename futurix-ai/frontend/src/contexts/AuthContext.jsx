import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [signedUp, setSignedUp] = useState(() => {
    try {
      return localStorage.getItem('signedUp') === 'true'
    } catch (e) {
      return false
    }
  })

  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('signedUp', signedUp ? 'true' : 'false')
    } catch (e) {}
  }, [signedUp])

  const signUp = (data) => {
    // In a real app you'd call backend here. We'll just persist the flag.
    setSignedUp(true)
    setShowSignupModal(false)
  }

  const value = {
    signedUp,
    signUp,
    showSignupModal,
    openSignupModal: () => setShowSignupModal(true),
    closeSignupModal: () => setShowSignupModal(false),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
