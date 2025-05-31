import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GridBackground } from "@/components/ui/grid-background";
import {
  Calendar,
  Trophy,
  Heart,
  Share2,
  Eye,
  MessageCircle,
  Award,
  Target,
  Zap,
  CheckCircle,
  Vote,
  Volume2,
  Users,
  Settings,
  Upload,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { getHackathonType, getVotingRoute } from "@/lib/hackathon-types";
import { hackathons } from "@/lib/mock-data";

// Mock submissions data
const submissions = [
  {
    id: "1",
    title: "Neon Dreams",
    author: "Alex Chen",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    likes: 45,
    views: 234,
    comments: 12,
    submittedAt: "2024-02-10T14:30:00",
    description:
      "A cyberpunk-inspired digital painting exploring the intersection of technology and dreams.",
  },
  {
    id: "2",
    title: "Nature's Algorithm",
    author: "Sarah Kim",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    likes: 67,
    views: 456,
    comments: 23,
    submittedAt: "2024-02-09T09:15:00",
    description:
      "AI-generated artwork that mimics natural patterns and organic growth.",
  },
  {
    id: "3",
    title: "Urban Metamorphosis",
    author: "Marcus Johnson",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    likes: 32,
    views: 189,
    comments: 8,
    submittedAt: "2024-02-08T16:45:00",
    description: "3D visualization of how cities might evolve in the future.",
  },
  {
    id: "4",
    title: "Emotional Spectrum",
    author: "Luna Rodriguez",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    likes: 89,
    views: 567,
    comments: 34,
    submittedAt: "2024-02-07T11:20:00",
    description:
      "Abstract representation of human emotions through color and form.",
  },
];

const getTimeRemaining = (deadline: string) => {
  const now = new Date().getTime();
  const end = new Date(deadline).getTime();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days}d ${hours}h remaining`;
};

interface HackathonDetailPageProps {
  params: {
    id: string;
  };
}

export default function HackathonDetailPage({
  params,
}: HackathonDetailPageProps) {
  // Find the hackathon by ID
  const hackathon = hackathons.find((h) => h.id === params.id);

  // If hackathon not found, show error
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

  // Mock user team status - in real app, this would come from API/context
  const userTeam = {
    isJoined: hackathon.status !== "pending", // Only joined if not pending
    teamId: "team-123",
    teamName: "Creative Minds",
    isLeader: true,
    members: [
      { id: "1", name: "You", email: "you@example.com", isLeader: true },
      { id: "2", name: "John Doe", email: "john@example.com", isLeader: false },
    ],
  };

  const timeRemaining = getTimeRemaining(
    hackathon.deadline || hackathon.endDate
  );

  // Get hackathon type configuration
  const hackathonType = getHackathonType(hackathon.category);
  const votingRoute = getVotingRoute(hackathon.category);

  // Get voting button configuration based on category
  const getVotingButtonConfig = () => {
    if (!hackathonType)
      return { label: "View & Vote", icon: Vote, route: "/voting" };

    switch (hackathonType.id) {
      case "audio":
        return { label: "Listen & Vote", icon: Volume2, route: votingRoute };
      case "art":
        return { label: "View & Vote", icon: Vote, route: votingRoute };
      case "writing":
        return { label: "Read & Vote", icon: Vote, route: votingRoute };
      case "business":
        return { label: "Review & Vote", icon: Vote, route: votingRoute };
      default:
        return { label: "View & Vote", icon: Vote, route: votingRoute };
    }
  };

  const votingConfig = getVotingButtonConfig();

  // Mock data for rules, judging, and prizes based on hackathon type
  const getHackathonDetails = () => {
    const baseDetails = {
      organizer: {
        name: hackathon.sponsor || "IdeaSweep",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
    };

    switch (hackathonType?.id) {
      case "art":
        return {
          ...baseDetails,
          rules: [
            "Original artwork only - no plagiarism",
            "Must be created during the hackathon period",
            "Maximum 3 submissions per participant",
            "All digital mediums welcome (painting, 3D, AI-assisted, etc.)",
            "Include a brief description of your creative process",
          ],
          judging: [
            "Creativity and Originality (40%)",
            "Technical Execution (30%)",
            "Visual Impact (20%)",
            "Theme Adherence (10%)",
          ],
          prizes: [
            {
              place: "1st",
              amount: Math.floor((hackathon.prize || 5000) * 0.5),
              description: "Winner + Featured Gallery",
            },
            {
              place: "2nd",
              amount: Math.floor((hackathon.prize || 5000) * 0.3),
              description: "Runner-up + Portfolio Review",
            },
            {
              place: "3rd",
              amount: Math.floor((hackathon.prize || 5000) * 0.2),
              description: "Third Place + Mentorship Session",
            },
          ],
        };
      case "writing":
        return {
          ...baseDetails,
          rules: [
            "Original content only - no plagiarism",
            "Word limit: 500-2000 words",
            "Maximum 2 submissions per participant",
            "All genres welcome",
            "Must include title and brief synopsis",
          ],
          judging: [
            "Storytelling and Plot (35%)",
            "Writing Quality and Style (30%)",
            "Character Development (20%)",
            "Theme Adherence (15%)",
          ],
          prizes: [
            {
              place: "1st",
              amount: Math.floor((hackathon.prize || 3000) * 0.5),
              description: "Winner + Publishing Opportunity",
            },
            {
              place: "2nd",
              amount: Math.floor((hackathon.prize || 3000) * 0.3),
              description: "Runner-up + Editorial Review",
            },
            {
              place: "3rd",
              amount: Math.floor((hackathon.prize || 3000) * 0.2),
              description: "Third Place + Writing Workshop",
            },
          ],
        };
      case "audio":
        return {
          ...baseDetails,
          rules: [
            "Original compositions only",
            "Duration: 1-5 minutes",
            "Maximum 2 tracks per participant",
            "Any genre or style welcome",
            "Include track description and inspiration",
          ],
          judging: [
            "Composition and Creativity (40%)",
            "Production Quality (30%)",
            "Originality (20%)",
            "Theme Interpretation (10%)",
          ],
          prizes: [
            {
              place: "1st",
              amount: Math.floor((hackathon.prize || 4000) * 0.5),
              description: "Winner + Studio Session",
            },
            {
              place: "2nd",
              amount: Math.floor((hackathon.prize || 4000) * 0.3),
              description: "Runner-up + Equipment Prize",
            },
            {
              place: "3rd",
              amount: Math.floor((hackathon.prize || 4000) * 0.2),
              description: "Third Place + Mentorship",
            },
          ],
        };
      case "business":
        return {
          ...baseDetails,
          rules: [
            "Original business concept required",
            "Complete business plan submission",
            "Maximum 10-page presentation",
            "Financial projections required",
            "Market research and validation",
          ],
          judging: [
            "Market Potential and Feasibility (35%)",
            "Innovation and Uniqueness (25%)",
            "Business Model Viability (25%)",
            "Presentation Quality (15%)",
          ],
          prizes: [
            {
              place: "1st",
              amount: Math.floor((hackathon.prize || 10000) * 0.5),
              description: "Winner + Investor Pitch Session",
            },
            {
              place: "2nd",
              amount: Math.floor((hackathon.prize || 10000) * 0.3),
              description: "Runner-up + Business Mentorship",
            },
            {
              place: "3rd",
              amount: Math.floor((hackathon.prize || 10000) * 0.2),
              description: "Third Place + Accelerator Access",
            },
          ],
        };
      default:
        return {
          ...baseDetails,
          rules: [
            "Original work only",
            "Follow submission guidelines",
            "Respect deadline",
            "Be creative and innovative",
          ],
          judging: [
            "Creativity (40%)",
            "Technical Quality (30%)",
            "Innovation (20%)",
            "Theme Adherence (10%)",
          ],
          prizes: [
            {
              place: "1st",
              amount: Math.floor((hackathon.prize || 5000) * 0.5),
              description: "Winner",
            },
            {
              place: "2nd",
              amount: Math.floor((hackathon.prize || 5000) * 0.3),
              description: "Runner-up",
            },
            {
              place: "3rd",
              amount: Math.floor((hackathon.prize || 5000) * 0.2),
              description: "Third Place",
            },
          ],
        };
    }
  };

  const hackathonDetails = getHackathonDetails();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {hackathon.status.charAt(0).toUpperCase() +
                      hackathon.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">{hackathon.category}</Badge>
                  <Badge variant="outline">{hackathon.difficulty}</Badge>
                  {hackathonType && (
                    <Badge variant="outline" className="text-xs">
                      {hackathonType.votingType} voting
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-foreground">
                  {hackathon.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {hackathon.description}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={hackathonDetails.organizer.avatar} />
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {hackathonDetails.organizer.name}
                    </span>
                    {hackathonDetails.organizer.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="submissions">
                    Submissions ({hackathon.submissions})
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Rules */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Rules & Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {hackathonDetails.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {rule}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Judging Criteria */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Judging Criteria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {hackathonDetails.judging.map((criteria, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-muted-foreground">
                              {criteria}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Prizes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Prizes & Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {hackathonDetails.prizes.map((prize, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-accent rounded-lg"
                          >
                            <div>
                              <div className="font-medium">
                                {prize.place} Place
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {prize.description}
                              </div>
                            </div>
                            <div className="text-lg font-bold text-primary">
                              ${prize.amount.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="submissions" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {submissions.map((submission) => (
                      <Card
                        key={submission.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <div className="text-muted-foreground text-sm">
                            {submission.title}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-card-foreground">
                                {submission.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {submission.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={submission.avatar} />
                                <AvatarFallback>
                                  {submission.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                {submission.author}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {submission.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {submission.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {submission.comments}
                                </div>
                              </div>
                              <span>
                                {new Date(
                                  submission.submittedAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="leaderboard" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Submissions</CardTitle>
                      <CardDescription>
                        Ranked by community votes and engagement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {submissions
                          .sort((a, b) => b.likes - a.likes)
                          .map((submission, index) => (
                            <div
                              key={submission.id}
                              className="flex items-center gap-4 p-3 rounded-lg bg-accent"
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                                {index + 1}
                              </div>
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={submission.avatar} />
                                <AvatarFallback>
                                  {submission.author[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {submission.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  by {submission.author}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">
                                  {submission.likes} likes
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {submission.views} views
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Join the Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${(hackathon.prize || 5000).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Prize Pool
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium">{timeRemaining}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Participants
                      </span>
                      <span className="font-medium">
                        {hackathon.participants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Submissions</span>
                      <span className="font-medium">
                        {hackathon.submissions}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {hackathon.status === "pending" && (
                    <>
                      {!userTeam.isJoined ? (
                        <Button className="w-full" size="lg" asChild>
                          <Link
                            href={`/create-team?hackathonId=${hackathon.id}`}
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Create Team & Join
                          </Link>
                        </Button>
                      ) : (
                        <>
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">
                                Already Joined
                              </span>
                            </div>
                            <p className="text-sm text-green-600 mt-1">
                              Team: {userTeam.teamName}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                            asChild
                          >
                            <Link
                              href={`/manage-team?hackathonId=${hackathon.id}&teamId=${userTeam.teamId}`}
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Manage Team
                            </Link>
                          </Button>
                        </>
                      )}

                      {/* Voting Button - disabled during pending */}
                      <Button variant="outline" className="w-full" disabled>
                        <votingConfig.icon className="w-4 h-4 mr-2" />
                        {votingConfig.label} (Available during voting phase)
                      </Button>
                    </>
                  )}

                  {hackathon.status === "active" && (
                    <>
                      {userTeam.isJoined ? (
                        <>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-2 text-blue-800">
                              <Users className="w-5 h-5" />
                              <span className="font-medium">Your Team</span>
                            </div>
                            <p className="text-sm text-blue-600 mt-1">
                              {userTeam.teamName} ({userTeam.members.length}{" "}
                              members)
                            </p>
                          </div>
                          <Button className="w-full" size="lg" asChild>
                            <Link
                              href={`/submit/${hackathon.category.toLowerCase()}?hackathonId=${
                                hackathon.id
                              }&teamMode=true&teamName=${encodeURIComponent(
                                userTeam.teamName
                              )}`}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Entry
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                            asChild
                          >
                            <Link
                              href={`/manage-team?hackathonId=${hackathon.id}&teamId=${userTeam.teamId}&readonly=true`}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              View Team
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">
                              Registration Closed
                            </span>
                          </div>
                          <p className="text-sm text-yellow-600 mt-1">
                            You can only join during the pending phase
                          </p>
                        </div>
                      )}

                      {/* Voting Button - disabled during active */}
                      <Button variant="outline" className="w-full" disabled>
                        <votingConfig.icon className="w-4 h-4 mr-2" />
                        {votingConfig.label} (Available during voting phase)
                      </Button>
                    </>
                  )}

                  {hackathon.status === "voting" && (
                    <>
                      {userTeam.isJoined && (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2 text-purple-800">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">Your Team</span>
                          </div>
                          <p className="text-sm text-purple-600 mt-1">
                            {userTeam.teamName} ({userTeam.members.length}{" "}
                            members)
                          </p>
                        </div>
                      )}

                      {/* Voting Button - enabled during voting */}
                      <Button asChild className="w-full" size="lg">
                        <Link href={votingConfig.route}>
                          <votingConfig.icon className="w-4 h-4 mr-2" />
                          {votingConfig.label}
                        </Link>
                      </Button>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-800">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">Voting Phase</span>
                        </div>
                        <p className="text-sm text-orange-600 mt-1">
                          Submissions are closed. Vote for your favorite
                          entries!
                        </p>
                      </div>
                    </>
                  )}

                  {hackathon.status === "ended" && (
                    <>
                      {hackathon.winner && (
                        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-800 mb-3">
                            <Trophy className="w-5 h-5" />
                            <span className="font-medium">
                              Winner Announced!
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={hackathon.winner.avatar} />
                              <AvatarFallback>
                                {hackathon.winner.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-foreground">
                                {hackathon.winner.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                by {hackathon.winner.author}
                              </p>
                              <p className="text-sm font-medium text-yellow-700">
                                Prize: $
                                {hackathon.winner.prize.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userTeam.isJoined && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2 text-gray-800">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">Your Team</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {userTeam.teamName} ({userTeam.members.length}{" "}
                            members)
                          </p>
                        </div>
                      )}

                      <Button asChild variant="outline" className="w-full">
                        <Link href={votingConfig.route}>
                          <Trophy className="w-4 h-4 mr-2" />
                          View Final Results
                        </Link>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">
                          Registration Open
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(hackathon.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">
                          Submission Deadline
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(
                            hackathon.deadline || hackathon.endDate
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">
                          Judging Period
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Feb 16 - Feb 20, 2024
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">
                          Winners Announced
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Feb 21, 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
