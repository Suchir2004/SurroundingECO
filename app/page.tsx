"use client"

import { useSensorData } from "@/hooks/use-sensor-data"
import { Header } from "@/components/dashboard/header"
import { StatusHero } from "@/components/dashboard/status-hero"
import { BentoGrid } from "@/components/dashboard/bento-grid"
import { HistoricalChart } from "@/components/dashboard/historical-chart"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { ErrorState } from "@/components/dashboard/error-state"

export default function Dashboard() {
  const {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh,
    autoRefresh,
    setAutoRefresh,
  } = useSensorData({
    pollingInterval: 2000,
    autoRefresh: true,
  })

  return (
    <div className="min-h-screen bg-background dot-pattern">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-cyan/5 blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[20%] h-[70%] w-[50%] rounded-full bg-emerald/5 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <Header
            status={data?.status ?? "offline"}
            autoRefresh={autoRefresh}
            onAutoRefreshChange={setAutoRefresh}
            onRefresh={refresh}
            isLoading={isLoading}
            lastUpdated={lastUpdated}
          />

          {error && !data ? (
            <ErrorState error={error} onRetry={refresh} isLoading={isLoading} />
          ) : (
            <>
              <AlertBanner airQuality={data?.airQuality ?? 0} />
              <StatusHero data={data} />
              <BentoGrid data={data} isLoading={isLoading} />
              <HistoricalChart currentData={data} />
            </>
          )}

          <footer className="pb-8 pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              EcoSync Smart Monitor <span className="mx-2 text-border">|</span> Real-time Environmental Intelligence
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
