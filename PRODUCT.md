# Product

## Register

brand

## Users

Technical recruiters, hiring managers, and senior engineers evaluating Ankit Sachdeva as a software engineering hire (full-time or contract). They land here from a resume, a LinkedIn profile, a GitHub link, or a referral, often with several other portfolios open. They have 30 to 60 seconds to decide whether to reach out.

Secondary readers: collaborators on side projects (home-server, Glance), other engineers who arrived from a blog post or GitHub repo, and friends who already know Ankit and check in periodically.

## Product Purpose

A personal portfolio that converts qualified recruiter and engineer attention into inbound (email, LinkedIn, recruiter outreach). The site is the digital front door: credibility is established in the first fold, supporting work and personality fill in the rest.

Success looks like:
- A recruiter scanning the home tab in under 30 seconds and coming away with "current role, recent companies, what he's known for, how to reach him."
- An engineer following links to live projects (home-server, Glance, gstack-adjacent work) without friction.
- A returning visitor finding the music and cool feeds updated, so the site feels alive rather than archival.

The non-goals matter too: this is not a Linktree, not an agency site, not a designer-for-hire portfolio. It does not have a services grid, a CTA button, testimonials, or pricing.

## Brand Personality

Considered. Polished. Personal.

Three-word voice: senior engineer who makes things. The tone is confident without being loud, technical without being cold, and personal without being indulgent. The site signals taste through restraint and craft, not through ornament.

It should feel like the person you'd want on your team: thoughtful, hands-on, opinionated where it matters, unbothered where it doesn't.

## Anti-references

Specific things this should NOT resemble:

- **Linktree / Carrd / link-in-bio pages.** A stack of pill buttons over a gradient reads as low-effort and unsigned. The site is not a directory; it is a person.
- **AI-generated portfolio templates.** No purple gradients, no fake-impressive metrics ("100+ projects shipped"), no skill bars or skill clouds, no identical icon-heading-paragraph cards, no generic stock photography.
- **Maximalist designer portfolios.** Loud color drenches, ambitious scroll-driven motion, oversized hero imagery, custom cursors. Those read as "designer for hire," not "engineer who ships."
- **Corporate 'available for hire' sites.** Big hero with a single CTA button, services list, three-column "what I do" grid, testimonial carousel, "let's work together" footer. Those read as agency, not individual.
- **Editorial-magazine costume.** Display-serif italic drop caps, three-column broadsheet grids, all-uppercase tracked labels above every section. The site is not a magazine; cosplaying as one is the second-order AI-portfolio reflex.

## Design Principles

1. **Polish, not personality transplant.** The site already has voice (squiggle hover, lowercase tabs, music + cool feeds, the keycaps and TFT links in the bio). Polish tightens visual craft without sanding off character. Removing playful elements to look "more serious" is a failure mode.

2. **Recruiter time is the constraint.** The home tab must surface current role, recent companies, and what Ankit is known for inside the first viewport. Everything else (hobbies, music, cool, blog when it ships) is supporting depth, not the headline.

3. **Tech-minimal precision.** The reference lane is Stripe, Vercel, Linear marketing: clean sans, deliberate spacing, restrained color, motion that earns its place. Not editorial-typographic, not brutalist, not maximalist. Visual craft is the credential.

4. **Distinct, not loud.** The squiggle hover, the lowercase nav, the kbd shortcut badges, and the keycaps line in the bio are the memorability hooks. They make the site readable as Ankit's rather than as a template. Keep them. Loudness (big color, scroll choreography, oversized type) is what the anti-references do; we don't need it.

5. **Long-lived, not trendy.** This site has had multiple iterations and will outlast any specific design trend. Avoid 2026-coded moves (specific gradients, glassmorphism, current-cycle motion patterns) that will date in 18 months. The goal is a surface that still reads as polished in 2030.

## Accessibility & Inclusion

WCAG 2.1 AA as the baseline. The site already ships the right defaults: `prefers-reduced-motion` honored for the body fade-in, link squiggle, tab nav, and panel transitions; `focus-visible` with a clear outline; semantic HTML (`nav`, `main`, `h1`, real `<a>` tags); descriptive alt text on the headshot; viewport meta for mobile.

Keep these guarantees as the bar:
- All text passes WCAG AA contrast in both light and dark modes.
- All interactive elements reachable by keyboard, with visible focus state.
- All motion respects `prefers-reduced-motion: reduce`.
- All meaningful images have alt text.
- Keyboard shortcuts (`1`, `2`, `4`) do not interfere with normal typing and are skipped in input fields.

When adding features, the bar holds: anything new must clear the same accessibility line before shipping.
