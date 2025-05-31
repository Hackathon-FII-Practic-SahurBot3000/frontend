export interface HackathonType {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  votingRoute: string;
  submissionRoute: string;
  leaderboardRoute: string;
  galleryRoute: string;
  votingType: "swipe" | "list" | "audio" | "text";
  submissionFormats: string[];
  votingCriteria: string[];
  features: string[];
}

export const hackathonTypes: Record<string, HackathonType> = {
  art: {
    id: "art",
    name: "Visual Art",
    category: "Creative",
    description:
      "Digital art, illustrations, photography, and visual design challenges",
    icon: "Palette",
    votingRoute: "/voting",
    submissionRoute: "/submit/art",
    leaderboardRoute: "/leaderboard/art",
    galleryRoute: "/gallery/art",
    votingType: "swipe",
    submissionFormats: ["PNG", "JPG", "GIF", "SVG", "PSD"],
    votingCriteria: [
      "Creativity",
      "Technical Skill",
      "Originality",
      "Theme Adherence",
    ],
    features: [
      "Image Upload",
      "Swipe Voting",
      "Gallery View",
      "Zoom & Details",
    ],
  },
  writing: {
    id: "writing",
    name: "Writing",
    category: "Literary",
    description: "Stories, poetry, scripts, and creative writing challenges",
    icon: "PenTool",
    votingRoute: "/text-voting",
    submissionRoute: "/submit/writing",
    leaderboardRoute: "/leaderboard/writing",
    galleryRoute: "/gallery/writing",
    votingType: "text",
    submissionFormats: ["TXT", "DOC", "PDF", "MD"],
    votingCriteria: [
      "Storytelling",
      "Writing Quality",
      "Creativity",
      "Theme Adherence",
    ],
    features: ["Text Editor", "Reading Mode", "Word Count", "Export Options"],
  },
  audio: {
    id: "audio",
    name: "Audio & Music",
    category: "Audio",
    description:
      "Music composition, sound design, and audio production challenges",
    icon: "Music",
    votingRoute: "/audio-voting",
    submissionRoute: "/submit/audio",
    leaderboardRoute: "/leaderboard/audio",
    galleryRoute: "/gallery/audio",
    votingType: "audio",
    submissionFormats: ["MP3", "WAV", "FLAC", "OGG"],
    votingCriteria: [
      "Composition",
      "Production Quality",
      "Originality",
      "Theme Adherence",
    ],
    features: [
      "Audio Player",
      "Waveform Display",
      "Playlist Mode",
      "Download Options",
    ],
  },
  business: {
    id: "business",
    name: "Business & Strategy",
    category: "Business",
    description:
      "Business plans, marketing strategies, and entrepreneurial challenges",
    icon: "Briefcase",
    votingRoute: "/business-voting",
    submissionRoute: "/submit/business",
    leaderboardRoute: "/leaderboard/business",
    galleryRoute: "/gallery/business",
    votingType: "list",
    submissionFormats: ["PDF", "PPT", "DOC", "XLS"],
    votingCriteria: [
      "Feasibility",
      "Innovation",
      "Market Potential",
      "Presentation",
    ],
    features: [
      "Document Viewer",
      "Presentation Mode",
      "Comments",
      "Detailed Analysis",
    ],
  },
};

export const getHackathonType = (category: string): HackathonType | null => {
  const normalizedCategory = category.toLowerCase().replace(/[^a-z]/g, "");

  // Map various category names to our types
  const categoryMap: Record<string, string> = {
    visualart: "art",
    art: "art",
    design: "art",
    photography: "art",
    illustration: "art",
    writing: "writing",
    literature: "writing",
    poetry: "writing",
    storytelling: "writing",
    audio: "audio",
    music: "audio",
    sound: "audio",
    audiomusic: "audio",
    business: "business",
    strategy: "business",
    businessstrategy: "business",
    entrepreneurship: "business",
    marketing: "business",
  };

  const typeId = categoryMap[normalizedCategory];
  return typeId ? hackathonTypes[typeId] : null;
};

export const getVotingRoute = (category: string): string => {
  const hackathonType = getHackathonType(category);
  return hackathonType?.votingRoute || "/voting";
};

export const getSubmissionRoute = (category: string): string => {
  const hackathonType = getHackathonType(category);
  return hackathonType?.submissionRoute || "/submit";
};

export const getLeaderboardRoute = (category: string): string => {
  const hackathonType = getHackathonType(category);
  return hackathonType?.leaderboardRoute || "/leaderboard";
};

export const getGalleryRoute = (category: string): string => {
  const hackathonType = getHackathonType(category);
  return hackathonType?.galleryRoute || "/gallery";
};

// Page flow definitions
export interface PageFlow {
  from: string;
  to: string;
  label: string;
  description: string;
  icon: string;
}

export const hackathonPageFlows: PageFlow[] = [
  // From hackathon detail to voting
  {
    from: "/hackathons/[id]",
    to: "voting",
    label: "Vote on Submissions",
    description: "Review and vote on participant submissions",
    icon: "Vote",
  },
  // From hackathon detail to submission
  {
    from: "/hackathons/[id]",
    to: "submission",
    label: "Submit Entry",
    description: "Upload your creative work for this challenge",
    icon: "Upload",
  },
  // From hackathon detail to leaderboard
  {
    from: "/hackathons/[id]",
    to: "leaderboard",
    label: "View Leaderboard",
    description: "See current rankings and winners",
    icon: "Trophy",
  },
  // From hackathon detail to gallery
  {
    from: "/hackathons/[id]",
    to: "gallery",
    label: "Browse Gallery",
    description: "Explore all submissions in gallery view",
    icon: "Grid",
  },
  // From voting back to hackathon
  {
    from: "voting",
    to: "/hackathons/[id]",
    label: "Back to Challenge",
    description: "Return to hackathon details",
    icon: "ArrowLeft",
  },
  // From submission to hackathon
  {
    from: "submission",
    to: "/hackathons/[id]",
    label: "Back to Challenge",
    description: "Return to hackathon details",
    icon: "ArrowLeft",
  },
];

export const getPageFlows = (currentPage: string, hackathonId?: string) => {
  return hackathonPageFlows
    .filter((flow) => flow.from === currentPage)
    .map((flow) => ({
      ...flow,
      to:
        flow.to.includes("[id]") && hackathonId
          ? flow.to.replace("[id]", hackathonId)
          : flow.to,
    }));
};
