'use client'

import { useState } from 'react'
import WeatherInfo from './components/WeatherInfo'
import WeatherMap from './components/WeatherMap'
import WeatherForecast from './components/WeatherForecast'

export default function Home() {
  const [city, setCity] = useState('London')

  const handleCityChange = (newCity: string) => {
    setCity(newCity)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white shadow-text">MultiMian SkyScope Weather</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherInfo onCityChange={handleCityChange} />
        <div className="space-y-8">
          <WeatherMap city={city} />
          <WeatherForecast city={city} />
        </div>
      </div>
    </div>
  )
}

