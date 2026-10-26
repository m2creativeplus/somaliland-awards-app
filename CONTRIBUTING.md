# Contributing Guidelines

Thank you for your interest in contributing to **M2 Creative & Consulting** repositories.

## Code Standards
- **Language**: Strict TypeScript (`tsconfig.json` strict mode enabled).
- **Styling**: Tailwind CSS with semantic tokens and zero hardcoded contrast-violating inline colors.
- **Accessibility**: Minimum `44px` interactive touch targets (`min-h-[44px]`), WCAG 2.2 AA contrast compliance, and semantic landmarks.
- **Localization**: Bilingual Somali default (`so`) with English alternative (`en`).
- **Dependencies**: Do not introduce unnecessary heavy dependencies, Netlify, or Supabase.

## Workflow & Pull Requests
1. Fork or branch from `master` (`git checkout -b feature/your-feature-name`).
2. Run local tests and verification build:
   ```bash
   npm run build
   ```
3. Commit with concise, descriptive commit messages:
   ```bash
   git commit -m "feat(weddings): add verified merchant filter by municipality"
   ```
4. Submit a Pull Request targeting `master` describing:
   - What changed
   - Testing evidence (build pass, HTTP status)
   - Mobile and accessibility verification
