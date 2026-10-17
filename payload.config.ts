import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Submissions } from './payload/collections/Submissions'
import { Assets } from './payload/collections/Assets'
import { AuditLogs } from './payload/collections/AuditLogs'
import { SiteSettings } from './payload/collections/SiteSettings'
import path from 'path'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'somaliland-awards-secret-change-in-production',
  db: sqliteAdapter({
    client: {
      url: `file:${path.join(process.cwd(), 'prisma/awards.db')}`,
    },
  }),
  editor: lexicalEditor(),
  collections: [Users, Media, Submissions, Assets, AuditLogs],
  globals: [SiteSettings],
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Somaliland Awards Admin',
    },
  },
  cors: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ],
  typescript: {
    outputFile: path.resolve('./payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve('./payload-schema.graphql'),
  },
})
