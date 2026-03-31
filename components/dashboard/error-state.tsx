"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  error: string
  onRetry: () => void
  isLoading: boolean
}

export function ErrorState({ error, onRetry, isLoading }: ErrorStateProps) {
  return (
    <div className="card-base rounded-2xl p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose/10">
        <AlertCircle className="h-8 w-8 text-rose" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">Connection Error</h3>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        {error || "Unable to connect to the sensor. Please check your network connection and try again."}
      </p>
      <Button
        onClick={onRetry}
        disabled={isLoading}
        className="mt-6 bg-foreground text-background hover:bg-foreground/90"
      >
        <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
        Retry Connection
      </Button>
    </div>
  )
}
