import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export default function useApiClient(requestFn) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const send = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const res = await requestFn(...args)
      return res
    } catch (err) {
      const detail = err?.response?.data?.detail || err.message || 'Request failed'
      toast.error(typeof detail === 'string' ? detail : JSON.stringify(detail))
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [requestFn])

  return { loading, error, send }
}


