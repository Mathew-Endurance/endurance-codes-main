# Portfolio Motion System — Design

**Date:** 2026-07-20
**Status:** Approved, pending implementation plan

## Goal

Turn the portfolio from a largely static page into a highly animated,
"cinematic" experience — at the expressive/experimental end of the spectrum —
without sacrificing mobile performance or accessibility.

This is a job-hunting portfolio for a senior frontend engineer. The motion is
itself a work sample: it has to look ambitious *and* profile clean. Jank costs
more than restraint would have.

## Current state

- Single-page app: `src/routes/index.tsx` renders 9 feature sections in order
  (nav, hero, about, capabilities, projects, design-system, skills, notes,
  experience, contact).
- Second route: `src/routes/projects/$id.tsx`.
- Tailwind v4 + `tw-animate-css`. No animation library installed.
- Existing motion is limited to the hero's `animate-ping` availability dot and
  `hover:transition-colors` on links.

## Decisions

| Question | Decision |
| --- | --- |
| Intensity | Full "wow" / experimental tier |
| Stack | `motion` (framer-motion) + `gsap` with ScrollTrigger |
| Signature effect | Interactive canvas-2D particle field in the hero |
| Custom cursor ring | **Cut** — reads as template, fights native hover affordances |
| Pinned scroll-scrubbing on Projects | **In** — the centerpiece; desktop-only, smoothed scrub |

## Architecture

### 1. Motion foundation

`src/lib/motion.ts` exports the shared vocabulary so sections do not invent
their own numbers:

- `duration` and `ease` tokens (one house cubic-bezier)
- Reusable variants: `fadeUp`, `stagger`, `maskReveal`

A `useReducedMotion` hook gates every animation. Under
`prefers-reduced-motion: reduce`, all motion collapses to instant opacity
changes — content still appears, it just does not travel.

**Constraint:** animations use `transform` and `opacity` only. No animating
`width`, `height`, `top`, or `left`.

### 2. Hero — particle field

`src/features/hero/ParticleField.tsx`:

- Canvas 2D node field, lines drawn between nearby nodes
- `devicePixelRatio`-aware; `ResizeObserver` for resize
- Cursor repulsion on pointer move
- Particle count scales down with viewport width
- Loop pauses via `IntersectionObserver` when scrolled out of view, and on tab
  blur (`visibilitychange`)

Hero content over it: headline reveals word-by-word, with badge → paragraph →
CTAs cascading in behind it.

### 3. Scroll system (GSAP ScrollTrigger)

- `<Reveal>` wrapper component for section entry (rise + fade; staggers
  children)
- Section headings get a line-mask wipe
- **Projects:** each case study pins briefly and scrubs its content as you
  scroll. Desktop-only (disabled under a width breakpoint and under reduced
  motion); generous scrub smoothing so trackpad scrolling does not feel sticky.
- Skills and capabilities grids stagger in per item
- Scroll-progress bar in the navbar

### 4. Nav and micro-interactions

- Active-section indicator sliding between links via motion `layoutId`
- Navbar condenses on scroll
- Magnetic hover on hero CTAs
- 3D tilt on project cards
- Smoothed theme-toggle transition

### 5. Route transitions

`projects/$id` gets an enter/exit transition rather than a hard cut.

## Performance and accessibility budget

- GSAP and the canvas are **dynamically imported** so the initial bundle does
  not move materially
- Canvas loop paused when offscreen and on tab blur
- `prefers-reduced-motion` honored throughout
- Pinned scrubbing disabled on touch/narrow viewports
- A production build plus Lighthouse pass runs at the end; **actual numbers get
  reported**, not assumed

## Implementation sequence

1. Motion foundation (`src/lib/motion.ts`, reduced-motion gate)
2. Hero particle field + hero content choreography
3. Scroll reveal system across sections
4. Nav (progress bar, active indicator, condense-on-scroll)
5. Micro-interactions (magnetic CTAs, card tilt, theme toggle)
6. Route transitions
7. Performance pass — build, measure, report

## Out of scope

- Custom cursor ring (cut by decision above)
- WebGL / shader backgrounds — the canvas field covers the signature moment at
  a fraction of the cost
- Any redesign of layout, copy, or content structure
