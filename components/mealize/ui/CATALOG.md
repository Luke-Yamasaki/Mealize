# Mealize UI Library — Catalog

The catalog of primitives in `components/mealize/ui/`. Every new Mealize feature should compose from these. When a needed primitive doesn't exist yet, it's added here in the same PR that uses it — and gets an entry below.

## Policy

- **No `components/ui/` (shadcn) imports from this folder.** Mise-en-mode is the canonical theming layer.
- **Headless behavior libraries are OK.** `@base-ui/react` is acceptable for primitives that need focus management, positioning, or complex ARIA wiring (Popover, Menu, Dialog, Tooltip). Mealize wrappers provide the visual layer + mise-en-mode wiring; Base UI provides the behavior. Styled-component libraries (shadcn, MUI, Chakra) remain off-limits.
- **No literal hex in component class strings.** Colors come from `var(--mz-...)` tokens declared in `app/intents.css`.
- **No `variant`/`color` props selecting palette.** Palette selection happens at the call site via a `data-mode` wrapper. `variant` is only for structural choices (filled vs. outlined, compact vs. drawer size, etc.).
- **No `hover:` / `focus:` color classes in component CSS.** Interactive-state token reassignment lives in `app/intents.css` mode rules. The component declares the rest state only.

## Sections

- [Layout](#layout) — `AppShell`, `AppHeader`, `AppHeaderPlaceholder`, `AppHeaderRow`, `Stack`, `Separator`, `SkipToMainLink`
- [Typography](#typography) — `Heading`, `Text`, `Link`
- [Forms](#forms) — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
- [Actions](#actions) — `Button`, `NavAuthButton`, `NavPrimaryCtaLink`, `NavPrimaryCtaButton`
- [Overlays](#overlays) — `Popover`, `Dialog`, `Menu`, `Tooltip`
- [Surfaces](#surfaces) — `Card`, `Badge`, `Avatar`
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

### `Separator`

**Use when** you need a visible rule between items — between sections in a Popover/Menu, between rows in a list, between groups of controls. Provides `role="separator"` + `aria-orientation` so assistive tech announces the boundary.

**Don't use when** the separation is purely decorative — use Tailwind border utilities on the items themselves. Don't use to add whitespace; that's `Stack` gap.

**Composition:** Wraps `@base-ui/react/separator`. Renders a 1px line in `bg-border`; orientation is `horizontal` (default, full-width) or `vertical` (full-height column).

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

## Forms

### `Field`

**Use when** wrapping a form control (Input, Textarea, Select, etc.) with a label, optional helper text, and optional error. Owns the input id, helper/error ids, and the `aria-describedby` wiring — the child control reads them via context.

**Don't use when** rendering a control without a label (search inputs with placeholder-only, inline filters). For unlabeled inputs, use Input directly with an explicit `aria-label`. Don't render multiple inputs inside one Field — the label + describedby model assumes a single control.

**Composition:** `<div>` with a `<label htmlFor={id}>`, the child control, and either an error (`role="alert"`) or a helper element. Provides a context with `{ id, describedBy, invalid }` consumed by form-control primitives.

---

### `Input`

**Use when** rendering a text input. Inside a `<Field>`, picks up id / describedby / aria-invalid automatically. Outside a Field, accepts all those as standard input props.

**Don't use when** the control is a textarea, select, or other non-`<input>` element (each has its own primitive). Don't pass `variant` to choose a palette — control colors come from `var(--mz-control_*)`; the ancestor `data-mode` sets them.

**Composition:** `<input>` styled from `var(--mz-control_*)`, with a `focus-visible:outline-current` ring and an `aria-invalid:` variant that turns the border destructive when the field is in error state.

---

### `Textarea`

**Use when** rendering a multi-line text input — comments, descriptions, message composers. Defaults to 3 rows; `rows` prop overrides. Resizable on the y-axis by default.

**Don't use when** the input is single-line — use `<Input>`. Don't disable resize globally; if you need a fixed-size composer, override via `className` on the specific instance.

**Composition:** `<textarea>` styled from `var(--mz-control_*)`, same Field-context wiring as Input.

---

### `Select`

**Use when** the option list is short (under ~10) and values are simple strings. Native `<select>` provides the OS dropdown — accessible by default, keyboard searchable, mobile-friendly.

**Don't use when** options need rich rendering (icons, descriptions), search/typeahead, or multi-select. A future Combobox primitive will cover those cases. Don't use for fewer than 3 options where Radio is clearer.

**Composition:** `<select>` with `appearance-none` + an absolute-positioned `ChevronDown` icon. Field-context wiring identical to Input/Textarea.

---

### `Checkbox`

**Use when** rendering a boolean choice with its own label ("I agree to the terms", "Subscribe to updates"), or as a member of a multi-select list where each option is independent.

**Don't use when** the choice is mutually exclusive with siblings — use `Radio`. Don't wrap a Checkbox in `<Field>` — Checkbox renders its own label inline (right of the control). For grouped checkboxes (filter lists), render multiple Checkboxes with the group label provided by the caller.

**Composition:** Native `<input type="checkbox">` with `accent-[var(--mz-action_primary_backgroundColor)]` for the checked color. If `label` or `description` is passed, wraps in a `<label>` with text laid out to the right; otherwise renders bare.

---

### `Radio`

**Use when** rendering one option in a group of mutually exclusive choices. Group via shared `name` attribute — the browser handles exclusion.

**Don't use when** the choice is independent — use `Checkbox`. Don't use for binary choices (use Switch or a single Checkbox). For more than ~5 options, consider `Select` to save vertical space.

**Composition:** Same shape as Checkbox but `type="radio"` (no `rounded` class — native radios are circular). A future `RadioGroup` primitive will wrap the group with `role="radiogroup"` and shared labelling; for now, the caller provides the group label and `name`.

---

### `Switch`

**Use when** rendering a stateful toggle — preferences, feature flags, on/off settings that take effect immediately.

**Don't use when** the value is part of a form being saved on submit — use `Checkbox`. Switches imply "this is on/off right now"; checkboxes imply "this will be on/off after you save." Don't use for choices that need a deliberate confirmation step.

**Composition:** Visually hidden native `<input type="checkbox" role="switch">` (so keyboard and screen readers work natively), plus a sibling track/thumb element styled with `peer-checked:` variants. The track color flips to `var(--mz-action_primary_backgroundColor)` when on.

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

## Overlays

### `Popover`

**Use when** anchoring transient content to a trigger — display settings, secondary actions, mini-forms, inline detail views. Headless behavior comes from `@base-ui/react`: focus management, escape dismiss, click outside, ARIA wiring, and viewport-aware positioning are handled.

**Don't use when** the content is a list of selectable actions — use `Menu` (TODO). Don't use for modal interactions that need to block the page — use `Dialog` (TODO). Don't use for hover-revealed labels on icons — `Tooltip` (TODO). Don't put a `Popover.Content` inside another open panel — same panel-on-panel rule that drove the drawer's `<details>` disclosure.

**Composition:** `Popover.Root`, `Popover.Trigger`, `Popover.Content`, `Popover.Title`, `Popover.Description`, `Popover.Close`. `Content` collapses Base UI's `Portal + Positioner + Popup` into a single component, applies the surface styling via `var(--mz-surface_secondary_*)`, and accepts `side` / `align` / `sideOffset` / `collisionPadding` positioning props. For arrows, backdrops, or custom positioner behavior, drop to `@base-ui/react/popover` directly.

---

### `Dialog`

**Use when** the interaction needs to block the page — destructive confirmations, focused forms, content that requires explicit dismissal. Backed by `@base-ui/react/dialog`: focus trap, restore-on-close, escape dismissal, scroll lock, and `aria-modal` wiring are handled.

**Don't use when** the content is anchored to a trigger and doesn't need to block — that's `Popover`. Don't use as a routing destination — full-screen content belongs in a route. Don't stack dialogs (panel-on-panel rule); compose follow-up steps in the same dialog or route to a new page.

**Composition:** `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`, `Dialog.Close`. `Content` collapses Portal + Backdrop + Popup; sizes are `sm` / `md` / `lg` / `xl` (max-width). Surface via `var(--mz-surface_secondary_*)`. Backdrop is a 50%-opacity black with `backdrop-blur-sm`.

---

### `Menu`

**Use when** rendering a list of actions anchored to a trigger — overflow menus, action lists on cards or rows, account menus. Backed by `@base-ui/react/menu`: arrow keys, type-to-find, escape, and focus on the trigger after dismissal are handled.

**Don't use when** content is free-form (use `Popover`), or when the user is *choosing a value* rather than *triggering an action* (use `Select` or `Combobox`). Don't render dialogs from menu items inline — close the menu first, then open the dialog from its own trigger.

**Composition:** `Menu.Root`, `Menu.Trigger`, `Menu.Content`, `Menu.Item`, `Menu.Group`, `Menu.GroupLabel`, `Menu.Separator`. `Item` is pre-styled with `data-[highlighted]` hover/keyboard state and `data-[disabled]` opacity. For checkbox/radio menu items, link items, or submenus, drop to `@base-ui/react/menu` directly.

---

### `Tooltip`

**Use when** a short label clarifies an icon-only control or a truncated value. Hover or keyboard focus triggers it; escape or blur dismisses.

**Don't use when** the content is essential to understanding the control — if a user can't operate it without the tooltip, the label belongs in the control itself. Don't put interactive content inside (clicks won't reliably work — tooltips dismiss on blur). Don't use on mobile-only controls (no hover affordance).

**Composition:** `Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Content`, `Tooltip.Provider`. Surface uses `var(--mz-surface_auxiliary_*)` — inverted from the page (dark popup on light, light popup on dark). Mount `Tooltip.Provider` near the app root to share `delay` settings; without it, Base UI defaults apply.

---

## Surfaces

### `Card`

**Use when** grouping related content into a lifted, bordered surface — a list item that needs its own boundary, a panel of stats, a feature highlight. Compose with `Stack`, `Heading`, `Text` inside.

**Don't use when** the content needs no visual lift (use a plain `<div>` or `<Stack>`). Don't use as a Dialog substitute. Don't nest Cards three levels deep; collapse to plain Stack at that point.

**Composition:** `<div>` (or `as`) with `rounded-xl`, `shadow-sm`, border + surface from `var(--mz-surface_secondary_*)`, and a `padding` scale (`none` / `sm` / `md` / `lg`). No internal layout — consumer composes.

---

### `Badge`

**Use when** rendering a small inline status, count, or category — "New", "3", "BETA". Should fit beside body text without dominating.

**Don't use when** the label needs to convey emphasis on its own (use `Button` or a larger callout). Don't render long content — badges are at most 2–3 words. Don't pile up many badges next to each other; that's a list, not annotations.

**Composition:** `<span>` with `rounded-full`, border + surface from `var(--mz-surface_secondary_*)`, uppercase + tracking + small size scale (`sm` / `md` / `lg`). For loud / branded badges, wrap the call site in a `data-mode` that reassigns `surface_secondary`.

---

### `Avatar`

**Use when** representing a person, organization, or entity — alongside a name, in lists, or in mention contexts. Backed by `@base-ui/react/avatar`: shows the fallback while the image loads or on failure.

**Don't use when** the entity is non-personal (use an icon or logo). Don't use for decorative imagery. Avatars are identity-bearing — they need real `alt` text describing who/what they represent.

**Composition:** `BaseAvatar.Root` styled as `inline-flex` round bg-muted, with `BaseAvatar.Image` (only rendered if `src` provided) and `BaseAvatar.Fallback` (renders children — usually initials). Five sizes: `xs` / `sm` / `md` / `lg` / `xl`.

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

1. **`Combobox`** — searchable / typeahead select for option lists too long or rich for native `<Select>`. Build on `@base-ui/react/combobox`.
2. **`Toast` / `Banner`** — feedback primitives. Currently no in-app notification surface exists. Build on `@base-ui/react/toast`.
3. **`RadioGroup`** — wraps related `Radio`s with `role="radiogroup"` and shared label, replacing the current loose pattern.
4. **`Tabs`** — sectioned navigation within a page. Build on `@base-ui/react/tabs`.
5. **`Accordion`** — collapsible content sections. Build on `@base-ui/react/accordion`.
6. **`Progress`** — determinate / indeterminate progress indicator. Build on `@base-ui/react/progress`.

Migration items (existing usages that should move to the library when touched):

- `SearchShell` in `mealize-navbar.tsx` — last shadcn `Input` import in the navbar; migrate to Mealize `Input` once forms get a deeper pass.
- `MealizeModalRoot` — generic app-modal system; either deprecate in favor of `Dialog` or rebuild on top of it.
- Form usages in `mealize-new-post-form.tsx`, `mealize-onboarding-form.tsx`, etc. — migrate to `Field` / `Input` / `Textarea` / `Select`.
- Remaining `bg-gradient-*` in `mealize-organization-detail.tsx` and `mealize-new-post-form.tsx` — Tailwind v4 renamed to `bg-linear-*`.
- Typography token population (`var(--mz-text_*_*)` currently `inherit` placeholders) — `Heading` and `Text` migrate once those have values.

Typography token population (`var(--mz-text_*_*)` currently `inherit` placeholders) is a parallel item — Text/Heading would migrate once those have values.
