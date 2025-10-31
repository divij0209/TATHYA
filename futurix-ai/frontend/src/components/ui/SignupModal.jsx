import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function SignupModal() {
  const { showSignupModal, closeSignupModal, signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  if (!showSignupModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Minimal validation
    if (!email) return
    // call signUp (would connect to backend)
    signUp({ name, email })
    // navigate to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={closeSignupModal} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign up for TATHYA</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2" required />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeSignupModal} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
