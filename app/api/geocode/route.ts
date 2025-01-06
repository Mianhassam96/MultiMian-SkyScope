import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    const { lat, lon } = data[0]
    return NextResponse.json({ lat, lon })
  } catch (error) {
    console.error('Unexpected error fetching geocode data:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

