import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET /api/settings — public read of non-sensitive site settings
export async function GET() {
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  
  // Strip sensitive fields before returning to public
  const publicSettings = {
    branding: settings.branding,
    competition: {
      name: settings.competition?.name,
      deadline: settings.competition?.deadline,
      ceremonyDate: settings.competition?.ceremonyDate,
      ceremonyVenue: settings.competition?.ceremonyVenue,
      totalPrize: settings.competition?.totalPrize,
      isOpen: settings.competition?.isOpen,
    },
    contact: settings.contact,
    seo: settings.seo,
  }

  return NextResponse.json(publicSettings)
}
