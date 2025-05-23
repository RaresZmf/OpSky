"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Battery, BellOff, Gauge, Signal, Thermometer, Wind } from "lucide-react"
import { useState, useEffect } from "react"

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: "battery",
    message: "Battery level below 30%",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    severity: "warning",
    icon: Battery,
  },
  {
    id: 2,
    type: "signal",
    message: "Signal strength fluctuating",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    severity: "info",
    icon: Signal,
  },
  {
    id: 3,
    type: "altitude",
    message: "Maximum altitude reached",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    severity: "warning",
    icon: Gauge,
  },
  {
    id: 4,
    type: "temperature",
    message: "Motor temperature rising",
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    severity: "warning",
    icon: Thermometer,
  },
  {
    id: 5,
    type: "wind",
    message: "High wind speed detected",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    severity: "critical",
    icon: Wind,
  },
]

// Move the formatTimestamp function outside of the component scope so it's accessible to both components
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

export function TelemetryAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all")

  // Add a new random alert every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const alertTypes = ["battery", "signal", "altitude", "temperature", "wind"]
      const severities = ["critical", "warning", "info"]
      const icons = [Battery, Signal, Gauge, Thermometer, Wind]

      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
      const randomIcon = icons[Math.floor(Math.random() * icons.length)]

      const messages = {
        battery: ["Battery level decreasing rapidly", "Battery temperature high", "Battery health degrading"],
        signal: ["Signal strength fluctuating", "Connection interference detected", "Signal latency increasing"],
        altitude: ["Altitude change rate high", "Maximum altitude reached", "Altitude sensor calibration needed"],
        temperature: ["Motor temperature rising", "CPU temperature high", "Ambient temperature affecting performance"],
        wind: ["High wind speed detected", "Wind gusts affecting stability", "Wind direction changing rapidly"],
      }

      const randomMessage =
        messages[randomType as keyof typeof messages][
          Math.floor(Math.random() * messages[randomType as keyof typeof messages].length)
        ]

      const newAlert = {
        id: Date.now(),
        type: randomType,
        message: randomMessage,
        timestamp: new Date().toISOString(),
        severity: randomSeverity,
        icon: randomIcon,
      }

      setAlerts((prev) => [newAlert, ...prev].slice(0, 20))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((alert) => alert.severity === filter)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("critical")}
            className="text-red-500 border-red-200 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            Critical
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("warning")}
            className="text-yellow-500 border-yellow-200 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950"
          >
            Warning
          </Button>
          <Button
            variant={filter === "info" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("info")}
            className="text-blue-500 border-blue-200 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            Info
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <BellOff className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p>No alerts to display</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface Alert {
  id: number
  type: string
  message: string
  timestamp: string
  severity: string
  icon: React.ComponentType<{ className?: string }>
}

interface AlertItemProps {
  alert: Alert
}

function AlertItem({ alert }: AlertItemProps) {
  const severityColors = {
    critical: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }

  const severityBgColors = {
    critical: "bg-red-50 dark:bg-red-950/50",
    warning: "bg-yellow-50 dark:bg-yellow-950/50",
    info: "bg-blue-50 dark:bg-blue-950/50",
  }

  const Icon = alert.icon

  return (
    <div className={`p-3 rounded-lg border ${severityBgColors[alert.severity as keyof typeof severityBgColors]}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${severityColors[alert.severity as keyof typeof severityColors]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{alert.message}</h4>
              <Badge variant="outline" className="capitalize">
                {alert.type}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
