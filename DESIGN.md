---
version: alpha
name: "Izazi Dewanto — Portfolio"
description: >
  Personal engineering portfolio for Muhammad Izazi Dewanto.
  Targets recruiters and technical leads in IoT, network engineering,
  and full-stack development. Inspired by Apple's dark product pages —
  typographically bold, spatially generous, visually minimal.

colors:
  # Backgrounds (layered surface system)
  bg:             "#0a0a0a"
  bg-card:        "#111111"
  bg-hover:       "#161616"
  bg-border:      "#1c1c1c"

  # Primary accent — Electric Blue (Palette: Deep Navy + Electric Blue)
  # Reference: colorhero.io "Deep Navy + Electric Blue" palette, 2025
  # Rationale: signals trust, calm authority, and technical precision.
  # Increased 10% saturation vs light-mode blue for dark background legibility.
  primary:        "#2563eb"
  primary-light:  "#3b82f6"
  primary-dim:    "rgba(37, 99, 235, 0.10)"
  primary-border: "rgba(37, 99, 235, 0.25)"

  # Text hierarchy — 3-tier rule
  # Tier 1: content (headlines, critical info)
  white:          "#ffffff"
  # Tier 2: body, descriptors
  gray-300:       "#d4d4d8"
  gray-400:       "#a1a1aa"
  # Tier 3: hints, placeholders, disabled
  gray-500:       "#71717a"
  gray-600:       "#52525b"
  gray-700:       "#3f3f46"
  gray-800:       "#27272a"
  gray-900:       "#18181b"

  # Borders — barely-there by design
  border:         "rgba(255, 255, 255, 0.07)"
  border-hover:   "rgba(255, 255, 255, 0.13)"

typography:
  # Single family system — Inter (same as Brittany Chiang, v4.brittanychiang.com)
  # Rationale: humanist grotesque, designed for screens, excellent at all weights.
  # Google Fonts link in index.html: weights 300–900.
  font-family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"

  # Type scale (mobile-first, clamp for fluid responsiveness)
  label:
    fontSize:      "0.78rem"     # 12.5px — section badges, edu-period, form labels
    fontWeight:    "600"
    letterSpacing: "0.10em"
    textTransform: "uppercase"
    color:         "{colors.primary-light}"
  
  caption:
    fontSize:      "0.82rem"     # 13px — pills, small tags
    fontWeight:    "500"
    letterSpacing: "0.02em"
    color:         "{colors.gray-300}"

  body-sm:
    fontSize:      "0.88rem"     # 14px — card subtitles, modal li
    fontWeight:    "400"
    lineHeight:    "1.65"
    color:         "{colors.gray-400}"

  body:
    fontSize:      "0.95rem"     # 15px — form inputs, nav
    fontWeight:    "400"
    lineHeight:    "1.70"
    color:         "{colors.gray-400}"

  body-lg:
    fontSize:      "1.05rem"     # 16.8px — about text, modal overview
    fontWeight:    "400"
    lineHeight:    "1.80"
    color:         "{colors.gray-400}"

  subheading:
    fontSize:      "1.15rem"     # 18.4px — hero role, contact CTA body
    fontWeight:    "500"
    lineHeight:    "1.60"
    color:         "{colors.gray-500}"

  card-title:
    fontSize:      "1.05rem"     # regular card titles
    fontWeight:    "700"
    letterSpacing: "-0.02em"
    lineHeight:    "1.35"
    color:         "{colors.white}"

  card-title-featured:
    fontSize:      "1.20rem"     # featured project card titles
    fontWeight:    "700"
    letterSpacing: "-0.02em"
    lineHeight:    "1.30"
    color:         "{colors.white}"

  stat:
    fontSize:      "2.20rem"     # 35px — stat cards in About
    fontWeight:    "800"
    letterSpacing: "-0.04em"
    lineHeight:    "1.0"
    color:         "{colors.white}"

  section-heading:
    fontSize:      "clamp(2.6rem, 5.5vw, 4rem)"   # fluid 42–64px
    fontWeight:    "800"
    letterSpacing: "-0.04em"
    lineHeight:    "1.08"
    color:         "{colors.white}"

  hero-title:
    fontSize:      "clamp(3.2rem, 7vw, 5.8rem)"   # fluid 51–93px
    fontWeight:    "900"
    letterSpacing: "-0.05em"
    lineHeight:    "1.0"
    color:         "{colors.white}"

  logo:
    fontSize:      "1.5rem"
    fontWeight:    "900"
    letterSpacing: "-0.04em"
    color:         "{colors.white}"

rounded:
  # Shape language: softly architectural — no razor corners, no bubbles
  sm:   "8px"    # form inputs, badges, icon boxes
  md:   "12px"   # pills, tags, skill chips
  lg:   "20px"   # cards, modals, stat boxes
  xl:   "28px"   # large project cards, contact form wrap
  pill: "50px"   # buttons, nav links, hero tag

spacing:
  # Base unit: 4px. Scale follows 4-point grid.
  # Dark mode rule: +20% padding vs equivalent light-mode elements (colorhero.io)
  1:   "4px"
  2:   "8px"
  3:   "12px"
  4:   "16px"
  5:   "20px"
  6:   "24px"
  7:   "28px"
  8:   "32px"
  10:  "40px"
  12:  "48px"
  14:  "56px"
  15:  "60px"
  16:  "64px"
  20:  "80px"
  25:  "100px"
  30:  "120px"
  35:  "140px"
  37:  "148px"   # section padding top/bottom (--pad: 148px 0)

components:
  # ── Navigation ──
  nav-link:
    fontSize:     "{typography.body.fontSize}"
    fontWeight:   "500"
    color:        "{colors.gray-400}"
    padding:      "7px 16px"
    borderRadius: "{rounded.pill}"
    transition:   "0.25s ease"
    active-bg:    "{colors.primary}"
    active-color: "{colors.white}"
    hover-color:  "{colors.white}"

  # ── Buttons ──
  btn-primary:
    background:   "{colors.primary}"
    color:        "{colors.white}"
    padding:      "14px 32px"
    borderRadius: "{rounded.pill}"
    fontWeight:   "600"
    fontSize:     "0.95rem"
    letterSpacing: "0.01em"
    hover-bg:     "{colors.primary-light}"
    hover-shadow: "0 8px 24px rgba(37, 99, 235, 0.35)"
    hover-transform: "translateY(-2px)"

  # ── Cards (base) ──
  card:
    background:   "{colors.bg-card}"
    border:       "1px solid {colors.border}"
    borderRadius: "{rounded.xl}"
    padding:      "32px 28px"
    hover-border: "1px solid {colors.border-hover}"
    hover-transform: "translateY(-4px)"
    transition:   "0.4s cubic-bezier(0.4, 0, 0.2, 1)"

  # ── Expertise / Stat cards ──
  icon-box:
    size:         "44px"
    background:   "{colors.primary-dim}"
    border:       "1px solid {colors.primary-border}"
    borderRadius: "{rounded.sm}"
    color:        "{colors.primary-light}"

  # ── Skill Pills ──
  pill:
    fontSize:     "0.82rem"
    fontWeight:   "500"
    color:        "{colors.gray-300}"
    background:   "rgba(255,255,255,0.04)"
    border:       "1px solid {colors.border}"
    borderRadius: "{rounded.md}"
    padding:      "6px 14px"
    hover-bg:     "{colors.primary-dim}"
    hover-border: "{colors.primary-border}"
    hover-color:  "{colors.primary-light}"

  # ── Project Tags ──
  project-tag:
    fontSize:     "0.72rem"
    fontWeight:   "600"
    letterSpacing: "0.06em"
    textTransform: "uppercase"
    color:        "{colors.primary-light}"
    background:   "{colors.primary-dim}"
    border:       "1px solid {colors.primary-border}"
    borderRadius: "{rounded.pill}"
    padding:      "4px 12px"

  # ── Section Label ──
  section-label:
    fontSize:     "0.78rem"
    fontWeight:   "600"
    letterSpacing: "0.15em"
    textTransform: "uppercase"
    color:        "{colors.primary-light}"
    marginBottom: "24px"

  # ── Hero Tag Badge ──
  hero-tag:
    fontSize:     "0.82rem"
    background:   "{colors.primary-dim}"
    border:       "1px solid {colors.primary-border}"
    borderRadius: "{rounded.pill}"
    padding:      "6px 16px"
    color:        "{colors.primary-light}"

  # ── Photo Wrapper ──
  photo-wrapper:
    width:        "360px"
    height:       "420px"
    borderRadius: "{rounded.xl}"
    border:       "1px solid {colors.border}"
    objectPosition: "top"
    inner-shadow: "inset 0 -80px 60px rgba(10, 10, 10, 0.5)"

  # ── Modal ──
  modal-overlay:
    background:   "rgba(0, 0, 0, 0.92)"
    backdropFilter: "blur(16px)"
  modal-container:
    maxWidth:     "860px"
    background:   "#111111"
    border:       "1px solid {colors.border-hover}"
    borderRadius: "{rounded.xl}"
    enterTransform: "translateY(24px) scale(0.97)"

  # ── Contact Items ──
  contact-item:
    background:   "{colors.bg-card}"
    border:       "1px solid {colors.border}"
    borderRadius: "{rounded.lg}"
    padding:      "20px 24px"
    hover-border: "{colors.primary-border}"
    hover-transform: "translateX(6px)"
---

# Izazi Dewanto — Portfolio Design System

## Overview

This portfolio belongs to **Muhammad Izazi Dewanto**, a final-year Network & IoT Systems Engineering student at Politeknik Negeri Jakarta. The visual identity must communicate two things simultaneously:

1. **Technical depth** — this person builds real, complex systems
2. **Professional clarity** — this person can communicate those systems clearly

The aesthetic direction is **Apple dark product pages** filtered through a **professional engineering lens**. Clean. Authoritative. Spacious. The design should feel like a premium technical document — not a flashy creative showcase.

**Emotional target:** A recruiter or tech lead opening this portfolio should feel: *"This person is serious, capable, and organized."*

**Avoid at all costs:** Neon glow overload, excessive animations, decorative elements that don't serve content, walls of text that obscure capability.

---

## Colors

### Palette Rationale

The palette follows **"Deep Navy + Electric Blue"** — the 2025 standard for B2B SaaS, engineering dashboards, and technical product sites (source: colorhero.io).

Pure black (`#0a0a0a`) replaces deep navy to push contrast further and align with Apple's OLED-optimized dark pages. This creates a **museum-like** quality where content emerges from darkness.

```
Background system (3 layers):
  Base     #0a0a0a   — page background (near-pure black)
  Surface  #111111   — cards, modals, form containers
  Hover    #161616   — card hover state, input focus bg

Accent:
  Primary       #2563eb   — CTA buttons, active nav, primary highlight
  Primary light #3b82f6   — labels, icons, tags, links (higher visibility)
  Primary dim   rgba(37,99,235,0.10)   — badge fills, icon box backgrounds
  Primary bd    rgba(37,99,235,0.25)   — badge borders, icon box borders

Text (3-tier hierarchy):
  Tier 1  #ffffff   — hero title, section headings, card titles, stat numbers
  Tier 2  #a1a1aa   — body text, descriptions, modal text
  Tier 3  #71717a   — secondary body, hints, nav labels (unactive)
           #52525b   — placeholder text, disabled states

Border (barely-there):
  Default  rgba(255,255,255,0.07)   — all card/input borders at rest
  Hover    rgba(255,255,255,0.13)   — card/input borders on hover
```

### Contrast Compliance

All text meets WCAG 2.1 AA (4.5:1 ratio minimum for body text):
- `#ffffff` on `#0a0a0a` → **21:1** ✓
- `#a1a1aa` on `#111111` → **5.4:1** ✓
- `#3b82f6` on `#0a0a0a` → **5.9:1** ✓ (icons, labels)

### Semantic Color Usage

| Token | Use |
|---|---|
| `#2563eb` | Buttons, active nav state |
| `#3b82f6` | Section labels, skill tags, icon fills, contact arrows |
| `rgba(37,99,235,0.10)` | Badge/tag backgrounds, icon box fills |
| `#ffffff` | H1–H3, stat numbers, nav active text, button text |
| `#a1a1aa` | Body paragraphs, card descriptions, modal text |
| `#71717a` | Hero role line, form placeholder text |
| `rgba(255,255,255,0.07)` | All border lines at rest |

---

## Typography

### Font Choice

**Inter** — designed by Rasmus Andersson specifically for screen legibility. The same typeface used by Brittany Chiang (v4.brittanychiang.com, one of the most cited developer portfolio references). Loaded via Google Fonts with weights 300–900.

Rationale for single-family: one font at varying weights creates stronger visual cohesion than mixing two typefaces. Multiple unrelated fonts signal indecision.

### Type Scale

```
Hero Title    clamp(3.2rem → 5.8rem)   weight 900   ls -0.05em   lh 1.00
Section H2    clamp(2.6rem → 4.0rem)   weight 800   ls -0.04em   lh 1.08
Stat Number   2.20rem                   weight 800   ls -0.04em   lh 1.00
Card Title L  1.20rem                   weight 700   ls -0.02em   lh 1.30
Card Title    1.05rem                   weight 700   ls -0.02em   lh 1.35
Subheading    1.15rem                   weight 500   ls  0.01em   lh 1.60
Body Large    1.05rem                   weight 400   ls  0         lh 1.80
Body          0.95rem                   weight 400   ls  0         lh 1.70
Body Small    0.88rem                   weight 400   ls  0         lh 1.65
Caption       0.82rem                   weight 500   ls  0.02em
Label (badge) 0.78rem                   weight 600   ls  0.10em   UPPERCASE
```

### Typography Rules

- **Headings** use tight negative letter-spacing (`-0.04em` to `-0.05em`). This is the single biggest visual cue separating "modern" from "template" typography.
- **Labels/badges** use wide positive letter-spacing (`0.10em–0.15em`) + uppercase for visual contrast against headings.
- **Body text** uses zero letter-spacing. Never adjust body text spacing — it hurts readability.
- **Line height** increases with smaller text: body (1.70) → body-lg (1.80). Counterintuitive but correct.

---

## Layout

### Grid System

```
Container max-width:  1200px
Container padding:    0 32px (desktop), 0 20px (mobile)
Section padding:      148px 0 (desktop), 100px 0 (≤768px)
```

### Key Layouts by Section

```
Hero         → 2-col (text 1fr | photo auto), gap 80px
About        → 2-col (text 1fr | stats 1fr), gap 80px + expertise 4-col below
Skills       → 3-col equal, gap 24px
Projects     → Featured: 2-col, gap 24px / Others: 3-col, gap 20px
Education    → 3-col equal, gap 20px
Contact      → 2-col (links 1fr | form 1.2fr), gap 60px
```

### Responsive Breakpoints

```
≤1024px:
  Hero → 1-col stack (photo moves above text)
  About → 1-col stack
  Expertise → 2-col
  Skills → 1-col
  Education → 1-col
  Contact → 1-col
  Projects (others) → 2-col

≤768px:
  Section padding → 100px 0
  Container → 0 20px
  Mobile nav drawer (right-to-left, 75% width, blur backdrop)
  Projects (featured + others) → 1-col
  Photo wrapper → 220×260px

≤480px:
  Expertise → 1-col
  Hero actions → column direction
```

### Spacing Rationale

Dark interfaces require **20–30% more whitespace** than light-mode equivalents (colorhero.io, 2025). This prevents elements from feeling oppressive on a dark canvas. Section padding is 148px (vs ~100px common on light sites) to give content room to breathe.

---

## Elevation & Depth

This design uses **border opacity** as the primary depth signal — not shadows. This is more legible on dark backgrounds.

```
Level 0  (base)     background: #0a0a0a       border: none
Level 1  (card)     background: #111111       border: rgba(255,255,255,0.07)
Level 2  (hover)    background: #161616       border: rgba(255,255,255,0.13)
Level 3  (modal)    background: #111111       border: rgba(255,255,255,0.13)
                    backdrop: blur(16px), overlay: rgba(0,0,0,0.92)
```

Shadows are used **only** for the primary button hover state:
```
btn-primary:hover → box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35)
```

No neon glow effects. No `text-shadow`. No `filter: drop-shadow()` on UI elements.

---

## Shapes

The shape language is **softly architectural** — rounded enough to feel approachable, contained enough to feel structured.

```
sm   8px   → form inputs, small icon boxes, badges
md   12px  → skill pills, tool tags
lg   20px  → stat cards, contact items, expertise cards
xl   28px  → large project cards, contact form wrapper, modal
pill 50px  → buttons, nav links, hero tag badge
```

Rule: **Never mix sharp (0px) corners with round elements on the same page.** Every interactive element uses at least `border-radius: 8px`.

---

## Animation & Motion

All animations follow Apple's standard: **physically motivated, brief, ease-out**.

```
Fast  (hover feedback):     0.25s ease
Med   (card transitions):   0.4s  cubic-bezier(0.4, 0, 0.2, 1)
Slow  (scroll reveal):      0.7s  cubic-bezier(0.16, 1, 0.3, 1)   ← snappy ease-out
Modal (enter/exit):         0.4s  cubic-bezier(0.4, 0, 0.2, 1)
```

### Scroll Reveal

Three directions, one class each:
- `.reveal`       → fade in from below (translateY: 32px → 0)
- `.reveal-left`  → fade in from left  (translateX: -32px → 0)
- `.reveal-right` → fade in from right (translateX: 32px → 0)

Applied via IntersectionObserver. Elements are observed once and unobserved after becoming visible (no re-trigger).

### Prohibited Animations

- No looping decorative animations except: `pulse-dot` (status badge indicator, 2s, very subtle)
- No canvas particle systems or generative art backgrounds
- No typewriter effects (distracts, adds loading delay, hurts perceived speed)
- No parallax scrolling (causes motion sickness, hard to maintain)
- No page transitions (single-page app, anchor-based navigation only)

---

## Components

### Primary Button

```
Background:      #2563eb
Color:           #ffffff
Padding:         14px 32px
Border-radius:   50px (pill)
Font-weight:     600
Font-size:       0.95rem
Letter-spacing:  0.01em

Hover:
  Background:    #3b82f6
  Transform:     translateY(-2px)
  Box-shadow:    0 8px 24px rgba(37,99,235,0.35)
  Transition:    0.4s cubic-bezier(0.4, 0, 0.2, 1)
```

### Card (base)

```
Background:      #111111
Border:          1px solid rgba(255,255,255,0.07)
Border-radius:   28px
Transition:      border-color 0.25s, box-shadow 0.25s, transform 0.4s

Hover:
  Border:        1px solid rgba(255,255,255,0.13)
  Transform:     translateY(-4px)    ← horizontal cards: translateX(6px)
  Box-shadow:    0 16px 40px rgba(0,0,0,0.40)
```

### Section Label (numbering system)

Pattern: `01 — About`, `02 — Skills`, etc.

```
Font-size:       0.78rem
Font-weight:     600
Letter-spacing:  0.15em
Text-transform:  uppercase
Color:           #3b82f6
Margin-bottom:   24px
Display:         block
```

Never place section labels inside `<h>` tags — they are decorative metadata, not semantic headings.

### Navigation

Pill-shaped container floating above content:

```
Container:
  Background:    rgba(17,17,17,0.70)
  Backdrop:      blur(12px)
  Border:        1px solid rgba(255,255,255,0.07)
  Border-radius: 50px
  Padding:       6px 10px

Link (inactive):
  Color:         #71717a
  Padding:       7px 16px
  Border-radius: 50px

Link (active/hover):
  Background:    #2563eb     ← active only (not hover)
  Color:         #ffffff
```

Header gains `backdrop-filter: blur(20px)` + border-bottom only after 60px scroll.

### Profile Photo

```
Container:  360×420px  border-radius: 28px
Image:      object-fit: cover; object-position: top
Overlay:    inset 0 -80px 60px rgba(10,10,10,0.5)  [bottom fade to blend with bg]
Fallback:   "IZ" text initials, gray-800 background
```

---

## Do's and Don'ts

### ✓ Do

- Use `clamp()` for heading `font-size` — never hard-code hero/section title sizes
- Keep text in the 3-tier system: `#fff` / `#a1a1aa` / `#71717a`. Don't invent new grays.
- Use `{colors.primary-light}` (`#3b82f6`) for interactive labels, icons, and accent text — NOT `{colors.primary}` (`#2563eb`), which is button-only
- Stagger `transition-delay` on grids: `0s, 0.07s, 0.14s...` for cascading reveal
- Use `letter-spacing: -0.04em` or tighter on all headings ≥ 1.5rem
- Add `object-position: top` on profile and project images (faces and key content are at top)
- Test mobile nav drawer at 320px viewport width (narrowest Android)

### ✗ Don't

- **Don't add glows** (`text-shadow`, `box-shadow: 0 0 20px color`) to text or icons — signals cheap template design
- **Don't use `rgba(255,255,255,0.5)` or mid-gray `#999`** as body text — fails contrast on `#111`
- **Don't add percentage bars** to skills — not honest, not verifiable, and looks dated (pre-2022 aesthetic)
- **Don't use multiple accent colors** — `#2563eb` is the only accent. Adding orange/green/purple breaks the system.
- **Don't animate on hover for cards** with images — image `scale(1.05)` on `.project-card:hover .project-img-wrap img` is already defined; adding more hover transforms causes jank
- **Don't center-align body text** — center alignment is for hero sections only. All body content left-aligned.
- **Don't use `font-weight: 400` for UI labels** — minimum 500 for anything uppercase; 600+ for badge labels
- **Don't add a background color to sections alternating** — dark/darker alternation is subtle (`#0a0a0a` vs `linear-gradient`), not black/dark-navy swaps. Kills visual continuity.

---

## Section Structure & Content Rules

```
Header:
  Logo:  "IZ."  (monogram, not full name — space-efficient, memorable)
  Nav:   Home | About | Skills | Projects | Education | Contact
  
Hero:
  Tag:   "Available for opportunities"  (green pulse dot)
  H1:    Full name on 3 lines — "Muhammad / Izazi / Dewanto."
  Role:  Single static line — no typewriter
  Desc:  Max 1–2 sentences. Under 200 chars.
  CTA:   "View Projects" (btn-primary) + LinkedIn + Instagram

About (01):
  H2:    2-line max. Verb-noun format. e.g. "Bridging hardware / and code."
  Body:  2 paragraphs. Max 3 sentences each.
  Stats: 4 items — GPA, Projects, Certifications, Tech Domains
  Cards: 4 expertise tiles — no more, no fewer

Skills (02):
  3 columns: Embedded & IoT | Software Development | Networking & Security
  Each: category title + pill cloud. No scores. No bars.

Projects (03):
  Featured:  2 large cards (row 1) — image + tags + title + 1 description sentence + CTA
  Others:    6 cards in 3-col grid — image + tags + title + CTA only (no desc on card)
  All:  clickable → opens modal with full case study

Education (04):
  3 cards: Politeknik Negeri Jakarta | CCIT Universitas Indonesia | Certifications
  
Contact (05):
  Left:  headline + 1 sentence + 3 contact link items
  Right: WhatsApp form (name, subject, message)
  
Footer:  Logo "IZ." + copyright line. No extra links.
```

---

## File References

| File | Purpose |
|---|---|
| `src/App.css` | All CSS — variables, resets, component styles, responsive |
| `src/App.jsx` | All React — data arrays at top, single App component |
| `src/index.css` | Global reset only (2 lines: box-sizing + margin: 0) |
| `index.html` | Google Fonts link, meta tags, page title |
| `public/assets/profile.jpg` | Profile photo — portrait, object-position: top |
| `public/assets/[project]/` | Project screenshots used in modal galleries |

---

*Generated with reference to: [Google DESIGN.md Spec](https://github.com/google-labs-code/design.md) · [colorhero.io Dark Mode Palettes 2025](https://colorhero.io/blog/dark-mode-color-palettes-2025) · [webportfolios.dev Color Palettes](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio) · [Brittany Chiang Portfolio](https://brittanychiang.com) · [Awwwards Typography Collection](https://www.awwwards.com/awwwards/collections/typography-in-web-design/)*
