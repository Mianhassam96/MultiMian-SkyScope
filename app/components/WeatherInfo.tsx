'use client'

import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import SearchBox from './SearchBox'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Wind, Thermometer, Sun, Sunrise, Sunset } from 'lucide-react'

interface WeatherInfoProps {
  onCityChange: (city: string) => void
}

export default function WeatherInfo({ onCityChange }: WeatherInfoProps) {
  const [city, setCity] = useState('London')
  const { weather, loading, error } = useWeather(city)

  const handleSearch = (newCity: string) => {
    setCity(newCity)
    onCityChange(newCity)
  }

  return (
    <Card className="w-full overflow-hidden bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-2xl font-bold text-center mb-4">Current Weather</CardTitle>
        <SearchBox onSearch={handleSearch} />
      </CardHeader>
      <CardContent className="p-6">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        {weather && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
              <p className="text-6xl font-bold mb-2">
                {weather.main?.temp != null ? `${Math.round(weather.main.temp)}°C` : 'N/A'}
              </p>
              <p className="text-xl capitalize text-gray-600">
                {weather.weather?.[0]?.description || 'No description available'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <WeatherInfoItem icon={<Thermometer className="h-5 w-5 text-orange-500" />} label="Feels Like" value={`${Math.round(weather.main?.feels_like ?? 0)}°C`} />
              <WeatherInfoItem icon={<Droplets className="h-5 w-5 text-blue-500" />} label="Humidity" value={`${weather.main?.humidity ?? 0}%`} />
              <WeatherInfoItem icon={<Wind className="h-5 w-5 text-green-500" />} label="Wind Speed" value={`${weather.wind?.speed ?? 0} m/s`} />
              <WeatherInfoItem icon={<Cloud className="h-5 w-5 text-gray-500" />} label="Pressure" value={`${weather.main?.pressure ?? 0} hPa`} />
              <WeatherInfoItem icon={<Sun className="h-5 w-5 text-yellow-500" />} label="UV Index" value={weather.uvi ?? 'N/A'} />
              <WeatherInfoItem icon={<Sunrise className="h-5 w-5 text-orange-400" />} label="Sunrise" value={formatTime(weather.sys?.sunrise ?? 0)} />
              <WeatherInfoItem icon={<Sunset className="h-5 w-5 text-orange-600" />} label="Sunset" value={formatTime(weather.sys?.sunset ?? 0)} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function WeatherInfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )
}

function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

