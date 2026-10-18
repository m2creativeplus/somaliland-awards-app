import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Configuration',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Branding
    {
      type: 'group',
      name: 'branding',
      label: 'Branding & Identity',
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'Somaliland Visual Assets & Awards' },
        { name: 'tagline', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'favicon', type: 'upload', relationTo: 'media' },
        { name: 'primaryColor', type: 'text', defaultValue: '#1B5E20' },
        { name: 'accentColor', type: 'text', defaultValue: '#CFA93F' },
      ],
    },
    // Competition Config
    {
      type: 'group',
      name: 'competition',
      label: 'Current Competition',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Somaliland Brand Awards 2026' },
        { name: 'deadline', type: 'date' },
        { name: 'ceremonyDate', type: 'date' },
        { name: 'ceremonyVenue', type: 'text' },
        { name: 'totalPrize', type: 'text', defaultValue: '$10,000' },
        { name: 'isOpen', type: 'checkbox', defaultValue: true },
        { name: 'entryFee', type: 'number', defaultValue: 0 },
      ],
    },
    // Contact
    {
      type: 'group',
      name: 'contact',
      label: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'info@somalilandassets.gov.sl' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'city', type: 'text', defaultValue: 'Hargeisa, Somaliland' },
      ],
    },
    // SEO Global Defaults
    {
      type: 'group',
      name: 'seo',
      label: 'Global SEO Defaults',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'twitterHandle', type: 'text' },
        { name: 'googleSiteVerification', type: 'text' },
      ],
    },
    // Analytics
    {
      type: 'group',
      name: 'analytics',
      label: 'Analytics',
      fields: [
        { name: 'googleAnalyticsId', type: 'text' },
        { name: 'vercelAnalytics', type: 'checkbox', defaultValue: true },
      ],
    },
    // Notifications
    {
      type: 'group',
      name: 'notifications',
      label: 'Email Notifications',
      fields: [
        { name: 'smtpHost', type: 'text' },
        { name: 'smtpPort', type: 'number' },
        { name: 'smtpUser', type: 'text' },
        { name: 'fromEmail', type: 'email' },
        { name: 'fromName', type: 'text', defaultValue: 'Somaliland Awards' },
        { name: 'notifyAdminOnSubmission', type: 'checkbox', defaultValue: true },
        { name: 'notifyEntrantOnApproval', type: 'checkbox', defaultValue: true },
      ],
    },
    // Governance & Legal Content
    {
      type: 'group',
      name: 'governance',
      label: 'Governance & Legal Content',
      fields: [
        { name: 'termsTitle', type: 'text', defaultValue: 'Terms of Use & Submission Agreement' },
        { name: 'termsSummary', type: 'textarea', defaultValue: 'Standard operating agreement for designers, voters, and participating institutions across the Republic of Somaliland Brand Awards platform.' },
        { name: 'privacyTitle', type: 'text', defaultValue: 'Privacy & Data Protection Policy' },
        { name: 'privacySummary', type: 'textarea', defaultValue: 'Promulgated under the authority of the National Planning Authority, Republic of Somaliland.' },
        { name: 'guidelinesTitle', type: 'text', defaultValue: 'Somaliland Brand Guidelines' },
        { name: 'guidelinesSummary', type: 'textarea', defaultValue: 'Standardized design principles, official color systems, typography specifications, and heraldic emblem protocols governing all national design submissions and institutional assets.' },
        { name: 'secretariatAddress', type: 'textarea', defaultValue: "Sha'ab Area, Near Ministry Complex, Hargeisa, Republic of Somaliland" },
        { name: 'workingHours', type: 'text', defaultValue: 'Sunday – Thursday: 08:00 – 15:00 (EAT)' },
      ],
    },
  ],
}
