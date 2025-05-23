"use client"

import type * as React from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

interface ChartProps {
  data: any[]
  children: React.ReactNode
}

const Chart = ({ data, children }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>{children}</LineChart>
    </ResponsiveContainer>
  )
}

interface ChartLineProps {
  dataKey: string
  stroke: string
  strokeWidth?: number
  name?: string
}

const ChartLine = ({ dataKey, stroke, strokeWidth = 2, name }: ChartLineProps) => {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={strokeWidth} name={name} />
}

const ChartGrid = () => {
  return <CartesianGrid strokeDasharray="3 3" />
}

const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Tooltip contentStyle={{ background: "rgb(28, 28, 30)", border: "none" }} itemStyle={{ color: "#fff" }}>
      {children}
    </Tooltip>
  )
}

const ChartTooltipContent = () => {
  return null
}

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export { Chart, ChartLine, ChartGrid, ChartTooltip, ChartTooltipContent, ChartContainer }
