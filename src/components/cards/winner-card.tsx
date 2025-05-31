import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface WinnerCardProps {
  id: string
  title: string
  summary: string
  media?: string
  category: string
  userName: string
  userAvatar: string
  prize: string
  className?: string
}

export function WinnerCard({
  id,
  title,
  summary,
  media,
  category,
  userName,
  userAvatar,
  prize,
  className,
}: WinnerCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md border-2 border-hackathon-primary", className)}>
      <Link href={`/submissions/${id}`}>
        <div className="relative">
          {media && (
            <div className="relative h-48 w-full">
              <Image src={media || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          )}
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/60 to-transparent p-4">
            <Badge className="bg-hackathon-primary text-white flex items-center gap-1">
              <Award className="h-3 w-3" />
              {prize}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="hackathon">{category}</Badge>
          </div>
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{userName}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
