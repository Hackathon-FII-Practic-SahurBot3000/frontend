"use client";

import { useState, useRef } from "react";
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
  Music,
  Play,
  Pause,
  Volume2,
  X,
  CheckCircle,
  AlertCircle,
  Headphones,
  FileAudio,
  Users,
} from "lucide-react";
import Link from "next/link";
import { hackathons } from "@/lib/mock-data";

export default function AudioSubmissionPage() {
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
    artist: "",
    genre: "",
    duration: "",
    bpm: "",
    key: "",
    description: "",
    inspiration: "",
    tags: [] as string[],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const acceptedFormats = ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A"];
  const maxFileSize = 100; // MB
  const maxFiles = 3;
  const maxDuration = 600; // 10 minutes in seconds

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

      // Auto-populate title from first file if empty
      if (validFiles.length > 0 && !formData.title) {
        const fileName = validFiles[0].name.split(".")[0];
        setFormData((prev) => ({ ...prev, title: fileName }));
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (index === 0) {
      // Reset audio player if removing the first file
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);

      // Auto-populate duration in form
      const minutes = Math.floor(audioRef.current.duration / 60);
      const seconds = Math.floor(audioRef.current.duration % 60);
      setFormData((prev) => ({
        ...prev,
        duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      }));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setUploadProgress(0);

    // In real app, redirect to success page or hackathon detail
    if (hackathon) {
      const message =
        teamMode && teamName
          ? `Audio submitted successfully for team "${decodeURIComponent(
              teamName
            )}" to "${hackathon.title}"!`
          : `Audio submitted successfully to "${hackathon.title}"!`;
      alert(message);
      // Redirect to hackathon detail page
      window.location.href = `/hackathons/${hackathon.id}`;
    } else {
      alert("Audio submitted successfully!");
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
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Submit Your Audio
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {hackathon
                      ? `Share your sound for "${hackathon.title}"`
                      : "Share your audio creation with the community"}
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
              {/* Audio Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Audio Files
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        Upload your audio files
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".mp3,.wav,.flac,.aac,.ogg,.m4a"
                        onChange={handleFileInput}
                        className="hidden"
                        id="audio-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("audio-upload")?.click()
                        }
                      >
                        Choose Audio Files
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Supported formats: {acceptedFormats.join(", ")}</p>
                    <p>Maximum file size: {maxFileSize}MB per file</p>
                    <p>Maximum files: {maxFiles}</p>
                    <p>Maximum duration: {maxDuration / 60} minutes</p>
                  </div>

                  {/* Audio Preview */}
                  {files.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Uploaded Files</h4>

                      {/* Main audio player for first file */}
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={togglePlayback}
                            disabled={!files[0]}
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {files[0]?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </p>
                          </div>
                          <Volume2 className="h-4 w-4 text-muted-foreground" />
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-background rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width:
                                duration > 0
                                  ? `${(currentTime / duration) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>

                        {files[0] && (
                          <audio
                            ref={audioRef}
                            src={URL.createObjectURL(files[0])}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={() => setIsPlaying(false)}
                          />
                        )}
                      </div>

                      {/* File list */}
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                          >
                            <FileAudio className="h-6 w-6 text-primary" />
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

              {/* Track Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Track Details
                  </CardTitle>
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
                        placeholder="Enter track title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist/Producer</Label>
                      <Input
                        id="artist"
                        value={formData.artist}
                        onChange={(e) =>
                          setFormData({ ...formData, artist: e.target.value })
                        }
                        placeholder="Your artist name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Input
                        id="genre"
                        value={formData.genre}
                        onChange={(e) =>
                          setFormData({ ...formData, genre: e.target.value })
                        }
                        placeholder="e.g., Electronic, Rock, Jazz"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bpm">BPM</Label>
                      <Input
                        id="bpm"
                        value={formData.bpm}
                        onChange={(e) =>
                          setFormData({ ...formData, bpm: e.target.value })
                        }
                        placeholder="120"
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key">Key</Label>
                      <Input
                        id="key"
                        value={formData.key}
                        onChange={(e) =>
                          setFormData({ ...formData, key: e.target.value })
                        }
                        placeholder="e.g., C Major, A Minor"
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
                          ? `Describe your track and how it relates to "${hackathon.theme}"`
                          : "Describe your track, the creative process, and any interesting details"
                      }
                      rows={4}
                      required
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
                      placeholder="What inspired this track?"
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
                        placeholder="Add tags to describe your music"
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
                      All audio must be original and created by you
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {hackathon
                        ? `Ensure your submission follows the "${hackathon.theme}" theme`
                        : "Ensure your submission follows the hackathon theme"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      High-quality audio files are preferred (WAV/FLAC
                      recommended)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Maximum duration: {maxDuration / 60} minutes per track
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
                        <span>Uploading audio...</span>
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
                  {isSubmitting ? "Submitting..." : "Submit Audio"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
