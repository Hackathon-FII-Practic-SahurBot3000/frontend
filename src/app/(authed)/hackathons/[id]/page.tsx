"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  ArrowLeft,
  Loader2,
  Plus,
  Vote,
  Target,
  Lightbulb,
  Palette,
  Music,
  PenTool,
  Briefcase,
  CheckCircle,
  AlertCircle,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetById } from "@/generated-api/hackathon-controller/hackathon-controller";
import { useGetUserMe } from "@/generated-api/user-controller/user-controller";
import { useGetMyTeam } from "@/generated-api/team-controller/team-controller";
import {
  HackathonResponseHackathonState,
  HackathonResponseType,
  UserDto,
  GetMyTeamRequest,
} from "@/generated-api/schemas";

export default function HackathonDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const hackathonId = parseInt(params.id as string);
  const initialTab = searchParams.get("tab") || "overview";

  // State management
  const [activeTab, setActiveTab] = useState(initialTab);

  // API hooks
  const { data: hackathonResponse, isLoading, error } = useGetById(hackathonId);
  const { data: userResponse } = useGetUserMe();
  const hackathon = hackathonResponse?.data;
  const user = userResponse?.data as UserDto & { id?: number };

  // Team management hooks

  // Get user's team for this hackathon (only if user is loaded)
  const { data: myTeamResponse } = useGetMyTeam(
    { userId: user?.id || 0, hackathonId } as GetMyTeamRequest,
    {
      query: {
        enabled: !!user?.id && !!hackathonId,
      },
    }
  );
  const myTeam = myTeamResponse?.data || [];

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Utility functions
  const getStatusColor = (status: HackathonResponseHackathonState) => {
    switch (status) {
      case HackathonResponseHackathonState.Pending:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case HackathonResponseHackathonState.Ongoing:
        return "bg-green-100 text-green-800 border-green-200";
      case HackathonResponseHackathonState.Ended:
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: HackathonResponseType) => {
    switch (type) {
      case HackathonResponseType.ART:
        return <Palette className="h-5 w-5" />;
      case HackathonResponseType.WRITING:
        return <PenTool className="h-5 w-5" />;
      case HackathonResponseType.AUDIO:
        return <Music className="h-5 w-5" />;
      case HackathonResponseType.BUSINESS:
        return <Briefcase className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: HackathonResponseHackathonState) => {
    switch (status) {
      case HackathonResponseHackathonState.Pending:
        return <Clock className="h-4 w-4" />;
      case HackathonResponseHackathonState.Ongoing:
        return <PlayCircle className="h-4 w-4" />;
      case HackathonResponseHackathonState.Ended:
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (endDate: string | undefined) => {
    if (!endDate) return "";
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} days, ${hours} hours remaining`;
    return `${hours} hours remaining`;
  };

  const canParticipate = (status: HackathonResponseHackathonState) => {
    return (
      status === HackathonResponseHackathonState.Pending ||
      status === HackathonResponseHackathonState.Ongoing
    );
  };

  const canVote = (status: HackathonResponseHackathonState) => {
    return (
      status === HackathonResponseHackathonState.Ongoing ||
      status === HackathonResponseHackathonState.Ended
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-charcoal-600" />
          <p className="text-charcoal-600">Loading hackathon details...</p>
        </div>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
            Hackathon Not Found
          </h2>
          <p className="text-charcoal-600 mb-4">
            The hackathon you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/hackathons">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hackathons
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <GridBackground className="py-8" opacity={0.05}>
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-charcoal-600 hover:text-charcoal-900"
            >
              <Link href="/hackathons">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Hackathons
              </Link>
            </Button>
          </div>

          {/* Hackathon Header */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-charcoal-100 rounded-lg">
                  {getTypeIcon(hackathon.type!)}
                </div>
                <div>
                  <Badge
                    className={`${getStatusColor(
                      hackathon.hackathonState!
                    )} mb-2`}
                  >
                    {getStatusIcon(hackathon.hackathonState!)}
                    <span className="ml-1">{hackathon.hackathonState}</span>
                  </Badge>
                  <h1 className="text-3xl font-bold text-charcoal-900">
                    {hackathon.name}
                  </h1>
                </div>
              </div>

              <p className="text-lg text-charcoal-600 mb-6 leading-relaxed">
                {hackathon.description}
              </p>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-charcoal-600" />
                      <span className="text-sm font-medium text-charcoal-700">
                        Start Date
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-900">
                      {formatDate(hackathon.startedAt)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-charcoal-600" />
                      <span className="text-sm font-medium text-charcoal-700">
                        End Date
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-900">
                      {formatDate(hackathon.endedAt)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-charcoal-600" />
                      <span className="text-sm font-medium text-charcoal-700">
                        Category
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(hackathon.type!)}
                      <span className="text-sm text-charcoal-900">
                        {hackathon.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Time Remaining */}
              {hackathon.hackathonState ===
                HackathonResponseHackathonState.Ongoing && (
                <Card className="border-orange-200 bg-orange-50 mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-800">
                        {getTimeRemaining(hackathon.endedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Panel */}
            <div className="w-full lg:w-80">
              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-charcoal-900">
                    Participation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {canParticipate(hackathon.hackathonState!) ? (
                    <div className="space-y-4">
                      {myTeam.length > 0 ? (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              You&apos;re participating!
                            </span>
                          </div>
                          <div className="text-sm text-charcoal-600 mb-3">
                            Team: {myTeam.length} member
                            {myTeam.length !== 1 ? "s" : ""}
                          </div>
                          <Button
                            onClick={() => setActiveTab("team")}
                            className="w-full bg-charcoal-900 hover:bg-charcoal-800"
                          >
                            Manage Team
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-charcoal-600 mb-4">
                            Join this hackathon by creating or joining a team.
                          </p>
                          <Button
                            asChild
                            className="w-full bg-charcoal-900 hover:bg-charcoal-800"
                          >
                            <Link
                              href={`/hackathons/${hackathonId}/create-team`}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Create Team
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : hackathon.hackathonState ===
                    HackathonResponseHackathonState.Ended ? (
                    <div className="text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-charcoal-400" />
                      <p className="text-sm text-charcoal-600">
                        This hackathon has ended.
                      </p>
                      <Button
                        onClick={() => setActiveTab("results")}
                        variant="outline"
                        className="w-full mt-3"
                      >
                        View Results
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-charcoal-400" />
                      <p className="text-sm text-charcoal-600">
                        Registration will open when the hackathon starts.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-charcoal-100">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-ivory"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-ivory">
              Team
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-ivory"
            >
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-ivory"
            >
              Results
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardHeader>
                    <CardTitle className="text-xl text-charcoal-900">
                      About This Hackathon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-charcoal max-w-none">
                      <p className="text-charcoal-700 leading-relaxed">
                        {hackathon.description}
                      </p>

                      <Separator className="my-6 bg-charcoal-100" />

                      <h3 className="text-lg font-semibold text-charcoal-900 mb-3">
                        Guidelines & Rules
                      </h3>
                      <ul className="space-y-2 text-charcoal-700">
                        <li>• Teams can have 1-4 members</li>
                        <li>• All submissions must be original work</li>
                        <li>• Follow the theme and category requirements</li>
                        <li>• Submit before the deadline</li>
                        <li>• Be respectful and collaborative</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardHeader>
                    <CardTitle className="text-lg text-charcoal-900">
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">Status</span>
                        <Badge
                          className={getStatusColor(hackathon.hackathonState!)}
                        >
                          {hackathon.hackathonState}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">Category</span>
                        <span className="text-charcoal-900">
                          {hackathon.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal-600">Duration</span>
                        <span className="text-charcoal-900">
                          {hackathon.startedAt && hackathon.endedAt
                            ? Math.ceil(
                                (new Date(hackathon.endedAt).getTime() -
                                  new Date(hackathon.startedAt).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) + " days"
                            : "TBD"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-charcoal-200 bg-ivory/90">
                  <CardHeader>
                    <CardTitle className="text-lg text-charcoal-900">
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-900">
                            Registration Opens
                          </p>
                          <p className="text-xs text-charcoal-600">
                            {formatDate(hackathon.startedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-900">
                            Hackathon Begins
                          </p>
                          <p className="text-xs text-charcoal-600">
                            {formatDate(hackathon.startedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-charcoal-900">
                            Submission Deadline
                          </p>
                          <p className="text-xs text-charcoal-600">
                            {formatDate(hackathon.endedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-6">
            <Card className="border-charcoal-200 bg-ivory/90">
              <CardHeader>
                <CardTitle className="text-xl text-charcoal-900">
                  Team Management
                </CardTitle>
                <CardDescription>
                  {myTeam.length > 0
                    ? `You are part of a team with ${myTeam.length} member${
                        myTeam.length !== 1 ? "s" : ""
                      }`
                    : "You haven't joined a team yet"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myTeam.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Team Members ({myTeam.length})
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        Team management features will be available soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 text-charcoal-400" />
                    <h3 className="text-lg font-medium text-charcoal-900 mb-2">
                      No Team Yet
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      Create a team to participate in this hackathon.
                    </p>
                    <Button
                      asChild
                      className="bg-charcoal-900 hover:bg-charcoal-800"
                    >
                      <Link href={`/hackathons/${hackathonId}/create-team`}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Team
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="mt-6">
            <Card className="border-charcoal-200 bg-ivory/90">
              <CardHeader>
                <CardTitle className="text-xl text-charcoal-900">
                  Submissions
                </CardTitle>
                <CardDescription>
                  View and manage your hackathon submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="h-12 w-12 mx-auto mb-4 text-charcoal-400" />
                  <h3 className="text-lg font-medium text-charcoal-900 mb-2">
                    No submissions yet
                  </h3>
                  <p className="text-charcoal-600 mb-4">
                    Upload your project files and submit your work here.
                  </p>
                  <Button className="bg-charcoal-900 hover:bg-charcoal-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Submission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="mt-6">
            <Card className="border-charcoal-200 bg-ivory/90">
              <CardHeader>
                <CardTitle className="text-xl text-charcoal-900">
                  Results & Voting
                </CardTitle>
                <CardDescription>
                  {canVote(hackathon.hackathonState!)
                    ? "Vote for your favorite submissions"
                    : "Results will be available after the hackathon ends"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Vote className="h-12 w-12 mx-auto mb-4 text-charcoal-400" />
                  <h3 className="text-lg font-medium text-charcoal-900 mb-2">
                    {canVote(hackathon.hackathonState!)
                      ? "Voting Available"
                      : "Results Coming Soon"}
                  </h3>
                  <p className="text-charcoal-600">
                    {canVote(hackathon.hackathonState!)
                      ? "Browse submissions and cast your votes."
                      : "Check back after the hackathon ends to see the results."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
