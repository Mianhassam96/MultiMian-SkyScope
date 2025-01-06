import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to fetch weather data' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error fetching weather data:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

