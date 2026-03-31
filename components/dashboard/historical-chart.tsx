"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Activity } from "lucide-react"
import type { SensorData } from "@/hooks/use-sensor-data"

interface HistoricalChartProps {
  currentData: SensorData | null
}

interface DataPoint {
  time: string
  temperature: number
  humidity: number
}

function generateInitialData(): DataPoint[] {
  const data: DataPoint[] = []
  const now = new Date()

  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature: parseFloat((20 + Math.sin(i / 4) * 5 + Math.random() * 3).toFixed(1)),
      humidity: Math.floor(50 + Math.cos(i / 3) * 15 + Math.random() * 5),
    })
  }

  return data
}

export function HistoricalChart({ currentData }: HistoricalChartProps) {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    setData(generateInitialData())
  }, [])

  useEffect(() => {
    if (currentData) {
      setData((prev) => {
        const newPoint: DataPoint = {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temperature: currentData.temperature,
          humidity: currentData.humidity,
        }
        return [...prev.slice(1), newPoint]
      })
    }
  }, [currentData])

  return (
    <div className="card-base rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan/10 p-2.5">
            <Activity className="h-5 w-5 text-cyan" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">24-Hour Trends</h2>
            <p className="text-sm text-muted-foreground">
              Temperature and humidity over time
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue" />
            <span className="text-muted-foreground">Humidity</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.14 45)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.68 0.14 45)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.65 0.14 240)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.65 0.14 240)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.20 0.015 260 / 0.5)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="oklch(0.55 0.015 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="oklch(0.55 0.015 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.09 0.008 260)",
                border: "1px solid oklch(0.22 0.015 260)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
                padding: "12px 16px",
              }}
              labelStyle={{ color: "oklch(0.98 0.005 260)", fontWeight: 500, marginBottom: 8 }}
              itemStyle={{ color: "oklch(0.55 0.015 260)", fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              name="Temperature (°C)"
              stroke="oklch(0.68 0.14 45)"
              strokeWidth={2}
              fill="url(#tempGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "oklch(0.68 0.14 45)",
                stroke: "oklch(0.09 0.008 260)",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="humidity"
              name="Humidity (%)"
              stroke="oklch(0.65 0.14 240)"
              strokeWidth={2}
              fill="url(#humidityGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "oklch(0.65 0.14 240)",
                stroke: "oklch(0.09 0.008 260)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
