import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { ControlPanel } from "@/components/dashboard/control-panel"
import { DataLogging } from "@/components/dashboard/data-logging"
import { FlightMap } from "@/components/dashboard/flight-map"
import { TelemetryDisplay } from "@/components/dashboard/telemetry-display"
import { VideoFeed } from "@/components/dashboard/video-feed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BellRing, Download, Plane } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <Plane className="h-6 w-6" />
            <span>OpSky Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <BellRing className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Flight Status</CardTitle>
                <CardDescription>Current status: In-flight</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Active</span>
              </div>
            </CardHeader>
            <CardContent>
              <TelemetryDisplay />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <CardHeader>
              <CardTitle>Flight Map</CardTitle>
              <CardDescription>Current location and flight path</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <FlightMap />
            </CardContent>
          </Card>

          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle>Video Feed</CardTitle>
              <CardDescription>Live FPV camera view</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <VideoFeed />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Control Panel</CardTitle>
              <CardDescription>Manual control and waypoint management</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual">
                <TabsList className="mb-4">
                  <TabsTrigger value="manual">Manual Control</TabsTrigger>
                  <TabsTrigger value="waypoints">Waypoints</TabsTrigger>
                  <TabsTrigger value="settings">Flight Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <ControlPanel />
                </TabsContent>
                <TabsContent value="waypoints">
                  <div className="text-center py-8">
                    <p>Waypoint management interface will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="text-center py-8">
                    <p>Flight settings interface will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Data Logging</CardTitle>
              <CardDescription>Flight data history and export options</CardDescription>
            </CardHeader>
            <CardContent>
              <DataLogging />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
