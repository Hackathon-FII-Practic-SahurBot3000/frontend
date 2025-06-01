"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GridBackground } from "@/components/ui/grid-background";
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { hackathons } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function BusinessSubmissionPage() {
  const searchParams = useSearchParams();
  const hackathonId =
    searchParams.get("hackathon") || searchParams.get("hackathonId");
  const teamMode = searchParams.get("teamMode") === "true";
  const teamName = searchParams.get("teamName");

  // Find the specific hackathon if ID is provided
  const hackathon = hackathonId
    ? hackathons.find((h) => h.id === hackathonId)
    : null;
  const backUrl = hackathon ? `/hackathons/${hackathon.id}` : "/hackathons";

  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    stage: "",
    teamSize: "",
    fundingGoal: "",
    description: "",
    problemStatement: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    competitiveAdvantage: "",
    tags: [] as string[],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const acceptedFormats = ["PDF", "PPTX", "PPT", "DOC", "DOCX", "TXT"];
  const maxFileSize = 25; // MB
  const maxFiles = 5;

  const businessStages = [
    "Idea Stage",
    "MVP Development",
    "Early Traction",
    "Growth Stage",
    "Scaling",
    "Established",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "SaaS",
    "Mobile Apps",
    "AI/ML",
    "Blockchain",
    "Sustainability",
    "Other",
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop()?.toUpperCase();
      const isValidFormat = acceptedFormats.includes(fileExtension || "");
      const isValidSize = file.size <= maxFileSize * 1024 * 1024;
      return isValidFormat && isValidSize;
    });

    if (files.length + validFiles.length <= maxFiles) {
      setFiles([...files, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setUploadProgress(0);

    // In real app, redirect to success page or hackathon detail
    if (hackathon) {
      const message =
        teamMode && teamName
          ? `Business plan submitted successfully for team "${decodeURIComponent(
              teamName
            )}" to "${hackathon.title}"!`
          : `Business plan submitted successfully to "${hackathon.title}"!`;
      alert(message);
      // Redirect to hackathon detail page
      window.location.href = `/hackathons/${hackathon.id}`;
    } else {
      alert("Business plan submitted successfully!");
    }
  };

  const isFormValid =
    formData.businessName &&
    formData.description &&
    formData.problemStatement &&
    formData.solution;

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["ppt", "pptx"].includes(extension || "")) {
      return <FileText className="h-6 w-6 text-orange-500" />;
    }
    return <FileText className="h-6 w-6 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4">
                <Link href={backUrl} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {hackathon
                    ? `Back to ${hackathon.title}`
                    : "Back to Hackathons"}
                </Link>
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Submit Your Business Plan
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {hackathon
                      ? `Present your business idea for "${hackathon.title}"`
                      : "Present your business idea to the community"}
                  </p>
                  {teamMode && teamName && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Users className="h-3 w-3" />
                        Team: {decodeURIComponent(teamName)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Hackathon Context */}
              {hackathon && (
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {hackathon.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {hackathon.theme}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{hackathon.category}</Badge>
                          <Badge variant="outline">
                            {hackathon.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          $
                          {hackathon.prize
                            ? formatNumber(hackathon.prize)
                            : "0"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Prize Pool
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Business Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                        placeholder="Enter your business name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <select
                        id="industry"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stage">Business Stage</Label>
                      <select
                        id="stage"
                        value={formData.stage}
                        onChange={(e) =>
                          setFormData({ ...formData, stage: e.target.value })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select stage</option>
                        {businessStages.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        value={formData.teamSize}
                        onChange={(e) =>
                          setFormData({ ...formData, teamSize: e.target.value })
                        }
                        placeholder="e.g., 1-5 people"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fundingGoal">Funding Goal</Label>
                      <Input
                        id="fundingGoal"
                        value={formData.fundingGoal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fundingGoal: e.target.value,
                          })
                        }
                        placeholder="e.g., $50,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder={
                        hackathon
                          ? `Provide a brief overview of your business and how it addresses "${hackathon.theme}"`
                          : "Provide a brief overview of your business"
                      }
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="problemStatement">
                      Problem Statement *
                    </Label>
                    <Textarea
                      id="problemStatement"
                      value={formData.problemStatement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          problemStatement: e.target.value,
                        })
                      }
                      placeholder={
                        hackathon
                          ? `What problem does your business solve? How does it relate to "${hackathon.theme}"?`
                          : "What problem does your business solve?"
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solution">Solution *</Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) =>
                        setFormData({ ...formData, solution: e.target.value })
                      }
                      placeholder="How does your business solve this problem?"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetMarket">Target Market</Label>
                    <Textarea
                      id="targetMarket"
                      value={formData.targetMarket}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetMarket: e.target.value,
                        })
                      }
                      placeholder="Who are your target customers?"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessModel">Business Model</Label>
                    <Textarea
                      id="businessModel"
                      value={formData.businessModel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessModel: e.target.value,
                        })
                      }
                      placeholder="How will your business make money?"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitiveAdvantage">
                      Competitive Advantage
                    </Label>
                    <Textarea
                      id="competitiveAdvantage"
                      value={formData.competitiveAdvantage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          competitiveAdvantage: e.target.value,
                        })
                      }
                      placeholder="What makes your business unique?"
                      rows={2}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add tags to describe your business"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Supporting Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        Upload business documents
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Business plan, pitch deck, financial projections, etc.
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.pptx,.ppt,.doc,.docx,.txt"
                        onChange={handleFileInput}
                        className="hidden"
                        id="business-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("business-upload")?.click()
                        }
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Supported formats: {acceptedFormats.join(", ")}</p>
                    <p>Maximum file size: {maxFileSize}MB per file</p>
                    <p>Maximum files: {maxFiles}</p>
                  </div>

                  {/* File Preview */}
                  {files.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Uploaded Documents</h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                          >
                            {getFileIcon(file.name)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submission Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Submission Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Business idea must be original and your own
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {hackathon
                        ? `Ensure your submission addresses the "${hackathon.theme}" theme`
                        : "Ensure your submission follows the hackathon theme"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Include clear problem statement and solution
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Pitch deck or business plan highly recommended
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Focus on innovation and market potential
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Upload Progress */}
              {isSubmitting && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Submitting business proposal...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link href={backUrl}>Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? "Submitting..." : "Submit Business Idea"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
