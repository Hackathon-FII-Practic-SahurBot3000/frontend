"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  BookOpen,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Mock writing submissions data
const writingSubmissions = [
  {
    id: "1",
    title: "The Last Library",
    author: "Emma Chen",
    avatar: "/api/placeholder/40/40",
    content: `In a world where books had become extinct, Maya discovered the last library hidden beneath the ruins of an old university. The musty smell of paper and ink filled her nostrils as she pushed open the heavy wooden door.

The shelves stretched endlessly upward, filled with thousands of volumes that humanity had forgotten. Each book was a treasure, a piece of lost knowledge waiting to be rediscovered. Maya ran her fingers along the spines, feeling the texture of leather and cloth bindings.

As she pulled out a worn copy of "Pride and Prejudice," the pages crumbled slightly in her hands. She realized then that she wasn't just discovering books – she was becoming their guardian, their last hope for survival in a digital world that had forgotten the magic of physical pages.

The weight of responsibility settled on her shoulders as she began to read, knowing that each word she absorbed might be the last time those stories would ever be experienced by human eyes.`,
    wordCount: 156,
    genre: "Science Fiction",
    submittedAt: "2024-02-10T14:30:00",
    readTime: "2 min read",
    votes: 0,
  },
  {
    id: "2",
    title: "Grandmother's Recipe",
    author: "Carlos Rodriguez",
    avatar: "/api/placeholder/40/40",
    content: `The yellowed index card trembled in Maria's hands as she read her grandmother's handwriting for the last time. "Para mi nieta querida," it began, "this recipe is more than ingredients – it's our family's love."

Each instruction was written with care: "Add salt like tears of joy, not sorrow." "Stir clockwise, the way time moves forward, but slowly, like memories." "Cook until the aroma reminds you of Sunday mornings when the whole family gathered."

Maria had tried to recreate the dish countless times since Abuela's passing, but something was always missing. Now, reading the final note at the bottom of the card, she understood: "The secret ingredient, mija, is cooking with people you love around you."

She looked up at her own daughter, who was watching with curious eyes, and smiled. "Come here, pequeña. Let me teach you how to make bisabuela's tamales."`,
    wordCount: 142,
    genre: "Family Drama",
    submittedAt: "2024-02-09T09:15:00",
    readTime: "2 min read",
    votes: 0,
  },
  {
    id: "3",
    title: "The Color Thief",
    author: "Aisha Patel",
    avatar: "/api/placeholder/40/40",
    content: `Every morning, Zara woke up to a world a little less colorful than the day before. It started with the subtle fading of her red curtains, then the slow drain of blue from the sky. By the third week, even the green of grass had turned to gray.

She was the only one who noticed. Her neighbors went about their lives, commenting on the "beautiful blue sky" while looking at what Zara could only see as ash. The roses in Mrs. Henderson's garden were praised for their "vibrant red," though they appeared colorless to Zara's eyes.

The realization hit her like a thunderbolt: she wasn't losing her ability to see color – she was absorbing it. Every hue that disappeared from the world was being drawn into her, collected like a living prism. When she looked at her hands, they shimmered with all the colors that had vanished from everything else.

She had become the keeper of color in a world slowly turning monochrome, and she had to decide whether to give it back or keep it safe within herself.`,
    wordCount: 168,
    genre: "Fantasy",
    submittedAt: "2024-02-08T16:45:00",
    readTime: "3 min read",
    votes: 0,
  },
  {
    id: "4",
    title: "Digital Detox",
    author: "Michael Thompson",
    avatar: "/api/placeholder/40/40",
    content: `The notification sound had become like breathing – constant, unconscious, necessary. Jake didn&apos;t realize how dependent he&apos;d become until the power went out for three days.

The first day was agony. His fingers twitched toward his pocket every few minutes, reaching for a phone that couldn&apos;t help him. He paced the house, unsure what to do with his hands, his mind, his time.

The second day, he found a dusty guitar in the closet. His fingers remembered chords he&apos;d learned in college, before algorithms decided what music he should hear. The melodies felt foreign and familiar at once.

By the third day, when the power returned, Jake stared at his phone for a long moment before deliberately placing it in a drawer. He picked up the guitar instead, and for the first time in years, created something instead of consuming it.

The silence that followed wasn't empty – it was full of possibility.`,
    wordCount: 145,
    genre: "Contemporary Fiction",
    submittedAt: "2024-02-07T11:20:00",
    readTime: "2 min read",
    votes: 0,
  },
];

export default function TextVotingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votedSubmissions, setVotedSubmissions] = useState<string[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const submissions = writingSubmissions.filter(
    (sub) => !votedSubmissions.includes(sub.id)
  );

  const currentSubmission = submissions[currentIndex];

  const handleVote = (id: string, isUpvote: boolean) => {
    setDirection(isUpvote ? "right" : "left");
    setVotedSubmissions([...votedSubmissions, id]);

    setTimeout(() => {
      if (currentIndex < submissions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setDirection(null);
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex < submissions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentSubmission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GridBackground className="py-12" opacity={0.05}>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                All Caught Up!
              </h2>
              <p className="text-muted-foreground mb-6">
                You've read all available writing submissions. Check back later
                for more stories to discover.
              </p>
              <Button asChild>
                <Link href="/hackathons">Browse Hackathons</Link>
              </Button>
            </div>
          </div>
        </GridBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-8" opacity={0.05}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/hackathons">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hackathons
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Writing Submissions
                </h1>
                <p className="text-sm text-muted-foreground">
                  Read stories and vote for your favorites. Take your time to
                  appreciate each piece.
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {submissions.length}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <Card
              className={`transition-all duration-300 ${
                direction === "right"
                  ? "transform translate-x-full opacity-0"
                  : direction === "left"
                  ? "transform -translate-x-full opacity-0"
                  : "transform translate-x-0 opacity-100"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentSubmission.avatar} />
                      <AvatarFallback>
                        {currentSubmission.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">
                        {currentSubmission.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>by {currentSubmission.author}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{currentSubmission.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{currentSubmission.genre}</Badge>
                    <Badge variant="outline">
                      {currentSubmission.wordCount} words
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Story Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentSubmission.content}
                  </div>
                </div>

                {/* Navigation and Voting */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentIndex === submissions.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleVote(currentSubmission.id, false)}
                      className="hover:bg-red-50 hover:border-red-200"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Skip
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => handleVote(currentSubmission.id, true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Love It
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
