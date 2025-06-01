"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GridBackground } from "@/components/ui/grid-background";
import {
  Search,
  Filter,
  ArrowRight,
  Calendar,
  Trophy,
  Users,
  Clock,
  Star,
} from "lucide-react";
import { hackathons } from "@/lib/mock-data";
import Link from "next/link";

export default function HackathonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique categories and areas for filters
  const categories = [...new Set(hackathons.map((h) => h.category))];
  const areas = [...new Set(hackathons.flatMap((h) => h.areas))];

  // Filter hackathons based on search term and filters
  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || hackathon.category === categoryFilter;
    const matchesArea =
      areaFilter === "all" || hackathon.areas.includes(areaFilter);

    return matchesSearch && matchesCategory && matchesArea;
  });

  // Sort hackathons
  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      case "entries":
        return b.entriesCount - a.entriesCount;
      case "deadline":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      default:
        return 0;
    }
  });

  // Group hackathons by status
  const liveHackathons = sortedHackathons.filter((h) => h.status === "active");
  const upcomingHackathons = sortedHackathons.filter(
    (h) => h.status === "pending"
  );
  const votingHackathons = sortedHackathons.filter(
    (h) => h.status === "voting"
  );
  const pastHackathons = sortedHackathons.filter((h) => h.status === "ended");

  // Featured hackathon (most recent active or upcoming)
  const featuredHackathon = liveHackathons[0] || upcomingHackathons[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "voting":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ended":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section with Featured Hackathon */}
      <GridBackground className="py-8" opacity={0.05}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="charcoal" className="mb-3">
              Discover & Create
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-3">
              Creative Hackathons
            </h1>
            <p className="text-base text-charcoal-600 max-w-2xl mx-auto">
              Join themed challenges across art, writing, music, and business.
              Collaborate with creators worldwide and win amazing prizes.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {upcomingHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Pending</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {liveHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Active</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {votingHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Voting</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {pastHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Ended</div>
            </Card>
          </div>

          {/* Featured Hackathon */}
          {featuredHackathon && (
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm mb-8 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-charcoal-100 to-charcoal-50 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-charcoal-700" />
                  <span className="text-sm font-medium text-charcoal-700">
                    Featured Hackathon
                  </span>
                </div>
                <CardTitle className="text-xl text-charcoal-900">
                  {featuredHackathon.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4 items-center">
                  <div>
                    <p className="text-charcoal-600 mb-3 text-sm">
                      {featuredHackathon.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="charcoal" className="text-xs">
                        {featuredHackathon.category}
                      </Badge>
                      {featuredHackathon.areas.slice(0, 2).map((area) => (
                        <Badge
                          key={area}
                          variant="outline"
                          className="border-charcoal-200 text-charcoal-700 text-xs"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-charcoal-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(
                            featuredHackathon.startDate
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            featuredHackathon.endDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{featuredHackathon.entriesCount} entries</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory"
                      >
                        <Link href={`/hackathons/${featuredHackathon.id}`}>
                          {featuredHackathon.status === "active"
                            ? "Join Now"
                            : "Learn More"}
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                      >
                        <Link
                          href={`/hackathons/${featuredHackathon.id}/submissions`}
                        >
                          View Submissions
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-40 bg-charcoal-100 rounded-lg flex items-center justify-center">
                    <div className="text-charcoal-400 text-center">
                      <Trophy className="h-8 w-8 mx-auto mb-1" />
                      <p className="text-xs">Featured Event</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 h-4 w-4" />
              <Input
                placeholder="Search hackathons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-charcoal-200 bg-ivory focus:border-charcoal-400 h-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] border-charcoal-200 bg-ivory h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-[140px] border-charcoal-200 bg-ivory h-9">
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] border-charcoal-200 bg-ivory h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="entries">Most Entries</SelectItem>
                  <SelectItem value="deadline">Deadline Soon</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="sm"
                variant="outline"
                className="border-charcoal-200 bg-ivory h-9"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Hackathon Listings */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-charcoal-100">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              All ({sortedHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Pending ({upcomingHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="live"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Active ({liveHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="voting"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Voting ({votingHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              Ended ({pastHackathons.length})
            </TabsTrigger>
          </TabsList>

          {/* All Hackathons Tab */}
          <TabsContent value="all" className="mt-8">
            {sortedHackathons.length > 0 ? (
              <div className="space-y-12">
                {/* Live Now Section */}
                {liveHackathons.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-bold text-charcoal-900">
                          Live Now
                        </h2>
                        <Badge
                          variant="success"
                          className="bg-green-100 text-green-800"
                        >
                          {liveHackathons.length} active
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-charcoal-700 hover:text-charcoal-900"
                      >
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {liveHackathons.map((hackathon) => (
                        <Card
                          key={hackathon.id}
                          className="border-border bg-card hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                            <div className="text-muted-foreground text-sm">
                              {hackathon.category} Challenge
                            </div>
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                className={getStatusColor(hackathon.status)}
                              >
                                {hackathon.status.charAt(0).toUpperCase() +
                                  hackathon.status.slice(1)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getDifficultyColor(
                                  hackathon.difficulty || "Beginner"
                                )}
                              >
                                {hackathon.difficulty || "Beginner"}
                              </Badge>
                            </div>
                            <CardTitle className="text-card-foreground line-clamp-2">
                              {hackathon.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground line-clamp-3">
                              {hackathon.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-600" />
                                <span className="text-muted-foreground">
                                  ${(hackathon.prize || 0).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.participants || 0} joined
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-muted-foreground">
                                  {new Date(
                                    hackathon.deadline || hackathon.endDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.submissions ||
                                    hackathon.entriesCount}{" "}
                                  submissions
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {(hackathon.tags || hackathon.areas)
                                .slice(0, 3)
                                .map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Button asChild className="w-full">
                              <Link href={`/hackathons/${hackathon.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coming Soon Section */}
                {upcomingHackathons.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-charcoal-900">
                          Pending
                        </h2>
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-blue-700"
                        >
                          {upcomingHackathons.length} pending
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-charcoal-700 hover:text-charcoal-900"
                      >
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingHackathons.map((hackathon) => (
                        <Card
                          key={hackathon.id}
                          className="border-border bg-card hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                            <div className="text-muted-foreground text-sm">
                              {hackathon.category} Challenge
                            </div>
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                className={getStatusColor(hackathon.status)}
                              >
                                {hackathon.status.charAt(0).toUpperCase() +
                                  hackathon.status.slice(1)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getDifficultyColor(
                                  hackathon.difficulty || "Beginner"
                                )}
                              >
                                {hackathon.difficulty || "Beginner"}
                              </Badge>
                            </div>
                            <CardTitle className="text-card-foreground line-clamp-2">
                              {hackathon.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground line-clamp-3">
                              {hackathon.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-600" />
                                <span className="text-muted-foreground">
                                  ${(hackathon.prize || 0).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.participants || 0} joined
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-muted-foreground">
                                  {new Date(
                                    hackathon.deadline || hackathon.endDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.submissions ||
                                    hackathon.entriesCount}{" "}
                                  submissions
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {(hackathon.tags || hackathon.areas)
                                .slice(0, 3)
                                .map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Button asChild className="w-full">
                              <Link href={`/hackathons/${hackathon.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Voting Phase Section */}
                {votingHackathons.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-bold text-charcoal-900">
                          Voting Phase
                        </h2>
                        <Badge
                          variant="outline"
                          className="border-purple-200 text-purple-700"
                        >
                          {votingHackathons.length} voting
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-charcoal-700 hover:text-charcoal-900"
                      >
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {votingHackathons.map((hackathon) => (
                        <Card
                          key={hackathon.id}
                          className="border-border bg-card hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                            <div className="text-muted-foreground text-sm">
                              {hackathon.category} Challenge
                            </div>
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                className={getStatusColor(hackathon.status)}
                              >
                                {hackathon.status.charAt(0).toUpperCase() +
                                  hackathon.status.slice(1)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getDifficultyColor(
                                  hackathon.difficulty || "Beginner"
                                )}
                              >
                                {hackathon.difficulty || "Beginner"}
                              </Badge>
                            </div>
                            <CardTitle className="text-card-foreground line-clamp-2">
                              {hackathon.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground line-clamp-3">
                              {hackathon.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-600" />
                                <span className="text-muted-foreground">
                                  ${(hackathon.prize || 0).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.participants || 0} joined
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-muted-foreground">
                                  {new Date(
                                    hackathon.deadline || hackathon.endDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.submissions ||
                                    hackathon.entriesCount}{" "}
                                  submissions
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {(hackathon.tags || hackathon.areas)
                                .slice(0, 3)
                                .map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Button asChild className="w-full">
                              <Link href={`/hackathons/${hackathon.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Events Section */}
                {pastHackathons.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-charcoal-400 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-charcoal-900">
                          Ended
                        </h2>
                        <Badge
                          variant="outline"
                          className="border-charcoal-200 text-charcoal-700"
                        >
                          {pastHackathons.length} completed
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-charcoal-700 hover:text-charcoal-900"
                      >
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastHackathons.map((hackathon) => (
                        <Card
                          key={hackathon.id}
                          className="border-border bg-card hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                            <div className="text-muted-foreground text-sm">
                              {hackathon.category} Challenge
                            </div>
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                className={getStatusColor(hackathon.status)}
                              >
                                {hackathon.status.charAt(0).toUpperCase() +
                                  hackathon.status.slice(1)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getDifficultyColor(
                                  hackathon.difficulty || "Beginner"
                                )}
                              >
                                {hackathon.difficulty || "Beginner"}
                              </Badge>
                            </div>
                            <CardTitle className="text-card-foreground line-clamp-2">
                              {hackathon.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground line-clamp-3">
                              {hackathon.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-600" />
                                <span className="text-muted-foreground">
                                  ${(hackathon.prize || 0).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.participants || 0} joined
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-muted-foreground">
                                  {new Date(
                                    hackathon.deadline || hackathon.endDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-muted-foreground">
                                  {hackathon.submissions ||
                                    hackathon.entriesCount}{" "}
                                  submissions
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {(hackathon.tags || hackathon.areas)
                                .slice(0, 3)
                                .map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Button asChild className="w-full">
                              <Link href={`/hackathons/${hackathon.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                  No hackathons found
                </h3>
                <p className="text-charcoal-600">
                  Try adjusting your filters or search term
                </p>
              </div>
            )}
          </TabsContent>

          {/* Individual status tabs with enhanced layouts */}
          <TabsContent value="pending" className="mt-8">
            {upcomingHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingHackathons.map((hackathon) => (
                  <Card
                    key={hackathon.id}
                    className="border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                      <div className="text-muted-foreground text-sm">
                        {hackathon.category} Challenge
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(hackathon.status)}>
                          {hackathon.status.charAt(0).toUpperCase() +
                            hackathon.status.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(
                            hackathon.difficulty || "Beginner"
                          )}
                        >
                          {hackathon.difficulty || "Beginner"}
                        </Badge>
                      </div>
                      <CardTitle className="text-card-foreground line-clamp-2">
                        {hackathon.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {hackathon.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">
                            ${(hackathon.prize || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-muted-foreground">
                            {hackathon.participants || 0} joined
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">
                            {new Date(
                              hackathon.deadline || hackathon.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            {hackathon.submissions || hackathon.entriesCount}{" "}
                            submissions
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(hackathon.tags || hackathon.areas)
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <Link href={`/hackathons/${hackathon.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                  No pending hackathons
                </h3>
                <p className="text-charcoal-600 mb-6">
                  All hackathons are currently active or have ended
                </p>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="live" className="mt-8">
            {liveHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveHackathons.map((hackathon) => (
                  <Card
                    key={hackathon.id}
                    className="border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                      <div className="text-muted-foreground text-sm">
                        {hackathon.category} Challenge
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(hackathon.status)}>
                          {hackathon.status.charAt(0).toUpperCase() +
                            hackathon.status.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(
                            hackathon.difficulty || "Beginner"
                          )}
                        >
                          {hackathon.difficulty || "Beginner"}
                        </Badge>
                      </div>
                      <CardTitle className="text-card-foreground line-clamp-2">
                        {hackathon.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {hackathon.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">
                            ${(hackathon.prize || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-muted-foreground">
                            {hackathon.participants || 0} joined
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">
                            {new Date(
                              hackathon.deadline || hackathon.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            {hackathon.submissions || hackathon.entriesCount}{" "}
                            submissions
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(hackathon.tags || hackathon.areas)
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <Link href={`/hackathons/${hackathon.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                  No live hackathons at the moment
                </h3>
                <p className="text-charcoal-600 mb-6">
                  Check back soon or explore upcoming events
                </p>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="voting" className="mt-8">
            {votingHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {votingHackathons.map((hackathon) => (
                  <Card
                    key={hackathon.id}
                    className="border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                      <div className="text-muted-foreground text-sm">
                        {hackathon.category} Challenge
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(hackathon.status)}>
                          {hackathon.status.charAt(0).toUpperCase() +
                            hackathon.status.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(
                            hackathon.difficulty || "Beginner"
                          )}
                        >
                          {hackathon.difficulty || "Beginner"}
                        </Badge>
                      </div>
                      <CardTitle className="text-card-foreground line-clamp-2">
                        {hackathon.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {hackathon.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">
                            ${(hackathon.prize || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-muted-foreground">
                            {hackathon.participants || 0} joined
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">
                            {new Date(
                              hackathon.deadline || hackathon.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            {hackathon.submissions || hackathon.entriesCount}{" "}
                            submissions
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(hackathon.tags || hackathon.areas)
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <Link href={`/hackathons/${hackathon.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                  No hackathons in voting phase
                </h3>
                <p className="text-charcoal-600 mb-6">
                  Check back when submissions close for voting
                </p>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            {pastHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastHackathons.map((hackathon) => (
                  <Card
                    key={hackathon.id}
                    className="border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted rounded-t-lg mb-4 flex items-center justify-center">
                      <div className="text-muted-foreground text-sm">
                        {hackathon.category} Challenge
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(hackathon.status)}>
                          {hackathon.status.charAt(0).toUpperCase() +
                            hackathon.status.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getDifficultyColor(
                            hackathon.difficulty || "Beginner"
                          )}
                        >
                          {hackathon.difficulty || "Beginner"}
                        </Badge>
                      </div>
                      <CardTitle className="text-card-foreground line-clamp-2">
                        {hackathon.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {hackathon.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">
                            ${(hackathon.prize || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-muted-foreground">
                            {hackathon.participants || 0} joined
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">
                            {new Date(
                              hackathon.deadline || hackathon.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            {hackathon.submissions || hackathon.entriesCount}{" "}
                            submissions
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(hackathon.tags || hackathon.areas)
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>

                      {/* Action Button */}
                      <Button asChild className="w-full">
                        <Link href={`/hackathons/${hackathon.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">
                  No past hackathons
                </h3>
                <p className="text-charcoal-600">
                  Stay tuned for our first event
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
