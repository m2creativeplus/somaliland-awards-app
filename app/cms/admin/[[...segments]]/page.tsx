import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default async function Page({ params, searchParams }: Args) {
  return RootPage({ params, searchParams, config: configPromise } as any)
}

export async function generateMetadata({ params, searchParams }: Args) {
  return generatePageMetadata({ params, searchParams, config: configPromise } as any)
}
