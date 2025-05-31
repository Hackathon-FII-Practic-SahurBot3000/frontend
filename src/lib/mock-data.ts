// Mock data for the hackathon platform

export type Hackathon = {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  category: string;
  image?: string;
  sponsor?: string;
  entryFee?: string;
  entriesCount: number;
  status: "upcoming" | "active" | "past";
  areas: string[];
  prize?: number;
  participants?: number;
  deadline?: string;
  submissions?: number;
  tags?: string[];
  difficulty?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  links: {
    instagram?: string;
    behance?: string;
    dribbble?: string;
    website?: string;
  };
  entries: Submission[];
};

export type Submission = {
  id: string;
  title: string;
  summary: string;
  content: string;
  media?: string;
  category: string;
  userId: string;
  userName: string;
  userAvatar: string;
  hackathonId: string;
  createdAt: string;
  originalityScore?: number;
  votes: number;
  isWinner?: boolean;
  prize?: string;
};

export type Message = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  hackathonId?: string;
  area?: string;
};

export type SponsorChallenge = {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  logo: string;
  prize: string;
  hackathonId: string;
};

// Mock hackathons
export const hackathons: Hackathon[] = [
  {
    id: "1",
    title: "Dream Worlds",
    description: "Create immersive dream-like environments that tell a story",
    theme: "Dreams & Subconscious",
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    category: "Visual Art",
    image: "/placeholder.svg?height=400&width=600",
    sponsor: "Dreamscape Studios",
    entryFee: "Free",
    entriesCount: 0,
    status: "upcoming",
    areas: ["Visual Art", "3D Modeling", "Animation"],
    prize: 5000,
    participants: 0,
    deadline: "2025-06-22",
    submissions: 0,
    tags: ["3D", "Dreams", "Storytelling"],
    difficulty: "Intermediate",
  },
  {
    id: "2",
    title: "Future Cities",
    description: "Design sustainable urban environments for the year 2100",
    theme: "Sustainable Futures",
    startDate: "2025-06-01",
    endDate: "2025-06-10",
    category: "Architecture",
    entriesCount: 24,
    status: "active",
    areas: ["Architecture", "Urban Planning", "Concept Art"],
    prize: 7500,
    participants: 24,
    deadline: "2025-06-10",
    submissions: 24,
    tags: ["Architecture", "Sustainability", "Future"],
    difficulty: "Advanced",
  },
  {
    id: "3",
    title: "AI Storytellers",
    description: "Collaborate with AI to create compelling short stories",
    theme: "Human-AI Collaboration",
    startDate: "2025-05-10",
    endDate: "2025-05-20",
    category: "Writing",
    image: "/placeholder.svg?height=400&width=600",
    entriesCount: 56,
    status: "active",
    areas: ["Creative Writing", "AI Tools", "Narrative Design"],
    prize: 3000,
    participants: 56,
    deadline: "2025-05-20",
    submissions: 56,
    tags: ["AI", "Writing", "Collaboration"],
    difficulty: "Beginner",
  },
  {
    id: "4",
    title: "Sonic Landscapes",
    description:
      "Create audio experiences that transport listeners to new worlds",
    theme: "Sound & Space",
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    category: "Audio",
    entriesCount: 42,
    status: "past",
    areas: ["Sound Design", "Music Composition", "Audio Engineering"],
    prize: 4000,
    participants: 42,
    deadline: "2025-04-15",
    submissions: 42,
    tags: ["Audio", "Sound Design", "Immersive"],
    difficulty: "Intermediate",
  },
  {
    id: "5",
    title: "Micro Games",
    description:
      "Design playable game experiences that can be completed in under 5 minutes",
    theme: "Bite-sized Fun",
    startDate: "2025-03-10",
    endDate: "2025-03-25",
    category: "Game Design",
    image: "/placeholder.svg?height=400&width=600",
    entriesCount: 38,
    status: "past",
    areas: ["Game Design", "Programming", "Pixel Art"],
    prize: 6000,
    participants: 38,
    deadline: "2025-03-25",
    submissions: 38,
    tags: ["Games", "Programming", "Quick Play"],
    difficulty: "Advanced",
  },
  {
    id: "6",
    title: "Wearable Futures",
    description:
      "Design fashion concepts that integrate technology in innovative ways",
    theme: "Fashion Tech",
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    category: "Fashion",
    image: "/placeholder.svg?height=400&width=600",
    entriesCount: 0,
    status: "upcoming",
    areas: ["Fashion Design", "Wearable Tech", "Sustainable Materials"],
    prize: 8000,
    participants: 0,
    deadline: "2025-07-15",
    submissions: 0,
    tags: ["Fashion", "Technology", "Wearable"],
    difficulty: "Intermediate",
  },
];

// Mock current user
export const currentUser: User = {
  id: "user1",
  name: "Alex Rivera",
  username: "creativealex",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Digital artist and creative coder exploring the intersection of technology and art.",
  links: {
    instagram: "instagram.com/creativealex",
    behance: "behance.net/creativealex",
    dribbble: "dribbble.com/creativealex",
    website: "alexrivera.design",
  },
  entries: [
    {
      id: "sub1",
      title: "Neon Dreams",
      summary: "A cyberpunk cityscape with interactive elements",
      content:
        "This piece explores the relationship between humans and technology in a near-future urban environment.",
      media: "/placeholder.svg?height=400&width=600",
      category: "Visual Art",
      userId: "user1",
      userName: "Alex Rivera",
      userAvatar: "/placeholder.svg?height=100&width=100",
      hackathonId: "4",
      createdAt: "2025-04-10",
      originalityScore: 92,
      votes: 28,
      isWinner: true,
      prize: "Best Visual Design",
    },
    {
      id: "sub2",
      title: "Whispers of the Forest",
      summary:
        "An ambient audio experience capturing the sounds of an ancient forest",
      content:
        "Recorded and composed using natural sounds and subtle synthesizers to create an immersive forest atmosphere.",
      media: "/placeholder.svg?height=400&width=600",
      category: "Audio",
      userId: "user1",
      userName: "Alex Rivera",
      userAvatar: "/placeholder.svg?height=100&width=100",
      hackathonId: "4",
      createdAt: "2025-04-12",
      originalityScore: 85,
      votes: 19,
    },
  ],
};

// Mock submissions for voting
export const submissionsForVoting: Submission[] = [
  {
    id: "v1",
    title: "Floating Islands",
    summary: "A series of floating islands with unique ecosystems",
    content:
      "Each island represents a different biome, connected by magical bridges and inhabited by fantastical creatures.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Visual Art",
    userId: "user2",
    userName: "Maya Johnson",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "3",
    createdAt: "2025-05-15",
    originalityScore: 88,
    votes: 0,
  },
  {
    id: "v2",
    title: "The Last Library",
    summary: "A story about the last physical library in a digital world",
    content:
      "In 2150, when all books have been digitized, one librarian maintains the last physical collection of books as an act of rebellion.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Writing",
    userId: "user3",
    userName: "Elijah Chen",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "3",
    createdAt: "2025-05-16",
    originalityScore: 95,
    votes: 0,
  },
  {
    id: "v3",
    title: "Quantum Melodies",
    summary: "Music generated from quantum computer data",
    content:
      "This piece translates quantum computing operations into musical notes, creating an otherworldly soundscape.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Audio",
    userId: "user4",
    userName: "Sophia Patel",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "3",
    createdAt: "2025-05-17",
    originalityScore: 91,
    votes: 0,
  },
  {
    id: "v4",
    title: "Memory Palace",
    summary: "A virtual space where memories are stored as physical objects",
    content:
      "Users can place their memories in this virtual architecture, revisiting them by walking through the space.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Interactive",
    userId: "user5",
    userName: "Marcus Lee",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "3",
    createdAt: "2025-05-18",
    originalityScore: 89,
    votes: 0,
  },
  {
    id: "v5",
    title: "Bioluminescent Garden",
    summary: "A digital garden that responds to sound input",
    content:
      "Plants in this digital garden grow, change color, and emit light based on audio input from the user.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Interactive",
    userId: "user6",
    userName: "Olivia Rodriguez",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "3",
    createdAt: "2025-05-19",
    originalityScore: 87,
    votes: 0,
  },
];

// Mock winners
export const winners: Submission[] = [
  {
    id: "win1",
    title: "Neon Dreams",
    summary: "A cyberpunk cityscape with interactive elements",
    content:
      "This piece explores the relationship between humans and technology in a near-future urban environment.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Visual Art",
    userId: "user1",
    userName: "Alex Rivera",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "4",
    createdAt: "2025-04-10",
    originalityScore: 92,
    votes: 28,
    isWinner: true,
    prize: "Best Visual Design",
  },
  {
    id: "win2",
    title: "Echoes of Tomorrow",
    summary: "A short story about time travel and parallel universes",
    content:
      "A physicist discovers a way to send messages to her past self, creating multiple branching timelines.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Writing",
    userId: "user7",
    userName: "James Wilson",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "4",
    createdAt: "2025-04-08",
    originalityScore: 94,
    votes: 32,
    isWinner: true,
    prize: "Grand Prize",
  },
  {
    id: "win3",
    title: "Pixel Playground",
    summary: "A retro-style game where players build their own levels",
    content:
      "This game combines classic platformer mechanics with a powerful level editor that allows players to share creations.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Game Design",
    userId: "user8",
    userName: "Zoe Taylor",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "5",
    createdAt: "2025-03-20",
    originalityScore: 90,
    votes: 25,
    isWinner: true,
    prize: "Most Innovative",
  },
  {
    id: "win4",
    title: "Urban Oasis",
    summary: "A concept for vertical gardens integrated into city architecture",
    content:
      "This design reimagines urban spaces with self-sustaining vertical gardens that improve air quality and provide food.",
    media: "/placeholder.svg?height=400&width=600",
    category: "Architecture",
    userId: "user9",
    userName: "David Kim",
    userAvatar: "/placeholder.svg?height=100&width=100",
    hackathonId: "5",
    createdAt: "2025-03-22",
    originalityScore: 89,
    votes: 23,
    isWinner: true,
    prize: "Community Choice",
  },
];

// Mock messages for chat
export const messages: Message[] = [
  {
    id: "msg1",
    userId: "user7",
    userName: "James Wilson",
    userAvatar: "/placeholder.svg?height=100&width=100",
    content:
      "Has anyone experimented with the new AI image generation tools for this hackathon?",
    timestamp: "2025-05-15T14:30:00Z",
    hackathonId: "3",
  },
  {
    id: "msg2",
    userId: "user8",
    userName: "Zoe Taylor",
    userAvatar: "/placeholder.svg?height=100&width=100",
    content:
      "Yes! I've been using them to create concept art before finalizing my designs. They're great for quick iterations.",
    timestamp: "2025-05-15T14:35:00Z",
    hackathonId: "3",
  },
  {
    id: "msg3",
    userId: "user1",
    userName: "Alex Rivera",
    userAvatar: "/placeholder.svg?height=100&width=100",
    content:
      "I'm looking for a collaborator on a mixed media project. Anyone interested in combining visual art with sound design?",
    timestamp: "2025-05-15T15:10:00Z",
    hackathonId: "3",
  },
  {
    id: "msg4",
    userId: "user4",
    userName: "Sophia Patel",
    userAvatar: "/placeholder.svg?height=100&width=100",
    content:
      "I'd be interested! I specialize in ambient soundscapes. Send me a DM with more details.",
    timestamp: "2025-05-15T15:15:00Z",
    hackathonId: "3",
  },
  {
    id: "msg5",
    userId: "user9",
    userName: "David Kim",
    userAvatar: "/placeholder.svg?height=100&width=100",
    content:
      "Just a reminder that submissions are due in 5 days! Make sure to leave time for final polishing.",
    timestamp: "2025-05-15T16:00:00Z",
    hackathonId: "3",
  },
];

// Mock sponsor challenges
export const sponsorChallenges: SponsorChallenge[] = [
  {
    id: "sc1",
    title: "Sustainable Innovation Challenge",
    description:
      "Create a concept that addresses climate change through creative technology",
    sponsor: "EcoTech Solutions",
    logo: "/placeholder.svg?height=100&width=100",
    prize: "$1,000 + Mentorship",
    hackathonId: "2",
  },
  {
    id: "sc2",
    title: "Immersive Storytelling",
    description:
      "Develop a narrative experience that pushes the boundaries of immersive storytelling",
    sponsor: "Narrative Labs",
    logo: "/placeholder.svg?height=100&width=100",
    prize: "VR Equipment + Studio Tour",
    hackathonId: "3",
  },
  {
    id: "sc3",
    title: "Accessible Design Challenge",
    description:
      "Design an experience that is inclusive and accessible to users with diverse abilities",
    sponsor: "Universal Design Co",
    logo: "/placeholder.svg?height=100&width=100",
    prize: "$1,500 + Portfolio Feature",
    hackathonId: "1",
  },
];
