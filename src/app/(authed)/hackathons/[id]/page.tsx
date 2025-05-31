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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { GridBackground } from "@/components/ui/grid-background";
import {
  Calendar,
  Trophy,
  Heart,
  Share2,
  Download,
  Eye,
  MessageCircle,
  Award,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react";

// Mock data for a specific hackathon
const hackathon = {
  id: "1",
  title: "Digital Art Revolution",
  description:
    "Create stunning digital artwork that pushes the boundaries of creativity and technology. This hackathon challenges artists to explore new mediums, experiment with AI-assisted creation, and develop innovative visual experiences that inspire and captivate audiences worldwide.",
  category: "Visual Art",
  status: "active",
  deadline: "2024-02-15T23:59:59",
  startDate: "2024-01-15T00:00:00",
  prize: 5000,
  participants: 234,
  submissions: 89,
  difficulty: "Intermediate",
  tags: ["Digital Art", "Creativity", "Design", "AI", "Innovation"],
  organizer: {
    name: "Creative Labs",
    avatar: "/api/placeholder/40/40",
    verified: true,
  },
  rules: [
    "Original artwork only - no plagiarism",
    "Must be created during the hackathon period",
    "Maximum 3 submissions per participant",
    "All mediums welcome (digital painting, 3D, AI-assisted, etc.)",
    "Include a brief description of your creative process",
  ],
  judging: [
    "Creativity and Originality (40%)",
    "Technical Execution (30%)",
    "Visual Impact (20%)",
    "Concept and Story (10%)",
  ],
  prizes: [
    { place: "1st", amount: 2500, description: "Winner + Featured Gallery" },
    { place: "2nd", amount: 1500, description: "Runner-up + Portfolio Review" },
    {
      place: "3rd",
      amount: 1000,
      description: "Third Place + Mentorship Session",
    },
  ],
};

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

export default function HackathonDetailPage() {
  const timeRemaining = getTimeRemaining(hackathon.deadline);
  const progressPercentage =
    (hackathon.submissions / hackathon.participants) * 100;

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
                      <AvatarImage src={hackathon.organizer.avatar} />
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {hackathon.organizer.name}
                    </span>
                    {hackathon.organizer.verified && (
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
                        {hackathon.rules.map((rule, index) => (
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
                        {hackathon.judging.map((criteria, index) => (
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
                        {hackathon.prizes.map((prize, index) => (
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
                      ${hackathon.prize.toLocaleString()}
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

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <Button className="w-full" size="lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Join Hackathon
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brief
                  </Button>
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
                          {new Date(hackathon.deadline).toLocaleDateString()}
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

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
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
