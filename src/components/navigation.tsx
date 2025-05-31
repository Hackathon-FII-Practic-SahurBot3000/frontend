"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Settings,
  LogOut,
  UserCircle,
  Bell,
  MessageSquare,
  Bookmark,
  Palette,
  Moon,
  Sun,
  HelpCircle,
  Shield,
  Plus,
} from "lucide-react";

const routes = [
  { name: "Home", path: "/" },
  { name: "Hackathons", path: "/hackathons" },
  { name: "Categories", path: "/categories" },
  { name: "Create Hackathon", path: "/create-hackathon" },
  { name: "My Hackathons", path: "/my-hackathons" },
  { name: "Wall of Fame", path: "/wall-of-fame" },
  { name: "Submit", path: "/submit" },
  { name: "Voting", path: "/voting" },
  { name: "Audio Voting", path: "/audio-voting" },
  { name: "Entries", path: "/entries" },
];

// Mock user data - in real app this would come from auth context
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  avatar: "/api/placeholder/40/40",
  status: "online", // online, away, busy, offline
  notifications: 3,
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Mock authentication state - replace with real auth context
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true to show profile
  const user = isAuthenticated ? mockUser : null;

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenu({ x: 0, y: 0, show: false });
      }
    };

    const handleScroll = () => {
      setContextMenu({ x: 0, y: 0, show: false });
    };

    if (contextMenu.show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [contextMenu.show]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      show: true,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setContextMenu({ x: 0, y: 0, show: false });
    // In real app, this would call auth context logout
  };

  const handleProfile = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/profile";
  };

  const handleSettings = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/settings";
  };

  const handleNotifications = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/notifications";
  };

  const handleMessages = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/messages";
  };

  const handleBookmarks = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/bookmarks";
  };

  const handleMySubmissions = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/my-submissions";
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setContextMenu({ x: 0, y: 0, show: false });
    // In real app, this would toggle the theme
  };

  const handleHelp = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/help";
  };

  const handlePrivacy = () => {
    setContextMenu({ x: 0, y: 0, show: false });
    window.location.href = "/privacy";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-hackathon-primary to-hackathon-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="font-bold text-xl text-hackathon-primary">
                IdeaSweep
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {routes.slice(0, 5).map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    route.name === "Create Hackathon"
                      ? "bg-charcoal-900 text-ivory px-3 py-1.5 rounded-md hover:bg-charcoal-800"
                      : pathname === route.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {route.name === "Create Hackathon" && (
                    <Plus className="h-4 w-4 mr-1 inline" />
                  )}
                  {route.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {mounted && isAuthenticated && user ? (
              <>
                {/* Notifications Bell */}
                <div className="hidden lg:flex">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {user.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                        {user.notifications}
                      </span>
                    )}
                  </Button>
                </div>

                {/* Desktop Profile Dropdown with Right-Click */}
                <div className="hidden lg:flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                        onContextMenu={handleRightClick}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <AvatarFallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {/* Status Indicator */}
                        <div
                          className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                            getStatusColor(user.status)
                          )}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground capitalize">
                            Status: {user.status}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleProfile}>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSettings}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                {/* Desktop Login/Register Buttons */}
                {mounted && (
                  <div className="hidden lg:flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="container lg:hidden py-4 bg-background border-t">
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md",
                    pathname === route.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {mounted && (
                <div className="border-t pt-4 mt-4">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatar}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                            <AvatarFallback>
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={cn(
                              "absolute bottom-0 right-0 h-2 w-2 rounded-full border border-background",
                              getStatusColor(user.status)
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        {user.notifications > 0 && (
                          <div className="ml-auto">
                            <span className="h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                              {user.notifications}
                            </span>
                          </div>
                        )}
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md text-muted-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserCircle className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md text-muted-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md text-muted-foreground w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        className="text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md text-muted-foreground block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/register"
                        className="text-sm font-medium transition-colors hover:text-foreground p-2 rounded-md text-muted-foreground block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Right-Click Context Menu */}
      {contextMenu.show && (
        <div
          ref={contextMenuRef}
          className="fixed z-[100] min-w-[200px] bg-popover border border-border rounded-md shadow-lg py-1"
          style={{
            left: `${Math.min(contextMenu.x, window.innerWidth - 220)}px`,
            top: `${Math.min(contextMenu.y, window.innerHeight - 400)}px`,
          }}
        >
          {/* User Info Header */}
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.avatar}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <AvatarFallback>
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.status}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="py-1">
            <button
              onClick={handleNotifications}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              {user?.notifications && user.notifications > 0 && (
                <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                  {user.notifications}
                </span>
              )}
            </button>

            <button
              onClick={handleMessages}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={handleBookmarks}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved Items</span>
            </button>

            <button
              onClick={handleMySubmissions}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Palette className="h-4 w-4" />
              <span>My Submissions</span>
            </button>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <UserCircle className="h-4 w-4" />
              <span>View Profile</span>
            </button>

            <button
              onClick={handleSettings}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleToggleTheme}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={handleHelp}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={handlePrivacy}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </button>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
