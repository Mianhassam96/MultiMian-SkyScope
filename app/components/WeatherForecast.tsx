'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react'

interface ForecastData {
  dt: number
  main: { temp: number }
  weather: Array<{ main: string, description: string }>
}

export default function WeatherForecast({ city }: { city: string }) {
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        if (!data.daily || !Array.isArray(data.daily)) {
          throw new Error('Invalid forecast data received')
        }
        setForecast(data.daily)
        setError(null)
      } catch (error) {
        console.error('Error fetching forecast:', error)
        setError('Failed to fetch forecast data. Please try again later.')
      }
    }

    fetchForecast()
  }, [city])

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {forecast.length > 0 ? (
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day) => (
              <div key={day.dt} className="text-center">
                <p className="font-semibold">{formatDate(day.dt)}</p>
                {getWeatherIcon(day.weather[0].main)}
                <p className="text-sm">{Math.round(day.main.temp)}°C</p>
                <p className="text-xs text-gray-500">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading forecast data...</p>
        )}
      </CardContent>
    </Card>
  )
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString([], { weekday: 'short' })
}

function getWeatherIcon(weatherMain: string) {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return <Sun className="h-8 w-8 mx-auto text-yellow-400" />
    case 'clouds':
      return <Cloud className="h-8 w-8 mx-auto text-gray-400" />
    case 'rain':
      return <CloudRain className="h-8 w-8 mx-auto text-blue-400" />
    case 'snow':
      return <CloudSnow className="h-8 w-8 mx-auto text-blue-200" />
    case 'thunderstorm':
      return <CloudLightning className="h-8 w-8 mx-auto text-yellow-600" />
    default:
      return <Cloud className="h-8 w-8 mx-auto text-gray-400" />
  }
}

