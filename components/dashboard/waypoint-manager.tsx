"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Trash2, Plus, Save } from "lucide-react"
import { useState } from "react"

// Mock waypoints data
const initialWaypoints = [
  { id: 1, name: "Takeoff", lat: 37.7749, lng: -122.4194, alt: 50, action: "Hover", duration: 10 },
  { id: 2, name: "Point A", lat: 37.7833, lng: -122.4167, alt: 100, action: "Photo", duration: 5 },
  { id: 3, name: "Point B", lat: 37.7915, lng: -122.4089, alt: 150, action: "Video", duration: 30 },
  { id: 4, name: "Point C", lat: 37.801, lng: -122.405, alt: 120, action: "Orbit", duration: 20 },
  { id: 5, name: "Landing", lat: 37.7749, lng: -122.4194, alt: 10, action: "Land", duration: 0 },
]

export function WaypointManager() {
  const [waypoints, setWaypoints] = useState(initialWaypoints)
  const [expandedWaypoint, setExpandedWaypoint] = useState<number | null>(null)

  const toggleWaypoint = (id: number) => {
    setExpandedWaypoint(expandedWaypoint === id ? null : id)
  }

  const moveWaypoint = (id: number, direction: "up" | "down") => {
    const index = waypoints.findIndex((wp) => wp.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === waypoints.length - 1)) {
      return
    }

    const newWaypoints = [...waypoints]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = newWaypoints[index]
    newWaypoints[index] = newWaypoints[targetIndex]
    newWaypoints[targetIndex] = temp

    setWaypoints(newWaypoints)
  }

  const deleteWaypoint = (id: number) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== id))
    if (expandedWaypoint === id) {
      setExpandedWaypoint(null)
    }
  }

  const addWaypoint = () => {
    const newId = Math.max(...waypoints.map((wp) => wp.id)) + 1
    const newWaypoint = {
      id: newId,
      name: `Waypoint ${newId}`,
      lat: 37.7749,
      lng: -122.4194,
      alt: 100,
      action: "Hover",
      duration: 5,
    }

    setWaypoints([...waypoints, newWaypoint])
    setExpandedWaypoint(newId)
  }

  const updateWaypoint = (id: number, field: string, value: string | number) => {
    setWaypoints(waypoints.map((wp) => (wp.id === id ? { ...wp, [field]: value } : wp)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Flight Path</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={addWaypoint}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {waypoints.map((waypoint) => (
          <div key={waypoint.id} className="border rounded-md">
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleWaypoint(waypoint.id)}
            >
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground mr-2">
                  {waypoints.findIndex((wp) => wp.id === waypoint.id) + 1}
                </div>
                <span className="font-medium">{waypoint.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveWaypoint(waypoint.id, "up")
                  }}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveWaypoint(waypoint.id, "down")
                  }}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteWaypoint(waypoint.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expandedWaypoint === waypoint.id ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {expandedWaypoint === waypoint.id && (
              <div className="p-3 border-t">
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`wp-${waypoint.id}-name`}>Name</Label>
                      <Input
                        id={`wp-${waypoint.id}-name`}
                        value={waypoint.name}
                        onChange={(e) => updateWaypoint(waypoint.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`wp-${waypoint.id}-action`}>Action</Label>
                      <select
                        id={`wp-${waypoint.id}-action`}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={waypoint.action}
                        onChange={(e) => updateWaypoint(waypoint.id, "action", e.target.value)}
                      >
                        <option value="Hover">Hover</option>
                        <option value="Photo">Take Photo</option>
                        <option value="Video">Record Video</option>
                        <option value="Orbit">Orbit Point</option>
                        <option value="Land">Land</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`wp-${waypoint.id}-lat`}>Latitude</Label>
                      <Input
                        id={`wp-${waypoint.id}-lat`}
                        value={waypoint.lat}
                        onChange={(e) => updateWaypoint(waypoint.id, "lat", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`wp-${waypoint.id}-lng`}>Longitude</Label>
                      <Input
                        id={`wp-${waypoint.id}-lng`}
                        value={waypoint.lng}
                        onChange={(e) => updateWaypoint(waypoint.id, "lng", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`wp-${waypoint.id}-alt`}>Altitude (m)</Label>
                      <Input
                        id={`wp-${waypoint.id}-alt`}
                        value={waypoint.alt}
                        onChange={(e) => updateWaypoint(waypoint.id, "alt", Number.parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`wp-${waypoint.id}-duration`}>Duration (seconds)</Label>
                    <Input
                      id={`wp-${waypoint.id}-duration`}
                      value={waypoint.duration}
                      onChange={(e) => updateWaypoint(waypoint.id, "duration", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-muted-foreground">
          {waypoints.length} waypoints • Estimated flight time:{" "}
          {Math.floor(waypoints.reduce((acc, wp) => acc + wp.duration, 0) / 60)}m{" "}
          {waypoints.reduce((acc, wp) => acc + wp.duration, 0) % 60}s
        </div>
        <Button>Upload to Drone</Button>
      </div>
    </div>
  )
}
