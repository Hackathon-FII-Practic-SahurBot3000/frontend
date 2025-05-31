"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GridBackground } from "@/components/ui/grid-background";
import {
  Users,
  Plus,
  X,
  ArrowRight,
  ChevronLeft,
  UserPlus,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  User,
} from "lucide-react";
import Link from "next/link";
import { hackathons } from "@/lib/mock-data";
import { getSubmissionRoute } from "@/lib/hackathon-types";

interface TeamMember {
  id: string;
  email: string;
  status: "pending" | "accepted" | "declined";
  name?: string;
  avatar?: string;
}

type Step = "team-name" | "add-members" | "confirm";

export default function CreateTeamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackathonId");

  const [currentStep, setCurrentStep] = useState<Step>("team-name");
  const [teamName, setTeamName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Find the hackathon
  const hackathon = hackathons.find((h) => h.id === hackathonId);

  useEffect(() => {
    if (!hackathonId || !hackathon) {
      router.push("/hackathons");
    }
  }, [hackathonId, hackathon, router]);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Hackathon Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The hackathon you&apos;re trying to join doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/hackathons">Back to Hackathons</Link>
          </Button>
        </div>
      </div>
    );
  }

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleTeamNameNext = () => {
    if (!teamName.trim()) {
      setErrors({ teamName: "Team name is required" });
      return;
    }
    setErrors({});
    setCurrentStep("add-members");
  };

  const addTeamMember = () => {
    setErrors({});

    if (!newMemberEmail.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(newMemberEmail)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (teamMembers.some((member) => member.email === newMemberEmail)) {
      setErrors({ email: "This email is already added to the team" });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: newMemberEmail,
      status: "pending",
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
  };

  const removeMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
  };

  const handleContinueToSubmission = async () => {
    setIsLoading(true);

    // Simulate team creation
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to submission page with team context
      const submissionRoute = getSubmissionRoute(hackathon.category);
      router.push(
        `${submissionRoute}?hackathonId=${hackathonId}&teamMode=true&teamName=${encodeURIComponent(
          teamName
        )}`
      );
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentStep === "team-name") {
        handleTeamNameNext();
      } else {
        addTeamMember();
      }
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case "team-name":
        return 33;
      case "add-members":
        return 66;
      case "confirm":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-8" opacity={0.03}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/hackathons/${hackathonId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="text-sm text-muted-foreground">
                Step{" "}
                {currentStep === "team-name"
                  ? 1
                  : currentStep === "add-members"
                  ? 2
                  : 3}{" "}
                of 3
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                />
              </div>
            </div>

            {/* Step 1: Team Name */}
            {currentStep === "team-name" && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Create Your Team
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Let&apos;s start by giving your team a name
                    </p>
                  </div>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="teamName"
                          className="text-base font-medium"
                        >
                          Team Name
                        </Label>
                        <Input
                          id="teamName"
                          placeholder="Enter your team name"
                          value={teamName}
                          onChange={(e) => {
                            setTeamName(e.target.value);
                            if (errors.teamName) {
                              setErrors({ ...errors, teamName: "" });
                            }
                          }}
                          onKeyPress={handleKeyPress}
                          className={`h-12 text-lg ${
                            errors.teamName ? "border-destructive" : ""
                          }`}
                          autoFocus
                        />
                        {errors.teamName && (
                          <p className="text-sm text-destructive flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errors.teamName}
                          </p>
                        )}
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              You&apos;ll be the team leader
                            </p>
                            <p className="text-sm text-muted-foreground">
                              As the creator, you&apos;ll be able to manage team
                              members and submit your final entry
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleTeamNameNext}
                        className="w-full h-12 text-base"
                        disabled={!teamName.trim()}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Hackathon Context */}
                <Card className="border-muted">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {hackathon.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {hackathon.theme}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {hackathon.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {hackathon.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          ${(hackathon.prize || 5000).toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Prize Pool
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Add Members */}
            {currentStep === "add-members" && (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Invite Team Members
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Add friends and colleagues to join &quot;{teamName}&quot;
                    </p>
                  </div>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="memberEmail"
                          className="text-base font-medium"
                        >
                          Email Address
                        </Label>
                        <div className="flex gap-3">
                          <Input
                            id="memberEmail"
                            placeholder="Enter email address"
                            value={newMemberEmail}
                            onChange={(e) => {
                              setNewMemberEmail(e.target.value);
                              if (errors.email) {
                                setErrors({ ...errors, email: "" });
                              }
                            }}
                            onKeyPress={handleKeyPress}
                            className={`h-12 flex-1 ${
                              errors.email ? "border-destructive" : ""
                            }`}
                          />
                          <Button
                            onClick={addTeamMember}
                            className="h-12 px-6"
                            disabled={!newMemberEmail.trim()}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Team Members List */}
                      <div className="space-y-4">
                        {/* Current User */}
                        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              You
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              You (Team Leader)
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Can manage team and submit entries
                            </p>
                          </div>
                          <Badge variant="default" className="text-xs">
                            Leader
                          </Badge>
                        </div>

                        {/* Added Members */}
                        {teamMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">
                                {member.name || member.email}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Invitation will be sent
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              Pending
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMember(member.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        {teamMembers.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No team members added yet</p>
                            <p className="text-sm">
                              You can add up to 3 more members
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep("team-name")}
                          className="flex-1 h-12"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={handleContinueToSubmission}
                          disabled={isLoading}
                          className="flex-1 h-12"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                              Creating Team...
                            </div>
                          ) : (
                            <>
                              Continue to Submission
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Guidelines */}
                <Card className="border-muted">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      Team Guidelines
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Maximum 4 members per team (including you)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Team members will receive email invitations
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        You can start working even if members haven&apos;t
                        accepted yet
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Prize money is shared equally among all team members
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
