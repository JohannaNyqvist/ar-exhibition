# Outdoor AR Exhibition — Starter

## What is included
- `index.html`: mobile exhibition interface
- `styles.css`: appearance
- `app.js`: map, artwork cards, GPS-based AR scene
- `config.js`: ten placeholder artworks, GPS positions, sizes and fixed bearings
- `assets/art1.svg` ... `art10.svg`: temporary placeholder images

## Publish with GitHub Pages
1. Create a new public GitHub repository (e.g. `outdoor-ar-exhibition`).
2. Upload **all** files and the `assets` folder to the repository root.
3. In Settings > Pages, choose Deploy from a branch, `main`, `/ (root)`, and Save.
4. Wait for the HTTPS URL, then open it on a smartphone **outdoors**.
5. Test Home, Map, and Artworks before testing the AR camera.

## Customize
Edit `config.js`: for each artwork change `title`, `artist`, `description`, `image`, `latitude`, `longitude`, `width`, `height`, `altitude`, `bearing`.
Replace the placeholder SVG images with optimized JPG/PNG files, and update the paths in `config.js`.
Coordinates in this starter are **fictional demonstration positions** and MUST be replaced before public use.

## Important limitations
This is an experimental GPS AR prototype, not a precision-anchored installation. GPS and compass drift can move artwork by several meters or alter its orientation. The map is approximate. AR.js location-based component availability, permission flows and camera rendering depend on mobile browser and device. Test on iOS Safari and Android Chrome with the actual artwork positions before printing a QR code. In particular, fixed bearings should be field-calibrated because scene axes and compass headings can differ across devices.

The app requires network access to load A-Frame, AR.js, Leaflet and map tiles. The user must allow camera and location permissions. Camera is started by AR.js, while `watchPosition` provides a separate visible GPS accuracy indicator.

## Safety
Do not position artworks in roads, restricted spaces, or unsafe walking routes. Ask visitors to stop walking when looking through the camera.
