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
  status: "pending" | "active" | "voting" | "ended";
  areas: string[];
  prize?: number;
  participants?: number;
  deadline?: string;
  submissions?: number;
  tags?: string[];
  difficulty?: string;
  winner?: {
    id: string;
    title: string;
    author: string;
    avatar: string;
    prize: number;
  };
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

// Mock hackathons - Multiple for each status to test all flows
export const hackathons: Hackathon[] = [
  // PENDING STATUS HACKATHONS (4)
  {
    id: "1",
    title: "Digital Dreams",
    description:
      "Create stunning digital artwork that explores the realm of dreams and subconscious imagination",
    theme: "Dreams & Subconscious",
    startDate: "2024-02-15",
    endDate: "2024-02-29",
    category: "Visual Art",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop&crop=center",
    sponsor: "Adobe Creative Cloud",
    entryFee: "Free",
    entriesCount: 0,
    status: "pending",
    areas: ["Digital Art", "Illustration", "Concept Art"],
    prize: 5000,
    participants: 234,
    deadline: "2024-02-29",
    submissions: 0,
    tags: ["Digital Art", "Dreams", "Creativity"],
    difficulty: "Intermediate",
  },
  {
    id: "9",
    title: "Future Fiction",
    description:
      "Write compelling science fiction stories that imagine humanity's next chapter",
    theme: "Tomorrow's World",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    category: "Writing",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center",
    sponsor: "Sci-Fi Writers Guild",
    entryFee: "€1",
    entriesCount: 0,
    status: "pending",
    areas: ["Science Fiction", "Creative Writing", "Futurism"],
    prize: 3500,
    participants: 156,
    deadline: "2024-03-15",
    submissions: 0,
    tags: ["Sci-Fi", "Future", "Writing"],
    difficulty: "Beginner",
  },
  {
    id: "10",
    title: "Startup Pitch Challenge",
    description:
      "Present your innovative startup idea with a complete business plan and pitch deck",
    theme: "Innovation & Entrepreneurship",
    startDate: "2024-03-05",
    endDate: "2024-03-20",
    category: "Business & Strategy",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=center",
    sponsor: "Y Combinator",
    entryFee: "€3",
    entriesCount: 0,
    status: "pending",
    areas: ["Startups", "Business Strategy", "Pitching"],
    prize: 8000,
    participants: 89,
    deadline: "2024-03-20",
    submissions: 0,
    tags: ["Startup", "Business", "Innovation"],
    difficulty: "Advanced",
  },
  {
    id: "11",
    title: "Synthwave Sounds",
    description:
      "Create retro-futuristic electronic music inspired by 80s aesthetics",
    theme: "Retro Future",
    startDate: "2024-03-10",
    endDate: "2024-03-25",
    category: "Audio & Music",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center",
    sponsor: "Synthwave Records",
    entryFee: "Free",
    entriesCount: 0,
    status: "pending",
    areas: ["Electronic Music", "Synthwave", "Retro"],
    prize: 4500,
    participants: 178,
    deadline: "2024-03-25",
    submissions: 0,
    tags: ["Synthwave", "Electronic", "80s"],
    difficulty: "Intermediate",
  },

  // ACTIVE STATUS HACKATHONS (4)
  {
    id: "2",
    title: "Neon Futures",
    description:
      "Design cyberpunk-inspired visual art that imagines our technological future",
    theme: "Cyberpunk Aesthetics",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    category: "Visual Art",
    image:
      "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=600&h=400&fit=crop&crop=center",
    sponsor: "Wacom",
    entryFee: "€1",
    entriesCount: 156,
    status: "active",
    areas: ["Digital Art", "3D Art", "Character Design"],
    prize: 7500,
    participants: 312,
    deadline: "2024-03-15",
    submissions: 156,
    tags: ["Cyberpunk", "Future", "Neon"],
    difficulty: "Advanced",
  },
  {
    id: "5",
    title: "Ambient Soundscapes",
    description:
      "Compose atmospheric audio pieces that transport listeners to otherworldly environments",
    theme: "Immersive Audio",
    startDate: "2024-02-20",
    endDate: "2024-03-05",
    category: "Audio & Music",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center",
    sponsor: "Native Instruments",
    entryFee: "Free",
    entriesCount: 78,
    status: "active",
    areas: ["Sound Design", "Ambient Music", "Audio Production"],
    prize: 4000,
    participants: 167,
    deadline: "2024-03-05",
    submissions: 78,
    tags: ["Ambient", "Soundscape", "Audio"],
    difficulty: "Intermediate",
  },
  {
    id: "8",
    title: "FinTech Revolution",
    description:
      "Design innovative financial technology solutions that democratize access to financial services",
    theme: "Financial Inclusion",
    startDate: "2024-03-01",
    endDate: "2024-03-16",
    category: "Business & Strategy",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    sponsor: "Stripe",
    entryFee: "€3",
    entriesCount: 56,
    status: "active",
    areas: ["FinTech", "Financial Services", "Innovation"],
    prize: 12000,
    participants: 134,
    deadline: "2024-03-16",
    submissions: 56,
    tags: ["FinTech", "Finance", "Innovation"],
    difficulty: "Advanced",
  },
  {
    id: "12",
    title: "Micro Poetry Challenge",
    description: "Express powerful emotions and stories in 50 words or less",
    theme: "Brevity & Impact",
    startDate: "2024-02-25",
    endDate: "2024-03-10",
    category: "Writing",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=center",
    sponsor: "Poetry Foundation",
    entryFee: "Free",
    entriesCount: 89,
    status: "active",
    areas: ["Poetry", "Creative Writing", "Micro Fiction"],
    prize: 2500,
    participants: 203,
    deadline: "2024-03-10",
    submissions: 89,
    tags: ["Poetry", "Micro", "Writing"],
    difficulty: "Beginner",
  },

  // VOTING STATUS HACKATHONS (4)
  {
    id: "3",
    title: "Flash Fiction Challenge",
    description:
      "Write compelling short stories in 500 words or less that capture powerful emotions",
    theme: "Micro Narratives",
    startDate: "2024-02-10",
    endDate: "2024-02-25",
    category: "Writing",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
    sponsor: "Penguin Random House",
    entryFee: "Free",
    entriesCount: 67,
    status: "voting",
    areas: ["Creative Writing", "Short Stories", "Fiction"],
    prize: 3000,
    participants: 189,
    deadline: "2024-02-25",
    submissions: 67,
    tags: ["Flash Fiction", "Stories", "Writing"],
    difficulty: "Beginner",
  },
  {
    id: "6",
    title: "Electronic Beats",
    description:
      "Create innovative electronic music tracks that push the boundaries of digital sound",
    theme: "Digital Music Innovation",
    startDate: "2024-03-10",
    endDate: "2024-03-25",
    category: "Audio & Music",
    image:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop&crop=center",
    sponsor: "Ableton",
    entryFee: "€1",
    entriesCount: 92,
    status: "voting",
    areas: ["Electronic Music", "Beat Making", "Music Production"],
    prize: 6000,
    participants: 203,
    deadline: "2024-03-25",
    submissions: 92,
    tags: ["Electronic", "Beats", "Music"],
    difficulty: "Advanced",
  },
  {
    id: "13",
    title: "Abstract Expressions",
    description:
      "Create abstract digital art that conveys emotion through color, form, and movement",
    theme: "Emotional Abstraction",
    startDate: "2024-02-15",
    endDate: "2024-03-01",
    category: "Visual Art",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
    sponsor: "Digital Arts Museum",
    entryFee: "€2",
    entriesCount: 134,
    status: "voting",
    areas: ["Abstract Art", "Digital Painting", "Color Theory"],
    prize: 5500,
    participants: 267,
    deadline: "2024-03-01",
    submissions: 134,
    tags: ["Abstract", "Emotion", "Digital"],
    difficulty: "Intermediate",
  },
  {
    id: "14",
    title: "Social Impact Ventures",
    description:
      "Develop business solutions that address pressing social and environmental challenges",
    theme: "Purpose-Driven Business",
    startDate: "2024-02-20",
    endDate: "2024-03-05",
    category: "Business & Strategy",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop&crop=center",
    sponsor: "Impact Investors Network",
    entryFee: "€5",
    entriesCount: 45,
    status: "voting",
    areas: ["Social Impact", "Sustainability", "Business Strategy"],
    prize: 9000,
    participants: 112,
    deadline: "2024-03-05",
    submissions: 45,
    tags: ["Social Impact", "Sustainability", "Purpose"],
    difficulty: "Advanced",
  },

  // ENDED STATUS HACKATHONS (4)
  {
    id: "4",
    title: "Sci-Fi Chronicles",
    description:
      "Create science fiction stories that explore humanity's relationship with technology",
    theme: "Technology & Humanity",
    startDate: "2024-03-05",
    endDate: "2024-03-20",
    category: "Writing",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
    sponsor: "Tor Books",
    entryFee: "€2",
    entriesCount: 43,
    status: "ended",
    areas: ["Science Fiction", "Creative Writing", "World Building"],
    prize: 4500,
    participants: 145,
    deadline: "2024-03-20",
    submissions: 43,
    tags: ["Sci-Fi", "Technology", "Future"],
    difficulty: "Intermediate",
    winner: {
      id: "win1",
      title: "The Last Human Connection",
      author: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      prize: 4500,
    },
  },
  {
    id: "7",
    title: "Green Tech Ventures",
    description:
      "Develop sustainable business solutions that address climate change and environmental challenges",
    theme: "Sustainable Innovation",
    startDate: "2024-02-12",
    endDate: "2024-02-27",
    category: "Business & Strategy",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&crop=center",
    sponsor: "Tesla",
    entryFee: "€5",
    entriesCount: 34,
    status: "ended",
    areas: ["Sustainability", "Green Tech", "Business Strategy"],
    prize: 10000,
    participants: 89,
    deadline: "2024-02-27",
    submissions: 34,
    tags: ["Green Tech", "Sustainability", "Climate"],
    difficulty: "Advanced",
    winner: {
      id: "win2",
      title: "EcoGrid: Smart Energy Distribution",
      author: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      prize: 10000,
    },
  },
  {
    id: "15",
    title: "Pixel Art Mastery",
    description:
      "Create stunning pixel art that showcases the beauty of limited resolution graphics",
    theme: "Retro Gaming Aesthetics",
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    category: "Visual Art",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&crop=center",
    sponsor: "Indie Game Studios",
    entryFee: "Free",
    entriesCount: 178,
    status: "ended",
    areas: ["Pixel Art", "Game Art", "Retro Design"],
    prize: 3500,
    participants: 298,
    deadline: "2024-01-30",
    submissions: 178,
    tags: ["Pixel Art", "Retro", "Gaming"],
    difficulty: "Intermediate",
    winner: {
      id: "win3",
      title: "Neon City Chronicles",
      author: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      prize: 3500,
    },
  },
  {
    id: "16",
    title: "Lo-Fi Hip Hop Beats",
    description:
      "Produce chill lo-fi hip hop tracks perfect for studying and relaxation",
    theme: "Chill Vibes",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    category: "Audio & Music",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center",
    sponsor: "ChillHop Music",
    entryFee: "€1",
    entriesCount: 156,
    status: "ended",
    areas: ["Lo-Fi", "Hip Hop", "Chill Music"],
    prize: 4200,
    participants: 234,
    deadline: "2024-02-05",
    submissions: 156,
    tags: ["Lo-Fi", "Hip Hop", "Chill"],
    difficulty: "Beginner",
    winner: {
      id: "win4",
      title: "Midnight Study Session",
      author: "Luna Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      prize: 4200,
    },
  },
];

// Mock current user
export const currentUser: User = {
  id: "user1",
  name: "Alex Rivera",
  username: "creativealex",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
      media:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center",
      category: "Visual Art",
      userId: "user1",
      userName: "Alex Rivera",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
      media:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center",
      category: "Audio",
      userId: "user1",
      userName: "Alex Rivera",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
    category: "Visual Art",
    userId: "user2",
    userName: "Maya Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=center",
    category: "Writing",
    userId: "user3",
    userName: "Elijah Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop&crop=center",
    category: "Audio",
    userId: "user4",
    userName: "Sophia Patel",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    category: "Interactive",
    userId: "user5",
    userName: "Marcus Lee",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center",
    category: "Interactive",
    userId: "user6",
    userName: "Olivia Rodriguez",
    userAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop&crop=center",
    category: "Visual Art",
    userId: "user1",
    userName: "Alex Rivera",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center",
    category: "Writing",
    userId: "user7",
    userName: "James Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&crop=center",
    category: "Game Design",
    userId: "user8",
    userName: "Zoe Taylor",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
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
    media:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&crop=center",
    category: "Architecture",
    userId: "user9",
    userName: "David Kim",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
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
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content:
      "Has anyone experimented with the new AI image generation tools for this hackathon?",
    timestamp: "2025-05-15T14:30:00Z",
    hackathonId: "3",
  },
  {
    id: "msg2",
    userId: "user8",
    userName: "Zoe Taylor",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    content:
      "Yes! I've been using them to create concept art before finalizing my designs. They're great for quick iterations.",
    timestamp: "2025-05-15T14:35:00Z",
    hackathonId: "3",
  },
  {
    id: "msg3",
    userId: "user1",
    userName: "Alex Rivera",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "I'm looking for a collaborator on a mixed media project. Anyone interested in combining visual art with sound design?",
    timestamp: "2025-05-15T15:10:00Z",
    hackathonId: "3",
  },
  {
    id: "msg4",
    userId: "user4",
    userName: "Sophia Patel",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content:
      "I'd be interested! I specialize in ambient soundscapes. Send me a DM with more details.",
    timestamp: "2025-05-15T15:15:00Z",
    hackathonId: "3",
  },
  {
    id: "msg5",
    userId: "user9",
    userName: "David Kim",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
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
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop&crop=center",
    prize: "$1,000 + Mentorship",
    hackathonId: "2",
  },
  {
    id: "sc2",
    title: "Immersive Storytelling",
    description:
      "Develop a narrative experience that pushes the boundaries of immersive storytelling",
    sponsor: "Narrative Labs",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
    prize: "VR Equipment + Studio Tour",
    hackathonId: "3",
  },
  {
    id: "sc3",
    title: "Accessible Design Challenge",
    description:
      "Design an experience that is inclusive and accessible to users with diverse abilities",
    sponsor: "Universal Design Co",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop&crop=center",
    prize: "$1,500 + Portfolio Feature",
    hackathonId: "1",
  },
];
