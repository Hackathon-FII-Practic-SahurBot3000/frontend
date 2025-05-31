"use client";

import { HackathonCard } from "@/components/cards/hackathon-card";
import { SubmissionCard } from "@/components/cards/submission-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DotBackground } from "@/components/ui/dot-background";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserMe } from "@/generated-api/user-controller/user-controller";
import { currentUser, hackathons } from "@/lib/mock-data";
import {
  Calendar,
  Dribbble,
  Edit,
  ExternalLink,
  Flame,
  Globe,
  Instagram,
  Settings,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Define badge types with their icons and colors
const badges = [
  {
    id: "winner",
    name: "Winner",
    description: "Won a hackathon",
    icon: Trophy,
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "top-creator",
    name: "Top Creator",
    description: "Consistently high-rated submissions",
    icon: Star,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Joined during platform beta",
    icon: Zap,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "streak",
    name: "On Fire",
    description: "Participated in 3+ consecutive hackathons",
    icon: Flame,
    color: "bg-red-100 text-red-800",
  },
];

// Get user's participated hackathons
const userParticipatedHackathons = hackathons.filter((h) =>
  currentUser.entries.some((entry) => entry.hackathonId === h.id)
);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("gallery");

  const getUserMeQuery = useGetUserMe();
  const currentUserApi = getUserMeQuery.data?.data;

  console.log(currentUserApi);

  if (!currentUserApi) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Profile Header */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={currentUserApi.profilePictureUrl}
                  alt={currentUserApi.firstName}
                />
                <AvatarFallback className="bg-charcoal-100 text-charcoal-700 text-4xl">
                  {currentUserApi.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <h1 className="text-3xl font-bold text-charcoal-900">
                  {currentUserApi.firstName} {currentUserApi.lastName}
                </h1>
                <p className="text-charcoal-600">{currentUserApi.email}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-charcoal-900">
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal-600 mb-4">{currentUser.bio}</p>

                  {/* Social Links */}
                  <div className="flex gap-4 mb-6">
                    {currentUser.links.instagram && (
                      <Link
                        href={
                          currentUser.links.instagram.startsWith("http")
                            ? currentUser.links.instagram
                            : `https://${currentUser.links.instagram}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    )}
                    {currentUser.links.dribbble && (
                      <Link
                        href={
                          currentUser.links.dribbble.startsWith("http")
                            ? currentUser.links.dribbble
                            : `https://${currentUser.links.dribbble}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
                      >
                        <Dribbble className="h-5 w-5" />
                      </Link>
                    )}
                    {currentUser.links.website && (
                      <Link
                        href={
                          currentUser.links.website.startsWith("http")
                            ? currentUser.links.website
                            : `https://${currentUser.links.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                      </Link>
                    )}
                    {currentUser.links.behance && (
                      <Link
                        href={
                          currentUser.links.behance.startsWith("http")
                            ? currentUser.links.behance
                            : `https://${currentUser.links.behance}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    )}
                  </div>

                  <Separator className="my-4 bg-charcoal-100" />

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                      <p className="text-2xl font-bold text-charcoal-900">
                        {currentUser.entries.length}
                      </p>
                      <p className="text-sm text-charcoal-600">Submissions</p>
                    </div>
                    <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                      <p className="text-2xl font-bold text-charcoal-900">
                        {currentUser.entries.filter((e) => e.isWinner).length}
                      </p>
                      <p className="text-sm text-charcoal-600">Wins</p>
                    </div>
                    <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                      <p className="text-2xl font-bold text-charcoal-900">
                        {userParticipatedHackathons.length}
                      </p>
                      <p className="text-sm text-charcoal-600">Hackathons</p>
                    </div>
                    <div className="text-center p-3 bg-charcoal-50 rounded-lg">
                      <p className="text-2xl font-bold text-charcoal-900">
                        {currentUser.entries.reduce(
                          (sum, entry) => sum + entry.votes,
                          0
                        )}
                      </p>
                      <p className="text-sm text-charcoal-600">Total Votes</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <h3 className="text-lg font-medium text-charcoal-900 mb-3">
                    Badges
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-charcoal-50"
                        title={badge.description}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${badge.color}`}
                        >
                          <badge.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-charcoal-800">
                          {badge.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Profile Content */}
      <DotBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-charcoal-100">
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="hackathons"
                className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
              >
                Hackathons
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900">
                  My Submissions
                </h2>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/submit">New Submission</Link>
                </Button>
              </div>

              {currentUser.entries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUser.entries.map((entry) => (
                    <SubmissionCard key={entry.id} {...entry} />
                  ))}
                </div>
              ) : (
                <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-8">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Calendar className="h-12 w-12 text-charcoal-300 mb-4" />
                      <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                        No submissions yet
                      </h3>
                      <p className="text-charcoal-600 mb-6">
                        You haven&apos;t submitted any entries to hackathons
                        yet. Join a hackathon to get started!
                      </p>
                      <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                        <Link href="/hackathons">Browse Hackathons</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Hackathons Tab */}
            <TabsContent value="hackathons" className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900">
                  Participated Hackathons
                </h2>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/hackathons">Find Hackathons</Link>
                </Button>
              </div>

              {userParticipatedHackathons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userParticipatedHackathons.map((hackathon) => (
                    <HackathonCard
                      key={hackathon.id}
                      {...hackathon}
                      ctaText="View Details"
                      ctaVariant="outline"
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-8">
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Calendar className="h-12 w-12 text-charcoal-300 mb-4" />
                      <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                        No hackathons yet
                      </h3>
                      <p className="text-charcoal-600 mb-6">
                        You haven&apos;t participated in any hackathons yet.
                        Join one to showcase your creativity!
                      </p>
                      <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                        <Link href="/hackathons">Browse Hackathons</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900">
                  My Achievements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Badges Section */}
                <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-charcoal-900">
                      Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-50"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}`}
                          >
                            <badge.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-charcoal-900">
                              {badge.name}
                            </h4>
                            <p className="text-xs text-charcoal-600">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Section */}
                <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-charcoal-900">
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">
                          Total Submissions
                        </span>
                        <span className="font-medium text-charcoal-900">
                          {currentUser.entries.length}
                        </span>
                      </div>
                      <Separator className="bg-charcoal-100" />

                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">
                          Winning Entries
                        </span>
                        <span className="font-medium text-charcoal-900">
                          {currentUser.entries.filter((e) => e.isWinner).length}
                        </span>
                      </div>
                      <Separator className="bg-charcoal-100" />

                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">
                          Hackathons Joined
                        </span>
                        <span className="font-medium text-charcoal-900">
                          {userParticipatedHackathons.length}
                        </span>
                      </div>
                      <Separator className="bg-charcoal-100" />

                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">Average Score</span>
                        <span className="font-medium text-charcoal-900">
                          {currentUser.entries.length > 0
                            ? Math.round(
                                currentUser.entries.reduce(
                                  (sum, entry) =>
                                    sum + (entry.originalityScore || 0),
                                  0
                                ) / currentUser.entries.length
                              )
                            : 0}
                        </span>
                      </div>
                      <Separator className="bg-charcoal-100" />

                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">
                          Total Votes Received
                        </span>
                        <span className="font-medium text-charcoal-900">
                          {currentUser.entries.reduce(
                            (sum, entry) => sum + entry.votes,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DotBackground>
    </div>
  );
}
