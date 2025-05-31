"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface CombinedBackgroundProps {
  children?: React.ReactNode
  className?: string
  variant?: "grid-dots" | "layered" | "intersect"
  animated?: boolean
}

export function CombinedBackground({
  children,
  className,
  variant = "grid-dots",
  animated = false,
}: CombinedBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (variant) {
      case "grid-dots":
        return {
          backgroundImage: `
            radial-gradient(circle, rgba(54, 69, 79, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(54, 69, 79, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(54, 69, 79, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 40px 40px, 40px 40px",
        }
      case "layered":
        return {
          backgroundImage: `
            linear-gradient(45deg, rgba(54, 69, 79, 0.05) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(54, 69, 79, 0.05) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(54, 69, 79, 0.05) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(54, 69, 79, 0.05) 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }
      case "intersect":
        return {
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(54, 69, 79, 0.1) 2px, transparent 2px),
            linear-gradient(to right, rgba(54, 69, 79, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(54, 69, 79, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 25px 25px, 25px 25px",
        }
      default:
        return {}
    }
  }

  return (
    <div className={cn("relative w-full", animated && "animate-pulse", className)} style={getBackgroundStyle()}>
      {children}
    </div>
  )
}
