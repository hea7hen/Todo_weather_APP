"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchWeather } from "@/lib/features/weather/weatherThunks"
import type { AppDispatch } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CloudRain, Sun, Cloud } from "lucide-react"

interface WeatherDisplayProps {
  weather: any
  loading: boolean
  error: string | null
}

export default function WeatherDisplay({ weather, loading, error }: WeatherDisplayProps) {
  const [city, setCity] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      dispatch(fetchWeather(city))
    }
  }

  const getWeatherIcon = (condition: string) => {
    if (!condition) return <Cloud className="h-12 w-12 text-blue-500" />

    condition = condition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-12 w-12 text-blue-500" />
    } else if (condition.includes("clear") || condition.includes("sun")) {
      return <Sun className="h-12 w-12 text-yellow-500" />
    } else {
      return <Cloud className="h-12 w-12 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-2">
        <Label htmlFor="city">Search City</Label>
        <div className="flex space-x-2">
          <Input id="city" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button type="submit" disabled={loading || !city.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && <div className="p-4 bg-red-50 text-red-500 rounded-md">{error}</div>}

      {!loading && !error && weather && (
        <div className="text-center py-4">
          <h3 className="text-xl font-semibold mb-2 text-black">{weather.location?.name || "Unknown"}</h3>
          <div className="flex justify-center mb-2">{getWeatherIcon(weather.current?.condition?.text)}</div>
          <p className="text-3xl font-bold mb-1 text-white">{weather.current?.temp_c}°C</p>
          <p className="text-sm text-white">{weather.current?.condition?.text}</p>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-muted-foreground">Humidity</p>
              <p className="font-medium text-black">{weather.current?.humidity}%</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-muted-foreground">Wind</p>
              <p className="font-medium text-black">{weather.current?.wind_kph} km/h</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-center text-muted-foreground mt-4">
        <p>Weather data helps you plan tasks that might be affected by weather conditions.</p>
      </div>
    </div>
  )
}

