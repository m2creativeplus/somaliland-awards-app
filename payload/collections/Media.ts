import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: 'public/uploads',
    mimeTypes: ['image/*', 'application/pdf', 'application/zip', '.ai', '.eps', '.svg'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'preview',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Logo', value: 'logo' },
        { label: 'Banner', value: 'banner' },
        { label: 'Submission', value: 'submission' },
        { label: 'Profile', value: 'profile' },
        { label: 'Document', value: 'document' },
      ],
    },
  ],
}
