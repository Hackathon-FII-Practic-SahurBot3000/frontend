"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GridBackground } from "@/components/ui/grid-background";
import { useGetById } from "@/generated-api/hackathon-controller/hackathon-controller";
import { useCreateTeam } from "@/generated-api/team-controller/team-controller";
import { useGetUserMe } from "@/generated-api/user-controller/user-controller";
import { TeamCreateRequest, UserDto } from "@/generated-api/schemas";
import { ArrowLeft, Loader2, Plus, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CreateTeamPage() {
  const params = useParams();
  const router = useRouter();
  const hackathonId = parseInt(params.id as string);

  // State management
  const [teamName, setTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  // API hooks
  const { data: hackathonResponse, isLoading: hackathonLoading } =
    useGetById(hackathonId);
  const { data: userResponse, isLoading: userLoading } = useGetUserMe();
  const createTeamMutation = useCreateTeam();

  const hackathon = hackathonResponse?.data;
  const user = userResponse?.data as UserDto & { id?: number };

  const handleCreateTeam = async () => {
    if (!teamName.trim() || !hackathonId || !user?.id) {
      setError("Please enter a team name");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      const teamData: TeamCreateRequest = {
        name: teamName.trim(),
        hackathonId: hackathonId,
        userId: user.id,
      };

      await createTeamMutation.mutateAsync({ data: teamData });

      // Redirect back to hackathon detail page
      router.push(`/hackathons/${hackathonId}?tab=team`);
    } catch (error: unknown) {
      console.error("Failed to create team:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : error &&
            typeof error === "object" &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "data" in error.response &&
            error.response.data &&
            typeof error.response.data === "object" &&
            "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to create team. Please try again.";
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  if (hackathonLoading || userLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-charcoal-600" />
          <p className="text-charcoal-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hackathon || !user) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
            Unable to Load
          </h2>
          <p className="text-charcoal-600 mb-4">
            Could not load hackathon or user information.
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
      <GridBackground className="py-8" opacity={0.05}>
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-charcoal-600 hover:text-charcoal-900"
            >
              <Link href={`/hackathons/${hackathonId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {hackathon.name}
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-charcoal-100 rounded-full">
                <Users className="h-8 w-8 text-charcoal-700" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
              Create Your Team
            </h1>
            <p className="text-charcoal-600">
              Start your journey in {hackathon.name} by creating a team
            </p>
          </div>

          {/* Team Creation Form */}
          <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-charcoal-900">
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Name Input */}
              <div className="space-y-2">
                <Label htmlFor="team-name" className="text-charcoal-700">
                  Team Name *
                </Label>
                <Input
                  id="team-name"
                  placeholder="Enter your team name (e.g., Creative Coders, Design Wizards)"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (error) setError("");
                  }}
                  className="border-charcoal-200 focus:border-charcoal-400"
                  maxLength={50}
                />
                <p className="text-xs text-charcoal-500">
                  Choose a unique and memorable name for your team
                </p>
              </div>

              {/* User Info Display */}
              <div className="bg-charcoal-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-charcoal-700 mb-2">
                  Team Leader
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-charcoal-200 rounded-full flex items-center justify-center">
                    <span className="text-charcoal-700 font-medium">
                      {user.firstName?.charAt(0) ||
                        user.email?.charAt(0) ||
                        "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-charcoal-600">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Team Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Team Guidelines
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Teams can have up to 4 members</li>
                  <li>• You can invite members after creating the team</li>
                  <li>• Team names must be unique within the hackathon</li>
                  <li>• As team leader, you can manage team members</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  asChild
                  className="flex-1 border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Link href={`/hackathons/${hackathonId}`}>Cancel</Link>
                </Button>
                <Button
                  onClick={handleCreateTeam}
                  disabled={!teamName.trim() || isCreating}
                  className="flex-1 bg-charcoal-900 hover:bg-charcoal-800"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Team...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </GridBackground>
    </div>
  );
}
