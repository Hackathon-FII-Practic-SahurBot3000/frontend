"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Trophy,
  Users,
  MessageSquare,
  Upload,
  Vote,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  User,
} from "lucide-react"
import { currentUser } from "@/lib/mock-data"

const navigationItems = [
  {
    title: "Main",
    items: [
      { name: "Home", path: "/", icon: Home },
      { name: "Hackathons", path: "/hackathons", icon: Calendar },
      { name: "Wall of Fame", path: "/wall-of-fame", icon: Trophy },
    ],
  },
  {
    title: "Participate",
    items: [
      { name: "Submit", path: "/submit", icon: Upload },
      { name: "Voting", path: "/voting", icon: Vote },
      { name: "Chat", path: "/chat", icon: MessageSquare },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Profile", path: "/profile", icon: User },
      { name: "Leaderboard", path: "/leaderboard", icon: Award },
      { name: "Teams", path: "/teams", icon: Users },
    ],
  },
  {
    title: "Development",
    items: [
      { name: "Cards", path: "/cards", icon: Sparkles },
      { name: "Components", path: "/components", icon: Settings },
    ],
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hackathon-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-hackathon-primary">COLLECTIVE</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">@{currentUser.username}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-3 flex gap-2">
            <Badge variant="hackathon" className="text-xs">
              Active Creator
            </Badge>
            <Badge variant="outline" className="text-xs">
              Level 3
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {navigationItems.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.path
                  return (
                    <Link key={item.path} href={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-10",
                          collapsed && "justify-center px-2",
                          isActive && "bg-hackathon-light text-hackathon-primary hover:bg-hackathon-light/80",
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </Button>
                    </Link>
                  )
                })}
              </div>
              {!collapsed && section.title !== "Development" && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" className={cn("w-full justify-start gap-3", collapsed && "justify-center px-2")}>
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  )
}
