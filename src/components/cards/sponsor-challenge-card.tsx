import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SponsorChallengeCardProps {
  id: string
  title: string
  description: string
  sponsor: string
  logo: string
  prize: string
  className?: string
}

export function SponsorChallengeCard({
  id,
  title,
  description,
  sponsor,
  logo,
  prize,
  className,
}: SponsorChallengeCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg border-charcoal-200 bg-ivory/90 backdrop-blur-sm",
        className,
      )}
    >
      <CardHeader className="p-4 flex flex-row items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border border-charcoal-200">
          <Image src={logo || "/placeholder.svg"} alt={sponsor} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm text-charcoal-600">Sponsored by</p>
          <h3 className="text-lg font-semibold text-charcoal-900">{sponsor}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h4 className="font-semibold text-charcoal-900 mb-2">{title}</h4>
        <p className="text-sm text-charcoal-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="bg-charcoal-100 px-3 py-1 rounded-full text-sm font-medium text-charcoal-800">
          Prize: {prize}
        </div>
        <Button variant="outline" size="sm" className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  )
}
