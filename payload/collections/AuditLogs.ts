import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'user', 'resourceType', 'resourceId', 'createdAt'],
    group: 'System',
  },
  access: {
    read: ({ req: { user } }) => user?.role === 'admin',
    create: () => false, // Only created programmatically
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'action', type: 'text', required: true },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'resourceType', type: 'text' },
    { name: 'resourceId', type: 'text' },
    { name: 'details', type: 'json' },
    { name: 'ipAddress', type: 'text' },
  ],
  timestamps: true,
}
