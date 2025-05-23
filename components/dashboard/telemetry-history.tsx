"use client"

import { Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Generate mock historical data
const generateHistoricalData = (dataKey: string, days: number) => {
  const data = []
  const now = new Date()

  for (let i = 0; i < days * 24; i++) {
    const time = new Date(now.getTime() - (days * 24 - i) * 60 * 60 * 1000)

    let value: number

    switch (dataKey) {
      case "altitude":
        value = Math.floor(Math.random() * (500 - 300) + 300)
        break
      case "speed":
        value = Math.floor(Math.random() * (120 - 60) + 60)
        break
      case "battery":
        value = Math.floor(Math.random() * (100 - 20) + 20)
        break
      case "signal":
        value = Math.floor(Math.random() * (100 - 50) + 50)
        break
      default:
        value = Math.floor(Math.random() * 100)
    }

    const entry: Record<string, any> = {
      time: time.toISOString(),
    }

    entry[dataKey] = value

    data.push(entry)
  }

  return data
}

interface TelemetryHistoryProps {
  dataKey: string
}

export function TelemetryHistory({ dataKey }: TelemetryHistoryProps) {
  const [timeRange, setTimeRange] = useState<"1d" | "7d" | "30d">("1d")
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const days = timeRange === "1d" ? 1 : timeRange === "7d" ? 7 : 30
    setChartData(generateHistoricalData(dataKey, days))
  }, [timeRange, dataKey])

  const dataKeyLabels: Record<string, string> = {
    altitude: "Altitude (m)",
    speed: "Speed (km/h)",
    battery: "Battery (%)",
    signal: "Signal (%)",
  }

  const dataKeyColors: Record<string, string> = {
    altitude: "#2563eb",
    speed: "#16a34a",
    battery: "#ea580c",
    signal: "#8b5cf6",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{dataKeyLabels[dataKey]} History</h3>
        <div className="flex space-x-2">
          <Button variant={timeRange === "1d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("1d")}>
            1 Day
          </Button>
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            7 Days
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            30 Days
          </Button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer>
          <Chart data={chartData}>
            <ChartTooltip>
              <ChartTooltipContent />
            </ChartTooltip>
            <ChartGrid />
            <ChartLine
              dataKey={dataKey}
              name={dataKeyLabels[dataKey]}
              stroke={dataKeyColors[dataKey]}
              strokeWidth={2}
            />
          </Chart>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Average"
          value={`${Math.floor(chartData.reduce((acc, item) => acc + item[dataKey], 0) / chartData.length)}${dataKey === "altitude" ? "m" : dataKey === "speed" ? "km/h" : "%"}`}
        />
        <StatCard
          title="Maximum"
          value={`${Math.max(...chartData.map((item) => item[dataKey]))}${dataKey === "altitude" ? "m" : dataKey === "speed" ? "km/h" : "%"}`}
        />
        <StatCard
          title="Minimum"
          value={`${Math.min(...chartData.map((item) => item[dataKey]))}${dataKey === "altitude" ? "m" : dataKey === "speed" ? "km/h" : "%"}`}
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="text-sm font-medium text-muted-foreground mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
