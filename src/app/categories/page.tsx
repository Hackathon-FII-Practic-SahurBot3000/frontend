"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/ui/grid-background";
import { DotBackground } from "@/components/ui/dot-background";
import {
  Palette,
  PenTool,
  Music,
  Briefcase,
  ArrowRight,
  Users,
  Trophy,
  Calendar,
} from "lucide-react";
import { hackathons } from "@/lib/mock-data";
import Link from "next/link";

const categories = [
  {
    id: "visual-art",
    name: "Visual Art",
    description:
      "Digital art, illustrations, concept art, and visual storytelling",
    icon: Palette,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    gradient: "from-purple-500 to-pink-500",
    hackathons: hackathons.filter((h) => h.category === "Visual Art"),
    areas: [
      "Digital Art",
      "Illustration",
      "Concept Art",
      "3D Modeling",
      "Animation",
    ],
  },
  {
    id: "writing",
    name: "Writing",
    description: "Creative writing, storytelling, poetry, and narrative design",
    icon: PenTool,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    gradient: "from-blue-500 to-cyan-500",
    hackathons: hackathons.filter((h) => h.category === "Writing"),
    areas: [
      "Creative Writing",
      "Poetry",
      "Screenwriting",
      "Narrative Design",
      "Journalism",
    ],
  },
  {
    id: "audio",
    name: "Audio & Music",
    description:
      "Music composition, sound design, podcasts, and audio experiences",
    icon: Music,
    color: "bg-green-100 text-green-800 border-green-200",
    gradient: "from-green-500 to-emerald-500",
    hackathons: hackathons.filter((h) => h.category === "Audio"),
    areas: [
      "Music Composition",
      "Sound Design",
      "Podcasting",
      "Audio Engineering",
      "Voice Acting",
    ],
  },
  {
    id: "business",
    name: "Business & Strategy",
    description:
      "Business plans, marketing strategies, and entrepreneurial ventures",
    icon: Briefcase,
    color: "bg-amber-100 text-amber-800 border-amber-200",
    gradient: "from-amber-500 to-orange-500",
    hackathons: hackathons.filter((h) => h.category === "Business"),
    areas: [
      "Business Strategy",
      "Marketing",
      "Product Design",
      "Entrepreneurship",
      "Finance",
    ],
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="charcoal" className="mb-4">
              Explore Categories
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal-900 mb-4">
              Find Your Creative Domain
            </h1>
            <p className="text-lg text-charcoal-600 max-w-3xl mx-auto">
              Discover hackathons across diverse creative fields. From visual
              art to technology, find the perfect challenge that matches your
              passion and skills.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-charcoal-900">
                {categories.length}
              </div>
              <div className="text-sm text-charcoal-600">Categories</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-charcoal-900">
                {categories.reduce(
                  (sum, cat) => sum + cat.hackathons.length,
                  0
                )}
              </div>
              <div className="text-sm text-charcoal-600">Active Hackathons</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-charcoal-900">
                {categories.reduce((sum, cat) => sum + cat.areas.length, 0)}
              </div>
              <div className="text-sm text-charcoal-600">Specializations</div>
            </Card>
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm text-center p-4">
              <div className="text-2xl font-bold text-charcoal-900">500+</div>
              <div className="text-sm text-charcoal-600">Active Creators</div>
            </Card>
          </div>
        </div>
      </GridBackground>

      {/* Categories Grid */}
      <DotBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-charcoal-900">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-charcoal-600">
                    {category.description}
                  </p>

                  {/* Areas */}
                  <div className="flex flex-wrap gap-1">
                    {category.areas.slice(0, 3).map((area) => (
                      <Badge
                        key={area}
                        variant="outline"
                        className={`text-xs ${category.color}`}
                      >
                        {area}
                      </Badge>
                    ))}
                    {category.areas.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-charcoal-200 text-charcoal-600"
                      >
                        +{category.areas.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-charcoal-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{category.hackathons.length} hackathons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {category.hackathons.reduce(
                          (sum, h) => sum + h.entriesCount,
                          0
                        )}{" "}
                        entries
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory group-hover:bg-gradient-to-r group-hover:from-charcoal-900 group-hover:to-charcoal-700"
                    asChild
                  >
                    <Link
                      href={`/hackathons?category=${category.name}`}
                      className="flex items-center justify-center"
                    >
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Trophy className="h-12 w-12 text-charcoal-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-charcoal-900 mb-4">
                  Ready to Start Creating?
                </h3>
                <p className="text-charcoal-600 mb-6">
                  Join thousands of creators who are already building amazing
                  projects across all categories.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory">
                    <Link href="/hackathons">Browse All Hackathons</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                  >
                    <Link href="/my-hackathons">My Active Hackathons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DotBackground>
    </div>
  );
}
