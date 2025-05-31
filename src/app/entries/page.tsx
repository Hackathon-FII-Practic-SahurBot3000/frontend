"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GridBackground } from "@/components/ui/grid-background"
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { submissionsForVoting, winners } from "@/lib/mock-data"
import { SubmissionCard } from "@/components/cards/submission-card"
import { Separator } from "@/components/ui/separator"

export default function EntriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Combine all submissions for the entries page
  const allSubmissions = [...submissionsForVoting, ...winners]

  // Get unique categories for filters
  const categories = [...new Set(allSubmissions.map((s) => s.category))]

  // Filter submissions based on search term and filters
  const filteredSubmissions = allSubmissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || submission.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Group submissions by category for the "By Category" tab
  const submissionsByCategory = categories.reduce(
    (acc, category) => {
      const submissions = filteredSubmissions.filter((s) => s.category === category)
      if (submissions.length > 0) {
        acc[category] = submissions
      }
      return acc
    },
    {} as Record<string, typeof filteredSubmissions>,
  )

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <GridBackground className="py-12" opacity={0.05}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="charcoal" className="mb-4">
              Browse Entries
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Explore Creative Submissions</h1>
            <p className="text-lg text-charcoal-600 mb-6">
              Discover amazing work from our community of creators across various hackathons and challenges.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 h-4 w-4" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-charcoal-200 bg-ivory focus:border-charcoal-400"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] border-charcoal-200 bg-ivory">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-none ${viewMode === "grid" ? "bg-charcoal-100" : "bg-transparent"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-none ${viewMode === "list" ? "bg-charcoal-100" : "bg-transparent"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" className="border-charcoal-200 bg-ivory">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Entries Listing */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-charcoal-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory">
              All Entries
            </TabsTrigger>
            <TabsTrigger value="winners" className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory">
              Winners
            </TabsTrigger>
            <TabsTrigger
              value="by-category"
              className="data-[state=active]:bg-charcoal-900 data-[state=active]:text-ivory"
            >
              By Category
            </TabsTrigger>
          </TabsList>

          {/* All Entries Tab */}
          <TabsContent value="all" className="mt-8">
            {filteredSubmissions.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredSubmissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    {...submission}
                    className={viewMode === "list" ? "flex flex-row h-auto" : ""}
                    listView={viewMode === "list"}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No entries found</h3>
                <p className="text-charcoal-600">Try adjusting your filters or search term</p>
              </div>
            )}
          </TabsContent>

          {/* Winners Tab */}
          <TabsContent value="winners" className="mt-8">
            {filteredSubmissions.filter((s) => s.isWinner).length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredSubmissions
                  .filter((s) => s.isWinner)
                  .map((submission) => (
                    <SubmissionCard
                      key={submission.id}
                      {...submission}
                      className={viewMode === "list" ? "flex flex-row h-auto" : ""}
                      listView={viewMode === "list"}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No winning entries found</h3>
                <p className="text-charcoal-600">Try adjusting your filters or search term</p>
              </div>
            )}
          </TabsContent>

          {/* By Category Tab */}
          <TabsContent value="by-category" className="mt-8">
            {Object.keys(submissionsByCategory).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(submissionsByCategory).map(([category, submissions]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-charcoal-900">{category}</h2>
                      <Badge variant="outline" className="border-charcoal-200 text-charcoal-700">
                        {submissions.length} {submissions.length === 1 ? "entry" : "entries"}
                      </Badge>
                    </div>
                    <div
                      className={
                        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
                      }
                    >
                      {submissions.map((submission) => (
                        <SubmissionCard
                          key={submission.id}
                          {...submission}
                          className={viewMode === "list" ? "flex flex-row h-auto" : ""}
                          listView={viewMode === "list"}
                        />
                      ))}
                    </div>
                    <Separator className="mt-12 bg-charcoal-100" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-charcoal-900 mb-2">No categories found</h3>
                <p className="text-charcoal-600">Try adjusting your filters or search term</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
