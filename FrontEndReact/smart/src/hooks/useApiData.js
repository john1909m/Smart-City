import { useState, useEffect, useCallback } from 'react'

const API_BASE = '/api'

export const useApiData = (endpoint, refreshInterval = 5000) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const result = await response.json()
      setData(Array.isArray(result) ? result : [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error(`Error fetching ${endpoint}:`, err)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return { data, loading, error, refetch: fetchData }
}