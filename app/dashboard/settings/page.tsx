import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { Button } from "@/components/ui/button"
import { Save, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <Settings className="h-6 w-6" />
            <span>System Settings</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="grid gap-4">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure OpSky system preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4 w-full grid grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="flight">Flight</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">System Information</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="device-name">Device Name</Label>
                          <Input id="device-name" defaultValue="OpSky-Drone-01" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="firmware">Firmware Version</Label>
                          <div className="flex items-center gap-2">
                            <Input id="firmware" defaultValue="v2.4.1" readOnly />
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="serial">Serial Number</Label>
                          <Input id="serial" defaultValue="OS-2023-1234-5678-9ABC" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="flight-time">Total Flight Time</Label>
                          <Input id="flight-time" defaultValue="68h 23m" readOnly />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Interface Settings</h3>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                          </div>
                          <Switch id="dark-mode" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="telemetry-refresh">Telemetry Refresh Rate</Label>
                            <p className="text-sm text-muted-foreground">How often to update telemetry data</p>
                          </div>
                          <Select defaultValue="1s">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select rate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5s">0.5 seconds</SelectItem>
                              <SelectItem value="1s">1 second</SelectItem>
                              <SelectItem value="2s">2 seconds</SelectItem>
                              <SelectItem value="5s">5 seconds</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="units">Units</Label>
                            <p className="text-sm text-muted-foreground">Measurement system to use</p>
                          </div>
                          <Select defaultValue="metric">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select units" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="metric">Metric (m, km/h)</SelectItem>
                              <SelectItem value="imperial">Imperial (ft, mph)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="audio-alerts">Audio Alerts</Label>
                            <p className="text-sm text-muted-foreground">Play sound for important alerts</p>
                          </div>
                          <Switch id="audio-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                            <p className="text-sm text-muted-foreground">Show system notifications</p>
                          </div>
                          <Switch id="desktop-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-alerts">Email Alerts</Label>
                            <p className="text-sm text-muted-foreground">Send critical alerts via email</p>
                          </div>
                          <Switch id="email-alerts" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="flight">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Flight Parameters</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="max-altitude">Maximum Altitude</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-altitude" type="number" defaultValue="500" />
                            <span className="text-sm text-muted-foreground">meters</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-distance">Maximum Distance</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-distance" type="number" defaultValue="2000" />
                            <span className="text-sm text-muted-foreground">meters</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-speed">Maximum Speed</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-speed" type="number" defaultValue="120" />
                            <span className="text-sm text-muted-foreground">km/h</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-ascent">Maximum Ascent Rate</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-ascent" type="number" defaultValue="5" />
                            <span className="text-sm text-muted-foreground">m/s</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-descent">Maximum Descent Rate</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-descent" type="number" defaultValue="3" />
                            <span className="text-sm text-muted-foreground">m/s</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-tilt">Maximum Tilt Angle</Label>
                          <div className="flex items-center gap-2">
                            <Input id="max-tilt" type="number" defaultValue="35" />
                            <span className="text-sm text-muted-foreground">degrees</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Flight Behavior</h3>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-takeoff">Automatic Takeoff</Label>
                            <p className="text-sm text-muted-foreground">Enable one-click takeoff</p>
                          </div>
                          <Switch id="auto-takeoff" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-landing">Automatic Landing</Label>
                            <p className="text-sm text-muted-foreground">Enable precision landing</p>
                          </div>
                          <Switch id="auto-landing" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="obstacle-avoidance">Obstacle Avoidance</Label>
                            <p className="text-sm text-muted-foreground">Automatically avoid obstacles</p>
                          </div>
                          <Switch id="obstacle-avoidance" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="follow-terrain">Terrain Following</Label>
                            <p className="text-sm text-muted-foreground">Maintain constant height above ground</p>
                          </div>
                          <Switch id="follow-terrain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="safety">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Safety Features</h3>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="return-home">Return to Home on Low Battery</Label>
                            <p className="text-sm text-muted-foreground">Automatically return when battery is low</p>
                          </div>
                          <Switch id="return-home" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="signal-loss">Return to Home on Signal Loss</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically return when connection is lost
                            </p>
                          </div>
                          <Switch id="signal-loss" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="geofence">Geofence</Label>
                            <p className="text-sm text-muted-foreground">Restrict flight to a defined area</p>
                          </div>
                          <Switch id="geofence" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="wind-warning">Wind Warning</Label>
                            <p className="text-sm text-muted-foreground">Alert when wind speed exceeds safe limits</p>
                          </div>
                          <Switch id="wind-warning" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Battery Settings</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="low-battery">Low Battery Warning</Label>
                          <div className="flex items-center gap-2">
                            <Input id="low-battery" type="number" defaultValue="30" />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="critical-battery">Critical Battery Level</Label>
                          <div className="flex items-center gap-2">
                            <Input id="critical-battery" type="number" defaultValue="15" />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rth-battery">Return to Home Battery Level</Label>
                          <div className="flex items-center gap-2">
                            <Input id="rth-battery" type="number" defaultValue="25" />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="land-battery">Auto Land Battery Level</Label>
                          <div className="flex items-center gap-2">
                            <Input id="land-battery" type="number" defaultValue="10" />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Connection Settings</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="connection-type">Connection Type</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue placeholder="Select connection type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto (Recommended)</SelectItem>
                              <SelectItem value="wifi">Wi-Fi Only</SelectItem>
                              <SelectItem value="radio">Radio Only</SelectItem>
                              <SelectItem value="lte">LTE Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="video-quality">Video Transmission Quality</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue placeholder="Select video quality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto (Adaptive)</SelectItem>
                              <SelectItem value="high">High (1080p)</SelectItem>
                              <SelectItem value="medium">Medium (720p)</SelectItem>
                              <SelectItem value="low">Low (480p)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="channel">Radio Channel</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue placeholder="Select channel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto Select</SelectItem>
                              <SelectItem value="1">Channel 1</SelectItem>
                              <SelectItem value="2">Channel 2</SelectItem>
                              <SelectItem value="3">Channel 3</SelectItem>
                              <SelectItem value="4">Channel 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="encryption">Encryption</Label>
                          <Select defaultValue="aes256">
                            <SelectTrigger>
                              <SelectValue placeholder="Select encryption" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                              <SelectItem value="aes128">AES-128</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Calibration</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-3">
                        <Button variant="outline">Calibrate Compass</Button>
                        <Button variant="outline">Calibrate Accelerometer</Button>
                        <Button variant="outline">Calibrate Gimbal</Button>
                        <Button variant="outline">Calibrate ESCs</Button>
                        <Button variant="outline">Calibrate Remote Controller</Button>
                        <Button variant="outline">Reset All Calibrations</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">System Maintenance</h3>
                      <Separator className="my-4" />
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button variant="outline">Check for Updates</Button>
                        <Button variant="outline">Backup Settings</Button>
                        <Button variant="outline">Restore Settings</Button>
                        <Button variant="outline">Reset to Factory Defaults</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
