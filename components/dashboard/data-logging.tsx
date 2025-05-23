"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileDown } from "lucide-react"
import { useState } from "react"

// Mock flight logs data
const flightLogs = [
  {
    id: "FL-2023-05-12-001",
    date: "2023-05-12",
    duration: "1h 23m",
    distance: "42.3 km",
    maxAlt: "450m",
    status: "Completed",
  },
  {
    id: "FL-2023-05-10-002",
    date: "2023-05-10",
    duration: "0h 45m",
    distance: "18.7 km",
    maxAlt: "320m",
    status: "Completed",
  },
  {
    id: "FL-2023-05-08-003",
    date: "2023-05-08",
    duration: "2h 10m",
    distance: "67.2 km",
    maxAlt: "510m",
    status: "Completed",
  },
  {
    id: "FL-2023-05-05-004",
    date: "2023-05-05",
    duration: "0h 32m",
    distance: "12.5 km",
    maxAlt: "280m",
    status: "Aborted",
  },
  {
    id: "FL-2023-05-01-005",
    date: "2023-05-01",
    duration: "1h 55m",
    distance: "58.9 km",
    maxAlt: "490m",
    status: "Completed",
  },
]

export function DataLogging() {
  const [selectedFormat, setSelectedFormat] = useState("csv")

  const handleDownload = (logId: string) => {
    // This would normally trigger a download of the log file
    console.log(`Downloading log ${logId} in ${selectedFormat} format`)
  }

  const handleDownloadAll = () => {
    // This would normally trigger a download of all log files
    console.log(`Downloading all logs in ${selectedFormat} format`)
  }

  return (
    <div className="space-y-4">
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

        <Button variant="outline" size="sm" onClick={handleDownloadAll}>
          <FileDown className="mr-2 h-4 w-4" />
          Download All
        </Button>
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
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      log.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {log.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(log.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
