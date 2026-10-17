/**
 * lib/api.ts
 * Client-side data fetching hooks — talk to real backend APIs.
 * All components should use these instead of lib/store.ts
 */

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || ''

export async function fetchSubmissions(options: {
  category?: string
  status?: string
  page?: number
  limit?: number
} = {}) {
  const params = new URLSearchParams()
  if (options.category && options.category !== 'all') params.set('category', options.category)
  if (options.status) params.set('status', options.status)
  if (options.page) params.set('page', String(options.page))
  if (options.limit) params.set('limit', String(options.limit))

  const res = await fetch(`${API_BASE}/api/submissions?${params}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  })
  if (!res.ok) throw new Error('Failed to fetch submissions')
  return res.json()
}

export async function createSubmission(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create submission')
  return res.json()
}

export async function castVoteAPI(submissionId: string) {
  const res = await fetch(`${API_BASE}/api/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submissionId }),
  })
  if (!res.ok) throw new Error('Vote failed')
  return res.json()
}

export async function fetchAssets(options: {
  type?: string
  page?: number
  limit?: number
} = {}) {
  const params = new URLSearchParams()
  if (options.type && options.type !== 'all') params.set('type', options.type)
  if (options.page) params.set('page', String(options.page))
  if (options.limit) params.set('limit', String(options.limit))

  const res = await fetch(`${API_BASE}/api/assets?${params}`, {
    next: { revalidate: 300 }, // ISR: revalidate every 5 min
  })
  if (!res.ok) throw new Error('Failed to fetch assets')
  return res.json()
}

export async function fetchSiteSettings() {
  const res = await fetch(`${API_BASE}/api/settings`, {
    next: { revalidate: 600 }, // ISR: revalidate every 10 min
  })
  if (!res.ok) throw new Error('Failed to fetch settings')
  return res.json()
}
