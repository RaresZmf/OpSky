"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Camera, Maximize2, Pause, Play, RepeatIcon as Record, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function EnhancedVideoFeed() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [brightness, setBrightness] = useState(50)
  const [contrast, setContrast] = useState(50)
  const [zoom, setZoom] = useState(1)

  // Simulate video feed with a placeholder
  return (
    <div className="relative w-full h-full bg-black rounded-b-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {isPlaying ? (
          <div className="w-full h-full bg-gray-900 relative">
            {/* Simulated video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
                  style={{
                    filter: `brightness(${brightness / 50}) contrast(${contrast / 50})`,
                    transform: `scale(${zoom})`,
                  }}
                ></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="FPV Video Feed"
                  className="w-full h-full object-cover"
                  style={{
                    filter: `brightness(${brightness / 50}) contrast(${contrast / 50})`,
                    transform: `scale(${zoom})`,
                  }}
                />

                {/* HUD overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Artificial horizon */}
                  <div className="absolute top-1/2 left-0 right-0 border-t border-white/50"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                    <div className="absolute top-1/2 left-0 right-0 border-t border-white/30"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-white/30"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-white/70 rounded-full"></div>
                  </div>

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
                  {isRecording && (
                    <div className="absolute top-12 right-4 flex items-center bg-red-500/80 rounded-full px-2 py-0.5 text-xs">
                      <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      REC
                    </div>
                  )}

                  {/* Time */}
                  <div className="absolute top-12 left-4 bg-black/50 rounded px-2 py-1 text-xs">
                    {new Date().toLocaleTimeString()}
                  </div>

                  {/* GPS coordinates */}
                  <div className="absolute bottom-12 left-4 bg-black/50 rounded px-2 py-1 text-xs">
                    37.7749° N, 122.4194° W
                  </div>
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
        <div className="flex flex-col gap-2">
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
                onClick={() => setIsRecording(!isRecording)}
                className={`text-white hover:bg-white/20 ${isRecording ? "bg-red-500/20" : ""}`}
              >
                <Record className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
              </Button>
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

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>Brightness</span>
                <span>{brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                max={100}
                step={1}
                className="h-1"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>Contrast</span>
                <span>{contrast}%</span>
              </div>
              <Slider
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
                max={100}
                step={1}
                className="h-1"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/70">
                <span>Zoom</span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <Slider
                value={[zoom * 10]}
                onValueChange={(value) => setZoom(value[0] / 10)}
                min={10}
                max={30}
                step={1}
                className="h-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
