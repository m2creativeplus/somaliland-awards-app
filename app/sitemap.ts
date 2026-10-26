import { MetadataRoute } from 'next'
import { HARGEISA_PROVIDERS } from '@/lib/weddings/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://weddings.m2creative.sl'
  const currentDate = new Date().toISOString()

  // Base static routes
  const staticRoutes = [
    '',
    '/providers',
    '/categories',
    '/locations',
    '/locations/hargeisa',
    '/locations/borama',
    '/locations/berbera',
    '/locations/burao',
    '/packages',
    '/compare',
    '/plan',
    '/events',
    '/resources',
    '/market-insights',
    '/search',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/guidelines',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: (route === '' || route === '/providers' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/providers') ? 0.9 : 0.8,
  }))

  // Dynamic provider storefront routes
  const providerRoutes = HARGEISA_PROVIDERS.map((provider) => ({
    url: `${baseUrl}/providers/${provider.slug}`,
    lastModified: provider.lastVerifiedDate || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Category dynamic routes
  const categoryRoutes = [
    'venues',
    'photography',
    'decor',
    'catering',
    'bridal',
    'planners',
  ].map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...providerRoutes, ...categoryRoutes]
}
