"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import type { Scorecard, Submission } from "@/lib/types"
import { Star, Save, Send } from "lucide-react"

interface ScoringCardProps {
  submission: Submission
  onScoreSubmit: (submissionId: string, scorecard: Scorecard) => void
  existingScore?: Scorecard
  readonly?: boolean
}

const scoringCriteria = [
  {
    key: "creativity" as const,
    name: "Creativity & Innovation",
    description: "Originality, uniqueness, and creative approach",
    weight: 25,
    maxScore: 10,
  },
  {
    key: "functionality" as const,
    name: "Functionality & Usability",
    description: "Practical application and user experience",
    weight: 20,
    maxScore: 10,
  },
  {
    key: "execution" as const,
    name: "Technical Execution",
    description: "Quality of design, craftsmanship, and attention to detail",
    weight: 20,
    maxScore: 10,
  },
  {
    key: "culture" as const,
    name: "Cultural Relevance",
    description: "Connection to Somaliland heritage and values",
    weight: 15,
    maxScore: 10,
  },
  {
    key: "impact" as const,
    name: "Visual Impact",
    description: "Memorability and emotional resonance",
    weight: 10,
    maxScore: 10,
  },
  {
    key: "sustainability" as const,
    name: "Sustainability & Longevity",
    description: "Timeless design and long-term viability",
    weight: 10,
    maxScore: 10,
  },
]

export function ScoringCard({ submission, onScoreSubmit, existingScore, readonly = false }: ScoringCardProps) {
  const [scores, setScores] = useState<Scorecard>(
    existingScore || {
      criteria: {
        creativity: { score: 0, weight: 25 },
        functionality: { score: 0, weight: 20 },
        execution: { score: 0, weight: 20 },
        culture: { score: 0, weight: 15 },
        impact: { score: 0, weight: 10 },
        sustainability: { score: 0, weight: 10 },
      },
      total_score: 0,
    },
  )

  const [notes, setNotes] = useState<Record<string, string>>(
    existingScore
      ? Object.fromEntries(Object.entries(existingScore.criteria).map(([key, value]) => [key, value.notes || ""]))
      : {},
  )

  const [generalNotes, setGeneralNotes] = useState(existingScore?.jury_notes || "")
  const [isDraft, setIsDraft] = useState(false)

  const updateScore = (criterion: keyof Scorecard["criteria"], score: number, criterionNotes?: string) => {
    const newScores = {
      ...scores,
      criteria: {
        ...scores.criteria,
        [criterion]: {
          ...scores.criteria[criterion],
          score,
          notes: criterionNotes || notes[criterion],
        },
      },
    }

    // Calculate weighted total score
    const totalScore = Object.entries(newScores.criteria).reduce((sum, [key, value]) => {
      return sum + (value.score * value.weight) / 10
    }, 0)

    newScores.total_score = Math.round(totalScore * 10) / 10

    setScores(newScores)
  }

  const updateNotes = (criterion: string, noteText: string) => {
    setNotes((prev) => ({ ...prev, [criterion]: noteText }))
    if (scores.criteria[criterion as keyof Scorecard["criteria"]]) {
      updateScore(
        criterion as keyof Scorecard["criteria"],
        scores.criteria[criterion as keyof Scorecard["criteria"]].score,
        noteText,
      )
    }
  }

  const handleSubmit = (asDraft = false) => {
    const finalScorecard: Scorecard = {
      ...scores,
      jury_notes: generalNotes,
      scored_by: "Current Jury Member", // In real app, this would be the logged-in jury member
      scored_at: new Date().toISOString(),
    }

    setIsDraft(asDraft)
    onScoreSubmit(submission.id, finalScorecard)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    if (score >= 4) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Exceptional"
    if (score >= 8) return "Excellent"
    if (score >= 7) return "Very Good"
    if (score >= 6) return "Good"
    if (score >= 5) return "Average"
    if (score >= 4) return "Below Average"
    if (score >= 3) return "Poor"
    return "Very Poor"
  }

  const isComplete = Object.values(scores.criteria).every((criterion) => criterion.score > 0)

  return (
    <div className="space-y-6">
      {/* Submission Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{submission.metadata.title}</CardTitle>
              <p className="text-muted-foreground mt-1">
                by {submission.entrant.name} • {submission.category}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{scores.total_score}/100</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{submission.metadata.description}</p>
          <div className="flex flex-wrap gap-2">
            {submission.metadata.tools_used.map((tool, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scoring Criteria */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Scoring Criteria</h3>
        {scoringCriteria.map((criterion) => {
          const currentScore = scores.criteria[criterion.key].score
          return (
            <Card key={criterion.key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{criterion.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getScoreColor(currentScore)}`}>{currentScore}/10</span>
                      <Badge variant="outline" className="text-xs">
                        {criterion.weight}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{getScoreLabel(currentScore)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!readonly && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Score</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < currentScore / 2 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Slider
                      value={[currentScore]}
                      onValueChange={([value]) => updateScore(criterion.key, value)}
                      max={10}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 - Poor</span>
                      <span>5 - Average</span>
                      <span>10 - Exceptional</span>
                    </div>
                  </div>
                )}

                {readonly && (
                  <div className="space-y-2">
                    <Progress value={(currentScore / 10) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Score: {currentScore}/10</span>
                      <span>Weight: {criterion.weight}%</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes & Feedback</label>
                  <Textarea
                    value={notes[criterion.key] || ""}
                    onChange={(e) => updateNotes(criterion.key, e.target.value)}
                    placeholder={`Provide specific feedback on ${criterion.name.toLowerCase()}...`}
                    rows={2}
                    disabled={readonly}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* General Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="Overall assessment, strengths, areas for improvement..."
            rows={4}
            disabled={readonly}
          />
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{scores.total_score}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Object.values(scores.criteria).reduce((sum, c) => sum + c.score, 0) / 6}/10
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round((scores.total_score / 100) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Percentile</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!readonly && (
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => handleSubmit(true)} disabled={!isComplete}>
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit(false)} disabled={!isComplete}>
            <Send className="w-4 h-4 mr-2" />
            Submit Final Score
          </Button>
        </div>
      )}

      {readonly && existingScore?.scored_by && (
        <div className="text-sm text-muted-foreground text-center">
          Scored by {existingScore.scored_by} on{" "}
          {existingScore.scored_at ? new Date(existingScore.scored_at).toLocaleDateString() : "Unknown date"}
        </div>
      )}
    </div>
  )
}
