'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeatherMap({ city }: { city: string }) {
  const [mapUrl, setMapUrl] = useState('')

  useEffect(() => {
    const fetchMapUrl = async () => {
      try {
        const response = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`)
        const data = await response.json()
        if (data.lat && data.lon) {
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${data.lon-0.1},${data.lat-0.1},${data.lon+0.1},${data.lat+0.1}&layer=mapnik&marker=${data.lat},${data.lon}`)
        }
      } catch (error) {
        console.error('Error fetching map data:', error)
      }
    }

    fetchMapUrl()
  }, [city])

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Weather Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 aspect-video">
        {mapUrl && (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapUrl}
            style={{ border: '1px solid black' }}
          ></iframe>
        )}
      </CardContent>
    </Card>
  )
}

