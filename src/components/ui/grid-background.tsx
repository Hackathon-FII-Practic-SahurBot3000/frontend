"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  children?: React.ReactNode
  className?: string
  gridSize?: "small" | "medium" | "large"
  opacity?: number
  animated?: boolean
  fade?: boolean
}

export function GridBackground({
  children,
  className,
  gridSize = "medium",
  opacity = 0.1,
  animated = false,
  fade = false,
}: GridBackgroundProps) {
  const sizeClasses = {
    small: "grid-small",
    medium: "",
    large: "grid-large",
  }

  return (
    <div
      className={cn(
        "relative w-full",
        animated ? "animated-grid" : "grid-background",
        fade && "grid-fade",
        sizeClasses[gridSize],
        className,
      )}
      style={{
        backgroundImage: fade
          ? undefined
          : `linear-gradient(to right, rgba(54, 69, 79, ${opacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(54, 69, 79, ${opacity}) 1px, transparent 1px)`,
      }}
    >
      {children}
    </div>
  )
}
