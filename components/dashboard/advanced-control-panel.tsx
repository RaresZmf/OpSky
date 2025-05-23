"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Home, Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdvancedControlPanelProps {
  mode: "manual" | "assisted" | "autonomous"
}

export function AdvancedControlPanel({ mode }: AdvancedControlPanelProps) {
  const [throttle, setThrottle] = useState(50)
  const [yaw, setYaw] = useState(50)
  const [pitch, setPitch] = useState(50)
  const [roll, setRoll] = useState(50)
  const [altitude, setAltitude] = useState(100)
  const [speed, setSpeed] = useState(50)
  const [heading, setHeading] = useState(0)

  return (
    <div className="space-y-6">
      {mode === "manual" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Manual Controls</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Mode:</span>
                <Button variant="default" size="sm">
                  Manual
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Throttle</label>
                  <span className="text-sm text-muted-foreground">{throttle}%</span>
                </div>
                <Slider value={[throttle]} onValueChange={(value) => setThrottle(value[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Yaw</label>
                  <span className="text-sm text-muted-foreground">{yaw - 50 > 0 ? `+${yaw - 50}` : yaw - 50}°</span>
                </div>
                <Slider value={[yaw]} onValueChange={(value) => setYaw(value[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Pitch</label>
                  <span className="text-sm text-muted-foreground">
                    {pitch - 50 > 0 ? `+${pitch - 50}` : pitch - 50}°
                  </span>
                </div>
                <Slider value={[pitch]} onValueChange={(value) => setPitch(value[0])} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Roll</label>
                  <span className="text-sm text-muted-foreground">{roll - 50 > 0 ? `+${roll - 50}` : roll - 50}°</span>
                </div>
                <Slider value={[roll]} onValueChange={(value) => setRoll(value[0])} max={100} step={1} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Quick Controls</h3>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <ArrowUp className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <RotateCw className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <Pause className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
                <ArrowDown className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="aspect-square h-12">
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
      )}

      {mode === "assisted" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Assisted Flight</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Mode:</span>
                <Button variant="default" size="sm">
                  Assisted
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Altitude</label>
                  <span className="text-sm text-muted-foreground">{altitude} m</span>
                </div>
                <Slider
                  value={[altitude]}
                  onValueChange={(value) => setAltitude(value[0])}
                  min={10}
                  max={500}
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Speed</label>
                  <span className="text-sm text-muted-foreground">{speed} km/h</span>
                </div>
                <Slider value={[speed]} onValueChange={(value) => setSpeed(value[0])} max={100} step={5} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Heading</label>
                  <span className="text-sm text-muted-foreground">{heading}°</span>
                </div>
                <Slider value={[heading]} onValueChange={(value) => setHeading(value[0])} max={359} step={5} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button>Take Off</Button>
              <Button variant="outline">Land</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Assisted Features</h3>

            <Tabs defaultValue="follow">
              <TabsList className="w-full">
                <TabsTrigger value="follow">Follow Me</TabsTrigger>
                <TabsTrigger value="orbit">Orbit</TabsTrigger>
                <TabsTrigger value="track">Object Tracking</TabsTrigger>
              </TabsList>
              <TabsContent value="follow" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  The drone will automatically follow your position while maintaining a safe distance.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Follow Distance</label>
                    <Slider value={[30]} max={100} step={5} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Follow Height</label>
                    <Slider value={[20]} max={50} step={5} />
                  </div>
                </div>
                <Button className="w-full">Start Following</Button>
              </TabsContent>
              <TabsContent value="orbit" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  The drone will orbit around a point of interest while keeping the camera focused on it.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orbit Radius</label>
                    <Slider value={[50]} max={100} step={5} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orbit Speed</label>
                    <Slider value={[25]} max={50} step={5} />
                  </div>
                </div>
                <Button className="w-full">Start Orbit</Button>
              </TabsContent>
              <TabsContent value="track" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  The drone will automatically track and follow a selected object while maintaining camera focus.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tracking Distance</label>
                    <Slider value={[40]} max={100} step={5} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tracking Speed</label>
                    <Slider value={[30]} max={50} step={5} />
                  </div>
                </div>
                <Button className="w-full">Start Tracking</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {mode === "autonomous" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Autonomous Flight</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Mode:</span>
                <Button variant="default" size="sm">
                  Autonomous
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">City Perimeter</h4>
                      <p className="text-xs text-muted-foreground">8 waypoints • 12.4 km</p>
                    </div>
                    <Button size="sm">Load</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mountain Survey</h4>
                      <p className="text-xs text-muted-foreground">12 waypoints • 24.7 km</p>
                    </div>
                    <Button size="sm">Load</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Coastal Path</h4>
                      <p className="text-xs text-muted-foreground">6 waypoints • 8.2 km</p>
                    </div>
                    <Button size="sm">Load</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button>Create New Mission</Button>
              <Button variant="outline">Edit Waypoints</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Mission Controls</h3>

            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium mb-2">Mission Parameters</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Altitude</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value="120"
                        />
                        <span className="ml-2 text-sm">m</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Speed</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value="50"
                        />
                        <span className="ml-2 text-sm">km/h</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="rth" className="mr-2" checked />
                    <label htmlFor="rth" className="text-sm">
                      Return to home after mission
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="avoid" className="mr-2" checked />
                    <label htmlFor="avoid" className="text-sm">
                      Enable obstacle avoidance
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="default" className="w-full">
                  Start Mission
                </Button>
                <Button variant="outline" className="w-full">
                  Pause Mission
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Emergency Actions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="destructive">Abort Mission</Button>
                  <Button variant="destructive">Return Home</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
