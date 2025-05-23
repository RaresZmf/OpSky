import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { FullScreenMap } from "@/components/dashboard/full-screen-map"
import { WaypointManager } from "@/components/dashboard/waypoint-manager"
import { Button } from "@/components/ui/button"
import { Download, Map, Save } from "lucide-react"

export default function MapPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <Map className="h-6 w-6" />
            <span>Flight Map</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Route
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Map
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden p-4 lg:p-8">
        <div className="grid gap-4 h-full grid-rows-[auto_1fr]">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Flight Map</CardTitle>
                <CardDescription>Current location and flight path</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">GPS Lock: Strong</span>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 h-full">
            <Card className="lg:col-span-3 h-full overflow-hidden">
              <CardContent className="p-0 h-full">
                <FullScreenMap />
              </CardContent>
            </Card>

            <Card className="h-full overflow-hidden">
              <CardHeader>
                <CardTitle>Waypoints</CardTitle>
                <CardDescription>Manage flight path</CardDescription>
              </CardHeader>
              <CardContent className="p-4 h-[calc(100%-5rem)] overflow-auto">
                <Tabs defaultValue="waypoints">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="waypoints" className="flex-1">
                      Waypoints
                    </TabsTrigger>
                    <TabsTrigger value="routes" className="flex-1">
                      Saved Routes
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="waypoints" className="h-full">
                    <WaypointManager />
                  </TabsContent>
                  <TabsContent value="routes" className="h-full">
                    <div className="space-y-2">
                      <SavedRouteItem name="City Perimeter" waypoints={8} distance="12.4 km" />
                      <SavedRouteItem name="Mountain Survey" waypoints={12} distance="24.7 km" />
                      <SavedRouteItem name="Coastal Path" waypoints={6} distance="8.2 km" />
                      <SavedRouteItem name="Forest Scan" waypoints={15} distance="18.9 km" />
                      <SavedRouteItem name="Agricultural Survey" waypoints={10} distance="14.3 km" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

interface SavedRouteItemProps {
  name: string
  waypoints: number
  distance: string
}

function SavedRouteItem({ name, waypoints, distance }: SavedRouteItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <h4 className="font-medium">{name}</h4>
        <div className="text-xs text-muted-foreground">
          {waypoints} waypoints • {distance}
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Load
      </Button>
    </div>
  )
}
