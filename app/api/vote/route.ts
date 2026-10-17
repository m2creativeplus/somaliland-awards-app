export const dynamic = 'force-dynamic'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// POST /api/vote — cast a vote on a submission
export async function POST(req: Request) {
  const payload = await getPayloadHMR({ config: configPromise })
  const body = await req.json()
  const { submissionId } = body

  if (!submissionId) {
    return NextResponse.json({ error: 'submissionId is required' }, { status: 400 })
  }

  try {
    const submission = await payload.findByID({
      collection: 'submissions',
      id: submissionId,
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    const updated = await payload.update({
      collection: 'submissions',
      id: submissionId,
      data: {
        voteCount: (submission.voteCount || 0) + 1,
      },
    })

    return NextResponse.json({ success: true, voteCount: updated.voteCount })
  } catch (err) {
    return NextResponse.json({ error: 'Vote failed', details: String(err) }, { status: 500 })
  }
}
