"use client";

import { useState, useRef, useEffect } from "react";
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
import { Slider } from "@/components/ui/slider";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ChevronLeft,
  Award,
  Music,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// Mock audio submissions data
const audioSubmissions = [
  {
    id: "audio1",
    title: "Neon Dreams Soundtrack",
    artist: "Alex Rivera",
    artistAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    duration: 180, // 3 minutes
    category: "Electronic",
    description:
      "A cyberpunk-inspired ambient track with synthesized melodies and atmospheric pads",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio file
    originalityScore: 92,
    votes: 0,
  },
  {
    id: "audio2",
    title: "Forest Whispers",
    artist: "Maya Johnson",
    artistAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    duration: 240, // 4 minutes
    category: "Ambient",
    description:
      "Natural sounds blended with ethereal vocals and soft instrumentation",
    audioUrl: "https://www.soundjay.com/nature/sounds/rain-01.wav", // Mock audio file
    originalityScore: 88,
    votes: 0,
  },
  {
    id: "audio3",
    title: "Quantum Beats",
    artist: "Elijah Chen",
    artistAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    duration: 200, // 3:20
    category: "Experimental",
    description:
      "Rhythmic patterns generated from quantum computing data with glitchy textures",
    audioUrl: "https://www.soundjay.com/misc/sounds/beep-07a.wav", // Mock audio file
    originalityScore: 95,
    votes: 0,
  },
  {
    id: "audio4",
    title: "Urban Pulse",
    artist: "Sophia Patel",
    artistAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    duration: 160, // 2:40
    category: "Hip-Hop",
    description: "City sounds mixed with modern beats and vocal samples",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio file
    originalityScore: 87,
    votes: 0,
  },
  {
    id: "audio5",
    title: "Midnight Jazz Fusion",
    artist: "Marcus Thompson",
    artistAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    duration: 220, // 3:40
    category: "Jazz",
    description:
      "Smooth jazz with electronic elements and improvised saxophone solos",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio file
    originalityScore: 91,
    votes: 0,
  },
  {
    id: "audio6",
    title: "Ocean Depths",
    artist: "Luna Rodriguez",
    artistAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    duration: 300, // 5 minutes
    category: "Ambient",
    description:
      "Deep underwater soundscape with whale songs and mysterious echoes",
    audioUrl: "https://www.soundjay.com/nature/sounds/water-drop-1.wav", // Mock audio file
    originalityScore: 89,
    votes: 0,
  },
  {
    id: "audio7",
    title: "Retro Synthwave Drive",
    artist: "Kai Nakamura",
    artistAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    duration: 195, // 3:15
    category: "Synthwave",
    description:
      "80s-inspired synthwave with driving basslines and nostalgic melodies",
    audioUrl: "https://www.soundjay.com/misc/sounds/beep-07a.wav", // Mock audio file
    originalityScore: 93,
    votes: 0,
  },
  {
    id: "audio8",
    title: "Acoustic Storytelling",
    artist: "Emma Wilson",
    artistAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    duration: 180, // 3 minutes
    category: "Folk",
    description:
      "Intimate acoustic guitar with spoken word poetry about human connection",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio file
    originalityScore: 86,
    votes: 0,
  },
];

export default function AudioVotingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [votedSubmissions, setVotedSubmissions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Limit to first 3 submissions
  const maxSubmissions = 3;
  const limitedSubmissions = audioSubmissions.slice(0, maxSubmissions);
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

  // Audio controls
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Reset audio error when submission changes
  useEffect(() => {
    setAudioError(false);
    setIsPlaying(false);
    setCurrentTime(0);
  }, [currentIndex]);

  // Update the togglePlay function to handle audio files
  const togglePlay = async () => {
    if (!currentSubmission?.audioUrl) {
      setAudioError(true);
      return;
    }

    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          // Play returns a Promise that needs to be handled
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioError(false);
        }
      } catch (error) {
        console.error("Error toggling audio playback:", error);
        setAudioError(true);
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentSubmission && !audioError) {
      const newTime = (value[0] / 100) * currentSubmission.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Update the handleVote function to properly handle audio state
  const handleVote = (id: string, isUpvote: boolean) => {
    if (!currentSubmission) return;

    setDirection(isUpvote ? "right" : "left");
    const newVotedSubmissions = [...votedSubmissions, id];
    setVotedSubmissions(newVotedSubmissions);

    // Pause audio when voting - with proper error handling
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    // Move to next card after a short delay, but only if we haven't completed voting
    setTimeout(() => {
      if (newVotedSubmissions.length < maxSubmissions) {
        setCurrentIndex(currentIndex + 1);
      }
      setDirection(null);
      setCurrentTime(0);
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

  // Update the skipToNext and skipToPrevious functions to properly handle audio state
  const skipToNext = () => {
    if (currentIndex < limitedSubmissions.length - 1) {
      // Pause current audio before changing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
      }
      setCurrentIndex(currentIndex + 1);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const skipToPrevious = () => {
    if (currentIndex > 0) {
      // Pause current audio before changing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
      }
      setCurrentIndex(currentIndex - 1);
      setCurrentTime(0);
      setIsPlaying(false);
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
                  Audio Voting
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-charcoal-900">
                  Rate Audio Submissions
                </h1>
                <p className="text-charcoal-600 mt-2">
                  Listen to audio tracks and swipe right to upvote, left to
                  skip. Help discover the best audio content!
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

            {/* Audio Player Area */}
            <div className="relative h-[700px] max-w-md mx-auto">
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
                        {/* Audio Visualization */}
                        <div className="relative h-48 bg-gradient-to-br from-charcoal-100 to-charcoal-200 flex items-center justify-center">
                          <div className="text-center">
                            <Music className="h-16 w-16 text-charcoal-400 mx-auto mb-4" />
                            <div className="flex items-center gap-2 text-charcoal-600">
                              <Clock className="h-4 w-4" />
                              <span>
                                {formatTime(currentSubmission.duration)}
                              </span>
                            </div>
                          </div>
                          {/* Audio element - render for all submissions */}
                          {currentSubmission.audioUrl && (
                            <audio
                              ref={audioRef}
                              onTimeUpdate={handleTimeUpdate}
                              onEnded={() => setIsPlaying(false)}
                              onError={(e) => {
                                console.error("Audio error:", e);
                                setAudioError(true);
                                setIsPlaying(false);
                              }}
                              preload="metadata"
                            >
                              <source
                                src={currentSubmission.audioUrl}
                                type="audio/mpeg"
                              />
                              <source
                                src={currentSubmission.audioUrl}
                                type="audio/wav"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          )}
                        </div>

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

                        <CardContent className="p-4 pt-0 space-y-4">
                          <p className="text-charcoal-600">
                            {currentSubmission.description}
                          </p>

                          {/* Audio Controls */}
                          <div className="space-y-4">
                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-charcoal-600">
                                <span>{formatTime(currentTime)}</span>
                                <span>
                                  {formatTime(currentSubmission.duration)}
                                </span>
                              </div>
                              <Slider
                                value={[
                                  currentSubmission.duration > 0
                                    ? (currentTime /
                                        currentSubmission.duration) *
                                      100
                                    : 0,
                                ]}
                                onValueChange={handleSeek}
                                max={100}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            {/* Play Controls */}
                            <div className="flex items-center justify-center gap-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={skipToPrevious}
                                disabled={currentIndex === 0}
                                className="border-charcoal-300"
                              >
                                <SkipBack className="h-4 w-4" />
                              </Button>

                              <Button
                                size="icon"
                                onClick={togglePlay}
                                className="h-12 w-12 bg-charcoal-900 hover:bg-charcoal-800 text-ivory"
                              >
                                {isPlaying ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6" />
                                )}
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={skipToNext}
                                disabled={
                                  currentIndex >= limitedSubmissions.length - 1
                                }
                                className="border-charcoal-300"
                              >
                                <SkipForward className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMuted(!isMuted)}
                                className="h-8 w-8"
                              >
                                {isMuted ? (
                                  <VolumeX className="h-4 w-4" />
                                ) : (
                                  <Volume2 className="h-4 w-4" />
                                )}
                              </Button>
                              <Slider
                                value={volume}
                                onValueChange={setVolume}
                                max={100}
                                step={1}
                                className="flex-1"
                              />
                            </div>
                          </div>

                          {/* Artist Info */}
                          <div className="flex items-center mt-6">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={currentSubmission.artistAvatar}
                                alt={currentSubmission.artist}
                              />
                              <AvatarFallback className="bg-charcoal-100 text-charcoal-700">
                                {currentSubmission.artist.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-charcoal-900">
                                {currentSubmission.artist}
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
                            <div className="text-center">
                              <p className="text-xs text-charcoal-500">
                                Swipe or use buttons
                              </p>
                            </div>
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
                    Audio Voting Complete!
                  </h3>
                  <p className="text-charcoal-600 mb-6">
                    Thank you for participating! You&apos;ve successfully voted
                    on {maxSubmissions} audio submissions. Your votes help the
                    community discover the best audio content.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                      <Link href="/hackathons">Explore More Hackathons</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                    >
                      <Link href="/audio-voting">Listen to More Audio</Link>
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
                    onClick={skipToPrevious}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                    disabled={
                      currentIndex >= limitedSubmissions.length - 1 ||
                      !hasSubmissions
                    }
                    onClick={skipToNext}
                  >
                    <SkipForward className="h-4 w-4" />
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
