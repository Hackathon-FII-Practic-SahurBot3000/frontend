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
  Image,
  FileImage,
  X,
  CheckCircle,
  AlertCircle,
  Palette,
  Users,
} from "lucide-react";
import Link from "next/link";
import { hackathons } from "@/lib/mock-data";

export default function ArtSubmissionPage() {
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
    title: "",
    description: "",
    medium: "",
    dimensions: "",
    inspiration: "",
    tags: [] as string[],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const acceptedFormats = ["PNG", "JPG", "JPEG", "GIF", "SVG", "PSD", "AI"];
  const maxFileSize = 50; // MB
  const maxFiles = 5;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

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
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setUploadProgress(0);

    // In real app, redirect to success page or hackathon detail
    if (hackathon) {
      const message =
        teamMode && teamName
          ? `Artwork submitted successfully for team "${decodeURIComponent(
              teamName
            )}" to "${hackathon.title}"!`
          : `Artwork submitted successfully to "${hackathon.title}"!`;
      alert(message);
      // Redirect to hackathon detail page
      window.location.href = `/hackathons/${hackathon.id}`;
    } else {
      alert("Artwork submitted successfully!");
    }
  };

  const isFormValid =
    formData.title && formData.description && files.length > 0;

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
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Submit Your Artwork
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {hackathon
                      ? `Share your creative vision for "${hackathon.title}"`
                      : "Share your creative vision with the community"}
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
                          ${hackathon.prize?.toLocaleString()}
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
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Artwork
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        Drag and drop your artwork here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse files
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".png,.jpg,.jpeg,.gif,.svg,.psd,.ai"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
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
                      <h4 className="font-medium">Uploaded Files</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                          >
                            <FileImage className="h-8 w-8 text-primary" />
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

              {/* Artwork Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Artwork Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Enter artwork title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medium">Medium</Label>
                      <Input
                        id="medium"
                        value={formData.medium}
                        onChange={(e) =>
                          setFormData({ ...formData, medium: e.target.value })
                        }
                        placeholder="e.g., Digital painting, Photography"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
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
                          ? `Describe your artwork and how it relates to "${hackathon.theme}"`
                          : "Describe your artwork, concept, and creative process"
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: e.target.value,
                          })
                        }
                        placeholder="e.g., 1920x1080, 24x36 inches"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inspiration">Inspiration</Label>
                      <Input
                        id="inspiration"
                        value={formData.inspiration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inspiration: e.target.value,
                          })
                        }
                        placeholder="What inspired this piece?"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add tags to describe your artwork"
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
                      All artwork must be original and created by you
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {hackathon
                        ? `Ensure your submission follows the "${hackathon.theme}" theme`
                        : "Ensure your submission follows the hackathon theme"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      High-resolution files are preferred for better showcase
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Include process shots or sketches if available
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Content must be appropriate for all audiences
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
                        <span>Uploading artwork...</span>
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
                  {isSubmitting ? "Submitting..." : "Submit Artwork"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
