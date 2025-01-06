import { useState, useEffect } from 'react'

interface WeatherData {
  name: string
  main?: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather?: Array<{
    description: string
  }>
  wind?: {
    speed: number
  }
}

export function useWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch weather data')
        }
        
        setWeather(data)
      } catch (err) {
        console.error('Error fetching weather data:', err)
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading, error }
}

