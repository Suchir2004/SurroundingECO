"use client"

import { Sun, Cloud, CloudRain, Thermometer, Droplets, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SensorData } from "@/hooks/use-sensor-data"

interface StatusHeroProps {
  data: SensorData | null
}

function getWeatherInfo(temp: number, humidity: number) {
  if (humidity > 80) {
    return {
      condition: "Rainy",
      icon: CloudRain,
      iconColor: "text-blue",
      description: "High humidity detected",
    }
  }
  if (humidity > 60 || temp < 20) {
    return {
      condition: "Cloudy",
      icon: Cloud,
      iconColor: "text-muted-foreground",
      description: "Moderate conditions",
    }
  }
  return {
    condition: "Clear",
    icon: Sun,
    iconColor: "text-amber",
    description: "Optimal weather",
  }
}

function getComfortInfo(temp: number, humidity: number) {
  if (temp > 30 && humidity > 70) {
    return { level: "Poor", color: "text-rose", bg: "bg-rose/10" }
  }
  if (temp < 18) {
    return { level: "Cold", color: "text-blue", bg: "bg-blue/10" }
  }
  if (humidity < 30) {
    return { level: "Dry", color: "text-amber", bg: "bg-amber/10" }
  }
  if (temp >= 18 && temp <= 26 && humidity >= 30 && humidity <= 70) {
    return { level: "Excellent", color: "text-emerald", bg: "bg-emerald/10" }
  }
  return { level: "Good", color: "text-cyan", bg: "bg-cyan/10" }
}

export function StatusHero({ data }: StatusHeroProps) {
  if (!data) {
    return (
      <div className="card-base rounded-2xl p-8 animate-pulse">
        <div className="h-32 bg-secondary/50 rounded-xl" />
      </div>
    )
  }

  const weather = getWeatherInfo(data.temperature, data.humidity)
  const comfort = getComfortInfo(data.temperature, data.humidity)
  const WeatherIcon = weather.icon

  return (
    <div className="card-base card-hover rounded-2xl p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Temperature Display */}
        <div className="flex flex-col justify-center md:col-span-1">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-light tracking-tighter tabular-nums md:text-7xl">
              {data.temperature.toFixed(1)}
            </span>
            <span className="text-2xl text-muted-foreground">°C</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className={cn("flex items-center gap-1 text-sm", data.temperature > 25 ? "text-amber" : "text-cyan")}>
              {data.temperature > 25 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{data.temperature > 25 ? "Above" : "Below"} average</span>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="flex items-center gap-6 border-y border-border/50 py-6 md:border-x md:border-y-0 md:px-8 md:py-0">
          <div className={cn("rounded-2xl p-4", "bg-secondary/50")}>
            <WeatherIcon className={cn("h-10 w-10", weather.iconColor)} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Forecast
            </p>
            <p className="mt-1 text-xl font-medium">{weather.condition}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {weather.description}
            </p>
          </div>
        </div>

        {/* Comfort & Stats */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Room Comfort
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-sm font-medium", comfort.bg, comfort.color)}>
                {comfort.level}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-amber" />
              <span className="text-sm text-muted-foreground">
                {data.temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue" />
              <span className="text-sm text-muted-foreground">
                {data.humidity}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
