# Maddison Miller Coaching — Build Spec

Handoff document for rebuilding this site in the **maddison-miller** Next.js scaffold (`next@16.2.9`, `react@19.2.4`, `tailwindcss@^4`). Single-page, scroll-based. All styling via Tailwind utility classes — no inline `style={{}}` except genuinely dynamic runtime values (canvas coordinates, animation delays from data).

---

## What We Are Building

A website for **Maddison Miller** — executive and entrepreneurial coach who helps leaders reconnect to who they truly are so they can lead, build, and live from that place.

**Tone:** Sophisticated, professional, grounded — with a subtle undercurrent of the mystical and soulful. Not woo-woo. Not corporate. Approachable for C-suite executives who may be skeptical of anything too spiritual.

**North star quote:** *"The most courageous act is still to think for yourself. Aloud."*

**Visual language (subtle, never loud):** stars, constellations, ocean, birds, butterflies, moon.

**Target client:** C-suite executives, entrepreneurs building their own thing, or people in corporate America feeling the pull toward something more. High-functioning, not broken — operating below their ceiling because they've lost the thread back to themselves.

**Site metadata:**
- Title: `Maddison Miller | Executive Coach`
- Description: `The clearest strategy you will ever have is knowing who you truly are.`

---

## Architecture

**Single page. No separate routes.** Navigation uses anchor `#id` scroll targets with `scroll-behavior: smooth` on `html`.

### Page composition (top to bottom)

| Order | Component | Anchor ID | Notes |
|-------|-----------|-----------|-------|
| 1 | `Nav` | — | Fixed top bar |
| 2 | `Hero` | — | Full viewport |
| 3 | `Mirror` | `#mirror` | Empathy / questions |
| 4 | `ConstellationMethod` | — | Interactive canvas |
| 5 | `QuoteBreak` | — | Full-bleed dark quote |
| 6 | `WorkWithMe` | `#work-with-me` | Services + CTA |
| 7 | `AskAnything` | — | Question bridge |
| 8 | `About` | `#about` | Bio + photo placeholder |
| 9 | `Journal` | `#journal` | Stub posts |
| 10 | `Footer` | — | Dark footer |

### Recommended file structure

```
app/
  layout.tsx              — Root layout, metadata, fonts, body classes
  page.tsx                — Renders all section components in order
  globals.css             — Tailwind import, @theme tokens, keyframes
  components/
    nav.tsx
    hero.tsx
    mirror.tsx
    constellation-method.tsx
    quote-break.tsx
    work-with-me.tsx
    ask-anything.tsx
    about.tsx
    journal.tsx
    footer.tsx
    stars.tsx             — Shared decorative star field
  lib/
    constants.ts          — Section anchor IDs, repeated strings
```

`app/page.tsx` should compose every section:

```tsx
import Nav from "@/app/components/nav";
import Hero from "@/app/components/hero";
// ... all sections
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mirror />
        <ConstellationMethod />
        <QuoteBreak />
        <WorkWithMe />
        <AskAnything />
        <About />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
```

Client components (`"use client"`) only where needed: `Nav` (scroll state), `Stars` (random positions), `ConstellationMethod` (canvas + hover), `AskAnything` (form state).

---

## Design System

### Colors — define in `globals.css` `@theme`

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1C1C2E` | Primary text, dark backgrounds, primary buttons |
| `cream` | `#FAFAF7` | Primary background, button text on dark |
| `warm` | `#F5F0E8` | Alternate section bg, card hover, photo placeholder gradient start |
| `mist` | `#EEF2F5` | Muted section bg (Ask Anything), gradient end |
| `dust` | `#8FA3B1` | Accent, italic headline highlights, constellation nodes, footer labels |
| `taupe` | `#B8A99A` | Eyebrows, dividers, muted labels, borders |
| `stone` | `#7A7068` | Body copy |
| `fog` | `#C9D4DC` | Star dots, constellation edges, service card eyebrows |

```css
@import "tailwindcss";

@theme {
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'DM Sans', sans-serif;

  --color-navy:  #1C1C2E;
  --color-cream: #FAFAF7;
  --color-warm:  #F5F0E8;
  --color-mist:  #EEF2F5;
  --color-dust:  #8FA3B1;
  --color-taupe: #B8A99A;
  --color-stone: #7A7068;
  --color-fog:   #C9D4DC;

  --animate-fade-up: fadeUp 0.8s ease both;
}
```

Use as Tailwind classes: `text-navy`, `bg-cream`, `font-display`, `font-body`, etc.

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | Cormorant Garamond | 300, 400, 500 (+ italics) | Headlines, pull quotes, italic accents |
| Body | DM Sans | 300, 400, 500 | Nav, body copy, labels, CTAs |

Load via `next/font/google` in `layout.tsx` (preferred for Next.js 16) or `@fontsource` imports in `globals.css`.

**Scale rules:**
- Body copy: `text-[1.05rem]`, `leading-[1.8]`, `font-light`
- Eyebrows: `text-[0.7rem]`, `tracking-[0.2em]`, `uppercase`, `text-taupe`
- Section headlines: `font-display`, `font-light`, `text-[clamp(2rem,3.5vw,2.8rem)]` or similar — **always scale above body at every breakpoint**
- CTA buttons: `text-[0.72rem]`–`text-[0.75rem]`, `tracking-[0.1em]`, `uppercase`

### Spacing & layout patterns

- Section vertical padding: `py-20 md:py-32` (lighter sections) or `py-32` (major sections)
- Horizontal padding: `px-6 md:px-12`
- Max content width: `max-w-[900px]` (Mirror), `max-w-[1100px]` (most sections)
- Button border radius: `rounded-[2px]`
- Section dividers: `border-taupe/25` or `border-taupe/30`

### Animations — `globals.css`

```css
@keyframes starPulse {
  from { opacity: 0.1; transform: scale(1); }
  to   { opacity: 0.5; transform: scale(1.4); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Hero elements use `animate-fade-up` with staggered `[animation-delay:0.15s]`, `[animation-delay:0.3s]`, etc.

### Global base

```tsx
// layout.tsx body
<body className="font-body font-light leading-[1.7] antialiased bg-cream text-navy">
```

`html { scroll-behavior: smooth; }`

Optional: thin scrollbar styling (4px, cream track, taupe thumb).

---

## Shared Component: `Stars`

Decorative pulsing dots. Used in Hero, QuoteBreak, Footer.

**Props:** `count?: number` (default 24; QuoteBreak uses 36, Footer uses 20)

**Behavior:** On mount, generate random positions/sizes/opacities/delays. Render absolutely positioned `rounded-full bg-fog` dots with `starPulse` animation. Container: `absolute inset-0 overflow-hidden pointer-events-none`.

---

## Section Specs

### 1. `Nav`

**Behavior:** Fixed `inset-x-0 top-0 z-[100]`. Transparent on load; after `scrollY > 40`, apply frosted glass: `bg-cream/[0.88] backdrop-blur-[12px] border-b border-taupe/20`. Transition `duration-[400ms]`.

**Left:** `Maddison Miller` — `font-display text-[1.1rem] tracking-[0.02em] text-navy`

**Links (hidden on mobile `max-md:hidden`):**
- Work With Me → `#work-with-me`
- About → `#about`
- Journal → `#journal`

Link style: `text-[0.72rem] tracking-[0.12em] uppercase text-stone hover:text-navy`

**CTA:** `Book a Call` → `#work-with-me`
- `border border-navy/30 py-2 px-[1.2rem] rounded-[2px]`
- Hover: `bg-navy text-cream`

---

### 2. `Hero`

**Layout:** `min-h-screen`, centered, `pt-32 pb-24 px-8`, relative.

**Background:** `bg-[linear-gradient(160deg,#F5F0E8_0%,#FAFAF7_50%,#EEF2F5_100%)]`

**Content (top to bottom):**
1. `<Stars />`
2. Moon SVG (32×32, `opacity-[0.35]`, fill `dust`, `aria-hidden`)
3. Eyebrow: `Leadership · Clarity · Alignment`
4. **H1** (two lines, display, light):
   - Line 1: `The clearest strategy you will ever have`
   - Line 2 (italic, dust): `is knowing who you truly are.`
   - Size: `text-[clamp(2rem,8vw,3.5rem)]`, `whitespace-normal sm:whitespace-nowrap`
5. Subcopy: `For those ready to move from scattered momentum to soul-aligned vision — without abandoning what they've built.`
   - `max-w-[520px] text-stone`
6. **CTAs:**
   - Primary `Work With Me` → `#work-with-me` — `bg-navy text-cream`, hover `opacity-80`
   - Secondary `Learn More` → `#about` — bordered, `text-stone border-taupe/50`
7. Scroll indicator (absolute bottom): vertical line + `scroll` label

All content blocks: `animate-fade-up` with staggered delays.

---

### 3. `Mirror`

**ID:** `mirror`

**Eyebrow:** `You might be asking yourself`

**Questions** (display italic, bordered list):
1. What am I actually building — and does it still feel like mine?
2. I built the life I was told to want. Why doesn't it feel like enough?
3. What would I do if I truly stopped caring what others thought of me?
4. Is this the life I chose, or the one I defaulted into?
5. What actually makes me feel alive?

Each question: `py-[1.8rem] border-b border-taupe/25`, text `font-display text-[clamp(1.2rem,2.2vw,1.55rem)] italic text-navy`

**Closing reframe** (centered body copy):
> These aren't distractions. They're invitations. The clarity you're seeking isn't in another strategy framework or productivity system. It's in finally getting honest with yourself about who you are when all the noise falls away.

---

### 4. `ConstellationMethod`

**Background:** `bg-warm py-32 px-12`

**Layout:** Two-column grid `md:grid-cols-2 gap-12 md:gap-24`, max-width 1100px centered.

#### Left column — Interactive canvas

**Canvas:** Native browser Canvas API (no library). `480×360` internal resolution, `w-full h-auto`.

**Nodes (diamond constellation):**

| Node | Position (x, y) | Label | Description |
|------|-----------------|-------|-------------|
| 0 | 0.5, 0.06 | Your Vision | What lights you on fire |
| 1 | 0.2, 0.4 | Your Values | What you will not compromise |
| 2 | 0.8, 0.4 | Your Gifts | What only you can offer |
| 3 | 0.5, 0.82 | Your Purpose | Where it all converges |

**Edges:** `[0,1], [0,2], [1,3], [2,3]`

**Animation:** On mount, edges and nodes draw in sequentially via `requestAnimationFrame`. Clean up on unmount.

**Interaction:**
- Hover/touch: highlight node, show label + description below canvas
- Keyboard: arrow keys cycle nodes (`tabIndex={0}`, `role="application"`)
- Default hint: `Hover the constellation to explore`
- Node labels positioned below canvas dots (absolute positioned spans)
- Hit radius: 28px

**Colors on canvas:**
- Edges: `rgba(201,212,220, …)` (fog)
- Nodes: `rgba(143,163,177, …)` (dust), center dot cream

#### Right column — Copy

**Eyebrow:** `The method`

**Headline:**
> You already know  
> *who you are.* (italic, dust)

**Body paragraphs:**
1. Somewhere between what the world expected of you and the stories you learned to tell yourself, you drifted from yourself. But the signal never went dark. It is still there.
2. My work is not about teaching you who to be. It is about clearing away everything that convinced you otherwise — and helping you reconnect to yourself. All of it. The parts you have been performing around, the parts you buried, the parts that have been waiting.
3. When you know yourself at that level, the strategy becomes obvious. The decisions get clearer. And everyone around you feels it.

---

### 5. `QuoteBreak`

**Layout:** Full-bleed dark section, centered, `py-28 md:py-[7rem] px-5 md:px-12`, `bg-navy`, relative overflow hidden.

**Background:** `<Stars count={36} />`

**Quote** (display, italic, warm/cream `#F5F0E8`, light weight):
> "The most courageous act is still to think for yourself.  
> Aloud."

Responsive sizing: `text-[clamp(0.8rem,calc((100vw-2.5rem)/21),1.35rem)] md:text-[clamp(1.4rem,2.5vw,2.6rem)]`
Line 1: `whitespace-nowrap` on mobile with tight letter-spacing; normal on md+.

**Attribution:** `Coco Chanel` — `text-[0.65rem] tracking-[0.15em] uppercase text-dust mt-6`

---

### 6. `WorkWithMe`

**ID:** `work-with-me`

**Background:** `bg-cream`, `py-32 px-6 md:px-12`

**Eyebrow:** `Work With Me`

**Headline:**
> Where the work  
> *begins.* (italic, dust)

**Services grid:** 3 columns on desktop, 1 column on mobile. Top border `border-t border-taupe/30`.

| Eyebrow | Title | Description |
|---------|-------|-------------|
| One on One | Private Engagement | For the leader or founder ready to do the deep work. A private coaching partnership built around clarifying your vision, dissolving what keeps you from it, and finding the path that is truly yours. |
| Organizations | Corporate Programs | When one leader transforms, it ripples outward. Tailored programs for companies scaling culture, building leadership presence, and moving teams from compliance to coherence. |
| Cohort | Group Immersive | For founders and leaders who want community alongside depth. A curated cohort built around honest conversation, shared accountability, and the kind of growth that accelerates when you are not building alone. |

**Card styling:**
- Padding `p-8 md:p-12`, vertical borders between cards on desktop
- Hover: `bg-warm`
- Eyebrow: `text-fog`, title: `font-display text-[1.6rem] font-light`

**Discovery CTA block** (below grid):
- Background `bg-warm`, flex row (wrap on mobile)
- Headline (italic display): `Ready to find your fit?`
- Subcopy: `Book a complimentary discovery call. We'll figure out what works for you.`
- Button: `Book a Discovery Call` → **`href="#"` stub** — `bg-navy text-cream`

---

### 7. `AskAnything`

**Background:** `bg-mist`, centered, `py-32 px-6 md:px-12`

**Eyebrow:** `Not sure where to start?` (dust color)

**Headline** (display italic):
> Bring the question or the feeling you can't quite name.

#### Default state
- Textarea: `aria-label="Your question"`, placeholder `What's on your mind?`, 4 rows
- Style: cream-tinted bg, taupe border, display italic font, navy text
- Submit button: `bg-navy text-cream uppercase tracking

#### Submitted state (client-side only, no API)
When user submits non-empty text:
1. Mirror their question back in italic display quotes
2. Decorative `✦` divider
3. Reframe: *The answer you're looking for is already within you.*
4. Subcopy: `A discovery call is where we unlock it together.`
5. CTA: `Book a Discovery Call` → **`href="#"` stub**

Animate reveal with `fadeUp`.

---

### 8. `About`

**ID:** `about`

**Background:** `bg-cream`, `py-32 px-6 md:px-12`

**Layout:** Two-column grid, stacks on mobile (`grid-cols-1 md:grid-cols-2 gap-12 md:gap-24`)

#### Left — Photo placeholder
- Aspect ratio 3:4
- Gradient bg `from-warm to-mist`, subtle taupe border
- Centered monogram: `MM` — display, `text-[3.5rem] text-taupe opacity-60`
- **Replace with real photo when Maddison provides it** — use `next/image`

#### Right — Copy

**Eyebrow:** `About`

**Headline:** `Maddison Miller`

**Italic lead:** `I believe the work starts with the leader — and ripples outward from there.`

**Body paragraphs:**
1. I work with executives, founders, and people who sense there is more than the path they defaulted into — whether you are building something of your own or still inside a corporate world that no longer feels like yours.
2. When you reconnect to what actually lights you up, something shifts. Not just for you. The people around you feel it. Your team, your family, every room you walk into. A leader showing up coherent and authentic does not stay contained. It spreads.
3. My role is to help you hear yourself again. Underneath the conditioning, the fear of what people think, the stories about who you are supposed to be. You already have the wisdom. I create the space for you to access it.
4. There is nothing quite like watching someone realize the life they have been reaching for is not out of reach. It is yours to create.

---

### 9. `Journal`

**ID:** `journal`

**Background:** `bg-warm`, `py-32 px-6 md:px-12`

**Header row:** Title left, `View all` link right (stub `href="#"`)

**Eyebrow:** `Journal`

**Headline:**
> Thoughts from  
> *the work.* (italic, dust)

**Posts** (3-column grid, 1 column mobile) — **stub content only, no CMS yet:**

| Tag | Title | Excerpt | Date |
|-----|-------|---------|------|
| On Leadership | The AND you've been told you can't have | We learned early to put limitations on what's possible. A job that pays well AND feels meaningful. Success AND ease. What if those were never in opposition? | Coming soon |
| On Identity | What is your life well lived? | Imagine waking up tomorrow and the thing you've been working toward is simply there. What does that feel like? Not what does it look like — how does it feel? | Coming soon |
| On Fear | The opposite of fear isn't courage — it's love | The leaders who make the biggest shifts aren't fearless. They're finally connected to something bigger than their fear. | Coming soon |

**Card styling:** `bg-cream`, hover/focus `bg-white`, padding `p-10`

---

### 10. `Footer`

**Background:** `bg-navy`, relative overflow hidden, `py-16 px-6 md:px-12`

**Background:** `<Stars count={20} />`

**Layout:** Flex row, wraps/stacks on mobile

**Left:**
- `Maddison Miller` — display, cream, light
- `Leadership · Clarity · Alignment` — uppercase dust

**Center (flex-1, italic display):**
> All in service of your life, well lived.

**Right:** `© 2026` — small dust text

---

## Stubs & Pending (do not invent)

| Item | Status |
|------|--------|
| About bio narrative | Placeholder copy in spec — Maddison to refine |
| About photo | MM monogram placeholder |
| All "Book a Call" / "Book a Discovery Call" links | `href="#"` until calendar URL provided |
| Journal posts | Stub cards only — no CMS, no routes |
| Journal "View all" | `href="#"` stub |
| Group Immersive service | Listed but may be "coming soon" in practice |

---

## Coding Standards

Apply to every file in the rebuild:

1. **TypeScript strict** — no `any`; explicit prop types; explicit return types on non-trivial functions
2. **One component per file, one responsibility** — no monolithic `site.tsx`
3. **Tailwind only** — no inline styles except dynamic canvas/runtime values
4. **Semantic HTML** — `nav`, `main`, `section`, `footer`, `article`, correct heading hierarchy
5. **Accessibility** — `aria-label` on interactive elements; keyboard nav for canvas; WCAG AA contrast; meaningful `alt` on images
6. **Performance** — canvas `requestAnimationFrame` cleanup on unmount; `useMemo`/`useCallback` where props/deps warrant it
7. **Constants** — anchor IDs and repeated strings in `lib/constants.ts`
8. **No `console.log` in committed code**

---

## Responsive Behavior

Every section must read intentionally on mobile:

- Nav links hidden below md; CTA remains visible
- Hero headline wraps on small screens (`whitespace-normal`)
- Constellation: single column, canvas full width
- WorkWithMe / Journal grids: single column below md
- About grid: single column below md
- QuoteBreak: reduced padding, adjusted quote font sizing
- Footer: column layout on mobile, left-aligned tagline
- Touch targets comfortable (min ~44px for buttons)
- Headline hierarchy holds at all breakpoints

---

## Dependencies to Add

The new scaffold has Next/React/Tailwind only. Add fonts:

**Option A (recommended):** `next/font/google` in `layout.tsx` for Cormorant Garamond + DM Sans

**Option B:** `@fontsource/cormorant-garamond` + `@fontsource/dm-sans` imported in `globals.css`

No other runtime dependencies required. Constellation uses native Canvas API.

---

## Brand Context (for tone-checking copy)

When evaluating any new copy or design decision, ask: **Does this feel like Maddison? Does this feel true?**

The site speaks to three stages of the client journey:
- **Before:** disconnection, scattered focus, something missing
- **During:** courage to look inward, discomfort and opening
- **After:** clarity, alignment, leading from authentic self

Philosophy in one line: *The answer already lives in you. Maddison helps you find your way back to it.*

Future vision (not in scope for initial build): blog/CMS for Journal, Calendly or similar for booking, real About photo and finalized bio.
