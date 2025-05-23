import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { Button } from "@/components/ui/button"
import { AdvancedDataLogging } from "@/components/dashboard/advanced-data-logging"
import { Download, FileText, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LogsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="h-6 w-6" />
            <span>Flight Logs</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="grid gap-4">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Flight Logs</CardTitle>
                <CardDescription>Historical flight data and analysis</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AdvancedDataLogging />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Log Statistics</CardTitle>
                <CardDescription>Summary of flight data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StatItem label="Total Flights" value="42" />
                  <StatItem label="Total Flight Time" value="68h 23m" />
                  <StatItem label="Total Distance" value="1,245 km" />
                  <StatItem label="Average Flight Time" value="1h 37m" />
                  <StatItem label="Max Altitude Reached" value="520m" />
                  <StatItem label="Max Speed Recorded" value="142 km/h" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest flight events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    title="Flight Completed"
                    description="Mission completed successfully"
                    time="2 hours ago"
                    status="success"
                  />
                  <ActivityItem
                    title="Low Battery Warning"
                    description="Battery level dropped below 20%"
                    time="2 hours ago"
                    status="warning"
                  />
                  <ActivityItem
                    title="Waypoint Updated"
                    description="Flight path modified during mission"
                    time="3 hours ago"
                    status="info"
                  />
                  <ActivityItem
                    title="Strong Wind Detected"
                    description="Wind speed exceeded 25 km/h"
                    time="3 hours ago"
                    status="warning"
                  />
                  <ActivityItem
                    title="Flight Started"
                    description="Takeoff initiated"
                    time="4 hours ago"
                    status="success"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Log Analysis</CardTitle>
                <CardDescription>Insights from flight data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnalysisItem
                    title="Battery Efficiency"
                    description="Battery performance is optimal"
                    value="98%"
                    trend="up"
                  />
                  <AnalysisItem
                    title="Flight Stability"
                    description="Consistent flight characteristics"
                    value="High"
                    trend="stable"
                  />
                  <AnalysisItem
                    title="Motor Health"
                    description="All motors functioning normally"
                    value="100%"
                    trend="stable"
                  />
                  <AnalysisItem
                    title="Signal Quality"
                    description="Average signal strength during flights"
                    value="92%"
                    trend="up"
                  />
                  <AnalysisItem
                    title="GPS Accuracy"
                    description="Position accuracy within 1.2m"
                    value="High"
                    trend="stable"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

interface StatItemProps {
  label: string
  value: string
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

interface ActivityItemProps {
  title: string
  description: string
  time: string
  status: "success" | "warning" | "error" | "info"
}

function ActivityItem({ title, description, time, status }: ActivityItemProps) {
  const statusColors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  return (
    <div className="flex items-start gap-2">
      <div className={`mt-1.5 h-2 w-2 rounded-full ${statusColors[status]}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

interface AnalysisItemProps {
  title: string
  description: string
  value: string
  trend: "up" | "down" | "stable"
}

function AnalysisItem({ title, description, value, trend }: AnalysisItemProps) {
  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  }

  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    stable: "text-blue-500",
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-medium">{value}</span>
        <span className={trendColors[trend]}>{trendIcons[trend]}</span>
      </div>
    </div>
  )
}
