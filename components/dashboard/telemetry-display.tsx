// "use client"

// import type React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import { Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { Battery, Gauge, Signal } from "lucide-react"
// import { useState, useEffect } from "react"
// import { createClient } from "@/utils/supabase/client"

// // Mock telemetry data
// const generateTelemetryData = () => {
//   return {
//     altitude: Math.floor(Math.random() * (500 - 300) + 300),
//     speed: Math.floor(Math.random() * (120 - 80) + 80),
//     battery: Math.floor(Math.random() * (100 - 60) + 60),
//     signal: Math.floor(Math.random() * (100 - 70) + 70),
//     temperature: Math.floor(Math.random() * (40 - 20) + 20),
//   }
// }

// // Mock chart data
// const generateChartData = (count: number) => {
//   return Array.from({ length: count }).map((_, i) => ({
//     time: new Date(Date.now() - (count - i - 1) * 1000).toISOString(),
//     altitude: Math.floor(Math.random() * (500 - 300) + 300),
//     speed: Math.floor(Math.random() * (120 - 80) + 80),
//     battery: Math.floor(Math.random() * (100 - 60) + 60),
//   }))
// }

// export function TelemetryDisplay() {
//   const [telemetry, setTelemetry] = useState<any>(undefined)
//   const [chartData, setChartData] = useState<any[]>([])

//   useEffect(() => {
//     setTelemetry(generateTelemetryData())
//     setChartData(generateChartData(30))

//     const interval = setInterval(() => {
//       const newTelemetry = generateTelemetryData()
//       setTelemetry(newTelemetry)

//       setChartData((prevData) => {
//         const newData = [
//           ...prevData.slice(1),
//           {
//             time: new Date().toISOString(),
//             altitude: newTelemetry.altitude,
//             speed: newTelemetry.speed,
//             battery: newTelemetry.battery,
//           },
//         ]
//         return newData
//       })
//     }, 1000)

//     return () => clearInterval(interval)
//   }, [])

//   if (!telemetry) return null

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <TelemetryCard
//           title="Altitude"
//           value={`${telemetry.altitude} m`}
//           icon={<Gauge className="h-4 w-4" />}
//           trend="up"
//         />
//         <TelemetryCard
//           title="Speed"
//           value={`${telemetry.speed} km/h`}
//           icon={<Gauge className="h-4 w-4" />}
//           trend="stable"
//         />
//         <TelemetryCard
//           title="Battery"
//           value={`${telemetry.battery}%`}
//           icon={<Battery className="h-4 w-4" />}
//           trend="down"
//           color={telemetry.battery > 80 ? "green" : telemetry.battery > 40 ? "yellow" : "red"}
//         />
//         <TelemetryCard
//           title="Signal"
//           value={`${telemetry.signal}%`}
//           icon={<Signal className="h-4 w-4 items-center flex" />}
//           trend="stable"
//           color={telemetry.signal > 80 ? "green" : telemetry.signal > 40 ? "yellow" : "red"}
//         />
//       </div>

//       <div className="h-[200px] w-full">
//         <ChartContainer>
//           <Chart data={chartData}>
//             <ChartTooltip>
//               <ChartTooltipContent />
//             </ChartTooltip>
//             <ChartGrid />
//             <ChartLine dataKey="altitude" name="Altitude (m)" stroke="#2563eb" strokeWidth={2} />
//             <ChartLine dataKey="speed" name="Speed (km/h)" stroke="#16a34a" strokeWidth={2} />
//             <ChartLine dataKey="battery" name="Battery (%)" stroke="#ea580c" strokeWidth={2} />
//           </Chart>
//         </ChartContainer>
//       </div>
//     </div>
//   )
// }

// interface TelemetryCardProps {
//   title: string
//   value: string
//   icon: React.ReactNode
//   trend: "up" | "down" | "stable"
//   color?: "green" | "yellow" | "red"
// }

// function TelemetryCard({ title, value, icon, trend, color = "green" }: TelemetryCardProps) {
//   const colorClasses = {
//     green: "text-green-500",
//     yellow: "text-yellow-500",
//     red: "text-red-500",
//   }

//   const trendIcons = {
//     up: "↑",
//     down: "↓",
//     stable: "→",
//   }

//   return (
//     <Card>
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             {icon}
//             <span className="text-sm font-medium">{title}</span>
//           </div>
//           <span className={`text-xs ${trend === "down" && title === "Battery" ? "text-red-500" : ""}`}>
//             {trendIcons[trend]}
//           </span>
//         </div>
//         <div className={`text-2xl font-bold mt-2 ${colorClasses[color]}`}>{value}</div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { Battery, Gauge, Signal, RotateCw } from "lucide-react"
import { Button } from "../ui/button"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export function TelemetryDisplay() {
  const [telemetry, setTelemetry] = useState<any>(undefined)
  const [chartData, setChartData] = useState<any[]>([])

  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyzeFlight = async () => {
    setLoading(true)
    const res = await fetch("/api/analyze-flight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chartData }),
    })
    const data = await res.json()
    console.log(data)
    setAnalysis(data.analysis)
    setLoading(false)
  }

  useEffect(() => {
    const fetchInitial = async () => {
      const { data, error } = await supabase
        .from("planeData")
        .select("*")
        // .order("timestamp", { ascending: false })
        .eq("id", 1)

      if (data) {
        const reversed = data.reverse()
        setChartData(
          reversed.map((d) => ({
            time: d.timestamp,
            altitude: d.altitude,
            speed: d.speed,
            battery: d.battery,
          }))
        )
        setTelemetry(reversed[reversed.length - 1])
      }
    }

    fetchInitial()

    const channel = supabase
      .channel("realtime-planeData")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "planeData" },
        (payload) => {
          const newTelemetry = payload.new
          setTelemetry(newTelemetry)
          setChartData((prev) => [
            ...prev.slice(-29),
            {
              time: newTelemetry.timestamp,
              altitude: newTelemetry.altitude,
              speed: newTelemetry.speed,
              battery: newTelemetry.battery,
            },
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (!telemetry) return null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* <TelemetryCard
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
        /> */}
        <TelemetryCard
          title="Battery"
          value={`${telemetry.battery}V`}
          icon={<Battery className="h-4 w-4" />}
          trend="up"
          color={telemetry.battery > 11.4 ? "green" : telemetry.battery > 11 ? "yellow" : "red"}
        />
        {/* <TelemetryCard
          title="Signal"
          value={`${}%`}
          icon={<Signal className="h-4 w-4" />}
          trend="stable"
          color={telemetry.signal > 80 ? "green" : telemetry.signal > 40 ? "yellow" : "red"}
        /> */}
        <TelemetryCard
          title="Pitch"
          value={`${telemetry.pitch?.toFixed(1)}°`}
          icon={<RotateCw className="h-4 w-4" />}
          trend="stable"
        />
        <TelemetryCard
          title="Yaw"
          value={`${telemetry.yaw?.toFixed(1)}°`}
          icon={<RotateCw className="h-4 w-4" />}
          trend="stable"
        />
        <TelemetryCard
          title="Roll"
          value={`${telemetry.heading?.toFixed(1)}°`}
          icon={<RotateCw className="h-4 w-4" />}
          trend="stable"
        />
      </div>
      <Button onClick={handleAnalyzeFlight}>Analizeaza Zborul</Button>
      {analysis && (
        <div className="mt-4 p-4 border rounded text-sm whitespace-pre-wrap">
          <strong>Flight Analysis:</strong>
          <p>{analysis}</p>
        </div>
      )}

      <div className="h-[200px] w-full">
        <ChartContainer>
          <Chart data={chartData}>
            <ChartTooltip>
              <ChartTooltipContent />
            </ChartTooltip>
            <ChartGrid />
            <ChartLine dataKey="altitude" name="Altitude (m)" stroke="#2563eb" strokeWidth={2} />
            <ChartLine dataKey="speed" name="Speed (km/h)" stroke="#16a34a" strokeWidth={2} />
            <ChartLine dataKey="battery" name="Battery (%)" stroke="#ea580c" strokeWidth={2} />
          </Chart>
        </ChartContainer>
      </div>
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
