# M2 Creative & Consulting

# Media Kit & Visual Design System Specifications

**Project**: Somaliland National Awards Platform  
**Version**: 1.0  
**Design Lead**: M2 Creative & Consulting  

---

## 1. Brand Identity & Color System

The visual identity is anchored in the national identity of Somaliland, using rich OKLCH and hex color spaces for maximum accessibility and modern dark/light mode rendering.

### Primary Brand Palette

| Token | Name | Hex / OKLCH | Usage |
|---|---|---|---|
| `--sl-green` | Somaliland Emerald Green | `#1B5E20` / `oklch(0.35 0.15 145)` | Primary navigation, hero backgrounds, primary action buttons |
| `--sl-gold` | Somaliland Gold | `#CFA93F` / `oklch(0.72 0.13 85)` | Award badges, trophies, highlights, gold typography |
| `--sl-red` | Somaliland National Red | `#C62828` / `oklch(0.577 0.245 27.325)` | Flag tri-bar stripe, urgent status alerts |
| `--sl-white` | Pure White / Glass Canvas | `#FFFFFF` / `oklch(1 0 0)` | Card canvas, modal backgrounds, contrast text |
| `--background` | Slate Canvas | `oklch(0.99 0.005 120)` (Light) / `oklch(0.08 0.01 120)` (Dark) | Overall page background |

---

## 2. Special Design Tokens & Utility Classes

```css
/* Somaliland Flag Tri-color Accent Bar */
.sl-flag-bar {
  height: 4px;
  background: linear-gradient(
    to right,
    #1B5E20 0%,
    #1B5E20 33.33%,
    #ffffff 33.33%,
    #ffffff 66.66%,
    #C62828 66.66%,
    #C62828 100%
  );
}

/* Glassmorphism Card Canvas */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Premium Gradient Typography */
.gradient-text {
  background: linear-gradient(135deg, #1B5E20 0%, #CFA93F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 3. Visual Media Assets Index

1. **Hero Showcase Mockup**:  
   `somaliland_awards_hero_mockup_1791334992664.jpg`  
   *16:9 presentation mockup featuring desktop & mobile views with M2 Creative & Consulting desk nameplate.*

2. **Mobile & Component Showcase Mockup**:  
   `somaliland_awards_mobile_components_1791335009986.jpg`  
   *16:9 studio mockup showcasing category cards, voting interface, submission form, and leaderboard screens.*

---

## 4. Typography Rules

* **Body & UI**: Geist Sans (`var(--font-geist-sans)`)
* **Code & Data**: Geist Mono (`var(--font-geist-mono)`)
* **Headings**: `font-heading` (`font-weight: 700`, `letter-spacing: -0.02em`)
