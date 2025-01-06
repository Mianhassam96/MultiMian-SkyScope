import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
  }

  const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`

  try {
    const geocodeResponse = await fetch(geocodeUrl)
    if (!geocodeResponse.ok) {
      throw new Error(`Geocode API error! status: ${geocodeResponse.status}`)
    }
    const geocodeData = await geocodeResponse.json()

    if (geocodeData.length === 0) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }

    const { lat, lon } = geocodeData[0]
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    const forecastResponse = await fetch(forecastUrl)
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error! status: ${forecastResponse.status}`)
    }
    const forecastData = await forecastResponse.json()

    if (!forecastData.list || !Array.isArray(forecastData.list)) {
      throw new Error('Invalid forecast data received from API')
    }

    // Process the forecast data to get daily forecasts
    const dailyForecasts = forecastData.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 5)

    return NextResponse.json({ daily: dailyForecasts })
  } catch (error) {
    console.error('Unexpected error fetching forecast data:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

