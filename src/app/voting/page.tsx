"use client";

import { useState } from "react";
import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ThumbsUp,
  ThumbsDown,
  Award,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
} from "lucide-react";
import { submissionsForVoting } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";

export default function VotingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [votedSubmissions, setVotedSubmissions] = useState<string[]>([]);

  // Limit to first 3 submissions
  const maxSubmissions = 3;
  const limitedSubmissions = submissionsForVoting.slice(0, maxSubmissions);
  const currentSubmission = limitedSubmissions[currentIndex];
  const hasSubmissions = currentIndex < limitedSubmissions.length;
  const hasCompletedVoting = votedSubmissions.length >= maxSubmissions;

  const progressValue = (votedSubmissions.length / maxSubmissions) * 100;

  // Motion values for swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const cardOpacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const leftIconOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);
  const rightIconOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);

  const handleVote = (id: string, isUpvote: boolean) => {
    if (!currentSubmission) return;

    setDirection(isUpvote ? "right" : "left");
    const newVotedSubmissions = [...votedSubmissions, id];
    setVotedSubmissions(newVotedSubmissions);

    // Move to next card after a short delay, but only if we haven't completed voting
    setTimeout(() => {
      if (newVotedSubmissions.length < maxSubmissions) {
        setCurrentIndex(currentIndex + 1);
      }
      setDirection(null);
      x.set(0);
    }, 300);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!currentSubmission) return;

    if (info.offset.x > 100) {
      handleVote(currentSubmission.id, true);
    } else if (info.offset.x < -100) {
      handleVote(currentSubmission.id, false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="charcoal" className="mb-2">
                  Voting
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-charcoal-900">
                  Rate Submissions
                </h1>
                <p className="text-charcoal-600 mt-2">
                  Swipe right to upvote, left to skip. Help the community find
                  the best submissions!
                </p>
              </div>
              <div className="hidden md:block">
                <Button
                  variant="outline"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Link href="/hackathons" className="flex items-center">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Hackathons
                  </Link>
                </Button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-charcoal-600">
                  Your voting progress
                </span>
                <span className="text-sm font-medium text-charcoal-900">
                  {votedSubmissions.length}/{maxSubmissions}
                </span>
              </div>
              <Progress value={progressValue} className="h-2 bg-charcoal-100" />
            </div>

            {/* Voting area */}
            <div className="relative h-[600px] max-w-md mx-auto">
              {hasSubmissions && !hasCompletedVoting ? (
                <motion.div
                  className="absolute inset-0"
                  style={{ x, rotate, opacity: cardOpacity }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  animate={
                    direction === "left"
                      ? { x: -300, opacity: 0 }
                      : direction === "right"
                      ? { x: 300, opacity: 0 }
                      : {}
                  }
                >
                  <Card className="h-full border-charcoal-200 bg-ivory/90 backdrop-blur-sm overflow-hidden">
                    {currentSubmission && (
                      <>
                        {currentSubmission.media && (
                          <div className="relative h-64 w-full">
                            <Image
                              src={
                                currentSubmission.media || "/placeholder.svg"
                              }
                              alt={currentSubmission.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="charcoal">
                              {currentSubmission.category}
                            </Badge>
                            {currentSubmission.originalityScore && (
                              <Badge
                                variant="success"
                                className="flex items-center gap-1"
                              >
                                <Award className="h-3 w-3" />
                                AI Score: {currentSubmission.originalityScore}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mt-2 text-charcoal-900">
                            {currentSubmission.title}
                          </h3>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-charcoal-600">
                            {currentSubmission.summary}
                          </p>

                          <div className="flex items-center mt-6">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  currentSubmission.userAvatar ||
                                  "/placeholder.svg"
                                }
                                alt={currentSubmission.userName}
                              />
                              <AvatarFallback className="bg-charcoal-100 text-charcoal-700">
                                {currentSubmission.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-charcoal-900">
                                {currentSubmission.userName}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 mt-auto">
                          <div className="flex items-center justify-between w-full">
                            <motion.div
                              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100"
                              style={{ opacity: leftIconOpacity }}
                            >
                              <ThumbsDown className="h-6 w-6 text-red-600" />
                            </motion.div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                            >
                              <Info className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <motion.div
                              className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100"
                              style={{ opacity: rightIconOpacity }}
                            >
                              <ThumbsUp className="h-6 w-6 text-green-600" />
                            </motion.div>
                          </div>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                </motion.div>
              ) : (
                <Card className="h-full border-charcoal-200 bg-ivory/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                    Voting Complete!
                  </h3>
                  <p className="text-charcoal-600 mb-6">
                    Thank you for participating! You&apos;ve successfully voted
                    on {maxSubmissions} submissions. Your votes help the
                    community discover the best content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                      <Link href="/hackathons">Explore More Hackathons</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                    >
                      <Link href="/entries">View All Entries</Link>
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Voting buttons */}
            {hasSubmissions && !hasCompletedVoting && currentSubmission && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-200 hover:bg-red-50 hover:text-red-600 h-16 w-16 rounded-full"
                  onClick={() => handleVote(currentSubmission.id, false)}
                >
                  <ThumbsDown className="h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory h-16 w-16 rounded-full"
                  onClick={() => handleVote(currentSubmission.id, true)}
                >
                  <ThumbsUp className="h-6 w-6" />
                </Button>
              </div>
            )}

            {/* Navigation buttons */}
            {!hasCompletedVoting && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="ghost"
                  className="text-charcoal-700 hover:text-charcoal-900 md:hidden"
                >
                  <Link href="/hackathons" className="flex items-center">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                </Button>
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                    disabled={currentIndex === 0 || !hasSubmissions}
                    onClick={() => {
                      if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                    disabled={
                      currentIndex >= limitedSubmissions.length - 1 ||
                      !hasSubmissions
                    }
                    onClick={() => {
                      if (currentIndex < limitedSubmissions.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
