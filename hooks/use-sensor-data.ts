"use client"

import { useState, useEffect } from "react"

export interface SensorData {
  temperature: number
  humidity: number
  pressure: number
  airQuality: number
  light: string
  status: string
}

export function useSensorData() {
  const [data, setData] = useState<SensorData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const ESP_IP = "192.YOUR.IP"   // ✅ YOUR IP
  const endpoint = `http://${ESP_IP}/data`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
          throw new Error("ESP not responding")
        }

        const json = await response.json()

        setData(json)
        setLastUpdated(new Date())
        setError(null)

      } catch (err) {
        console.error(err)
        setError("⚠ Unable to connect to ESP8266")
      }
    }

    // First fetch immediately
    fetchData()

    // Poll every 2 seconds
    const interval = setInterval(fetchData, 2000)

    return () => clearInterval(interval)
  }, [])

  return { data, error, lastUpdated }
}
