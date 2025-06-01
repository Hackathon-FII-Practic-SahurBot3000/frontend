"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { useGetUserMe } from "@/generated-api/user-controller/user-controller";
import { useGetLinksByUserId } from "@/generated-api/link-controller/link-controller";
import { LinkResponse, UserDto } from "@/generated-api/schemas";
import {
  Dribbble,
  Edit,
  ExternalLink,
  Globe,
  Instagram,
  Settings,
  Loader2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

// Helper function to get icon for platform
const getPlatformIcon = (platformName: string) => {
  const platform = platformName.toLowerCase();
  switch (platform) {
    case "instagram":
      return Instagram;
    case "dribbble":
      return Dribbble;
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "twitter":
      return Twitter;
    case "website":
    case "portfolio":
      return Globe;
    case "behance":
      return ExternalLink;
    default:
      return ExternalLink;
  }
};

// Helper function to format URL
const formatUrl = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export default function ProfilePage() {
  const getUserMeQuery = useGetUserMe();
  const currentUserApi = getUserMeQuery.data?.data as UserDto & { id?: number };

  // Get user links using the API - only fetch if we have a user ID
  const {
    data: userLinksResponse,
    isLoading: linksLoading,
    error: linksError,
  } = useGetLinksByUserId(currentUserApi?.id || 0, {
    query: {
      enabled: !!currentUserApi?.id, // Only fetch when we have a user ID
    },
  });

  const userLinks = userLinksResponse?.data || [];

  if (!currentUserApi) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-charcoal-600" />
          <p className="text-charcoal-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Profile Header */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={currentUserApi.profilePictureUrl}
                  alt={currentUserApi.firstName}
                />
                <AvatarFallback className="bg-charcoal-100 text-charcoal-700 text-4xl">
                  {currentUserApi.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <h1 className="text-3xl font-bold text-charcoal-900">
                  {currentUserApi.firstName} {currentUserApi.lastName}
                </h1>
                <p className="text-charcoal-600">{currentUserApi.email}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-charcoal-900">
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-charcoal-700 mb-1">
                        Email
                      </h3>
                      <p className="text-charcoal-900">
                        {currentUserApi.email}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-charcoal-700 mb-1">
                        Role
                      </h3>
                      <p className="text-charcoal-900">
                        {currentUserApi.role || "User"}
                      </p>
                    </div>

                    <Separator className="my-4 bg-charcoal-100" />

                    {/* Social Links */}
                    <div>
                      <h3 className="text-sm font-medium text-charcoal-700 mb-3">
                        Social Links
                      </h3>
                      <div className="flex gap-4">
                        {linksLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-charcoal-400" />
                            <span className="text-sm text-charcoal-500">
                              Loading links...
                            </span>
                          </div>
                        ) : linksError ? (
                          <div className="text-sm text-red-500">
                            Failed to load social links
                          </div>
                        ) : userLinks.length > 0 ? (
                          userLinks.map((link: LinkResponse) => {
                            const IconComponent = getPlatformIcon(
                              link.platformName || ""
                            );
                            return (
                              <Link
                                key={link.id}
                                href={formatUrl(link.url || "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-charcoal-500 hover:text-charcoal-900 transition-colors"
                                title={link.platformName}
                              >
                                <IconComponent className="h-5 w-5" />
                              </Link>
                            );
                          })
                        ) : (
                          <div className="text-sm text-charcoal-500">
                            No social links added yet
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4 bg-charcoal-100" />

                    {/* User ID for debugging */}
                    <div>
                      <h3 className="text-sm font-medium text-charcoal-700 mb-1">
                        User ID
                      </h3>
                      <p className="text-charcoal-900 font-mono text-sm">
                        {currentUserApi.id || "Not available"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-charcoal-900">
              API Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">
                  User Profile
                </span>
                <span className="text-xs text-green-600">✓ Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">
                  Social Links
                </span>
                <span className="text-xs text-blue-600">
                  {linksLoading
                    ? "⏳ Loading..."
                    : linksError
                    ? "❌ Error"
                    : `✓ ${userLinks.length} links found`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
