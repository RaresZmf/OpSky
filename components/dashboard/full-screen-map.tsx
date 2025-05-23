"use client"

import { Button } from "@/components/ui/button"
import { Layers, Maximize2, Minimize2, Navigation, Plus, Minus, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Mock flight path data
const flightPath = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 37.7833, lng: -122.4167 },
  { lat: 37.7915, lng: -122.4089 },
  { lat: 37.801, lng: -122.405 },
  { lat: 37.81, lng: -122.4 },
  { lat: 37.82, lng: -122.395 }, // Current position
]

// Mock waypoints
const waypoints = [
  { lat: 37.83, lng: -122.39, name: "Waypoint 1" },
  { lat: 37.84, lng: -122.385, name: "Waypoint 2" },
  { lat: 37.85, lng: -122.38, name: "Waypoint 3" },
]

export function FullScreenMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapType, setMapType] = useState<"satellite" | "terrain" | "street">("satellite")

  useEffect(() => {
    // This would normally load a map library like Leaflet or Google Maps
    // For this example, we'll just simulate a map with a placeholder
    const loadMap = () => {
      if (mapRef.current) {
        // Simulate map loading
        setTimeout(() => {
          setMapLoaded(true)
        }, 1000)
      }
    }

    loadMap()
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative w-full h-full bg-gray-800 overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      <div ref={mapRef} className="w-full h-full">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Simulated map with CSS */}
            <div
              className={`absolute inset-0 ${
                mapType === "satellite" ? "bg-[#1a2e3b]" : mapType === "terrain" ? "bg-[#2a3b2a]" : "bg-[#2a2a2a]"
              }`}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-full h-full grid grid-cols-12 grid-rows-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/10" />
                  ))}
                </div>
              </div>

              {/* Flight path line */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 100,300 L 150,280 L 200,250 L 250,220 L 300,200 L 350,180"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path d="M 350,180 L 400,160 L 450,140" stroke="#3b82f6" strokeWidth="3" fill="none" />
              </svg>

              {/* Current position */}
              <div className="absolute top-[180px] left-[350px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                  <div className="relative h-4 w-4 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* Waypoints */}
              <div className="absolute top-[140px] left-[450px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="absolute top-[100px] left-[500px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="absolute top-[80px] left-[550px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Home position */}
              <div className="absolute top-[300px] left-[100px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-5 w-5 flex items-center justify-center bg-green-500 rounded-full border-2 border-white">
                  <span className="text-[8px] font-bold text-white">H</span>
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                <Navigation className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setMapType(mapType === "satellite" ? "terrain" : mapType === "terrain" ? "street" : "satellite")
                }
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
              >
                <Layers className="h-4 w-4" />
              </Button>
            </div>

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Current Position</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Flight Path</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span>Waypoints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Home</span>
              </div>
            </div>

            {/* Map type indicator */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs">
              {mapType === "satellite" ? "Satellite View" : mapType === "terrain" ? "Terrain View" : "Street View"}
            </div>

            {/* Coordinates */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>37.82° N, 122.39° W</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
