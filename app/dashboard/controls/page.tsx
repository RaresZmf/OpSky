import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { AdvancedControlPanel } from "@/components/dashboard/advanced-control-panel"
import { Button } from "@/components/ui/button"
import { Compass, Save, Settings } from "lucide-react"

export default function ControlsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <Compass className="h-6 w-6" />
            <span>Flight Controls</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Control Settings
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <div className="grid gap-4">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Flight Controls</CardTitle>
                <CardDescription>Manual and automated flight control</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Ready to Fly</span>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="mb-4 w-full grid grid-cols-3">
                  <TabsTrigger value="manual">Manual Control</TabsTrigger>
                  <TabsTrigger value="assisted">Assisted Flight</TabsTrigger>
                  <TabsTrigger value="autonomous">Autonomous</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <AdvancedControlPanel mode="manual" />
                </TabsContent>
                <TabsContent value="assisted">
                  <AdvancedControlPanel mode="assisted" />
                </TabsContent>
                <TabsContent value="autonomous">
                  <AdvancedControlPanel mode="autonomous" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Flight Modes</CardTitle>
                <CardDescription>Select flight behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <FlightModeButton mode="Normal" description="Standard flight characteristics" isActive={true} />
                  <FlightModeButton mode="Sport" description="Increased responsiveness" isActive={false} />
                  <FlightModeButton mode="Cinematic" description="Smooth movements for filming" isActive={false} />
                  <FlightModeButton mode="Precision" description="Enhanced stability for mapping" isActive={false} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated Tasks</CardTitle>
                <CardDescription>Pre-programmed flight operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <AutomatedTaskButton task="Orbit Point" description="Circle around a target" />
                  <AutomatedTaskButton task="Follow Me" description="Track and follow a moving target" />
                  <AutomatedTaskButton task="Grid Survey" description="Systematic area coverage" />
                  <AutomatedTaskButton task="Perimeter Scan" description="Follow boundary lines" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Controls</CardTitle>
                <CardDescription>Emergency and safety features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full justify-start">
                    Emergency Land
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Return to Home
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Hover in Place
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Abort Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FlightModeButtonProps {
  mode: string
  description: string
  isActive: boolean
}

function FlightModeButton({ mode, description, isActive }: FlightModeButtonProps) {
  return (
    <Button variant={isActive ? "default" : "outline"} className="w-full justify-start h-auto py-2">
      <div className="flex flex-col items-start">
        <span>{mode}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </Button>
  )
}

interface AutomatedTaskButtonProps {
  task: string
  description: string
}

function AutomatedTaskButton({ task, description }: AutomatedTaskButtonProps) {
  return (
    <Button variant="outline" className="w-full justify-start h-auto py-2">
      <div className="flex flex-col items-start">
        <span>{task}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </Button>
  )
}
