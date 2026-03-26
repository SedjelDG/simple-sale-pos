

## Plan: Replace tile hub with macOS-style floating dock navigation

### What changes

Replace the current full-screen tile hub layout in Management (and optionally Settings) with a **floating dock** — a pill-shaped bar centered at the bottom of the screen with icon buttons that magnify on hover, inspired by the macOS Dock.

### How it works

1. **New component: `src/components/management/ManagementDock.tsx`**
   - Fixed-position pill-shaped container at the bottom center of the screen
   - Semi-transparent blurred background (`backdrop-blur-xl bg-card/80 border border-border/50`)
   - Contains icon buttons for: Dashboard, Products, Scale, and a Home button (back to `/`)
   - Active tab highlighted with a colored dot indicator below the icon
   - **Magnification effect**: on hover, icons scale up using `framer-motion` (like the real macOS dock — neighbors also grow slightly)
   - Tooltip labels appear above each icon on hover

2. **Update `ManagementLayout.tsx`**
   - Remove the tile hub view entirely (no more full-screen grid of cards)
   - All management routes (including `/management`) render the same layout: header + content + dock
   - `/management` index route redirects to `/management/dashboard` (or shows the dashboard by default)
   - The header stays minimal — just breadcrumb + date/time
   - Content area gets `pb-20` padding to avoid dock overlap

3. **Update `App.tsx`**
   - Change the management index route to redirect to `/management/dashboard` instead of rendering `null`

4. **Settings page** — Add the same dock or a similar floating nav if Settings has sub-sections (currently it's a single page, so no dock needed there yet)

### Technical details

- Dock magnification: Each icon tracks mouse proximity using `onMouseMove` on the dock container, calculating distance to each icon and scaling proportionally (1x default → 1.5x closest, neighbors at 1.2x)
- Uses `framer-motion`'s `useMotionValue` and `useTransform` for smooth scaling
- Dock items array reuses the existing `hubTiles` data (icon, label, path)

