"use client"

import { Thermometer, Droplets, Gauge, Wind, Sun, Moon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/animated-counter"
import type { SensorData } from "@/hooks/use-sensor-data"

interface BentoGridProps {
  data: SensorData | null
  isLoading: boolean
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-base rounded-2xl p-6 animate-pulse", className)}>
      <div className="flex flex-col gap-4">
        <div className="h-5 w-20 rounded bg-secondary/50" />
        <div className="h-10 w-28 rounded bg-secondary/50" />
        <div className="h-4 w-24 rounded bg-secondary/50" />
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: number | string
  unit?: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
  accentColor: string
  className?: string
  decimals?: number
  progress?: {
    value: number
    max: number
    color: string
  }
}

function MetricCard({
  icon,
  label,
  value,
  unit = "",
  subtext,
  trend,
  accentColor,
  className,
  decimals = 0,
  progress,
}: MetricCardProps) {
  return (
    <div className={cn("card-base card-hover rounded-2xl p-6 group", className)}>
      <div className="flex items-start justify-between">
        <div className={cn("rounded-xl p-2.5 transition-colors", `bg-${accentColor}/10 group-hover:bg-${accentColor}/20`)}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            trend === "up" ? "bg-rose/10 text-rose" : trend === "down" ? "bg-cyan/10 text-cyan" : "bg-secondary text-muted-foreground"
          )}>
            {trend === "up" ? <TrendingUp className="h-3 w-3" /> : trend === "down" ? <TrendingDown className="h-3 w-3" /> : null}
            {trend === "up" ? "High" : trend === "down" ? "Low" : "Stable"}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          {typeof value === "number" ? (
            <>
              <span className={cn("text-3xl font-semibold tabular-nums tracking-tight", `text-${accentColor}`)}>
                <AnimatedCounter value={value} decimals={decimals} />
              </span>
              {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
            </>
          ) : (
            <span className={cn("text-2xl font-semibold", `text-${accentColor}`)}>{value}</span>
          )}
        </div>
        {subtext && (
          <p className="mt-2 text-sm text-muted-foreground">{subtext}</p>
        )}
      </div>

      {progress && (
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all duration-700", `bg-${progress.color}`)}
              style={{ width: `${Math.min((progress.value / progress.max) * 100, 100)}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{progress.max}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function BentoGrid({ data, isLoading }: BentoGridProps) {
  if (isLoading && !data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard className="lg:row-span-2" />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (!data) return null

  const tempTrend = data.temperature > 28 ? "up" : data.temperature < 18 ? "down" : "neutral"
  const humidityTrend = data.humidity > 70 ? "up" : data.humidity < 30 ? "down" : "neutral"
  const pressurePercentage = ((data.pressure / 1013.25) * 100).toFixed(0)
  const aqiColor = data.airQuality > 600 ? "rose" : data.airQuality > 400 ? "amber" : "emerald"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Temperature - Large Card */}
      <MetricCard
        icon={<Thermometer className="h-5 w-5 text-amber" />}
        label="Temperature"
        value={data.temperature}
        unit="°C"
        decimals={1}
        trend={tempTrend}
        accentColor="amber"
        className="lg:row-span-2"
        subtext={
          data.temperature > 30
            ? "Above comfort zone"
            : data.temperature < 18
            ? "Below comfort zone"
            : "Within optimal range"
        }
      />

      {/* Humidity */}
      <MetricCard
        icon={<Droplets className="h-5 w-5 text-blue" />}
        label="Humidity"
        value={data.humidity}
        unit="%"
        trend={humidityTrend}
        accentColor="blue"
        subtext={data.humidity > 70 ? "High moisture" : data.humidity < 30 ? "Low moisture" : "Comfortable"}
      />

      {/* Pressure */}
      <MetricCard
        icon={<Gauge className="h-5 w-5 text-violet" />}
        label="Pressure"
        value={data.pressure}
        unit=" hPa"
        accentColor="violet"
        subtext={`${pressurePercentage}% of sea level`}
      />

      {/* Air Quality */}
      <MetricCard
        icon={<Wind className="h-5 w-5 text-emerald" />}
        label="Air Quality"
        value={data.airQuality}
        unit=" AQI"
        accentColor={aqiColor}
        subtext={data.airQuality > 600 ? "Poor - Ventilate" : data.airQuality > 400 ? "Moderate" : "Good quality"}
        progress={{
          value: data.airQuality,
          max: 1000,
          color: aqiColor,
        }}
      />

      {/* Light Status - Spans 2 columns on lg */}
      <div className="card-base card-hover rounded-2xl p-6 group lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "rounded-xl p-3 transition-colors",
              data.light === "BRIGHT" ? "bg-amber/10 group-hover:bg-amber/20" : "bg-violet/10 group-hover:bg-violet/20"
            )}>
              {data.light === "BRIGHT" ? (
                <Sun className="h-6 w-6 text-amber" />
              ) : (
                <Moon className="h-6 w-6 text-violet" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Light Status
              </p>
              <p className={cn(
                "mt-1 text-2xl font-semibold",
                data.light === "BRIGHT" ? "text-amber" : "text-violet"
              )}>
                {data.light === "BRIGHT" ? "Daylight" : "Dark"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {data.light === "BRIGHT" ? "Natural light detected" : "Low light conditions"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Auto-detected via photoresistor
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
