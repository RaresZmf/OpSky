import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ConnectionStatus } from "@/components/dashboard/connection-status"
import { EnhancedVideoFeed } from "@/components/dashboard/enhanced-video-feed"
import { Button } from "@/components/ui/button"
import { Camera, Save, Video } from "lucide-react"

export default function VideoPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-8">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2 font-semibold">
            <Video className="h-6 w-6" />
            <span>Video Feed</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ConnectionStatus status="connected" />
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Take Screenshot
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Record
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden p-4 lg:p-8">
        <div className="grid gap-4 h-full grid-rows-[auto_1fr]">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Live Video Feed</CardTitle>
                <CardDescription>FPV camera view from OpSky</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium">Live Streaming</span>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 h-full">
            <Card className="lg:col-span-3 h-full overflow-hidden">
              <CardContent className="p-0 h-full">
                <EnhancedVideoFeed />
              </CardContent>
            </Card>

            <Card className="h-full overflow-hidden">
              <CardHeader>
                <CardTitle>Video Settings</CardTitle>
                <CardDescription>Configure video options</CardDescription>
              </CardHeader>
              <CardContent className="p-4 h-[calc(100%-5rem)] overflow-auto">
                <Tabs defaultValue="display">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="display" className="flex-1">
                      Display
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="flex-1">
                      Camera
                    </TabsTrigger>
                    <TabsTrigger value="recording" className="flex-1">
                      Recording
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="display" className="space-y-4">
                    <VideoSettingItem
                      title="HUD Overlay"
                      description="Show telemetry data on video"
                      type="toggle"
                      defaultChecked={true}
                    />
                    <VideoSettingItem
                      title="Artificial Horizon"
                      description="Show orientation indicator"
                      type="toggle"
                      defaultChecked={true}
                    />
                    <VideoSettingItem
                      title="Compass"
                      description="Show directional compass"
                      type="toggle"
                      defaultChecked={true}
                    />
                    <VideoSettingItem
                      title="Brightness"
                      description="Adjust video brightness"
                      type="slider"
                      defaultValue={50}
                    />
                    <VideoSettingItem
                      title="Contrast"
                      description="Adjust video contrast"
                      type="slider"
                      defaultValue={50}
                    />
                  </TabsContent>
                  <TabsContent value="camera" className="space-y-4">
                    <VideoSettingItem
                      title="Resolution"
                      description="Video quality setting"
                      type="select"
                      options={["720p", "1080p", "1440p", "4K"]}
                      defaultValue="1080p"
                    />
                    <VideoSettingItem
                      title="Frame Rate"
                      description="Frames per second"
                      type="select"
                      options={["24 fps", "30 fps", "60 fps", "120 fps"]}
                      defaultValue="30 fps"
                    />
                    <VideoSettingItem
                      title="Field of View"
                      description="Camera viewing angle"
                      type="select"
                      options={["Narrow", "Medium", "Wide", "Super Wide"]}
                      defaultValue="Wide"
                    />
                    <VideoSettingItem
                      title="Image Stabilization"
                      description="Reduce camera shake"
                      type="toggle"
                      defaultChecked={true}
                    />
                  </TabsContent>
                  <TabsContent value="recording" className="space-y-4">
                    <VideoSettingItem
                      title="Auto Record"
                      description="Start recording on takeoff"
                      type="toggle"
                      defaultChecked={false}
                    />
                    <VideoSettingItem
                      title="Recording Format"
                      description="Video file format"
                      type="select"
                      options={["MP4", "MOV", "AVI", "HEVC"]}
                      defaultValue="MP4"
                    />
                    <VideoSettingItem
                      title="Bitrate"
                      description="Video quality bitrate"
                      type="select"
                      options={["Low", "Medium", "High", "Ultra"]}
                      defaultValue="High"
                    />
                    <VideoSettingItem
                      title="Storage Location"
                      description="Where to save recordings"
                      type="select"
                      options={["Local Storage", "Cloud Storage", "Both"]}
                      defaultValue="Both"
                    />
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

interface VideoSettingItemProps {
  title: string
  description: string
  type: "toggle" | "slider" | "select"
  defaultChecked?: boolean
  defaultValue?: number | string
  options?: string[]
}

function VideoSettingItem({ title, description, type, defaultChecked, defaultValue, options }: VideoSettingItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {type === "toggle" && (
        <div className="flex h-6 w-11 cursor-pointer rounded-full bg-muted p-1 transition-colors data-[state=checked]:bg-primary">
          <div
            className={`h-4 w-4 rounded-full bg-white transition-transform ${defaultChecked ? "translate-x-5" : "translate-x-0"}`}
          />
        </div>
      )}
      {type === "slider" && (
        <div className="w-24 h-4 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${defaultValue}%` }} />
        </div>
      )}
      {type === "select" && (
        <select className="h-8 w-28 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {options?.map((option) => (
            <option key={option} selected={option === defaultValue}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
