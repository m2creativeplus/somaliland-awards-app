/**
 * lib/store.ts
 * Client-side data persistence using localStorage.
 * Acts as a lightweight "backend" — all data survives page refreshes.
 */

import type { Asset, Submission } from "./types"
import { mockAssets, mockSubmissions } from "./mock-data"

const KEYS = {
  assets: "sl-awards-assets",
  submissions: "sl-awards-submissions",
  votes: "sl-awards-votes",
  userVotes: "sl-awards-user-votes",
} as const

function isClient() {
  return typeof window !== "undefined"
}

function safeRead<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (!isClient()) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or private mode — fail silently
  }
}

// ─── Assets ────────────────────────────────────────────────────────────────

export function getAssets(): Asset[] {
  const stored = safeRead<Asset[]>(KEYS.assets, [])
  if (stored.length === 0) {
    // Seed with mock data on first load
    safeWrite(KEYS.assets, mockAssets)
    return mockAssets
  }
  return stored
}

export function addAsset(asset: Asset): void {
  const assets = getAssets()
  safeWrite(KEYS.assets, [...assets, asset])
}

// ─── Submissions ────────────────────────────────────────────────────────────

export function getSubmissions(): Submission[] {
  const stored = safeRead<Submission[]>(KEYS.submissions, [])
  if (stored.length === 0) {
    // Seed with mock submissions on first load
    safeWrite(KEYS.submissions, mockSubmissions)
    return mockSubmissions
  }
  return stored
}

export function addSubmission(submission: Partial<Submission>): Submission {
  const submissions = getSubmissions()
  const newSubmission: Submission = {
    id: `sub-${Date.now()}`,
    asset_id: `asset-${Date.now()}`,
    entrant: submission.entrant || { name: "Unknown", email: "", country: "Somaliland" },
    category: submission.category || "logo-design",
    entry_fee_paid: submission.entry_fee_paid ?? false,
    files: submission.files || { original: "", preview: "/placeholder.svg?height=300&width=400" },
    metadata: submission.metadata || { title: "Untitled", description: "", inspiration: "", tools_used: [] },
    scorecard: submission.scorecard || {
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
    status: "pending",
    submitted_at: submission.submitted_at || new Date().toISOString(),
  }

  safeWrite(KEYS.submissions, [...submissions, newSubmission])
  return newSubmission
}

export function getApprovedSubmissions(): Submission[] {
  return getSubmissions().filter((s) => s.status === "approved" || s.status === "pending")
}

// ─── Votes ─────────────────────────────────────────────────────────────────

export function getVotes(): Record<string, number> {
  return safeRead<Record<string, number>>(KEYS.votes, {
    "sub-1": 127,
    "sub-2": 89,
  })
}

export function getUserVotes(): string[] {
  return safeRead<string[]>(KEYS.userVotes, [])
}

export function castVote(submissionId: string): boolean {
  const userVotes = getUserVotes()
  if (userVotes.includes(submissionId)) return false // already voted

  const votes = getVotes()
  votes[submissionId] = (votes[submissionId] || 0) + 1
  safeWrite(KEYS.votes, votes)

  safeWrite(KEYS.userVotes, [...userVotes, submissionId])
  return true
}

export function hasVoted(submissionId: string): boolean {
  return getUserVotes().includes(submissionId)
}

// ─── Admin auth ─────────────────────────────────────────────────────────────

export function isAdminAuthed(): boolean {
  return safeRead<boolean>("sl-admin-auth", false)
}

export function setAdminAuth(value: boolean): void {
  safeWrite("sl-admin-auth", value)
}
