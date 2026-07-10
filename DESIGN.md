# Design Brief

## Direction

Gateway Solutions, Inc. — Professional IT consulting firm identity with premium modern aesthetic combining sky blue serenity with navy authority and gold luxury.

## Tone

Refined corporate with creative flair: premium technology services executed with distinctive golden shimmer effects and professional botanical accents, bold yet trustworthy.

## Differentiation

Animated parabolic technology waves as background, golden shimmer sweep on company name in hero, vibrant dotted flower decorations in multi-color palette, and navy/red arc bracket design reflecting brand identity.

## Color Palette

| Token        | OKLCH          | Role                              |
|:-------------|:---------------|:----------------------------------|
| background   | 0.86 0.16 203  | Sky blue page backgrounds         |
| foreground   | 0.15 0.03 240  | Dark navy text on light surfaces  |
| primary      | 0.28 0.09 253  | Navy buttons and interactive      |
| accent       | 0.72 0.18 65   | Gold highlights, badges, dividers |
| destructive  | 0.577 0.245 27 | Crimson alerts and callouts       |
| muted        | 0.93 0.04 85   | Subtle backgrounds, dividers      |

## Typography

- Display: Bricolage Grotesque — hero company name, section headings, bold wordmark
- Body: Plus Jakarta Sans — body copy, descriptions, form fields
- Scale: hero 48–56px bold, h2 32px, h3 24px, body 16.8px, label 14px

## Elevation & Depth

Cards elevated with subtle shadows (4–12px offset), sky blue background creates spaciousness, navy navy navy primary surfaces establish hierarchy, gold accents draw attention without overwhelming.

## Structural Zones

| Zone      | Background              | Border                 | Notes                                      |
|:----------|:------------------------|:----------------------|:-------------------------------------------|
| Header    | sky blue or transparent | subtle gold underline  | Logo + triangle GSI badge + nav menu       |
| Hero      | sky blue                | none                  | Animated waves, shining company name, arcs |
| Content   | sky blue               | none                  | Card sections with alternate navy accents  |
| Footer    | navy primary            | gold top border        | Social links, copyright, contact info      |

## Spacing & Rhythm

Section padding 80px vertical / 32px horizontal on desktop, 48px / 16px mobile; micro-spacing 8px / 12px / 16px increments; gap between company name and tagline intentional (12px), wavering background adds visual rhythm without motion fatigue.

## Component Patterns

- Buttons: Rounded 8px, navy primary with white text, gold accent on hover, smooth 300ms transition
- Cards: Rounded 12px, white or light muted background, 4–12px shadow depending on elevation, navy borders on focus
- Badges: Triangle GSI with gold border, round service badges with navy/gold combination, dotted flower accents in vibrant teal/rose/amber/violet/emerald

## Motion

- Entrance: Fade-up 600ms ease-out on scroll, staggered content reveals
- Hover: Button background shift 200ms cubic-bezier(0.4, 0, 0.2, 1), shadow elevation increase
- Decorative: Shimmer sweep on hero text (2.5s linear infinite), parabolic wave animation on background (3s ease-in-out infinite), dotted flowers fade-in (1.8s ease-out)

## Constraints

- Never use raw colors; always use CSS variables from OKLCH palette
- Watermarks and background effects must not interfere with content readability
- Responsive: mobile-first design, all text remains single-line where intentional
- Animations must be GPU-accelerated and performant across all devices

## Signature Detail

Golden shimmer sweep across "Gateway Solutions, Inc." in hero section paired with flanking navy and red arc brackets, creating a premium wordmark effect that reflects the uploaded logo and establishes instant brand recognition.
