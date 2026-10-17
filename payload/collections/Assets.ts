import type { CollectionConfig } from 'payload'

export const Assets: CollectionConfig = {
  slug: 'assets',
  admin: {
    useAsTitle: 'nameEn',
    defaultColumns: ['nameEn', 'type', 'license', 'publicVisibility'],
    group: 'Library',
  },
  access: {
    read: ({ req: { user }, data }) => {
      // Public can read public_visibility assets; admins see all
      if (user?.role === 'admin' || user?.role === 'moderator') return true
      return { publicVisibility: { equals: true } }
    },
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'nameEn', type: 'text', required: true, label: 'Name (English)' },
    { name: 'nameSo', type: 'text', required: true, label: 'Name (Somali)' },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Logo', value: 'logo' },
        { label: 'Map', value: 'map' },
        { label: 'Emblem', value: 'emblem' },
        { label: 'Poster', value: 'poster' },
        { label: 'Banner', value: 'banner' },
        { label: 'Icon', value: 'icon' },
      ],
    },
    { name: 'owner', type: 'text', required: true },
    { name: 'descriptionEn', type: 'richText', label: 'Description (English)' },
    { name: 'descriptionSo', type: 'richText', label: 'Description (Somali)' },
    {
      name: 'svgFile',
      type: 'upload',
      relationTo: 'media',
      label: 'SVG File',
    },
    {
      name: 'pngFile',
      type: 'upload',
      relationTo: 'media',
      label: 'PNG File',
    },
    {
      name: 'colors',
      type: 'array',
      fields: [{ name: 'hex', type: 'text' }],
    },
    {
      name: 'paletteTokens',
      type: 'array',
      fields: [{ name: 'token', type: 'text' }],
    },
    {
      name: 'fonts',
      type: 'array',
      fields: [{ name: 'font', type: 'text' }],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'license',
      type: 'select',
      required: true,
      options: [
        { label: 'Public Domain', value: 'public' },
        { label: 'Restricted', value: 'restricted' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    {
      name: 'publicVisibility',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isoCompliance',
      type: 'array',
      fields: [{ name: 'standard', type: 'text' }],
    },
    // Metrics (read-only, updated by hooks)
    {
      type: 'group',
      name: 'metrics',
      fields: [
        { name: 'views', type: 'number', defaultValue: 0 },
        { name: 'likes', type: 'number', defaultValue: 0 },
        { name: 'downloads', type: 'number', defaultValue: 0 },
      ],
    },
    {
      type: 'group',
      name: 'verification',
      fields: [
        { name: 'verifiedBy', type: 'text' },
        { name: 'verifiedDate', type: 'date' },
      ],
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
  timestamps: true,
}
