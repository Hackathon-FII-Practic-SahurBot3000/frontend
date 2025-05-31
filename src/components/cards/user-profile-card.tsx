import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Instagram, Dribbble, Globe, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileCardProps {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  links?: {
    instagram?: string
    behance?: string
    dribbble?: string
    website?: string
  }
  className?: string
}

export function UserProfileCard({ id, name, username, avatar, bio, links, className }: UserProfileCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg border-charcoal-200 bg-ivory/90 backdrop-blur-sm",
        className,
      )}
    >
      <CardHeader className="p-4 flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback className="bg-charcoal-100 text-charcoal-700">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-charcoal-900">{name}</h3>
          <p className="text-sm text-charcoal-600">@{username}</p>
        </div>
      </CardHeader>
      {bio && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-charcoal-600">{bio}</p>
        </CardContent>
      )}
      {links && Object.values(links).some((link) => link) && (
        <CardFooter className="p-4 pt-0 flex gap-3">
          {links.instagram && (
            <Link
              href={links.instagram.startsWith("http") ? links.instagram : `https://${links.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
          )}
          {links.dribbble && (
            <Link
              href={links.dribbble.startsWith("http") ? links.dribbble : `https://${links.dribbble}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <Dribbble className="h-4 w-4" />
            </Link>
          )}
          {links.website && (
            <Link
              href={links.website.startsWith("http") ? links.website : `https://${links.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <Globe className="h-4 w-4" />
            </Link>
          )}
          {links.behance && (
            <Link
              href={links.behance.startsWith("http") ? links.behance : `https://${links.behance}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
