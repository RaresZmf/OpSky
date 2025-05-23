"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BarChart3, Compass, FileText, Home, LogOut, Map, Plane, Settings, User, Video } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6" />
          <span className="font-bold text-lg">OpSky</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/telemetry")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/telemetry">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Telemetry</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/map")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/map">
                      <Map className="mr-2 h-4 w-4" />
                      <span>Flight Map</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/video")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/video">
                      <Video className="mr-2 h-4 w-4" />
                      <span>Video Feed</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/controls")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/controls">
                      <Compass className="mr-2 h-4 w-4" />
                      <span>Controls</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/logs")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/logs">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Flight Logs</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>System Settings</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>User Profile</span>
                    </a>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
