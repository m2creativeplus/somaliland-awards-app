"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Eye, Share2, Award, Users } from "lucide-react"
import Image from "next/image"
import type { Submission } from "@/lib/types"

interface VotingCardProps {
  submission: Submission
  onVote: (submissionId: string) => void
  hasVoted: boolean
  voteCount: number
  rank?: number
  showRanking?: boolean
}

export function VotingCard({ submission, onVote, hasVoted, voteCount, rank, showRanking = false }: VotingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (hasVoted || isVoting) return

    setIsVoting(true)
    try {
      await onVote(submission.id)
    } finally {
      setIsVoting(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "logo-design": "bg-blue-100 text-blue-800",
      "brand-identity": "bg-purple-100 text-purple-800",
      "poster-design": "bg-orange-100 text-orange-800",
      "digital-graphics": "bg-green-100 text-green-800",
      "government-assets": "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getRankBadge = () => {
    if (!showRanking || !rank) return null

    let badgeClass = "bg-gray-100 text-gray-800"
    let icon = null

    if (rank === 1) {
      badgeClass = "bg-yellow-100 text-yellow-800"
      icon = <Award className="w-3 h-3" />
    } else if (rank === 2) {
      badgeClass = "bg-gray-100 text-gray-600"
    } else if (rank === 3) {
      badgeClass = "bg-orange-100 text-orange-800"
    }

    return (
      <Badge className={`${badgeClass} flex items-center gap-1`}>
        {icon}#{rank}
      </Badge>
    )
  }

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-muted/30 overflow-hidden">
          {submission.files?.preview ? (
            <Image
              src={submission.files.preview || "/placeholder.svg"}
              alt={submission.metadata.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-4xl font-bold text-primary/30">{submission.metadata.title.charAt(0)}</div>
            </div>
          )}

          {/* Ranking Badge */}
          {getRankBadge() && <div className="absolute top-2 left-2">{getRankBadge()}</div>}

          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge className={getCategoryColor(submission.category)}>{submission.category.replace("-", " ")}</Badge>
          </div>

          {/* Vote Count Overlay */}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/70 text-white border-0">
              <Users className="w-3 h-3 mr-1" />
              {voteCount} votes
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">{submission.metadata.title}</h3>
            <p className="text-sm text-muted-foreground">
              by {submission.entrant.name}
              {submission.entrant.organization && ` • ${submission.entrant.organization}`}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">{submission.metadata.description}</p>
          </div>
        </CardHeader>

        <CardContent className="py-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {submission.metadata.tools_used.slice(0, 3).map((tool, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
            {submission.metadata.tools_used.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{submission.metadata.tools_used.length - 3}
              </Badge>
            )}
          </div>

          {/* Vote Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Community Support</span>
              <span className="font-medium">{voteCount} votes</span>
            </div>
            <Progress value={Math.min((voteCount / 100) * 100, 100)} className="h-2" />
          </div>
        </CardContent>

        <CardFooter className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{submission.metadata.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Large Image */}
                  <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden">
                    <Image
                      src={submission.files?.preview || "/placeholder.svg"}
                      alt={submission.metadata.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{submission.metadata.description}</p>
                      </div>

                      {submission.metadata.inspiration && (
                        <div>
                          <h4 className="font-semibold mb-2">Inspiration</h4>
                          <p className="text-sm text-muted-foreground">{submission.metadata.inspiration}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Designer</h4>
                        <p className="text-sm">{submission.entrant.name}</p>
                        {submission.entrant.organization && (
                          <p className="text-sm text-muted-foreground">{submission.entrant.organization}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{submission.entrant.country}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Tools Used</h4>
                        <div className="flex flex-wrap gap-1">
                          {submission.metadata.tools_used.map((tool, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Submission Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Category: {submission.category.replace("-", " ")}</p>
                          <p>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</p>
                          <p>Votes: {voteCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={handleVote}
            disabled={hasVoted || isVoting}
            variant={hasVoted ? "secondary" : "default"}
            size="sm"
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${hasVoted ? "fill-current" : ""}`} />
            {hasVoted ? "Voted" : isVoting ? "Voting..." : "Vote"}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
