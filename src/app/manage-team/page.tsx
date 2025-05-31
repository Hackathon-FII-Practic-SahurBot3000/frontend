"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GridBackground } from "@/components/ui/grid-background";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Plus,
  X,
  ArrowLeft,
  UserPlus,
  Crown,
  CheckCircle,
  AlertCircle,
  Mail,
  Settings,
  Eye,
  Vote,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { hackathons } from "@/lib/mock-data";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "pending" | "accepted" | "declined";
  isLeader: boolean;
  joinedAt: string;
}

export default function ManageTeamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackathonId");
  const teamId = searchParams.get("teamId");
  const readonly = searchParams.get("readonly") === "true";

  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock team data - in real app, this would come from API
  const [teamData, setTeamData] = useState({
    id: "team-123",
    name: "Creative Minds",
    hackathonId: hackathonId,
    createdAt: "2024-02-01T10:00:00Z",
    members: [
      {
        id: "1",
        name: "You",
        email: "you@example.com",
        avatar: "/api/placeholder/40/40",
        status: "accepted" as const,
        isLeader: true,
        joinedAt: "2024-02-01T10:00:00Z",
      },
      {
        id: "2",
        name: "John Doe",
        email: "john@example.com",
        avatar: "/api/placeholder/40/40",
        status: "accepted" as const,
        isLeader: false,
        joinedAt: "2024-02-01T11:00:00Z",
      },
      {
        id: "3",
        name: "",
        email: "sarah@example.com",
        status: "pending" as const,
        isLeader: false,
        joinedAt: "2024-02-01T12:00:00Z",
      },
    ] as TeamMember[],
  });

  // Find the hackathon
  const hackathon = hackathons.find((h) => h.id === hackathonId);

  useEffect(() => {
    if (!hackathonId || !hackathon || !teamId) {
      router.push("/hackathons");
    }
  }, [hackathonId, hackathon, teamId, router]);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Hackathon Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The hackathon you&apos;re looking for doesn&apos;t exist.
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

  const addTeamMember = async () => {
    setErrors({});

    if (!newMemberEmail.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(newMemberEmail)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (teamData.members.some((member) => member.email === newMemberEmail)) {
      setErrors({ email: "This email is already added to the team" });
      return;
    }

    if (teamData.members.length >= 4) {
      setErrors({ email: "Maximum 4 members per team" });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: "",
        email: newMemberEmail,
        status: "pending",
        isLeader: false,
        joinedAt: new Date().toISOString(),
      };

      setTeamData({
        ...teamData,
        members: [...teamData.members, newMember],
      });
      setNewMemberEmail("");
      setIsLoading(false);
    }, 1000);
  };

  const removeMember = async (memberId: string) => {
    const member = teamData.members.find((m) => m.id === memberId);
    if (member?.isLeader) return; // Can't remove leader

    setTeamData({
      ...teamData,
      members: teamData.members.filter((m) => m.id !== memberId),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTeamMember();
    }
  };

  const canModifyTeam = hackathon.status === "pending" && !readonly;

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-8" opacity={0.03}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/hackathons/${hackathonId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hackathon
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                {canModifyTeam ? (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Manage Mode
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    View Only
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Team Header */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {teamData.name}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {teamData.members.length} member
                          {teamData.members.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Add Members Section */}
                {canModifyTeam && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Add Team Member
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="memberEmail">Email Address</Label>
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
                            className={errors.email ? "border-destructive" : ""}
                            disabled={isLoading}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={addTeamMember}
                            disabled={
                              isLoading ||
                              !newMemberEmail.trim() ||
                              teamData.members.length >= 4
                            }
                            className="h-10"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {teamData.members.length >= 4 && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Maximum team size reached (4 members)
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Team Members List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {teamData.members.map((member, index) => (
                        <div key={member.id}>
                          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name
                                  ? member.name.charAt(0).toUpperCase()
                                  : member.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-foreground">
                                  {member.name || member.email}
                                </p>
                                {member.isLeader && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {member.name
                                  ? member.email
                                  : "Invitation pending"}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    member.status === "accepted"
                                      ? "default"
                                      : member.status === "declined"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {member.status === "accepted"
                                    ? "Active"
                                    : member.status === "pending"
                                    ? "Pending"
                                    : "Declined"}
                                </Badge>
                                {member.isLeader && (
                                  <Badge variant="outline" className="text-xs">
                                    Team Leader
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {member.status === "pending" && (
                                <Mail className="h-4 w-4 text-muted-foreground" />
                              )}
                              {canModifyTeam && !member.isLeader && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeMember(member.id)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          {index < teamData.members.length - 1 && (
                            <Separator className="my-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Hackathon Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hackathon Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
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
                          {hackathon.status}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Prize Pool
                        </span>
                        <span className="font-medium">
                          ${(hackathon.prize || 5000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Participants
                        </span>
                        <span className="font-medium">
                          {hackathon.participants}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Guidelines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Maximum 4 members per team
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {canModifyTeam
                          ? "You can modify your team until the hackathon goes live"
                          : "Team modifications are locked after pending phase"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Team leader can submit entries and manage members
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Prize money is shared equally among all members
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Status Info */}
                <Card>
                  <CardContent className="pt-6">
                    {hackathon.status === "pending" && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Settings className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Preparation Phase
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Build your team and get ready. You can modify your
                          team until the hackathon goes live.
                        </p>
                      </div>
                    )}
                    {hackathon.status === "active" && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Hackathon Live!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Time to create and submit your entry. Team is now
                          locked.
                        </p>
                      </div>
                    )}
                    {hackathon.status === "voting" && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Vote className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Voting Phase
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Submissions are closed. Community is voting on
                          entries.
                        </p>
                      </div>
                    )}
                    {hackathon.status === "ended" && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Hackathon Ended
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Winner has been announced. Check the results!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
