export const dynamic = 'force-dynamic'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

// GET /api/assets — public read of visible assets
export async function GET(req: Request) {
  const payload = await getPayloadHMR({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: any = { publicVisibility: { equals: true } }
  if (type && type !== 'all') {
    where.type = { equals: type }
  }

  const result = await payload.find({
    collection: 'assets',
    where,
    page,
    limit,
    sort: '-createdAt',
  })

  return NextResponse.json(result)
}
