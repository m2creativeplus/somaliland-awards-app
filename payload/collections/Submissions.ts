import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'entrantName', 'createdAt'],
    group: 'Awards',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'jury' || user?.role === 'moderator') return true
      return { status: { equals: 'approved' } }
    },
    create: () => true, // Public can submit
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        // Audit log hook - would write to AuditLogs collection
        console.log(`[AUDIT] Submission ${operation}: ${doc.id} — ${doc.title}`)
      }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Title of the design submission' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'inspiration',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Logo Design', value: 'logo-design' },
        { label: 'Brand Identity', value: 'brand-identity' },
        { label: 'Poster Design', value: 'poster-design' },
        { label: 'Digital Graphics', value: 'digital-graphics' },
        { label: 'Typography', value: 'typography' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
      },
    },
    // Entrant info
    {
      type: 'group',
      name: 'entrant',
      label: 'Entrant Information',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'organization', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'Somaliland' },
      ],
    },
    // Files
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'originalFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'label', type: 'text' },
      ],
    },
    // Metadata
    {
      name: 'toolsUsed',
      type: 'array',
      fields: [{ name: 'tool', type: 'text' }],
    },
    {
      name: 'entryFeePaid',
      type: 'checkbox',
      defaultValue: false,
    },
    // Scoring
    {
      type: 'group',
      name: 'scorecard',
      label: 'Jury Scorecard',
      admin: {
        condition: (_, siblingData) => siblingData.status === 'under_review' || siblingData.status === 'approved',
      },
      fields: [
        { name: 'creativity', type: 'number', min: 0, max: 100 },
        { name: 'functionality', type: 'number', min: 0, max: 100 },
        { name: 'execution', type: 'number', min: 0, max: 100 },
        { name: 'culture', type: 'number', min: 0, max: 100 },
        { name: 'impact', type: 'number', min: 0, max: 100 },
        { name: 'sustainability', type: 'number', min: 0, max: 100 },
        { name: 'totalScore', type: 'number' },
        { name: 'juryNotes', type: 'textarea' },
        {
          name: 'scoredBy',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
    // Votes
    {
      name: 'voteCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
  timestamps: true,
}
