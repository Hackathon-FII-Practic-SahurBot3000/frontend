"use client"

import { HackathonCard } from "@/components/cards/hackathon-card"
import { UserProfileCard } from "@/components/cards/user-profile-card"
import { SubmissionCard } from "@/components/cards/submission-card"
import { WinnerCard } from "@/components/cards/winner-card"
import { VotingCard } from "@/components/cards/voting-card"
import { SponsorChallengeCard } from "@/components/cards/sponsor-challenge-card"
import { hackathons, currentUser, winners, sponsorChallenges, submissionsForVoting } from "@/lib/mock-data"

export default function CardsPage() {
  const handleVote = (id: string, vote: boolean) => {
    console.log(`Voted ${vote ? "yes" : "no"} for submission ${id}`)
  }

  return (
    <div className="container mx-auto py-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Card Gallery</h1>
        <p className="text-muted-foreground">A showcase of all card components used throughout the platform</p>
      </div>

      {/* Hackathon Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Hackathon Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-muted-foreground">With Image</h3>
            <HackathonCard
              id={hackathons[0].id}
              title={hackathons[0].title}
              description={hackathons[0].description}
              startDate={hackathons[0].startDate}
              endDate={hackathons[0].endDate}
              category={hackathons[0].category}
              image={hackathons[0].image}
              entriesCount={hackathons[0].entriesCount}
              status={hackathons[0].status}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-muted-foreground">Without Image</h3>
            <HackathonCard
              id={hackathons[1].id}
              title={hackathons[1].title}
              description={hackathons[1].description}
              startDate={hackathons[1].startDate}
              endDate={hackathons[1].endDate}
              category={hackathons[1].category}
              entriesCount={hackathons[1].entriesCount}
              status={hackathons[1].status}
            />
          </div>
        </div>
      </section>

      {/* User Profile Card */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">User Profile Card</h2>
        <div className="max-w-md">
          <UserProfileCard
            id={currentUser.id}
            name={currentUser.name}
            username={currentUser.username}
            avatar={currentUser.avatar}
            bio={currentUser.bio}
            links={currentUser.links}
          />
        </div>
      </section>

      {/* Submission Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Submission Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3 text-muted-foreground">Regular Submission</h3>
            <SubmissionCard
              id={submissionsForVoting[0].id}
              title={submissionsForVoting[0].title}
              summary={submissionsForVoting[0].summary}
              media={submissionsForVoting[0].media}
              category={submissionsForVoting[0].category}
              userName={submissionsForVoting[0].userName}
              userAvatar={submissionsForVoting[0].userAvatar}
              originalityScore={submissionsForVoting[0].originalityScore}
              votes={submissionsForVoting[0].votes}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-muted-foreground">Winner Submission</h3>
            <SubmissionCard
              id={winners[0].id}
              title={winners[0].title}
              summary={winners[0].summary}
              media={winners[0].media}
              category={winners[0].category}
              userName={winners[0].userName}
              userAvatar={winners[0].userAvatar}
              originalityScore={winners[0].originalityScore}
              votes={winners[0].votes}
              isWinner={winners[0].isWinner}
              prize={winners[0].prize}
            />
          </div>
        </div>
      </section>

      {/* Winner Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Winner Cards (Wall of Fame Style)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.slice(0, 3).map((winner) => (
            <WinnerCard
              key={winner.id}
              id={winner.id}
              title={winner.title}
              summary={winner.summary}
              media={winner.media}
              category={winner.category}
              userName={winner.userName}
              userAvatar={winner.userAvatar}
              prize={winner.prize || "Winner"}
            />
          ))}
        </div>
      </section>

      {/* Voting Card */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Voting Card (Swipe UI Style)</h2>
        <div className="flex justify-center">
          <VotingCard
            id={submissionsForVoting[1].id}
            title={submissionsForVoting[1].title}
            summary={submissionsForVoting[1].summary}
            media={submissionsForVoting[1].media}
            category={submissionsForVoting[1].category}
            userName={submissionsForVoting[1].userName}
            userAvatar={submissionsForVoting[1].userAvatar}
            originalityScore={submissionsForVoting[1].originalityScore}
            onVote={handleVote}
          />
        </div>
      </section>

      {/* Sponsor Challenge Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Sponsor Challenge Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorChallenges.map((challenge) => (
            <SponsorChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              sponsor={challenge.sponsor}
              logo={challenge.logo}
              prize={challenge.prize}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
