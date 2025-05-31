"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  X,
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Mock business submissions data
const businessSubmissions = [
  {
    id: "1",
    title: "EcoPackage Solutions",
    author: "Sarah Martinez",
    avatar: "/api/placeholder/40/40",
    category: "Sustainability",
    problem:
      "Traditional packaging creates massive environmental waste, with over 300 million tons of plastic waste generated annually.",
    solution:
      "Biodegradable packaging made from agricultural waste that decomposes within 90 days while maintaining product protection.",
    marketSize: "$350B",
    targetAudience:
      "E-commerce retailers, food delivery services, consumer goods companies",
    businessModel: "B2B subscription model with tiered pricing based on volume",
    competitiveAdvantage:
      "Patent-pending bio-material, 40% cost reduction vs traditional eco-packaging",
    financialProjection: "Break-even in 18 months, $50M revenue by year 3",
    fundingNeeded: "$2.5M",
    submittedAt: "2024-02-10T14:30:00",
    votes: 0,
  },
  {
    id: "2",
    title: "SkillBridge Academy",
    author: "Marcus Johnson",
    avatar: "/api/placeholder/40/40",
    category: "Education Technology",
    problem:
      "Skills gap in tech industry with 85% of companies struggling to find qualified developers.",
    solution:
      "AI-powered personalized learning platform that matches learners with industry mentors and real-world projects.",
    marketSize: "$280B",
    targetAudience:
      "Career changers, recent graduates, professionals seeking upskilling",
    businessModel:
      "Freemium model with premium mentorship and certification programs",
    competitiveAdvantage:
      "Real-time skill assessment, industry partnerships, 90% job placement rate",
    financialProjection: "Profitable in 24 months, $25M ARR by year 4",
    fundingNeeded: "$5M",
    submittedAt: "2024-02-09T09:15:00",
    votes: 0,
  },
  {
    id: "3",
    title: "HealthSync Wearables",
    author: "Dr. Priya Patel",
    avatar: "/api/placeholder/40/40",
    category: "Healthcare Technology",
    problem:
      "Chronic disease management lacks continuous monitoring, leading to 70% of preventable hospitalizations.",
    solution:
      "Smart wearable device that continuously monitors vital signs and predicts health episodes before they occur.",
    marketSize: "$195B",
    targetAudience:
      "Patients with chronic conditions, healthcare providers, insurance companies",
    businessModel:
      "Device sales + subscription for monitoring services and data analytics",
    competitiveAdvantage:
      "FDA-approved predictive algorithms, 95% accuracy in episode prediction",
    financialProjection:
      "Revenue positive in 30 months, $100M revenue by year 5",
    fundingNeeded: "$10M",
    submittedAt: "2024-02-08T16:45:00",
    votes: 0,
  },
  {
    id: "4",
    title: "LocalFresh Marketplace",
    author: "Emma Chen",
    avatar: "/api/placeholder/40/40",
    category: "Food & Agriculture",
    problem:
      "Small farmers struggle to reach consumers directly, losing 60% of profits to intermediaries.",
    solution:
      "Hyperlocal marketplace connecting farmers directly with consumers within 50-mile radius for same-day delivery.",
    marketSize: "$120B",
    targetAudience:
      "Local farmers, health-conscious consumers, restaurants seeking fresh ingredients",
    businessModel:
      "Commission-based model (8% per transaction) + premium logistics services",
    competitiveAdvantage:
      "Blockchain supply chain tracking, carbon footprint calculator, community building",
    financialProjection: "Break-even in 15 months, $30M GMV by year 3",
    fundingNeeded: "$3M",
    submittedAt: "2024-02-07T11:20:00",
    votes: 0,
  },
];

export default function BusinessVotingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votedSubmissions, setVotedSubmissions] = useState<string[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const submissions = businessSubmissions.filter(
    (sub) => !votedSubmissions.includes(sub.id)
  );

  const currentSubmission = submissions[currentIndex];

  const handleVote = (id: string, isUpvote: boolean) => {
    setDirection(isUpvote ? "right" : "left");
    setVotedSubmissions([...votedSubmissions, id]);

    setTimeout(() => {
      if (currentIndex < submissions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setDirection(null);
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex < submissions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentSubmission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GridBackground className="py-12" opacity={0.05}>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                All Reviewed!
              </h2>
              <p className="text-muted-foreground mb-6">
                You have reviewed all available business proposals. Check back
                later for more innovative ideas to evaluate.
              </p>
              <Button asChild>
                <Link href="/hackathons">Browse Hackathons</Link>
              </Button>
            </div>
          </div>
        </GridBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-8" opacity={0.05}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/hackathons">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hackathons
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Business Proposals
                </h1>
                <p className="text-sm text-muted-foreground">
                  Review business plans and vote for the most promising
                  ventures.
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {submissions.length}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <Card
              className={`transition-all duration-300 ${
                direction === "right"
                  ? "transform translate-x-full opacity-0"
                  : direction === "left"
                  ? "transform -translate-x-full opacity-0"
                  : "transform translate-x-0 opacity-100"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentSubmission.avatar} />
                      <AvatarFallback>
                        {currentSubmission.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">
                        {currentSubmission.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>by {currentSubmission.author}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {currentSubmission.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Business Overview Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Problem & Solution */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Problem
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentSubmission.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Solution
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentSubmission.solution}
                      </p>
                    </div>
                  </div>

                  {/* Market & Business Model */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Market Size
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        {currentSubmission.marketSize}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Target Audience
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {currentSubmission.targetAudience}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Model & Competitive Advantage */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Business Model
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentSubmission.businessModel}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Competitive Advantage
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentSubmission.competitiveAdvantage}
                    </p>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Financial Overview
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Funding Needed
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {currentSubmission.fundingNeeded}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Financial Projection
                      </p>
                      <p className="text-sm text-foreground">
                        {currentSubmission.financialProjection}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation and Voting */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentIndex === submissions.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleVote(currentSubmission.id, false)}
                      className="hover:bg-red-50 hover:border-red-200"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Pass
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => handleVote(currentSubmission.id, true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      Invest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
