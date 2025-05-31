import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface HackathonCardProps {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  category: string
  areas?: string[] // Make this optional
  image?: string
  entriesCount: number
  status: "upcoming" | "active" | "past"
  ctaText?: string
  ctaVariant?: "primary" | "secondary" | "outline"
  className?: string
}

export function HackathonCard({
  id,
  title,
  description,
  startDate,
  endDate,
  category,
  areas,
  image,
  entriesCount,
  status,
  ctaText,
  ctaVariant = "primary",
  className,
}: HackathonCardProps) {
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const statusColors = {
    upcoming: "bg-blue-50 text-blue-700 border-blue-200",
    active: "bg-green-50 text-green-700 border-green-200",
    past: "bg-charcoal-50 text-charcoal-700 border-charcoal-200",
  }

  const categoryColors = {
    "Visual Art": "bg-purple-100 text-purple-800",
    Writing: "bg-blue-100 text-blue-800",
    Architecture: "bg-amber-100 text-amber-800",
    "Game Design": "bg-red-100 text-red-800",
    Audio: "bg-green-100 text-green-800",
    Fashion: "bg-pink-100 text-pink-800",
  }

  const getCategoryColor = (cat: string) => {
    return categoryColors[cat as keyof typeof categoryColors] || "bg-charcoal-100 text-charcoal-800"
  }

  const ctaVariants = {
    primary: "bg-charcoal-900 hover:bg-charcoal-800 text-ivory",
    secondary: "bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-900",
    outline: "border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50",
  }

  // Calculate days remaining for upcoming hackathons
  const getDaysRemaining = () => {
    if (status !== "upcoming") return null

    const now = new Date()
    const start = new Date(startDate)
    const diffTime = start.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  const daysRemaining = getDaysRemaining()

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg border-charcoal-200 bg-ivory/90 backdrop-blur-sm h-full flex flex-col",
        className,
      )}
    >
      {image && (
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <span className={cn("text-xs px-2 py-1 rounded-full border", statusColors[status])}>
              {status === "active" ? "Live Now" : status === "upcoming" ? "Coming Soon" : "Past Event"}
            </span>
          </div>
        </div>
      )}
      <CardHeader className={cn("p-4", !image && "pt-6")}>
        {!image && (
          <div className="flex justify-end mb-2">
            <span className={cn("text-xs px-2 py-1 rounded-full border", statusColors[status])}>
              {status === "active" ? "Live Now" : status === "upcoming" ? "Coming Soon" : "Past Event"}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge className={getCategoryColor(category)}>{category}</Badge>
          {areas && areas.length > 0 && (
            <>
              {areas.slice(0, 2).map((area) => (
                <Badge key={area} variant="outline" className="border-charcoal-200 text-charcoal-700">
                  {area}
                </Badge>
              ))}
              {areas.length > 2 && (
                <Badge variant="outline" className="border-charcoal-200 text-charcoal-700">
                  +{areas.length - 2} more
                </Badge>
              )}
            </>
          )}
        </div>
        <h3 className="text-lg font-semibold text-charcoal-900">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-charcoal-600 line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-charcoal-600">
            <Calendar className="h-4 w-4 text-charcoal-500" />
            <span>
              {formattedStartDate} - {formattedEndDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-600">
            <Users className="h-4 w-4 text-charcoal-500" />
            <span>
              {entriesCount} {entriesCount === 1 ? "entry" : "entries"}
            </span>
          </div>
          {daysRemaining !== null && (
            <div className="flex items-center gap-2 text-sm text-charcoal-600">
              <Clock className="h-4 w-4 text-charcoal-500" />
              <span>
                Starts in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className={cn("w-full", ctaVariants[ctaVariant])}>
          <Link href={`/hackathons/${id}`} className="flex items-center justify-center w-full">
            {ctaText || (status === "active" ? "Join Now" : status === "upcoming" ? "Remind Me" : "See Winners")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
