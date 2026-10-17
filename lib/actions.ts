"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import type { Submission } from "./types"

const prisma = new PrismaClient()

// ─── Assets ────────────────────────────────────────────────────────────────

export async function getAssets() {
  return await prisma.asset.findMany()
}

// ─── Submissions ────────────────────────────────────────────────────────────

export async function getSubmissions() {
  return await prisma.submission.findMany()
}

export async function addSubmission(data: Partial<Submission>) {
  // We mock the asset_id since this depends on the specific logic
  const asset_id = data.asset_id || `asset-${Date.now()}`
  
  // Ensure the asset exists before attaching the submission
  let asset = await prisma.asset.findUnique({ where: { id: asset_id } })
  if (!asset) {
    asset = await prisma.asset.create({
      data: {
        id: asset_id,
        name_en: "Mock Asset",
        name_so: "Mock Asset So",
        type: "logo",
        owner: "Unknown",
        date_created: new Date().toISOString(),
        colors: "[]",
        palette_tokens: "[]",
        fonts: "[]",
        tags: "[]",
        description_en: "Auto-generated",
        description_so: "Auto-generated",
        source_links: "[]",
        iso_compliance: "[]",
        license: "public",
      }
    })
  }

  const newSub = await prisma.submission.create({
    data: {
      asset_id: asset.id,
      entrant_name: data.entrant?.name || "Unknown",
      entrant_email: data.entrant?.email || "",
      entrant_org: data.entrant?.organization,
      entrant_country: data.entrant?.country || "Somaliland",
      category: data.category || "logo-design",
      entry_fee_paid: data.entry_fee_paid ?? false,
      file_original: data.files?.original || "",
      file_preview: data.files?.preview || "/placeholder.svg?height=300&width=400",
      title: data.metadata?.title || "Untitled",
      description: data.metadata?.description || "",
      inspiration: data.metadata?.inspiration || "",
      tools_used: JSON.stringify(data.metadata?.tools_used || []),
      status: "pending",
      submitted_at: new Date().toISOString(),
    }
  })

  revalidatePath("/submit")
  revalidatePath("/vote")
  revalidatePath("/admin")
  return newSub
}

export async function getApprovedSubmissions() {
  return await prisma.submission.findMany({
    where: {
      OR: [
        { status: "approved" },
        { status: "pending" }
      ]
    }
  })
}

// ─── Votes ─────────────────────────────────────────────────────────────────

export async function castVote(submissionId: string) {
  // In a real app we'd track user sessions to prevent duplicate votes.
  // For now, we just increment the score in the DB.
  
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId }
  })

  if (!submission) return false

  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      total_score: (submission.total_score || 0) + 1
    }
  })

  revalidatePath("/vote")
  return true
}
