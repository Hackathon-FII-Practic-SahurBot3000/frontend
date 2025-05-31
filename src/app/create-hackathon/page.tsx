"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GridBackground } from "@/components/ui/grid-background";
import { DotBackground } from "@/components/ui/dot-background";
import {
  CalendarIcon,
  Users,
  Trophy,
  Tag,
  FileText,
  Plus,
  X,
  Info,
  Palette,
  PenTool,
  Music,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { value: "Visual Art", label: "Visual Art", icon: Palette },
  { value: "Writing", label: "Writing", icon: PenTool },
  { value: "Audio", label: "Audio & Music", icon: Music },
  { value: "Business", label: "Business & Strategy", icon: Briefcase },
];

const difficultyLevels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Perfect for newcomers",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Some experience required",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "For experienced creators",
  },
  {
    value: "expert",
    label: "Expert",
    description: "Professional level challenge",
  },
];

const prizeTypes = [
  { value: "monetary", label: "Monetary Prize" },
  { value: "sponsored", label: "Sponsored Prizes" },
  { value: "recognition", label: "Recognition Only" },
];

export default function CreateHackathonPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    difficulty: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    entryFee: "",
    prizeType: "",
    prizeAmount: "",
    maxParticipants: "",
    allowTeams: false,
    maxTeamSize: "",
    tags: [] as string[],
    requirements: "",
    judgingCriteria: "",
    submissionGuidelines: "",
    contactEmail: "",
  });

  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: string,
    value: string | boolean | Date | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Hackathon name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.difficulty)
      newErrors.difficulty = "Difficulty level is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.prizeType) newErrors.prizeType = "Prize type is required";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required";

    // Date validation
    if (formData.startDate && formData.endDate) {
      if (formData.endDate <= formData.startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Email validation
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      alert("Hackathon created successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="charcoal" className="mb-4">
              Create New Hackathon
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal-900 mb-4">
              Launch Your Creative Challenge
            </h1>
            <p className="text-lg text-charcoal-600 max-w-3xl mx-auto">
              Create an engaging hackathon that brings together creative minds.
              Set the stage for innovation and watch amazing projects come to
              life.
            </p>
          </div>
        </div>
      </GridBackground>

      {/* Form */}
      <DotBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-charcoal-200 bg-ivory/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-charcoal-900 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Hackathon Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Hackathon Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter hackathon name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.category ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              <div className="flex items-center gap-2">
                                <category.icon className="h-4 w-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your hackathon, its goals, and what participants can expect..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className={`min-h-[120px] ${
                        errors.description ? "border-red-500" : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) =>
                        handleInputChange("difficulty", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.difficulty ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div>
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {level.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.difficulty && (
                      <p className="text-sm text-red-500">
                        {errors.difficulty}
                      </p>
                    )}
                  </div>
                </div>

                <Separator className="bg-charcoal-100" />

                {/* Timeline */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Timeline
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Card className="border-charcoal-200">
                        <CardContent className="p-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !formData.startDate &&
                                    "text-muted-foreground",
                                  errors.startDate && "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.startDate ? (
                                  format(formData.startDate, "PPP")
                                ) : (
                                  <span>Pick start date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={formData.startDate}
                                onSelect={(date) =>
                                  handleInputChange("startDate", date)
                                }
                                disabled={(date) =>
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <div className="mt-2">
                            <Label htmlFor="startTime" className="text-sm">
                              Start Time
                            </Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={formData.startTime}
                              onChange={(e) =>
                                handleInputChange("startTime", e.target.value)
                              }
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      {errors.startDate && (
                        <p className="text-sm text-red-500">
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <Label>End Date *</Label>
                      <Card className="border-charcoal-200">
                        <CardContent className="p-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !formData.endDate && "text-muted-foreground",
                                  errors.endDate && "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.endDate ? (
                                  format(formData.endDate, "PPP")
                                ) : (
                                  <span>Pick end date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={formData.endDate}
                                onSelect={(date) =>
                                  handleInputChange("endDate", date)
                                }
                                disabled={(date: Date): boolean =>
                                  date <
                                    new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  (formData.startDate &&
                                    date <= formData.startDate)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <div className="mt-2">
                            <Label htmlFor="endTime" className="text-sm">
                              End Time
                            </Label>
                            <Input
                              id="endTime"
                              type="time"
                              value={formData.endTime}
                              onChange={(e) =>
                                handleInputChange("endTime", e.target.value)
                              }
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                      {errors.endDate && (
                        <p className="text-sm text-red-500">{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="bg-charcoal-100" />

                {/* Participation & Prizes */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participation & Prizes
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="entryFee">Entry Fee (€)</Label>
                      <Input
                        id="entryFee"
                        type="number"
                        placeholder="0"
                        value={formData.entryFee}
                        onChange={(e) =>
                          handleInputChange("entryFee", e.target.value)
                        }
                      />
                      <p className="text-sm text-charcoal-600">
                        Leave empty or 0 for free hackathon
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Participants</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="100"
                        value={formData.maxParticipants}
                        onChange={(e) =>
                          handleInputChange("maxParticipants", e.target.value)
                        }
                      />
                      <p className="text-sm text-charcoal-600">
                        Leave empty for unlimited
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowTeams"
                        checked={formData.allowTeams}
                        onCheckedChange={(checked) =>
                          handleInputChange("allowTeams", checked as boolean)
                        }
                      />
                      <Label htmlFor="allowTeams">
                        Allow team participation
                      </Label>
                    </div>

                    {formData.allowTeams && (
                      <div className="space-y-2 ml-6">
                        <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                        <Input
                          id="maxTeamSize"
                          type="number"
                          placeholder="4"
                          value={formData.maxTeamSize}
                          onChange={(e) =>
                            handleInputChange("maxTeamSize", e.target.value)
                          }
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prizeType">Prize Type *</Label>
                      <Select
                        value={formData.prizeType}
                        onValueChange={(value) =>
                          handleInputChange("prizeType", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.prizeType ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select prize type" />
                        </SelectTrigger>
                        <SelectContent>
                          {prizeTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.prizeType && (
                        <p className="text-sm text-red-500">
                          {errors.prizeType}
                        </p>
                      )}
                    </div>

                    {formData.prizeType === "monetary" && (
                      <div className="space-y-2">
                        <Label htmlFor="prizeAmount">Prize Amount (€)</Label>
                        <Input
                          id="prizeAmount"
                          type="number"
                          placeholder="1000"
                          value={formData.prizeAmount}
                          onChange={(e) =>
                            handleInputChange("prizeAmount", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-charcoal-100" />

                {/* Tags */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Tags
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-charcoal-100" />

                {/* Guidelines & Criteria */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Guidelines & Criteria
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="List any specific requirements, tools, or skills needed..."
                        value={formData.requirements}
                        onChange={(e) =>
                          handleInputChange("requirements", e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="judgingCriteria">Judging Criteria</Label>
                      <Textarea
                        id="judgingCriteria"
                        placeholder="Describe how submissions will be evaluated..."
                        value={formData.judgingCriteria}
                        onChange={(e) =>
                          handleInputChange("judgingCriteria", e.target.value)
                        }
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submissionGuidelines">
                        Submission Guidelines
                      </Label>
                      <Textarea
                        id="submissionGuidelines"
                        placeholder="Explain what participants need to submit and how..."
                        value={formData.submissionGuidelines}
                        onChange={(e) =>
                          handleInputChange(
                            "submissionGuidelines",
                            e.target.value
                          )
                        }
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-charcoal-100" />

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-charcoal-900">
                    Contact Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      className={errors.contactEmail ? "border-red-500" : ""}
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-red-500">
                        {errors.contactEmail}
                      </p>
                    )}
                    <p className="text-sm text-charcoal-600">
                      This email will be used for participant inquiries and
                      hackathon management
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory"
                  >
                    Create Hackathon
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50"
                  >
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DotBackground>
    </div>
  );
}
