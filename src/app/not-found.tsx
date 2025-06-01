"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <GridBackground className="absolute inset-0" opacity={0.03} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <div className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
              404
            </div>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to a new location.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/hackathons">
                <Compass className="w-4 h-4 mr-2" />
                Browse Hackathons
              </Link>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-8 ">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/hackathons"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Hackathons
              </Link>
              <Link
                href="/categories"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/profile"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Profile
              </Link>
              <Link
                href="/my-hackathons"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                My Hackathons
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
