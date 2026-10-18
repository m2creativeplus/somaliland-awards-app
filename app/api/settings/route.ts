import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

// Default fallback governance configuration
const defaultGovernance = {
  termsTitle: "Terms of Use & Submission Agreement",
  termsSummary: "Standard operating agreement for designers, voters, and participating institutions across the Republic of Somaliland Brand Awards platform.",
  privacyTitle: "Privacy & Data Protection Policy",
  privacySummary: "Promulgated under the authority of the National Planning Authority, Republic of Somaliland.",
  guidelinesTitle: "Somaliland Brand Guidelines",
  guidelinesSummary: "Standardized design principles, official color systems, typography specifications, and heraldic emblem protocols governing all national design submissions and institutional assets.",
  secretariatAddress: "Sha'ab Area, Near Ministry Complex, Hargeisa, Republic of Somaliland",
  workingHours: "Sunday – Thursday: 08:00 – 15:00 (EAT)",
}

// GET /api/settings — read non-sensitive site settings with governance
export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    
    const publicSettings = {
      branding: settings?.branding || {
        siteName: 'Somaliland Visual Assets & Awards',
        primaryColor: '#1B5E20',
        accentColor: '#CFA93F',
      },
      competition: {
        name: settings?.competition?.name || 'Somaliland Brand Awards 2026',
        deadline: settings?.competition?.deadline,
        ceremonyDate: settings?.competition?.ceremonyDate,
        ceremonyVenue: settings?.competition?.ceremonyVenue || 'Hargeisa Cultural Centre',
        totalPrize: settings?.competition?.totalPrize || '$10,000',
        isOpen: settings?.competition?.isOpen ?? true,
      },
      contact: settings?.contact || {
        email: 'info@somalilandassets.gov.sl',
        city: 'Hargeisa, Somaliland',
      },
      governance: (settings as any)?.governance || defaultGovernance,
      seo: settings?.seo,
    }

    return NextResponse.json(publicSettings)
  } catch (err: any) {
    return NextResponse.json({
      branding: { siteName: 'Somaliland Visual Assets & Awards', primaryColor: '#1B5E20', accentColor: '#CFA93F' },
      competition: { name: 'Somaliland Brand Awards 2026', totalPrize: '$10,000', isOpen: true },
      contact: { email: 'info@somalilandassets.gov.sl', city: 'Hargeisa, Somaliland' },
      governance: defaultGovernance,
    })
  }
}

// POST /api/settings — update global site settings from Visual Control Plane
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const payload = await getPayloadHMR({ config: configPromise })

    const updated = await payload.updateGlobal({
      slug: 'site-settings',
      data: body,
    })

    return NextResponse.json({ success: true, settings: updated })
  } catch (err: any) {
    console.error('Failed to update settings:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
