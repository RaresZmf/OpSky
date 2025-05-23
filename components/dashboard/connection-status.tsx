"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Wifi, WifiOff } from "lucide-react"

interface ConnectionStatusProps {
  status: "connected" | "disconnected" | "reconnecting"
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  const statusConfig = {
    connected: {
      label: "Connected",
      icon: <Wifi className="h-4 w-4" />,
      color: "bg-green-500",
      textColor: "text-green-500",
      tooltip: "Strong connection to OpSky",
    },
    disconnected: {
      label: "Disconnected",
      icon: <WifiOff className="h-4 w-4" />,
      color: "bg-red-500",
      textColor: "text-red-500",
      tooltip: "No connection to OpSky",
    },
    reconnecting: {
      label: "Reconnecting",
      icon: <Wifi className="h-4 w-4 animate-pulse" />,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      tooltip: "Attempting to reconnect to OpSky",
    },
  }

  const config = statusConfig[status]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-1 px-2 py-1 border-none">
            <span className={`h-2 w-2 rounded-full ${config.color}`} />
            <span className={`text-xs font-medium ${config.textColor}`}>{config.label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
