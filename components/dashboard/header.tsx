"use client"

import { Wifi, RefreshCw, Zap, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface HeaderProps {
  status: "online" | "offline"
  autoRefresh: boolean
  onAutoRefreshChange: (value: boolean) => void
  onRefresh: () => void
  isLoading: boolean
  lastUpdated: Date | null
}

export function Header({
  status,
  autoRefresh,
  onAutoRefreshChange,
  onRefresh,
  isLoading,
  lastUpdated,
}: HeaderProps) {
  const isOnline = status === "online"

  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-emerald">
            <Zap className="h-5 w-5 text-background" strokeWidth={2.5} />
          </div>
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald" />
            </span>
          )}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            EcoSync
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart Environmental Monitor
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Indicator */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
            isOnline
              ? "border-emerald/30 bg-emerald/10 text-emerald"
              : "border-rose/30 bg-rose/10 text-rose"
          )}
        >
          <Wifi className="h-3.5 w-3.5" />
          {isOnline ? "Connected" : "Offline"}
        </div>

        {/* Auto Refresh */}
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1.5">
          <span className="text-sm text-muted-foreground">Live</span>
          <Switch
            checked={autoRefresh}
            onCheckedChange={onAutoRefreshChange}
            className="data-[state=checked]:bg-cyan"
          />
        </div>

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-9 w-9 rounded-full border border-border/50 bg-card/50 hover:bg-card hover:border-cyan/50"
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
        </Button>

        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full border border-border/50 bg-card/50 hover:bg-card"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* Last Updated */}
        {lastUpdated && (
          <span className="hidden text-xs text-muted-foreground lg:block">
            {lastUpdated.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        )}
      </div>
    </header>
  )
}
