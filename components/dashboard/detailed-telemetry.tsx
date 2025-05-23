"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, Gauge, Signal, Thermometer, Wind } from "lucide-react"
import { useState, useEffect } from "react"

// Mock telemetry data
const generateTelemetryData = () => {
  return {
    altitude: Math.floor(Math.random() * (500 - 300) + 300),
    speed: Math.floor(Math.random() * (120 - 80) + 80),
    battery: Math.floor(Math.random() * (100 - 60) + 60),
    signal: Math.floor(Math.random() * (100 - 70) + 70),
    temperature: Math.floor(Math.random() * (40 - 20) + 20),
    heading: Math.floor(Math.random() * 360),
    windSpeed: Math.floor(Math.random() * (25 - 5) + 5),
    verticalSpeed: Math.floor(Math.random() * 10) - 5,
    groundSpeed: Math.floor(Math.random() * (100 - 60) + 60),
    distanceFromHome: Math.floor(Math.random() * (1000 - 100) + 100),
  }
}

// Mock chart data
const generateChartData = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    time: new Date(Date.now() - (count - i - 1) * 1000).toISOString(),
    altitude: Math.floor(Math.random() * (500 - 300) + 300),
    speed: Math.floor(Math.random() * (120 - 80) + 80),
    battery: Math.floor(Math.random() * (100 - 60) + 60),
    signal: Math.floor(Math.random() * (100 - 70) + 70),
    temperature: Math.floor(Math.random() * (40 - 20) + 20),
  }))
}

export function DetailedTelemetry() {
  const [telemetry, setTelemetry] = useState(generateTelemetryData())
  const [chartData, setChartData] = useState(generateChartData(30))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTelemetry = generateTelemetryData()
      setTelemetry(newTelemetry)

      setChartData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toISOString(),
            altitude: newTelemetry.altitude,
            speed: newTelemetry.speed,
            battery: newTelemetry.battery,
            signal: newTelemetry.signal,
            temperature: newTelemetry.temperature,
          },
        ]
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TelemetryCard
          title="Altitude"
          value={`${telemetry.altitude} m`}
          icon={<Gauge className="h-4 w-4" />}
          trend="up"
        />
        <TelemetryCard
          title="Speed"
          value={`${telemetry.speed} km/h`}
          icon={<Gauge className="h-4 w-4" />}
          trend="stable"
        />
        <TelemetryCard
          title="Battery"
          value={`${telemetry.battery}%`}
          icon={<Battery className="h-4 w-4" />}
          trend="down"
          color={telemetry.battery > 80 ? "green" : telemetry.battery > 40 ? "yellow" : "red"}
        />
        <TelemetryCard
          title="Signal"
          value={`${telemetry.signal}%`}
          icon={<Signal className="h-4 w-4" />}
          trend="stable"
          color={telemetry.signal > 80 ? "green" : telemetry.signal > 40 ? "yellow" : "red"}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TelemetryCard
          title="Temperature"
          value={`${telemetry.temperature}°C`}
          icon={<Thermometer className="h-4 w-4" />}
          trend="stable"
        />
        <TelemetryCard
          title="Heading"
          value={`${telemetry.heading}°`}
          icon={<Gauge className="h-4 w-4" />}
          trend="stable"
        />
        <TelemetryCard
          title="Wind Speed"
          value={`${telemetry.windSpeed} km/h`}
          icon={<Wind className="h-4 w-4" />}
          trend="up"
          color={telemetry.windSpeed > 20 ? "yellow" : "green"}
        />
        <TelemetryCard
          title="Vertical Speed"
          value={`${telemetry.verticalSpeed} m/s`}
          icon={<Gauge className="h-4 w-4" />}
          trend={telemetry.verticalSpeed > 0 ? "up" : "down"}
        />
      </div>

      <Tabs defaultValue="realtime">
        <TabsList className="mb-4">
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
        </TabsList>
        <TabsContent value="realtime">
          <div className="h-[300px] w-full">
            <ChartContainer>
              <Chart data={chartData}>
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartGrid />
                <ChartLine dataKey="altitude" name="Altitude (m)" stroke="#2563eb" strokeWidth={2} />
                <ChartLine dataKey="speed" name="Speed (km/h)" stroke="#16a34a" strokeWidth={2} />
                <ChartLine dataKey="battery" name="Battery (%)" stroke="#ea580c" strokeWidth={2} />
                <ChartLine dataKey="signal" name="Signal (%)" stroke="#8b5cf6" strokeWidth={2} />
                <ChartLine dataKey="temperature" name="Temperature (°C)" stroke="#ef4444" strokeWidth={2} />
              </Chart>
            </ChartContainer>
          </div>
        </TabsContent>
        <TabsContent value="historical">
          <div className="h-[300px] w-full">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Historical data visualization will appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface TelemetryCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: "up" | "down" | "stable"
  color?: "green" | "yellow" | "red"
}

function TelemetryCard({ title, value, icon, trend, color = "green" }: TelemetryCardProps) {
  const colorClasses = {
    green: "text-green-500",
    yellow: "text-yellow-500",
    red: "text-red-500",
  }

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <span className={`text-xs ${trend === "down" && title === "Battery" ? "text-red-500" : ""}`}>
            {trendIcons[trend]}
          </span>
        </div>
        <div className={`text-2xl font-bold mt-2 ${colorClasses[color]}`}>{value}</div>
      </CardContent>
    </Card>
  )
}
