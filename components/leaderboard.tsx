"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Trophy, Medal, Users } from "lucide-react"
import Image from "next/image"
import type { Submission } from "@/lib/types"

interface LeaderboardEntry {
  submission: Submission
  votes: number
  rank: number
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  category?: string
  title?: string
}

export function Leaderboard({ entries, category, title = "Top Submissions" }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-600" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-500" />
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />
      default:
        return <Award className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getRankBadge = (rank: number) => {
    let badgeClass = "bg-gray-100 text-gray-800"

    if (rank === 1) badgeClass = "bg-yellow-100 text-yellow-800"
    else if (rank === 2) badgeClass = "bg-gray-100 text-gray-600"
    else if (rank === 3) badgeClass = "bg-orange-100 text-orange-800"

    return <Badge className={badgeClass}>#{rank}</Badge>
  }

  const maxVotes = Math.max(...entries.map((e) => e.votes), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          {title}
          {category && (
            <Badge variant="outline" className="ml-auto">
              {category.replace("-", " ")}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No submissions yet</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.submission.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Rank */}
              <div className="flex items-center gap-2 min-w-0">
                {getRankIcon(entry.rank)}
                {getRankBadge(entry.rank)}
              </div>

              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                {entry.submission.files?.preview ? (
                  <Image
                    src={entry.submission.files.preview || "/placeholder.svg"}
                    alt={entry.submission.metadata.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <span className="text-xs font-bold text-primary/50">
                      {entry.submission.metadata.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-1">{entry.submission.metadata.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">by {entry.submission.entrant.name}</p>

                {/* Vote Progress */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{entry.votes} votes</span>
                    </div>
                    <span className="text-muted-foreground">{Math.round((entry.votes / maxVotes) * 100)}%</span>
                  </div>
                  <Progress value={(entry.votes / maxVotes) * 100} className="h-1" />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
