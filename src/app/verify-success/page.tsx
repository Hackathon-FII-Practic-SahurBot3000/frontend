"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GridBackground } from "@/components/ui/grid-background";
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Trophy,
  Users,
  Palette,
  Music,
  Code,
  Camera,
} from "lucide-react";

export default function VerifySuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/login?verified=true");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const features = [
    {
      icon: Trophy,
      title: "Join Hackathons",
      description: "Participate in creative challenges and win prizes",
    },
    {
      icon: Users,
      title: "Connect with Creators",
      description: "Collaborate with artists, writers, and developers",
    },
    {
      icon: Palette,
      title: "Showcase Your Work",
      description: "Build your portfolio and gain recognition",
    },
    {
      icon: Sparkles,
      title: "Learn & Grow",
      description: "Improve your skills through community feedback",
    },
  ];

  const categories = [
    { icon: Palette, name: "Visual Art", color: "text-purple-600" },
    { icon: Music, name: "Audio", color: "text-blue-600" },
    { icon: Code, name: "Development", color: "text-green-600" },
    { icon: Camera, name: "Photography", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <GridBackground
        className="min-h-screen flex items-center justify-center p-4"
        opacity={0.03}
      >
        <div className="w-full max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome to COLLECTIVE!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your email has been successfully verified
            </p>
            <p className="text-muted-foreground">
              You&apos;re now ready to join the creative community
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Welcome Card */}
            <Card className="border-border bg-card/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  What&apos;s Next?
                </CardTitle>
                <CardDescription>
                  Start your creative journey with COLLECTIVE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories Card */}
            <Card className="border-border bg-card/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Explore Categories</CardTitle>
                <CardDescription>
                  Discover hackathons across different creative fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors cursor-pointer"
                    >
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                      <span className="font-medium text-foreground">
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">
                      Active Hackathons
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join 3 live hackathons with over $15,000 in total prizes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/login?verified=true")}
                className="px-8"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Login
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/hackathons")}
                className="px-8"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Browse Hackathons
              </Button>
            </div>

            {/* Auto-redirect notice */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>
                Redirecting to login in {countdown} second
                {countdown !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">
                Active Creators
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">
                Hackathons Hosted
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">$50K+</div>
              <div className="text-sm text-muted-foreground">
                Prizes Awarded
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div className="text-sm text-muted-foreground">
                Projects Created
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
