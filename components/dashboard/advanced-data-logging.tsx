"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileDown, Filter } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Chart, ChartContainer, ChartGrid, ChartLine, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock flight logs data
const flightLogs = [
  {
    id: "FL-2023-05-12-001",
    date: "2023-05-12",
    duration: "1h 23m",
    distance: "42.3 km",
    maxAlt: "450m",
    maxSpeed: "78 km/h",
    batteryUsed: "85%",
    status: "Completed",
  },
  {
    id: "FL-2023-05-10-002",
    date: "2023-05-10",
    duration: "0h 45m",
    distance: "18.7 km",
    maxAlt: "320m",
    maxSpeed: "65 km/h",
    batteryUsed: "42%",
    status: "Completed",
  },
  {
    id: "FL-2023-05-08-003",
    date: "2023-05-08",
    duration: "2h 10m",
    distance: "67.2 km",
    maxAlt: "510m",
    maxSpeed: "92 km/h",
    batteryUsed: "95%",
    status: "Completed",
  },
  {
    id: "FL-2023-05-05-004",
    date: "2023-05-05",
    duration: "0h 32m",
    distance: "12.5 km",
    maxAlt: "280m",
    maxSpeed: "58 km/h",
    batteryUsed: "35%",
    status: "Aborted",
  },
  {
    id: "FL-2023-05-01-005",
    date: "2023-05-01",
    duration: "1h 55m",
    distance: "58.9 km",
    maxAlt: "490m",
    maxSpeed: "85 km/h",
    batteryUsed: "90%",
    status: "Completed",
  },
  {
    id: "FL-2023-04-28-006",
    date: "2023-04-28",
    duration: "1h 12m",
    distance: "38.4 km",
    maxAlt: "420m",
    maxSpeed: "72 km/h",
    batteryUsed: "75%",
    status: "Completed",
  },
  {
    id: "FL-2023-04-25-007",
    date: "2023-04-25",
    duration: "0h 58m",
    distance: "25.6 km",
    maxAlt: "350m",
    maxSpeed: "68 km/h",
    batteryUsed: "55%",
    status: "Completed",
  },
  {
    id: "FL-2023-04-20-008",
    date: "2023-04-20",
    duration: "0h 28m",
    distance: "10.2 km",
    maxAlt: "220m",
    maxSpeed: "52 km/h",
    batteryUsed: "30%",
    status: "Aborted",
  },
]

// Mock chart data for a flight log
const generateFlightLogChartData = () => {
  const data = []
  const flightDuration = 60 // minutes

  for (let i = 0; i <= flightDuration; i++) {
    data.push({
      time: i,
      altitude: Math.floor(Math.random() * 200) + 300,
      speed: Math.floor(Math.random() * 30) + 60,
      battery: 100 - Math.floor(i * 1.5),
    })
  }

  return data
}

export function AdvancedDataLogging() {
  const [selectedFormat, setSelectedFormat] = useState("csv")
  const [selectedLog, setSelectedLog] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("logs")
  const [chartData] = useState(generateFlightLogChartData())

  const handleDownload = (logId: string) => {
    // This would normally trigger a download of the log file
    console.log(`Downloading log ${logId} in ${selectedFormat} format`)
  }

  const handleDownloadAll = () => {
    // This would normally trigger a download of all log files
    console.log(`Downloading all logs in ${selectedFormat} format`)
  }

  const handleViewLog = (logId: string) => {
    setSelectedLog(logId)
    setActiveTab("details")
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="logs">Flight Logs</TabsTrigger>
        <TabsTrigger value="details" disabled={!selectedLog}>
          Log Details
        </TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="logs" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={selectedFormat === "csv" ? "bg-primary text-primary-foreground" : ""}
              onClick={() => setSelectedFormat("csv")}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={selectedFormat === "json" ? "bg-primary text-primary-foreground" : ""}
              onClick={() => setSelectedFormat("json")}
            >
              JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={selectedFormat === "xlsx" ? "bg-primary text-primary-foreground" : ""}
              onClick={() => setSelectedFormat("xlsx")}
            >
              Excel
            </Button>
          </div>

          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadAll}>
              <FileDown className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Max Altitude</TableHead>
                <TableHead>Max Speed</TableHead>
                <TableHead>Battery Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flightLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>{log.distance}</TableCell>
                  <TableCell>{log.maxAlt}</TableCell>
                  <TableCell>{log.maxSpeed}</TableCell>
                  <TableCell>{log.batteryUsed}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        log.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewLog(log.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(log.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="details" className="space-y-4">
        {selectedLog && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Flight Log: {selectedLog}</h3>
              <Button variant="outline" size="sm" onClick={() => handleDownload(selectedLog)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Duration</div>
                  <div className="text-2xl font-bold">1h 23m</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Distance</div>
                  <div className="text-2xl font-bold">42.3 km</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Max Altitude</div>
                  <div className="text-2xl font-bold">450m</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">Battery Used</div>
                  <div className="text-2xl font-bold">85%</div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px] w-full">
              <ChartContainer>
                <Chart data={chartData}>
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartGrid />
                  <ChartLine dataKey="altitude" name="Altitude (m)" stroke="#2563eb" strokeWidth={2} />
                  <ChartLine dataKey="speed" name="Speed (km/h)" stroke="#16a34a" strokeWidth={2} />
                  <ChartLine dataKey="battery" name="Battery (%)" stroke="#ea580c" strokeWidth={2} />
                </Chart>
              </ChartContainer>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Flight Events</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Takeoff</span>
                      <span className="text-muted-foreground">10:15:22</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Max Altitude Reached</span>
                      <span className="text-muted-foreground">10:32:47</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Low Battery Warning</span>
                      <span className="text-muted-foreground">11:28:15</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Return to Home Initiated</span>
                      <span className="text-muted-foreground">11:35:02</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Landing</span>
                      <span className="text-muted-foreground">11:38:45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">System Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Average CPU Load</span>
                      <span>32%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Memory Usage</span>
                      <span>48%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Signal Strength</span>
                      <span>87%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Temperature</span>
                      <span>42°C</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Battery Efficiency</span>
                      <span>92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent value="analysis" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">Flight Statistics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Flights</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Flight Time</span>
                  <span className="font-medium">68h 23m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Distance</span>
                  <span className="font-medium">1,245 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Flight Time</span>
                  <span className="font-medium">1h 37m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Distance</span>
                  <span className="font-medium">29.6 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max Altitude Reached</span>
                  <span className="font-medium">520m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max Speed Recorded</span>
                  <span className="font-medium">142 km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">System Health</h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Battery Health</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "92%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Motor Performance</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "95%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPS Accuracy</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "98%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compass Calibration</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: "87%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Signal Reliability</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "94%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-4">Flight Trends</h4>
            <div className="h-[300px] w-full">
              <ChartContainer>
                <Chart
                  data={[
                    { month: "Jan", flights: 5, hours: 8, distance: 120 },
                    { month: "Feb", flights: 7, hours: 12, distance: 180 },
                    { month: "Mar", flights: 10, hours: 18, distance: 250 },
                    { month: "Apr", flights: 8, hours: 15, distance: 210 },
                    { month: "May", flights: 12, hours: 22, distance: 320 },
                  ]}
                >
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <ChartGrid />
                  <ChartLine dataKey="flights" name="Number of Flights" stroke="#2563eb" strokeWidth={2} />
                  <ChartLine dataKey="hours" name="Flight Hours" stroke="#16a34a" strokeWidth={2} />
                  <ChartLine dataKey="distance" name="Distance (km)" stroke="#ea580c" strokeWidth={2} />
                </Chart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
