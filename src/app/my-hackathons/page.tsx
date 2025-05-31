"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GridBackground } from "@/components/ui/grid-background"
import { HackathonCard } from "@/components/cards/hackathon-card"
import { SubmissionCard } from "@/components/cards/submission-card"
import { Calendar, Trophy, Clock, Upload, Vote, Eye, Plus, Target, Zap, Award } from "lucide-react"
import { hackathons, currentUser } from "@/lib/mock-data"
import Link from "next/link"

export default function MyHackathonsPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Get user's participated hackathons
  const userParticipatedHackathons = hackathons.filter((h) =>
    currentUser.entries.some((entry) => entry.hackathonId === h.id),
  )

  // Separate by status
  const activeHackathons = userParticipatedHackathons.filter((h) => h.status === "active")
  const upcomingHackathons = userParticipatedHackathons.filter((h) => h.status === "upcoming")
  const completedHackathons = userParticipatedHackathons.filter((h) => h.status === "past")

  // Get user's submissions for active hackathons
  const activeSubmissions = currentUser.entries.filter((entry) =>
    activeHackathons.some((h) => h.id === entry.hackathonId),
  )

  // Calculate progress stats
  const totalVotes = currentUser.entries.reduce((sum, entry) => sum + entry.votes, 0)
  const winningEntries = currentUser.entries.filter((entry) => entry.isWinner).length
  const averageScore =
    currentUser.entries.length > 0
      ? Math.round(
          currentUser.entries.reduce((sum, entry) => sum + (entry.originalityScore || 0), 0) /
            currentUser.entries.length,
        )
      : 0

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Header */}
            <div className="flex-1">
              <Badge variant="charcoal" className="mb-4">
                My Dashboard
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">My Active Hackathons</h1>
              <p className="text-lg text-charcoal-600 mb-6">
                Manage your hackathon participations, track your progress, and submit your creative work.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/hackathons" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Join New Hackathon
                  </Link>
                </Button>
                <Button variant="outline" className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50">
                  <Link href="/submit" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Entry
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-80">
              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-charcoal-900">{activeHackathons.length}</div>
                      <div className="text-sm text-charcoal-600">Active Hackathons</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-charcoal-900">{winningEntries}</div>
                      <div className="text-sm text-charcoal-600">Wins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-charcoal-900">{averageScore}</div>
                      <div className="text-sm text-charcoal-600">Avg Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-charcoal-900">{totalVotes}</div>
                      <div className="text-sm text-charcoal-600">Total Votes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-charcoal-100">
            <TabsTrigger value="active" className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory">
              Active ({activeHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              My Submissions ({currentUser.entries.length})
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Upcoming ({upcomingHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Completed ({completedHackathons.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Hackathons Tab */}
          <TabsContent value="active" className="mt-8">
            {activeHackathons.length > 0 ? (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/submit">
                      <CardContent className="p-6 text-center">
                        <Upload className="h-8 w-8 text-charcoal-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-charcoal-900 mb-2">Submit New Entry</h3>
                        <p className="text-sm text-charcoal-600">Upload your latest creation</p>
                      </CardContent>
                    </Link>
                  </Card>

                  <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/voting">
                      <CardContent className="p-6 text-center">
                        <Vote className="h-8 w-8 text-charcoal-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-charcoal-900 mb-2">Vote on Submissions</h3>
                        <p className="text-sm text-charcoal-600">Help choose the best entries</p>
                      </CardContent>
                    </Link>
                  </Card>

                  <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer">
                    <Link href="/entries">
                      <CardContent className="p-6 text-center">
                        <Eye className="h-8 w-8 text-charcoal-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-charcoal-900 mb-2">Browse Entries</h3>
                        <p className="text-sm text-charcoal-600">Explore community submissions</p>
                      </CardContent>
                    </Link>
                  </Card>
                </div>

                {/* Active Hackathons List */}
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Your Active Hackathons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeHackathons.map((hackathon) => {
                      const userSubmission = currentUser.entries.find((entry) => entry.hackathonId === hackathon.id)
                      const daysLeft = Math.ceil(
                        (new Date(hackathon.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )

                      return (
                        <Card key={hackathon.id} className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="success" className="bg-green-100 text-green-800">
                                Live Now
                              </Badge>
                              <Badge variant="outline" className="border-amber-200 text-amber-700">
                                {daysLeft} days left
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-charcoal-600 line-clamp-2">{hackathon.description}</p>

                            {/* Progress */}
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-charcoal-600">Your Progress</span>
                                <span className="text-charcoal-900 font-medium">
                                  {userSubmission ? "Submitted" : "Not Started"}
                                </span>
                              </div>
                              <Progress value={userSubmission ? 100 : 0} className="h-2" />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                                <Link href={`/hackathons/${hackathon.id}`}>View Details</Link>
                              </Button>
                              <Button size="sm" variant="outline" className="border-charcoal-300 text-charcoal-700">
                                <Link href={`/hackathons/${hackathon.id}/submissions`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No active hackathons</h3>
                <p className="text-charcoal-600 mb-6">Join a hackathon to start creating and competing!</p>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/hackathons">Browse Hackathons</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Submissions Tab */}
          <TabsContent value="submissions" className="mt-8">
            {currentUser.entries.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-charcoal-900">My Submissions</h2>
                  <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                    <Link href="/submit">New Submission</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUser.entries.map((entry) => (
                    <SubmissionCard key={entry.id} {...entry} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No submissions yet</h3>
                <p className="text-charcoal-600 mb-6">Start creating and submit your first entry!</p>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/submit">Create Submission</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming" className="mt-8">
            {upcomingHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} ctaText="Get Ready" ctaVariant="outline" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No upcoming hackathons</h3>
                <p className="text-charcoal-600">You're not registered for any upcoming events</p>
              </div>
            )}
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="mt-8">
            {completedHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedHackathons.map((hackathon) => (
                  <HackathonCard key={hackathon.id} {...hackathon} ctaText="View Results" ctaVariant="secondary" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No completed hackathons</h3>
                <p className="text-charcoal-600">Complete your first hackathon to see results here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
