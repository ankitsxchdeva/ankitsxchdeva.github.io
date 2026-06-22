---
name: Ankit Sachdeva
description: Personal portfolio. A quiet workshop in ink and lavender paper.
colors:
  ink-plum: "#30292f"
  lavender-paper: "#f5f4fa"
  signal-indigo: "#355691"
  wisteria-hover: "#5F5AA2"
  stone-lilac: "#6a6884"
  mist-border: "#d8d6e8"
  night-plum: "#1e1c22"
  pale-lavender: "#e8e4f4"
  wisteria-signal: "#8b87c8"
  sky-indigo: "#9db8dc"
  deep-stone-lilac: "#8e8aab"
  aubergine-border: "#413F54"
typography:
  display:
    fontFamily: "Lato, Verdana, Helvetica, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  body:
    fontFamily: "Lato, Verdana, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  title:
    fontFamily: "Lato, Verdana, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.4
  label:
    fontFamily: "Lato, Verdana, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: "Lato, Verdana, Helvetica, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "monospace"
    fontSize: "12px"
    fontWeight: 400
rounded:
  hairline: "2px"
  sm: "4px"
  full: "50%"
spacing:
  xs: "0.25em"
  sm: "0.5em"
  md: "1em"
  lg: "1.75em"
  xl: "3.5em"
components:
  link:
    textColor: "{colors.signal-indigo}"
  link-hover:
    textColor: "{colors.wisteria-hover}"
  cool-entry:
    backgroundColor: "transparent"
    padding: "1em 0"
  cool-title:
    textColor: "{colors.ink-plum}"
    typography: "{typography.title}"
  cool-description:
    textColor: "{colors.stone-lilac}"
    typography: "{typography.body}"
  cool-date:
    textColor: "{colors.stone-lilac}"
    typography: "{typography.label}"
  cool-domain:
    textColor: "{colors.stone-lilac}"
    typography: "{typography.meta}"
  track-item:
    backgroundColor: "transparent"
    padding: "5px 8px"
  tab-link:
    textColor: "{colors.stone-lilac}"
    typography: "{typography.label}"
  tab-link-active:
    textColor: "{colors.ink-plum}"
  kbd-shortcut:
    textColor: "{colors.ink-plum}"
    rounded: "{rounded.hairline}"
    padding: "0 2px"
---

# Design System: Ankit Sachdeva

## 1. Overview

**Creative North Star: "The Quiet Workshop"**

The site reads as a place where someone makes things. The surface is tinted paper, the ink is plum, the only accent is a deep indigo that earns its presence by being the only color in the room. Restraint is the voice; craft is the proof. Nothing here is shouting, and the absence of shouting is the signal: the person whose work this is doesn't need to.

The reference lane is tech-minimal SaaS-adjacent: Stripe, Vercel, Linear marketing. Precise spacing, deliberate typography, motion that earns its place. What this is explicitly not: a Linktree, an AI-generated portfolio template (no purple gradients, no fake metrics, no skill bars, no identical cards), a maximalist designer portfolio (no scroll choreography, no oversized hero imagery, no custom cursors), or a corporate "available for hire" site (no CTA buttons, no services grid, no testimonials). It is also not editorial-magazine costume: no display-serif italic drop caps, no broadsheet grid, no tracked all-caps section labels.

The site keeps a small set of memorability hooks intact: the squiggle hover under links, the lowercase nav, the kbd-shortcut badges next to tab names, the keycaps-and-TFT line in the bio. Those make the surface readable as Ankit's rather than as a template. They stay.

**Key Characteristics:**
- One accent color, used as link only. Lavender-tinted neutrals carry everything else.
- Lato across the entire system. Hierarchy comes from weight (400 / 600 / 700) and size, not from a second family.
- No shadows. Depth comes from borders and tonal layering on the same hue family.
- Motion is small and serves state: link hover, tab underline, panel entrance. No scroll choreography.
- Light and dark themes hold the same identity; both are tinted toward plum/lavender.

## 2. Colors: The Ink-and-Paper Palette

A nearly monochromatic system: tinted neutrals on a lavender-paper surface, with a single saturated indigo as the only chromatic accent. The palette behaves like good stationery.

### Primary
- **Signal Indigo** (`#355691`): Link color in light theme. The only saturated voice in the system. Used on every interactive text element and nowhere decorative.
- **Wisteria Hover** (`#5F5AA2`): Link hover color in light theme. Slightly lighter and warmer than Signal Indigo, so hover reads as lift rather than press.
- **Wisteria Signal** (`#8b87c8`): Link color in dark theme. Lighter and more violet to hold its weight against the night-plum surface.
- **Sky Indigo** (`#9db8dc`): Link hover color in dark theme. Pulls cooler on hover.

### Neutral
- **Plum Ink** (`#30292f`): Primary text color in light theme. Near-black, tinted purple by ~0.005 chroma. Never `#000`; the tint is the point.
- **Lavender Paper** (`#f5f4fa`): Page background in light theme. Pale lavender, not white. Never `#fff`; the tint is the point.
- **Stone Lilac** (`#6a6884`): Secondary text in light theme (cool descriptions, dates, domains, tab labels at rest). The "quiet" voice. Tuned to clear WCAG AA 4.5:1 on Lavender Paper.
- **Mist Border** (`#d8d6e8`): Hairline borders and dividers in light theme. Also the hover background on track-items.
- **Night Plum** (`#1e1c22`): Page background in dark theme.
- **Pale Lavender Mist** (`#e8e4f4`): Primary text color in dark theme.
- **Deep Stone Lilac** (`#8e8aab`): Secondary text in dark theme. Tuned to clear WCAG AA 4.5:1 on Night Plum.
- **Aubergine Border** (`#413F54`): Hairline borders and dividers in dark theme.

### Named Rules

**The One Voice Rule.** Signal Indigo (and its dark-theme twin Wisteria Signal) is the only saturated color in the system. It marks interactivity, nothing else. Never use it on a background, never on a divider, never on a non-interactive label. Its rarity is the signal that something is a link.

**The Tinted Neutral Rule.** Every neutral is tinted toward the brand hue (lavender/plum). Pure `#000` and pure `#fff` are forbidden, in both themes. The chroma is small (≤0.01) but consistent across the palette. If a new neutral is added, it tints with the family or it doesn't ship.

**The Twin-Theme Rule.** Light and dark themes carry the same identity. Both tint toward plum/lavender. Dark is not a "tools look cool dark" reflex; it is the same workshop with the lights off. Switching themes should feel like one space at two times of day, not two different spaces.

## 3. Typography

**Body and Display Font:** Lato (with Verdana, Helvetica, system sans-serif fallback).
**Mono Font:** the system monospace stack (used for kbd shortcuts, track numbers, track durations).

**Character:** Lato is a workhorse humanist sans. Warm enough to feel personal, neutral enough to disappear behind the content. It is deliberately not Inter / Plus Jakarta / Outfit / Instrument Sans (the current saturated AI-portfolio sans defaults). Lato has been on this site through multiple iterations; the family is identity, not a fresh pick.

### Hierarchy

- **Display** (weight 400, 32px, letter-spacing -0.5px): Only the name `h1` ("Ankit Sachdeva") on the home tab. Single use. Letter-spacing is tight so the name reads as a marker, not a banner.
- **Title** (weight 600–700, 14–15px): Cool entry titles, track names, playlist names, embed headers. Bold-on-body within the same family.
- **Body** (weight 400, 15px, line-height 1.65): All paragraph text in the bio and cool descriptions. Line-height generous so the bio reads as a personal essay rather than as resume bullets.
- **Label** (weight 400, 12–14px, color Stone Lilac): Tab labels, dates, cool descriptions, track artists, track durations. The "quiet" tier; sits muted next to the title tier.
- **Meta** (weight 400, 11–13px, color Stone Lilac, opacity 0.7): Cool entry domain badges, playlist track count. The smallest readable tier; signals "secondary metadata" without taking attention.
- **Mono** (12px, weight 400, color Stone Lilac): Track numbers, track durations, kbd shortcut badges. Tabular signal — the row reads as a list-item, not as prose.

### Named Rules

**The One Family Rule.** Lato carries the entire system. Hierarchy comes from weight, size, and color, not from adding a second family. A display serif on top of Lato would be costume.

**The Lowercase Voice Rule.** Tab labels (`hi`, `music`, `blog`, `cool`) and section headers are lowercase. The site's name is title-case. Lowercase navigation is voice, not casing inconsistency; it makes the surface feel hand-set rather than corporate.

**The kbd-as-Affordance Rule.** Monospace superscript shortcut badges (`¹`, `²`, `⁴`) appear only on tabs whose shortcuts actually work. If a shortcut is not wired, the badge is not shown. Badges are not decoration; they are honest UI.

## 4. Elevation

No shadows. The system is flat by default and uses tonal layering on the same hue family to convey depth.

Depth strategy:
- Borders (`1px` solid in Mist Border / Aubergine Border) separate cool entries, music tracks, and embed headers.
- Hover and focus states use color shifts, not lift: link color changes, track-item gets a Mist Border background, tab underline grows from 0 to 100%.
- The headshot is the only "rounded" element with visual weight, and it carries no shadow.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow`. No `filter: drop-shadow`. No glassmorphism. Depth is conveyed via borders and tonal hue layering. If a future component genuinely needs depth, prove the case first; the default answer is "no shadow."

**The Border-Hairline Rule.** All borders are `1px solid`. Side-stripe borders (`border-left` or `border-right` greater than 1px as a colored accent) are absolutely forbidden; they are the most common AI-portfolio tell.

## 5. Components

### Links
- **Character:** restrained, but distinctive on hover.
- **Style:** Signal Indigo (light) / Wisteria Signal (dark), no underline at rest, no background, no padding.
- **Hover:** color shifts to Wisteria Hover (light) / Sky Indigo (dark). A 12×4px SVG squiggle appears as a background-image underline, animating background-position infinitely on a 0.3s linear loop. The squiggle is the signature: it is small, fast, and only present on hover.
- **Focus-visible:** 2px solid outline in Wisteria Hover, offset 3px, with a 2px border-radius for soft corners. Outline appears on keyboard focus only, never on mouse focus.
- **Reduced motion:** the squiggle animation is suppressed; the underline still appears as a static SVG.

### Tab Navigation
- **Character:** quiet, signal-only, with an animated underline that earns its presence.
- **Style:** lowercase Lato labels at 14px, color Stone Lilac at rest, Plum Ink when active or hovered.
- **Underline:** absolutely positioned 1px bar at the bottom of the tab; width animates from 0 to 100% on hover and active state, with `transition: width 0.25s ease`. The underline does not appear on disabled tabs.
- **Disabled tab** (e.g. "blog — coming soon"): rendered as a `<span>` rather than `<a>`, opacity 0.4, no underline animation, no kbd badge. Honest UI: the tab does not advertise affordances it doesn't have.
- **kbd badges:** monospace 8px superscript, hairline border in Plum Ink, opacity 0.35 at rest and 0.8 when the tab is hovered or active. Indicates the keyboard shortcut for the tab.

### Cool Entry
- **Character:** indexed, scannable, designed to grow over years without losing rhythm.
- **Layout:** CSS grid, `80px 1fr` columns. Left column holds the date (Label tier, Stone Lilac). Right column holds the title (Title tier, Plum Ink, with optional domain badge in Meta tier inline), then the description (Body tier, Stone Lilac).
- **Border:** Mist Border / Aubergine Border on the bottom. The first entry also gets a top border, so the list reads as a bracketed stack.
- **Entrance motion:** entries fade in and translate up 14px → 0 as they intersect the viewport. Stagger delay is `i * 0.07s`, capped at `0.6s` so the last entry in a long list never feels laggy. Reduced motion turns the stagger off entirely.

### Track List Item
- **Character:** tracklist-shaped, machine-precise, static. The row is text, not a button.
- **Layout:** CSS grid, `20px 1fr auto` columns. Mono track number (right-aligned), title + artist inline-baseline, mono duration. Border-bottom in Mist Border between rows.
- **Hover:** none. Track rows are not interactive; suggesting clickability where there is none was the failure mode we removed. Honest UI: static text, no hover affordance.
- **Density:** padding `5px 8px` with a `-8px` negative horizontal margin to align the row's content with the surrounding list optical edges.

### Cool Domain Badge
- **Character:** "where this link goes," whispered.
- **Style:** Meta tier (11px, weight 400, Stone Lilac, opacity 0.7), inline next to the cool title with `margin-left: 0.4em`. Never bold, never colored, never bordered.

### Headshot
- **Character:** the one image on the site; carries weight by being the only one.
- **Shape:** perfect circle (`border-radius: 50%`).
- **Behavior:** square source asset, `width: 100%; height: auto; max-width: 100%`. Width 37% of the bio-layout on desktop; on mobile it shrinks to a 56px avatar that shares a header row with the name (the bio-cell box is dissolved via `display: contents` so the photo and name align, with the bio paragraphs spanning full width below). The photo reads as a profile avatar, not an orphaned footer.
- **Loading:** `<picture>` with WebP source and JPG fallback, 1x and 2x srcset, `fetchpriority="high"`, `decoding="async"`. The headshot is preloaded in `<head>` so first paint includes it.

### Selection
- **Style:** background Signal Indigo, text Lavender Paper. Tinted on both sides; no pure white.

## 6. Do's and Don'ts

### Do:
- **Do use** Signal Indigo (`#355691`) as the only chromatic color. It marks interactivity. Treat its rarity as the system's voice.
- **Do tint every neutral** toward the lavender-plum hue family. `#f5f4fa`, `#30292f`, `#1e1c22`, `#e8e4f4` are tinted on purpose. Pure `#000` and `#fff` are forbidden.
- **Do carry typography hierarchy through weight and size in a single family.** Lato 400 / 600 / 700 covers the entire system.
- **Do animate state transitions** in 0.15s–0.30s with `ease` for now (long-term: migrate to ease-out-quart or quint for state transitions, ease-out-expo for entrances).
- **Do honor `prefers-reduced-motion: reduce`** on every entrance, hover loop, and panel transition. Already done; new features must keep this.
- **Do keep the squiggle hover, lowercase nav, kbd badges, and the keycaps-and-TFT line in the bio.** Those are the memorability hooks.
- **Do use lowercase for nav and section labels.** Title case is reserved for the name and proper nouns.
- **Do verify keyboard shortcuts before showing kbd badges.** A badge that doesn't work is a lie.

### Don't:
- **Don't add a second font family.** Lato carries the system. A display serif on top of Lato is editorial-magazine costume.
- **Don't add purple gradients, fake metrics, skill bars, identical icon-heading-paragraph cards, or generic stock photography.** Every one of those is in PRODUCT.md's anti-references as AI-generated portfolio reflex.
- **Don't add a Linktree-style stack of pill buttons** over a tinted background. The site is not a directory.
- **Don't add a "available for hire" CTA button, services grid, testimonial carousel, or "let's work together" footer.** The site is an engineer, not an agency.
- **Don't add scroll-driven choreography, oversized hero imagery, custom cursors, or section-by-section art direction.** Maximalist designer portfolio is the wrong lane.
- **Don't add a `box-shadow` anywhere.** The system is flat. Depth comes from borders and tonal layering. If a new component appears to need shadow, the component is wrong, not the rule.
- **Don't use `border-left` or `border-right` greater than 1px as a colored accent.** Side-stripe borders are the absolute ban; rewrite with full borders, background tints, or nothing.
- **Don't use `background-clip: text` with a gradient.** Gradient text is decorative and meaningless here.
- **Don't introduce a second saturated color.** Signal Indigo is the One Voice; a second chromatic accent breaks the palette mechanics.
- **Don't reintroduce kbd badges on tabs whose shortcuts don't work.** The badge is an affordance promise; honor it.
- **Don't use em dashes** in new UX copy or metadata. Use commas, colons, semicolons, or parentheses. (Note: existing user-authored em dashes in PRODUCT.md / bio prose are identity-preserved.)
- **Don't trim the playful elements** to look "more serious." Removing the squiggle, the lowercase tabs, the kbd badges, or the music/cool tabs would convert the site into a template. That is the failure mode the entire PRODUCT.md is built to avoid.
