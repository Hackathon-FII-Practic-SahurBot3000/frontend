"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface DotBackgroundProps {
  children?: React.ReactNode
  className?: string
  dotSize?: "small" | "medium" | "large"
  opacity?: number
  animated?: boolean
}

export function DotBackground({
  children,
  className,
  dotSize = "medium",
  opacity = 0.15,
  animated = false,
}: DotBackgroundProps) {
  const sizeClasses = {
    small: "dot-small",
    medium: "",
    large: "dot-large",
  }

  return (
    <div
      className={cn("relative w-full dot-background", animated && "animate-pulse", sizeClasses[dotSize], className)}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(54, 69, 79, ${opacity}) 1px, transparent 1px)`,
      }}
    >
      {children}
    </div>
  )
}
