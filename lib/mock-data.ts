import type { Asset, Submission } from "./types"

export const mockAssets: Asset[] = [
  {
    id: "1",
    name_en: "Somaliland National Flag",
    name_so: "Calanka Qaranka Somaliland",
    type: "logo",
    owner: "Ministry of Information",
    date_created: "2024-01-15",
    colors: ["#1B5E20", "#FFFFFF", "#D32F2F"],
    palette_tokens: ["primary", "white", "red"],
    fonts: [],
    png_url: "/somaliland-flag-with-green-white-red-stripes-and-s.jpg",
    tags: ["flag", "national", "official", "government"],
    description_en:
      "Official flag of the Republic of Somaliland featuring green, white, and red horizontal stripes with the national emblem.",
    description_so: "Calanka rasmiga ah ee Jamhuuriyadda Somaliland oo leh midabada cagaar, caddaan, iyo cas.",
    source_links: [],
    iso_compliance: ["ISO-3166"],
    awards_history: [],
    license: "public",
    public_visibility: true,
    metrics: { views: 15420, likes: 892, downloads: 2341 },
    verification: { verified_by: "SNPA", verified_date: "2024-01-15" },
  },
  // ... other mock assets would be here
]

export const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    asset_id: "asset-101",
    entrant: {
      name: "Ahmed Ali",
      email: "ahmed.ali@example.com",
      organization: "Horn Design Studio",
      country: "Somaliland",
    },
    category: "Government Logo",
    entry_fee_paid: true,
    files: {
      original: "logo-submission.svg",
      preview: "/placeholder.svg?height=300&width=400&text=Logo+Submission",
    },
    metadata: {
      title: "Ministry of Health Redesign",
      description: "A modern take on the traditional ministry symbols.",
      inspiration: "Traditional woven patterns and the red crescent.",
      tools_used: ["Adobe Illustrator", "Figma"],
    },
    scorecard: {
      criteria: {
        creativity: { score: 22, weight: 25 },
        functionality: { score: 18, weight: 20 },
        execution: { score: 19, weight: 20 },
        culture: { score: 14, weight: 15 },
        impact: { score: 8, weight: 10 },
        sustainability: { score: 9, weight: 10 },
      },
      total_score: 90,
    },
    status: "under_review",
    submitted_at: "2024-02-10T14:30:00Z",
  },
  {
    id: "sub-2",
    asset_id: "asset-102",
    entrant: {
      name: "Sarah Hassan",
      email: "sarah.h@example.com",
      country: "UK",
    },
    category: "National Poster",
    entry_fee_paid: true,
    files: {
      original: "poster-submission.pdf",
      preview: "/placeholder.svg?height=300&width=400&text=Poster+Design",
    },
    metadata: {
      title: "Independence Day 2025",
      description: "Celebrating unity and progress.",
      inspiration: "Sunrise over Hargeisa.",
      tools_used: ["Procreate"],
    },
    scorecard: {
      criteria: {
        creativity: { score: 20, weight: 25 },
        functionality: { score: 15, weight: 20 },
        execution: { score: 15, weight: 20 },
        culture: { score: 12, weight: 15 },
        impact: { score: 7, weight: 10 },
        sustainability: { score: 8, weight: 10 },
      },
      total_score: 77,
    },
    status: "pending",
    submitted_at: "2024-02-11T09:15:00Z",
  },
]
