# Lassie-Style Design Card System — Prompt Spec

## 1. Purpose
Generate floating "status/notification" UI cards in the visual language of Lassie.ai:
calm, clinical-but-warm, editorial serif headlines + clean sans-serif data, muted cream
background, soft shadows, small rounded "toast" cards that feel like live system updates.

---

## 2. RULES (Design Tokens & Constraints)

### 2.1 Color
- Background base: warm off-white / cream (#F6F4EE – #F8F6F1)
- Card surface: white (#FFFFFF) or soft cream (#F1EFE8), never pure white on pure white background
- Text primary: near-black (#1A1A18)
- Text secondary/muted: warm gray (#8A8578)
- Accent success: sage/olive green (#5C6E4F), used only for check icons/status
- Accent alert: dusty rose/pink (#E8B4AE), used sparingly for highlights or hero gradients
- No saturated/neon colors — everything desaturated, editorial feel

### 2.2 Typography
- Headline font: serif display, large, editorial
- Emphasis word: same serif but italic — one key phrase per headline
- Body/UI font: clean grotesk sans-serif, 12–14px for card content
- Numeric/data font: same sans, tabular, for amounts/dates
- Hierarchy: Headline (serif, 40–72px) → Subtext (sans, 14–16px, muted) → Card label (sans, 11–12px)

### 2.3 Shape & Spacing
- Corner radius: 24–32px on hero media, 12–16px on cards
- Card padding: 16–24px internal
- Card width: compact, ~280–340px, never full-width
- Gap between icon and text: 8–12px
- Cards float asymmetrically over imagery/whitespace, not in a rigid grid

### 2.4 Elevation & Surface
- Shadow: soft, diffuse (blur 24–40px, opacity 8–12%), no hard drop shadows
- Border: none, or 1px hairline barely visible
- Optional subtle background blur if card floats over photo/video

### 2.5 Iconography
- Icons: 16–20px, monochrome, or rounded-square brand badge for company/provider logos
- Status icons: filled circle + checkmark (success), spinner (in-progress), flag (needs review)

### 2.6 Motion
- Cards fade + slide in 8–16px from resting offset
- Status rows update in sequence, not simultaneously
- Loading states use a subtle rotating spinner, not a progress bar

### 2.7 Content Tone
- Copy is short, factual, present-tense system output
- No marketing tone inside cards — should read like real product telemetry

---

## 3. PUZZLE BLOCKS (Composable Components)

### 🧩 Block A — Card Shell (required outer container)

### 🧩 Block B — Header Row

### 🧩 Block C — Status Timeline Row

### 🧩 Block D — Working/Loading Row

### 🧩 Block E — Metric List Row (repeatable, 2–4x)

### 🧩 Block F — Tag/Badge Footer

### 🧩 Block G — Media Card Variant

### 🧩 Block H — CTA Pill (standalone)

---

## 4. ASSEMBLY RULES

1. Every card = Block A (shell) + one primary block (B, D, or E) + optional one secondary block (C or F).
2. Never stack more than 4 rows inside one card — keep it glanceable.
3. Only one accent color per card — never mix green and rose in the same card.
4. Cards referencing a real-world entity (insurer, clinic, doctor) start with Block B.
5. Cards representing system/AI activity start with Block D.
6. Summary/report cards use Block E only, with a plain text header (no icon badge needed).

---

## 5. USAGE PROMPT (paste into Figma AI / v0 / Galileo / similar)

> "Design a floating UI notification card following the Lassie.ai design system: cream
> background, white card with 16px radius and soft diffuse shadow, small sans-serif
> text (14px), a rounded-square company icon badge next to a bold entity name and a
> right-aligned dollar amount, followed by two status rows (Received / Posted) each
> with a green checkmark icon and a muted timestamp, connected by a thin vertical
> line. Card should feel like a real-time system update, not a marketing banner.
> Max width 320px."

---

## 6. Notes
This spec is derived from visual/structural observation of lassie.ai's public homepage
(layout, color, typography, component patterns) — it does not copy any of Lassie's
actual text copy, code, logo, or brand assets. Use it only as a structural reference
for your own original design.