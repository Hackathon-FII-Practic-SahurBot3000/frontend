import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubmissionCardProps {
  id: string
  title: string
  summary: string
  media?: string
  category: string
  userName: string
  userAvatar: string
  originalityScore?: number
  votes: number
  isWinner?: boolean
  prize?: string
  className?: string
  listView?: boolean
}

export function SubmissionCard({
  id,
  title,
  summary,
  media,
  category,
  userName,
  userAvatar,
  originalityScore,
  votes,
  isWinner,
  prize,
  className,
  listView = false,
}: SubmissionCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg border-charcoal-200 bg-ivory/90 backdrop-blur-sm",
        isWinner && "border-2 border-charcoal-700",
        className,
      )}
    >
      <Link href={`/submissions/${id}`} className={cn("flex", listView ? "flex-row h-full" : "flex-col")}>
        {media && (
          <div className={cn("relative", listView ? "h-32 w-32 flex-shrink-0" : "h-48 w-full")}>
            <Image src={media || "/placeholder.svg"} alt={title} fill className="object-cover" />
            {isWinner && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-charcoal-900 text-ivory flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Winner
                </Badge>
              </div>
            )}
          </div>
        )}
        <div className={cn("flex flex-col", listView ? "flex-1" : "")}>
          <CardHeader className={cn("p-4", listView && "pb-2")}>
            <div className="flex items-center justify-between">
              <Badge variant="charcoal">{category}</Badge>
              {originalityScore && (
                <Badge variant="success" className="flex items-center gap-1">
                  <span className="sr-only">Originality score</span>
                  AI Score: {originalityScore}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold mt-2 text-charcoal-900">{title}</h3>
          </CardHeader>
          <CardContent className={cn("p-4 pt-0", listView && "pb-2")}>
            <p className="text-sm text-charcoal-600 line-clamp-2">{summary}</p>
          </CardContent>
          <CardFooter className={cn("p-4 pt-0 flex items-center justify-between mt-auto", listView && "pb-4")}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                <AvatarFallback className="bg-charcoal-100 text-charcoal-700">{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-charcoal-700">{userName}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-charcoal-600">
              <ThumbsUp className="h-4 w-4" />
              <span>{votes}</span>
            </div>
          </CardFooter>
        </div>
        {isWinner && prize && !listView && (
          <div className="bg-charcoal-100 p-2 text-center text-sm font-medium text-charcoal-800">{prize}</div>
        )}
      </Link>
    </Card>
  )
}
