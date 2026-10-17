export const dynamic = 'force-dynamic'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// GET /api/submissions — public read of approved submissions
export async function GET(req: Request) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status') || 'approved'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: any = { status: { equals: status } }
  if (category && category !== 'all') {
    where.category = { equals: category }
  }

  const result = await payload.find({
    collection: 'submissions',
    where,
    page,
    limit,
    sort: '-voteCount',
  })

  return NextResponse.json(result)
}

// POST /api/submissions — public submission create
export async function POST(req: Request) {
  const payload = await getPayloadHMR({ config: configPromise })
  const body = await req.json()

  try {
    const submission = await payload.create({
      collection: 'submissions',
      data: {
        title: body.title,
        description: body.description,
        inspiration: body.inspiration,
        category: body.category,
        entrant: body.entrant,
        toolsUsed: body.toolsUsed,
        entryFeePaid: body.entryFeePaid || false,
        preview: body.previewId,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Submission failed', details: String(err) }, { status: 400 })
  }
}
