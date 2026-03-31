"use client"

import { AlertTriangle, CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AlertBannerProps {
  airQuality: number
}

export function AlertBanner({ airQuality }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const isPoorAirQuality = airQuality > 600

  if (dismissed || airQuality === 0) return null

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
        isPoorAirQuality
          ? "border border-rose/30 bg-rose/10"
          : "border border-emerald/30 bg-emerald/10"
      )}
    >
      {isPoorAirQuality ? (
        <>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose/20">
            <AlertTriangle className="h-4 w-4 text-rose" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-rose">
              Air Quality Alert
            </p>
            <p className="text-xs text-rose/80">
              AQI at {airQuality} - Consider ventilating the room
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/20">
            <CheckCircle2 className="h-4 w-4 text-emerald" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald">
              Environment Optimal
            </p>
            <p className="text-xs text-emerald/80">
              All parameters within healthy ranges
            </p>
          </div>
        </>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="rounded-full p-1 hover:bg-secondary/50 transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  )
}
