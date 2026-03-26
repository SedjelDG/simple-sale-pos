

# Plan: Build Register Page and Unify Color Palette

## Overview

Build the register (caisse) page modeled after the CaisseKOM screenshot, branded with the DS identity. Then update the management and settings sections to share the same color palette and design language.

## Design Language (from reference screenshot)

The register page uses:
- **Light gray background** (`#f0f0f0` / `#e8e8e8`) for the main area
- **Dark navy blue** header/accents (`#1a1a5e` / navy)
- **White cards** with subtle borders
- **Colorful action buttons** in a 3-column grid: green (Ajouter), pink/salmon (Déduire), red (Recherche), olive/brown (Enlever), pink (Enlever tous), gray (Verrouiller), yellow (Remise), gold (Retoure), pink-red (Paiement), light blue (Attente), blue (Quantité), teal (Versement), purple (Tiroir, Trésorerie), blue (Client), teal (Offert), dark red (Fermer), dark (Arrêter)
- **Large bold total display** at top center
- **Three-panel layout**: left sidebar (store info + product shortcuts), center (item list + totals), right (action buttons + user info)
- **Bold sans-serif fonts**, uppercase labels with keyboard shortcut badges

## 1. Create Register Page (`src/pages/Register.tsx`)

### Layout (3-column, full-screen, no scroll):

```text
┌─────────────┬──────────────────────┬─────────────────┐
│  DS BRANDING│   GRAND TOTAL (DA)   │  ADMIN  DATE    │
│  Store Name │                      │  TIME           │
│  RACCOURCI  │ HT | TVA | REM | TTC│                 │
│             │ Client tabs (1-6)    │  ACTION BUTTONS │
│  Product    │                      │  (3x7 grid)     │
│  shortcut   │  ITEMS TABLE         │  colorful with  │
│  buttons    │  (scrollable)        │  icons + keys   │
│  (grid)     │                      │                 │
└─────────────┴──────────────────────┴─────────────────┘
```

### Left panel:
- DS logo + "Software" branding (replacing CaisseKOM)
- Store name field
- "Raccourci" shortcut section
- Grid of product shortcut buttons (arrow icons, placeholder)

### Center panel:
- Large total display (e.g., "0,00 DA") in bold
- Summary row: Total HT, Total TVA, Remise, Total TTC — each in a navy-header card
- Client tabs (Client N°1 through N°6)
- Scrollable items table with columns: product name, quantity, price

### Right panel:
- User info (ADMIN badge, date, time — live clock)
- 3-column action button grid, each button has:
  - Icon on top
  - Label in the button's accent color
  - Keyboard shortcut badge at bottom
- Button colors matching the reference: green, pink, red, olive, yellow, blue, purple, teal, dark

### DS branding touches:
- Replace CaisseKOM logo with DS logo (animated on load like the home page)
- Use "DS Software" text instead of "CaisseKOM LOGICIEL DE GESTION"
- Keep the same structural layout but with slightly more refined rounded corners and shadows

## 2. Update Color Palette Across All Sections

### New CSS variables in `src/index.css`:
Add register-specific colors as CSS variables:
- `--register-bg`: light gray background
- `--register-btn-green`, `--register-btn-pink`, `--register-btn-red`, `--register-btn-olive`, `--register-btn-yellow`, `--register-btn-blue`, `--register-btn-purple`, `--register-btn-teal`, `--register-btn-dark`
- These map to the colorful action buttons

### Update management and settings to match:
- The `pos-header-gradient` stays navy but uses same navy tones as register
- Table headers, stat cards, and accent colors align with the register palette
- Action buttons in management (e.g., "Nouveau produit", "Synchroniser") use the same green/blue tones from register buttons
- Settings cards use same light gray background, white cards with subtle borders

## 3. Update Existing Files

### `src/App.tsx`
- Add route: `<Route path="/register" element={<Register />} />`

### `src/pages/Index.tsx`
- Enable the "Caisse" button (currently disabled) to navigate to `/register`

### `src/index.css`
- Add register button color variables
- Adjust existing variables so management/settings share the palette
- Add `.dark` variants for register colors

### `tailwind.config.ts`
- Add register color tokens to the theme

### `src/components/management/ManagementLayout.tsx`
- Minor color adjustments to align with register palette

### `src/pages/Settings.tsx`
- Background and card styling adjustments for consistency

## 4. Files Summary

| Action | File |
|--------|------|
| Create | `src/pages/Register.tsx` |
| Modify | `src/App.tsx` (add register route) |
| Modify | `src/pages/Index.tsx` (enable Caisse button) |
| Modify | `src/index.css` (register colors + palette unification) |
| Modify | `tailwind.config.ts` (register color tokens) |
| Modify | `src/components/management/ManagementLayout.tsx` (color alignment) |
| Modify | `src/pages/Settings.tsx` (color alignment) |

## Technical Notes

- Register page is UI-only with mock data and no real transaction logic
- Action buttons will show toast notifications on click as placeholders
- Live clock updates every second using `setInterval`
- Keyboard shortcuts displayed as badges but not wired to handlers yet
- The items table uses mock cart items for visual demonstration

