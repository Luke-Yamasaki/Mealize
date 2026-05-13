# Mealize UI Library — Catalog

The catalog of primitives in `components/mealize/ui/`. Every new Mealize feature should compose from these. When a needed primitive doesn't exist yet, it's added here in the same PR that uses it — and gets an entry below.

## Policy

- **No `components/ui/` (shadcn) imports from this folder.** Mise-en-mode is the canonical theming layer.
- **No literal hex in component class strings.** Colors come from `var(--mz-...)` tokens declared in `app/intents.css`.
- **No `variant`/`color` props selecting palette.** Palette selection happens at the call site via a `data-mode` wrapper. `variant` is only for structural choices (filled vs. outlined, compact vs. drawer size, etc.).
- **No `hover:` / `focus:` color classes in component CSS.** Interactive-state token reassignment lives in `app/intents.css` mode rules. The component declares the rest state only.

## Sections

- [Layout](#layout) — `AppShell`, `AppHeader`, `AppHeaderPlaceholder`, `AppHeaderRow`, `Stack`, `SkipToMainLink`
- [Typography](#typography) — `Heading`, `Text`, `Link`
- [Actions](#actions) — `Button`, `NavAuthButton`, `NavPrimaryCtaLink`, `NavPrimaryCtaButton`
- [Navigation](#navigation) — `NavIconLink`
- [Brand](#brand) — `BrandLogo`

---

## Layout

### `AppShell`

**Use when** building a page that needs the standard header/main/footer chrome. Composes a measured top-chrome region (header + any sub-bars), a `<main>` with computed minimum height, a footer, and an optional modal slot.

**Don't use when** you need a non-standard layout (full-bleed marketing pages, embedded contexts, modal-only routes). For those, render `MealizeShell` directly and lay out children yourself.

**Composition:** Renders `<div class="flex min-h-dvh">`, a measured wrapper around the `header` slot, a `<main id="main-content">`, the `footer` slot, and the `modals` slot. Uses `ResizeObserver` on the header region to keep `<main>` min-height correct as chrome height changes.

---

### `AppHeader`

**Use when** rendering the primary site header inside an `AppShell`. Provides the sticky brand-gradient surface, the labelled `<nav>`, and the standard z-index. Children are the row content.

**Don't use when** the page needs a non-Mealize header (e.g., an auth-flow embedded view with no chrome). Don't nest two `AppHeader`s.

**Composition:** `<header class="sticky top-0 z-200 bg-linear-to-b from-[#76D97E] to-[#28A690]"><nav aria-label="Primary">{children}</nav></header>`. The gradient is a structural decision in this primitive, not a mode-driven token (the brand is part of the chrome identity).

---

### `AppHeaderPlaceholder`

**Use when** the header is loading or auth state is being resolved and you want to preserve the chrome height without rendering nav content. Returns the same 50px sticky bar with the brand surface.

**Don't use when** the header simply has no content — render `AppHeader` with no children instead of using the placeholder.

**Composition:** Same height and surface as `AppHeader`, no `<nav>`.

---

### `AppHeaderRow`

**Use when** laying out content inside an `AppHeader`. Picks the canonical row treatment for one of the two recognized variants: `welcome` (single horizontal row, mega-menu in middle) and `default` (logo + search + actions, collapsing to 2-row grid on mobile).

**Don't use when** the page needs a third row treatment. If a new variant emerges, add it to `AppHeaderRow` rather than building a one-off inside a feature file.

**Composition:** A `<div>` with one of two pre-defined class strings selected by `variant`.

---

### `Stack`

**Use when** you need a flex row or column with consistent gap, alignment, or wrap behavior. Replaces ad-hoc `flex gap-X` constructs.

**Don't use when** the layout needs CSS grid, sticky positioning, or precise pixel-level control — drop to raw classes for those.

**Composition:** `<div>` (or `as`) with `flex`, direction, gap (from the `none|xs|sm|md|lg|xl|2xl` scale), and optional align/justify/wrap. Gap maps to Tailwind `gap-N`.

---

### `SkipToMainLink`

**Use when** any time `AppShell` renders. Must be the first focusable element on the page so keyboard users can jump past the header.

**Don't use when** the page intentionally has no `<main>` (none currently). The link targets `main-content` by default; `AppShell` puts that id on its `<main>`.

**Composition:** `<a>` styled `sr-only` until focused, then becomes a fixed-position pill.

---

## Typography

### `Heading`

**Use when** rendering a section title or page title. Takes `level` (1–6) which controls both the semantic element AND the visual size.

**Don't use when** the visual weight is purely decorative — use `<Text>` with a bigger `weight` for emphasized prose. Don't pick a `level` for visual hierarchy that conflicts with the doc outline (use `as` to override the semantic element while keeping the size).

**Composition:** `<h1>`–`<h6>` (per `level`) with a type-scale + weight + tracking class.

---

### `Text`

**Use when** rendering body, supporting, or helper copy. `intent` is `primary` (body), `secondary` (muted supporting), or `auxiliary` (caption / fine print).

**Don't use when** the text is structural (a button label, a nav link label) — those are handled by their own primitives. Don't pass arbitrary `className` to override the intent's font size; if you need a different size, you probably need a different intent.

**Composition:** `<p>` by default (override with `as`) with intent-mapped type/color classes. Typography migrates to `var(--mz-text_*_*)` once those intents are populated in `intents.css`.

---

### `Link`

**Use when** rendering inline text navigation — a word or phrase inside prose that links elsewhere. `external` opts into `target="_blank"` + safe rel attrs.

**Don't use when** the affordance is "perform an action" — use `<Button>` instead. Don't use for primary navigation chrome — use `<NavIconLink>` for navbar icons or compose into the nav structure.

**Composition:** `<NextLink>` for internal (with `prefetch={false}` default), `<a target="_blank">` for external. Underlined with mode-aware color.

---

## Actions

### `Button`

**Use when** rendering a button-shaped action that's NOT (a) auth-specific or (b) a navbar CTA. General-purpose: form submits, dialog confirms, inline actions inside content.

**Don't use when** the action is sign-up / sign-in — those are `NavAuthButton`. Don't use when the action is the navbar's primary CTA — that's `NavPrimaryCtaLink` / `NavPrimaryCtaButton`. Don't pass `variant` to pick a different palette (signup, signin, etc.) — wrap in `<div data-mode="...">` at the call site instead.

**Composition:** `<button>` with one of three structural variants (`filled` / `outlined` / `ghost`) and three sizes (`sm` / `md` / `lg`). Reads `var(--mz-action_primary_*)`; the closest `data-mode` ancestor picks the palette.

---

### `NavAuthButton`

**Use when** rendering a Sign-up or Log-in action in the navbar (compact) or mobile drawer (drawer). `mode` chooses between `signup` (amber/yellow) and `signin` (teal) palettes.

**Don't use when** the action is anything other than the canonical sign-up / sign-in CTAs. Don't use outside auth context — the amber/teal colors carry semantic weight specific to those flows. Hero-scale CTAs on the welcome page are a candidate for an eventual `hero` size; today those are inline in `mealize-welcome.tsx`.

**Composition:** `<div data-mode={mode}>` with `display: contents` wrapping a `<Link>` styled from `var(--mz-action_primary_*)`. Two sizes (`compact`, `drawer`).

---

### `NavPrimaryCtaLink` / `NavPrimaryCtaButton`

**Use when** rendering the primary action in the navbar — "New post" for managers, "Log out" for non-managers, or any equivalent navbar-context action. Pick `Link` for hrefs, `Button` when the action needs a click handler (especially for things like Clerk's `<SignOutButton>` wrapper).

**Don't use when** the action is auth-specific (use `NavAuthButton`). Don't use as a generic button — that's `<Button>`.

**Composition:** Either a Next.js `<Link>` or a `<button>`, styled with the green CTA palette (currently a static `bg-[#9AF2C0]` — a candidate for migrating to `var(--mz-action_primary_*)` once the green CTA gets its own mode wrapper, e.g., `data-mode="default cta"`).

---

## Navigation

### `NavIconLink`

**Use when** rendering a circular icon-only nav link inside the navbar (e.g., Deliveries / Messages / Organizations). Active state is automatic via `usePathname`.

**Don't use when** the link is for prose or inline text — that's `<Link>`. Don't use without providing both `title` AND a visible icon child — the title becomes the accessible name.

**Composition:** Next.js `<Link>` with a `size-9 rounded-full` shell. Sets `aria-current="page"` when the path matches. Always 1px ring on active state for keyboard parity with hover.

---

## Brand

### `BrandLogo`

**Use when** rendering the Mealize wordmark + glyph as a clickable home link, typically in `AppHeaderRow`.

**Don't use when** you need just the glyph without the wordmark or the link wrapper — use `MealizeNavLogo` (the SVG component) directly.

**Composition:** Next.js `<Link>` to `/` by default, with the motiva-sans wordmark and the inline `MealizeNavLogo` SVG. Reads the current theme to swap glyph fill color. The font (`motiva-sans`) is currently set inline; a future bite migrates it to `var(--mz-text_primary_fontFamily)`.

---

## Gaps (candidates for next bites)

Components the Mealize UI library should grow toward, ordered by likely value:

1. **`Field` + `Input` + `Textarea` + `Select`** — form primitives. Almost any form work today reaches into shadcn `components/ui/`. Closing this gap is the highest-leverage next step.
2. **`Dialog`** — modal with focus trap, escape dismiss, restore focus. `MealizeModalRoot` exists but isn't a generic primitive.
3. **`Popover` / `Menu`** — replaces shadcn's popover used in `SettingsMenu`. Needed before `SettingsMenu` itself can move into the library.
4. **`Toast` / `Banner`** — feedback primitives. Currently no in-app notification surface exists.
5. **`Card`** — used implicitly everywhere; a primitive locks in surface treatment.
6. **`Avatar` / `Badge`** — small but pervasive.

Typography token population (`var(--mz-text_*_*)` currently `inherit` placeholders) is a parallel item — Text/Heading would migrate once those have values.
