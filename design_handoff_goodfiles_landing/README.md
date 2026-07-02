# Handoff: goodfiles.eu Landing Page

## Overview
A single-page landing site for the agency **goodfiles.eu**. Retro 8-bit / pixel-art aesthetic on a solid brand-blue background. The page has one job: communicate the slogan and let a visitor copy the contact e-mail with one click. There is a tiny "About" menu that reveals a one-line joke bio.

## About the Design Files
The file in `reference/` (`Goodfiles Website.dc.html`) is a **design reference built in HTML** — a working prototype of the look, copy, and interactions, not production code to paste into your app. Recreate it in your target codebase's actual stack (plain HTML/CSS/JS, React, Vue, etc. — whatever the project already uses, or the simplest reasonable choice if this is a fresh repo). It's a static marketing page — a single static HTML/CSS/JS file (or one component, if the project is component-based) is entirely appropriate; no framework or backend is required.

Note: the reference file has some scaffolding at the top (`<script src="./support.js">`, `<x-dc>` wrapper, a `data-props` script tag) that is specific to the tool it was designed in — ignore/strip that, it is not part of the design.

## Fidelity
**High-fidelity.** Exact colors, fonts, spacing, and copy are final — recreate pixel-for-point.

## Screens / Views
Single screen, no routing.

### Landing Page
**Purpose:** Communicate the slogan, let visitor copy contact e-mail, optional "About" joke.

**Layout:**
- Full-viewport-height flex column: top bar → centered main content → footer.
- Background: solid `#004AAD` (brand blue) with a subtle pixel-dot texture overlay: `background-image: radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px); background-size: 4px 4px;`.
- Top bar: `padding: 16px clamp(20px,4vw,40px)`, contains only the "About" trigger, left-aligned.
- Main content: centered vertically and horizontally, `padding: clamp(28px,5vw,72px)`, inner content column capped at `max-width: 760px`, left-aligned text.
- Footer: centered, small copyright text, `padding-bottom: clamp(18px,2.5vw,26px)`.

**Components:**

1. **About menu**
   - Trigger: text button "About", font `'Press Start 2P'`, size `12px`, color white, no border/background, `padding: 6px 4px`, cursor pointer.
   - Click toggles a dropdown positioned `top: 100%; left: 0; margin-top: 6px`.
   - Dropdown panel: white background, `2px solid #000` border, box-shadow `5px 5px 0 rgba(0,0,0,0.4)` (hard-edged retro shadow, no blur), padding `14px 16px`, width `min(280px, 70vw)`.
   - Dropdown text: font `'VT323'` monospace, `18px`, line-height `1.3`, color black. Copy: "the coolest agency in europe.<br>(maybe in the world, we'll see)"

2. **Logo**
   - `assets/goodfiles-white.png` (white version of the logo, for use on the blue background).
   - Height: `clamp(44px, 5.6vw, 68px)`, width auto, `margin-bottom: clamp(26px,3.6vw,38px)`.

3. **Headline / slogan**
   - Exact copy: "The internet is full of bad files. None of them are here" followed by a blinking block cursor.
   - Font: `'Press Start 2P'`, weight 400 (this font has no other weights), color white.
   - Size: `clamp(1.05rem, 2.6vw, 1.9rem)`, `line-height: 1.5` (generous — this font needs the extra leading to stay legible), `letter-spacing: 0`.
   - `text-wrap: pretty` / `balance` for nicer line breaks.
   - Blinking cursor: an inline-block `span`, `width: 0.42em; height: 0.86em;`, white background, `animation: blink 1s steps(1) infinite` where the keyframes toggle `opacity` between 1 and 0 at the 50% mark (hard on/off, no fade — matches terminal-cursor behavior).
   - **Important font note:** Do not use "Pixelify Sans" or similar rounded pixel fonts for this headline/button — at small sizes their lowercase "c" is visually indistinguishable from "o" (read "Contact" as "Oontaot" in testing). "Press Start 2P" was chosen specifically because every glyph stays legible at UI sizes. If substituting a different pixel font, verify "c", "l", "i", "1" are unambiguous at the target size before shipping.

4. **Contact button**
   - Copy: "Contact" (only — not "Contact us").
   - Font: `'Press Start 2P'`, size `clamp(11px,1.1vw,14px)`, `letter-spacing: 0.02em`.
   - Default state: white background, black text, `2px solid #000` border, `border-radius: 12px`, `padding: clamp(13px,1.4vw,17px) clamp(24px,2.4vw,36px)`, hard drop shadow `4px 4px 0 rgba(0,0,0,0.4)` (no blur — retro/8-bit shadow style, offset only).
   - Hover state: background flips to black, text flips to white, button shifts `translate(1px, 1px)` (subtle "pressed" feel).
   - Click ("copied") state: same black/white invert as hover, held for ~2.6s, label changes to "Copied ✓".
   - Behavior: on click, copies the contact e-mail address to the clipboard via `navigator.clipboard.writeText`, with a `document.execCommand('copy')` fallback via a temporary hidden textarea for browsers/contexts where the Clipboard API is unavailable.
   - The actual e-mail address is intentionally **not printed anywhere in the visible page** (privacy/anti-scraping) — it only lives in code, and is written to the clipboard on click.
   - Helper text next to the button: font `'VT323'`, `18px`, white at `85%` opacity. Reads "click to copy our e-mail" normally, and "e-mail copied to clipboard" for ~2.6s after a successful click.

5. **Footer**
   - Text: "© 2026 goodfiles.eu", font `'VT323'`, `15px`, white at `75%` opacity, centered.

## Interactions & Behavior
- **About toggle:** click "About" button → toggles dropdown visibility (boolean state). No outside-click-to-close was implemented in the reference; consider adding that as a small improvement (click-outside or Escape to close) since it's good practice, but it's not a strict requirement from the design.
- **Contact button:**
  1. On click, copy e-mail to clipboard (see Assets/Config below for the actual address).
  2. Set a "copied" state for 2.6 seconds: button inverts to black/white, label becomes "Copied ✓", helper text becomes "e-mail copied to clipboard".
  3. After 2.6s, revert to default state automatically.
  4. Hover state (independent of copied state): button inverts colors and shifts 1px down-right, for a "pressed key" feel — pure CSS/JS hover, no animation library needed.
- **Cursor blink:** continuous `1s steps(1) infinite` opacity blink next to the headline — hard cut, not a fade.
- No responsive breakpoints beyond fluid `clamp()` sizing — the layout is designed to scale continuously from mobile to desktop widths using `clamp()` for all font sizes and spacing rather than fixed breakpoints. Recreate this fluid-sizing approach rather than adding fixed media-query steps, unless your codebase's conventions require breakpoints.

## State Management
Minimal local UI state only:
- `aboutOpen: boolean` — dropdown visibility.
- `copied: boolean` — whether the "just copied" button state is showing (auto-resets via a 2.6s timer).
- `hovered: boolean` — button hover state (skip this if your stack handles hover in CSS via `:hover` instead of JS — that's actually the simpler/more idiomatic way to do it outside this prototyping tool).

No data fetching, no routing, no forms.

## Design Tokens

**Colors:**
- Brand blue (background): `#004AAD`
- White: `#FFFFFF`
- Black: `#000000`
- Dot-texture overlay: `rgba(255,255,255,0.14)` dots, 4px grid
- Hard shadow: `rgba(0,0,0,0.4)`, no blur, offset only (e.g. `4px 4px 0`, `5px 5px 0`)

**Typography:**
- Display/pixel font: `'Press Start 2P'` (Google Fonts) — headline, "About" trigger, "Contact" button. Only weight 400 exists.
- Secondary/mono font: `'VT323'` (Google Fonts) — helper text, dropdown copy, footer. Much more readable at small sizes; used for anything that isn't a primary CTA/headline.
- No other font families used.

**Spacing/sizing:** built entirely from `clamp()` fluid values rather than a fixed spacing scale — see component specs above for each element's exact clamp range.

**Border radius:** `12px` on the Contact button only. Dropdown and everything else is square (0 radius) — consistent with the pixel/retro theme.

**Shadows:** flat, hard-edged, no blur — `Npx Npx 0 rgba(0,0,0,0.4)` — never a soft/blurred box-shadow anywhere in this design.

## Assets
- `assets/goodfiles-white.png` — white version of the goodfiles.eu logo, used on the blue background. Trimmed to its visual bounding box (transparent background, no extra padding baked in — the component's own margin controls spacing).
- `assets/goodfiles-blue.png` — blue version of the logo, provided for any future light/white-background use case, not used in the current page.
- Google Fonts loaded via `<link>`: `Press Start 2P`, `VT323`.

## Configuration
- **Contact e-mail:** the reference file has this as a configurable value (defaulted to a placeholder in the prototype tool). Set the real destination address as a constant/env value in your implementation — it should never be rendered in the DOM/HTML source, only used inside the click handler that writes to the clipboard.

## Files
- `reference/Goodfiles Website.dc.html` — full design reference (markup + behavior in one file, minus the prototyping-tool-specific wrapper noted above).
- `reference/assets/goodfiles-white.png`, `reference/assets/goodfiles-blue.png` — logo assets.
