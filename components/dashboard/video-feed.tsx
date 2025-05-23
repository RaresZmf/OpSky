"use client"

import { Button } from "@/components/ui/button"
import { Camera, Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function VideoFeed() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Simulate video feed with a placeholder
  return (
    <div className="relative w-full h-[400px] bg-black rounded-b-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {isPlaying ? (
          <div className="w-full h-full bg-gray-900 relative">
            {/* Simulated video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="FPV Video Feed"
                  className="w-full h-full object-cover"
                />

                {/* HUD overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Artificial horizon */}
                  <div className="absolute top-1/2 left-0 right-0 border-t border-white/50"></div>

                  {/* Compass */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded px-2 py-1 text-xs">
                    N 45° E
                  </div>

                  {/* Altitude */}
                  <div className="absolute bottom-4 left-4 bg-black/50 rounded px-2 py-1 text-xs">ALT: 420m</div>

                  {/* Speed */}
                  <div className="absolute bottom-4 right-4 bg-black/50 rounded px-2 py-1 text-xs">SPD: 95km/h</div>

                  {/* Battery */}
                  <div className="absolute top-4 right-4 bg-black/50 rounded px-2 py-1 text-xs">BAT: 78%</div>

                  {/* Signal strength */}
                  <div className="absolute top-4 left-4 bg-black/50 rounded px-2 py-1 text-xs">SIG: 92%</div>

                  {/* Recording indicator */}
                  <div className="absolute top-12 right-4 bg-red-500/80 rounded-full h-2 w-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Video paused</p>
          </div>
        )}
      </div>

      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
