"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Home, Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { useState } from "react"

export function ControlPanel() {
  const [throttle, setThrottle] = useState(50)
  const [yaw, setYaw] = useState(50)
  const [pitch, setPitch] = useState(50)
  const [roll, setRoll] = useState(50)
  const [isAutopilot, setIsAutopilot] = useState(true)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Manual Controls</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Autopilot:</span>
            <Button variant={isAutopilot ? "default" : "outline"} size="sm" onClick={() => setIsAutopilot(true)}>
              On
            </Button>
            <Button variant={!isAutopilot ? "default" : "outline"} size="sm" onClick={() => setIsAutopilot(false)}>
              Off
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Throttle</label>
              <span className="text-sm text-muted-foreground">{throttle}%</span>
            </div>
            <Slider
              value={[throttle]}
              onValueChange={(value) => setThrottle(value[0])}
              disabled={isAutopilot}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Yaw</label>
              <span className="text-sm text-muted-foreground">{yaw - 50 > 0 ? `+${yaw - 50}` : yaw - 50}°</span>
            </div>
            <Slider
              value={[yaw]}
              onValueChange={(value) => setYaw(value[0])}
              disabled={isAutopilot}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Pitch</label>
              <span className="text-sm text-muted-foreground">{pitch - 50 > 0 ? `+${pitch - 50}` : pitch - 50}°</span>
            </div>
            <Slider
              value={[pitch]}
              onValueChange={(value) => setPitch(value[0])}
              disabled={isAutopilot}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Roll</label>
              <span className="text-sm text-muted-foreground">{roll - 50 > 0 ? `+${roll - 50}` : roll - 50}°</span>
            </div>
            <Slider
              value={[roll]}
              onValueChange={(value) => setRoll(value[0])}
              disabled={isAutopilot}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Quick Controls</h3>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <ArrowUp className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <Pause className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <ArrowDown className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled={isAutopilot} className="aspect-square h-12">
            <Play className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium">Emergency Controls</h4>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="destructive">Emergency Land</Button>
            <Button variant="destructive">Return Home</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
