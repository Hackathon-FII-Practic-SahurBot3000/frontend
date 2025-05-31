"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface VotingCardProps {
  id: string
  title: string
  summary: string
  media?: string
  category: string
  userName: string
  userAvatar: string
  originalityScore?: number
  onVote: (id: string, vote: boolean) => void
  className?: string
}

export function VotingCard({
  id,
  title,
  summary,
  media,
  category,
  userName,
  userAvatar,
  originalityScore,
  onVote,
  className,
}: VotingCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all shadow-lg max-w-md mx-auto", className)}>
      {media && (
        <div className="relative h-64 w-full">
          <Image src={media || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="hackathon">{category}</Badge>
          {originalityScore && (
            <Badge variant="originality" className="flex items-center gap-1">
              <span className="sr-only">Originality score</span>
              AI Score: {originalityScore}
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{summary}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{userName}</span>
        </div>
        <div className="flex items-center justify-between w-full gap-4 mt-2">
          <Button
            variant="outline"
            className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => onVote(id, false)}
          >
            <ThumbsDown className="h-5 w-5 mr-2" />
            Skip
          </Button>
          <Button
            className="flex-1 bg-hackathon-primary hover:bg-hackathon-primary/90"
            onClick={() => onVote(id, true)}
          >
            <ThumbsUp className="h-5 w-5 mr-2" />
            Vote
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
