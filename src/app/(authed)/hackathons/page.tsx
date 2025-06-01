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
  ArrowRight,
  Calendar,
  Trophy,
  Clock,
  Star,
  Loader2,
} from "lucide-react";
import { useGetAll } from "@/generated-api/hackathon-controller/hackathon-controller";
import {
  HackathonResponse,
  HackathonResponseHackathonState,
  HackathonResponseType,
} from "@/generated-api/schemas";
import Link from "next/link";

export default function HackathonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch hackathons from API
  const { data: hackathonsResponse, isLoading, error } = useGetAll();
  const hackathons = hackathonsResponse?.data || [];

  // Get unique categories for filters
  const categories = [
    ...new Set(hackathons.map((h) => h.type).filter(Boolean)),
  ] as string[];

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
        return "🎨";
      case HackathonResponseType.WRITING:
        return "✍️";
      case HackathonResponseType.AUDIO:
        return "🎵";
      case HackathonResponseType.BUSINESS:
        return "💼";
      default:
        return "🚀";
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter hackathons based on search term and filters
  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch =
      hackathon.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || hackathon.type === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Sort hackathons
  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.startedAt || 0).getTime() -
          new Date(a.startedAt || 0).getTime()
        );
      case "oldest":
        return (
          new Date(a.startedAt || 0).getTime() -
          new Date(b.startedAt || 0).getTime()
        );
      case "deadline":
        return (
          new Date(a.endedAt || 0).getTime() -
          new Date(b.endedAt || 0).getTime()
        );
      default:
        return 0;
    }
  });

  // Group hackathons by status
  const pendingHackathons = sortedHackathons.filter(
    (h) => h.hackathonState === HackathonResponseHackathonState.Pending
  );
  const ongoingHackathons = sortedHackathons.filter(
    (h) => h.hackathonState === HackathonResponseHackathonState.Ongoing
  );
  const endedHackathons = sortedHackathons.filter(
    (h) => h.hackathonState === HackathonResponseHackathonState.Ended
  );

  // Featured hackathon (most recent ongoing or pending)
  const featuredHackathon = ongoingHackathons[0] || pendingHackathons[0];

  // Component to render hackathon grid
  const HackathonGrid = ({
    hackathons,
  }: {
    hackathons: HackathonResponse[];
  }) => {
    if (hackathons.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-charcoal-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-charcoal-900 mb-2">
            No hackathons found
          </h3>
          <p className="text-charcoal-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <Card
            key={hackathon.id}
            className="border-charcoal-200 hover:shadow-lg transition-shadow duration-200 bg-ivory/90 backdrop-blur-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className={`text-xs ${getStatusColor(
                    hackathon.hackathonState!
                  )}`}
                >
                  {hackathon.hackathonState}
                </Badge>
                <span className="text-lg">{getTypeIcon(hackathon.type!)}</span>
              </div>
              <CardTitle className="text-lg text-charcoal-900 line-clamp-2">
                {hackathon.name}
              </CardTitle>
              <CardDescription className="text-charcoal-600 line-clamp-2">
                {hackathon.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-xs text-charcoal-500 mb-4">
                <span>
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {formatDate(hackathon.startedAt)}
                </span>
                {hackathon.endedAt && (
                  <span>
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatDate(hackathon.endedAt)}
                  </span>
                )}
              </div>
              <Button
                asChild
                className="w-full bg-charcoal-900 hover:bg-charcoal-800"
              >
                <Link href={`/hackathons/${hackathon.id}`}>
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-charcoal-600" />
          <p className="text-charcoal-600">Loading hackathons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load hackathons</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {pendingHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Pending</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {ongoingHackathons.length}
              </div>
              <div className="text-xs text-charcoal-600">Ongoing</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-3">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-charcoal-600" />
              </div>
              <div className="text-xl font-bold text-charcoal-900">
                {endedHackathons.length}
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
                  {featuredHackathon.name}
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
                        {getTypeIcon(featuredHackathon.type!)}{" "}
                        {featuredHackathon.type}
                      </Badge>
                      <Badge
                        className={`text-xs ${getStatusColor(
                          featuredHackathon.hackathonState!
                        )}`}
                      >
                        {featuredHackathon.hackathonState}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-charcoal-500">
                      <span>
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {formatDate(featuredHackathon.startedAt)}
                      </span>
                      {featuredHackathon.endedAt && (
                        <span>
                          <Clock className="h-3 w-3 inline mr-1" />
                          Ends {formatDate(featuredHackathon.endedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <Button
                      asChild
                      className="bg-charcoal-900 hover:bg-charcoal-800"
                    >
                      <Link href={`/hackathons/${featuredHackathon.id}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </GridBackground>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 h-4 w-4" />
            <Input
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-charcoal-200 focus:border-charcoal-400"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 border-charcoal-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(Boolean).map((category) => (
                  <SelectItem key={category} value={category}>
                    {getTypeIcon(category as HackathonResponseType)} {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 border-charcoal-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hackathons Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-charcoal-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-ivory">
              All ({sortedHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-ivory"
            >
              Pending ({pendingHackathons.length})
            </TabsTrigger>
            <TabsTrigger
              value="ongoing"
              className="data-[state=active]:bg-ivory"
            >
              Ongoing ({ongoingHackathons.length})
            </TabsTrigger>
            <TabsTrigger value="ended" className="data-[state=active]:bg-ivory">
              Ended ({endedHackathons.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <HackathonGrid hackathons={sortedHackathons} />
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <HackathonGrid hackathons={pendingHackathons} />
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <HackathonGrid hackathons={ongoingHackathons} />
          </TabsContent>

          <TabsContent value="ended" className="mt-6">
            <HackathonGrid hackathons={endedHackathons} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
