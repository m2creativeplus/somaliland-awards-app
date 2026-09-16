"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Submission } from "@/lib/types"
import { Eye, Clock, CheckCircle, AlertCircle, Star, FileText } from "lucide-react"
import Image from "next/image"

interface JurySubmissionCardProps {
  submission: Submission
  onReview: (submissionId: string) => void
  currentScore?: number
  isScored?: boolean
}

export function JurySubmissionCard({ submission, onReview, currentScore, isScored = false }: JurySubmissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusIcon = () => {
    if (isScored) return <CheckCircle className="w-4 h-4 text-green-600" />
    if (submission.status === "under_review") return <Clock className="w-4 h-4 text-yellow-600" />
    return <AlertCircle className="w-4 h-4 text-gray-400" />
  }

  const getStatusColor = () => {
    if (isScored) return "bg-green-100 text-green-800"
    if (submission.status === "under_review") return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusText = () => {
    if (isScored) return "Scored"
    if (submission.status === "under_review") return "In Review"
    return "Pending"
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-1">{submission.metadata.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              by {submission.entrant.name}
              {submission.entrant.organization && ` • ${submission.entrant.organization}`}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {isScored && currentScore && (
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{currentScore}/100</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            )}
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <Badge className={getStatusColor()}>{getStatusText()}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preview Image */}
        {submission.files?.preview && (
          <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden">
            <Image
              src={submission.files.preview || "/placeholder.svg"}
              alt={submission.metadata.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}

        {/* Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(submission.category)}>{submission.category}</Badge>
            <Badge variant="outline" className="text-xs">
              {new Date(submission.submitted_at).toLocaleDateString()}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{submission.metadata.description}</p>

          {isExpanded && (
            <div className="space-y-3 pt-2 border-t">
              {submission.metadata.inspiration && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Inspiration</h4>
                  <p className="text-sm text-muted-foreground">{submission.metadata.inspiration}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium mb-2">Tools Used</h4>
                <div className="flex flex-wrap gap-1">
                  {submission.metadata.tools_used.map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="ml-2">{submission.entrant.country}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Entry Fee:</span>
                  <span className="ml-2">{submission.entry_fee_paid ? "Paid" : "Pending"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar for Scored Submissions */}
        {isScored && currentScore && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Score</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{currentScore}/100</span>
              </div>
            </div>
            <Progress value={currentScore} className="h-2" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground"
          >
            <FileText className="w-4 h-4 mr-1" />
            {isExpanded ? "Show Less" : "Show More"}
          </Button>

          <Button onClick={() => onReview(submission.id)} size="sm">
            <Eye className="w-4 h-4 mr-2" />
            {isScored ? "Review Score" : "Start Review"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
