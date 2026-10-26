import { NextResponse } from 'next/server'
import { MARKET_INTELLIGENCE_METRICS } from '@/lib/weddings/mock-data'

export async function GET() {
  const xmlItems = MARKET_INTELLIGENCE_METRICS.map((metric) => `
    <observation id="${metric.id}">
      <titleEn><![CDATA[${metric.titleEn}]]></titleEn>
      <titleSo><![CDATA[${metric.titleSo}]]></titleSo>
      <value><![CDATA[${metric.metricValue}]]></value>
      <changeEn><![CDATA[${metric.changeLabelEn}]]></changeEn>
      <changeSo><![CDATA[${metric.changeLabelSo}]]></changeSo>
      <confidence>${metric.confidence}</confidence>
      <sampleSize><![CDATA[${metric.sampleSize}]]></sampleSize>
      <reportingPeriod><![CDATA[${metric.reportingPeriod}]]></reportingPeriod>
      <source><![CDATA[${metric.source}]]></source>
      <methodologyEn><![CDATA[${metric.methodologyEn}]]></methodologyEn>
      <methodologySo><![CDATA[${metric.methodologySo}]]></methodologySo>
    </observation>
  `).join('')

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<marketIntelligence xmlns="https://weddings.m2creative.sl/schema/insights/v1">
  <metadata>
    <publisher>M2 Creative &amp; Consulting</publisher>
    <market>Hargeisa, Republic of Somaliland</market>
    <generatedAt>${new Date().toISOString()}</generatedAt>
    <status>AUDITED_RESEARCH</status>
  </metadata>
  <observations>
    ${xmlItems}
  </observations>
</marketIntelligence>`.trim()

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
