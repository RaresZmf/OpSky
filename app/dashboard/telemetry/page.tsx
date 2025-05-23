import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DetailedTelemetry } from "@/components/dashboard/detailed-telemetry"
import { TelemetryHistory } from "@/components/dashboard/telemetry-history"
import { TelemetryAlerts } from "@/components/dashboard/telemetry-alerts"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { BarChart3, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TelemetryPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span>Telemetry Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Telemetry
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Telemetry Overview</CardTitle>
                <CardDescription>Real-time data from OpSky</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Transmitting</span>
              </div>
            </CardHeader>
            <CardContent>
              <DetailedTelemetry />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>Telemetry History</CardTitle>
              <CardDescription>Historical data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="altitude">
                <TabsList className="mb-4">
                  <TabsTrigger value="altitude">Altitude</TabsTrigger>
                  <TabsTrigger value="speed">Speed</TabsTrigger>
                  <TabsTrigger value="battery">Battery</TabsTrigger>
                  <TabsTrigger value="signal">Signal</TabsTrigger>
                </TabsList>
                <TabsContent value="altitude">
                  <TelemetryHistory dataKey="altitude" />
                </TabsContent>
                <TabsContent value="speed">
                  <TelemetryHistory dataKey="speed" />
                </TabsContent>
                <TabsContent value="battery">
                  <TelemetryHistory dataKey="battery" />
                </TabsContent>
                <TabsContent value="signal">
                  <TelemetryHistory dataKey="signal" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle>Telemetry Alerts</CardTitle>
              <CardDescription>Warnings and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <TelemetryAlerts />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Component status and diagnostics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SystemHealthCard title="Motors" status="optimal" value="100%" />
                <SystemHealthCard title="GPS" status="optimal" value="12 satellites" />
                <SystemHealthCard title="Gyroscope" status="optimal" value="Calibrated" />
                <SystemHealthCard title="Accelerometer" status="optimal" value="Calibrated" />
                <SystemHealthCard title="Compass" status="warning" value="Interference" />
                <SystemHealthCard title="Barometer" status="optimal" value="Calibrated" />
                <SystemHealthCard title="Radio Link" status="optimal" value="Strong" />
                <SystemHealthCard title="Camera" status="optimal" value="Streaming" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface SystemHealthCardProps {
  title: string
  status: "optimal" | "warning" | "critical"
  value: string
}

function SystemHealthCard({ title, status, value }: SystemHealthCardProps) {
  const statusColors = {
    optimal: "bg-green-500",
    warning: "bg-yellow-500",
    critical: "bg-red-500",
  }

  return (
    <div className="bg-card rounded-lg border p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{title}</span>
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}
