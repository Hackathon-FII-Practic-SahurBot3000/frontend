import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/ui/grid-background";
import { DotBackground } from "@/components/ui/dot-background";
import { CombinedBackground } from "@/components/ui/combined-background";
import {
  Sparkles,
  Users,
  Trophy,
  Calendar,
  ArrowRight,
  Star,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Grid Background */}
      <GridBackground className="min-h-screen" animated fade>
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="border-border text-muted-foreground"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Welcome to COLLECTIVE
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  The Power of{" "}
                  <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                    COLLECTIVE
                  </span>{" "}
                  Imagination
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Build worlds, write stories, create experiences. Join a
                  community of creators pushing the boundaries of digital art,
                  storytelling, and innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <Link href="/hackathons" className="flex items-center">
                    Join a Hackathon
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-muted-foreground hover:bg-accent"
                  asChild
                >
                  <Link href="/wall-of-fame">Explore Winners</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Creators
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Hackathons
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    1000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submissions
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <DotBackground className="absolute inset-0" opacity={0.1} />
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <Card className="animate-float border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-card-foreground">
                      Creative Challenges
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Push your creative boundaries
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="animate-float border-border bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: "1s" }}
                >
                  <CardHeader className="pb-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-card-foreground">
                      Community
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect with like-minded creators
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="animate-float border-border bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: "2s" }}
                >
                  <CardHeader className="pb-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-card-foreground">
                      Recognition
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Showcase your best work
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="animate-float border-border bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: "3s" }}
                >
                  <CardHeader className="pb-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-card-foreground">
                      Growth
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Level up your skills
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Features Section with Dot Background */}
      <DotBackground className="py-20" opacity={0.08}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose COLLECTIVE?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide the platform, community, and tools you need to bring
              your creative visions to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  Regular Hackathons
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  New creative challenges every month across different
                  disciplines and themes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  Collaborative Environment
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Connect, collaborate, and learn from creators around the
                  world.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  AI-Powered Feedback
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get instant feedback on originality and quality to improve
                  your work.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  Recognition & Prizes
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Win prizes, gain recognition, and build your creative
                  portfolio.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  Diverse Categories
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  From visual art to writing, music to game design - express
                  yourself your way.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-card-foreground">
                  Skill Development
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Learn new techniques, get mentorship, and grow as a creative
                  professional.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </DotBackground>

      {/* CTA Section with Combined Background */}
      <CombinedBackground variant="intersect" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Unleash Your Creativity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators who are already building the future of
              digital art and storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href="/hackathons" className="flex items-center">
                  Start Creating Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:bg-accent"
                asChild
              >
                <Link href="/wall-of-fame">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </CombinedBackground>
    </div>
  );
}
