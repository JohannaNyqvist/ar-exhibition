// Replace the sample coordinates with your real outdoor exhibition locations.
// Coordinates below are DEMONSTRATION ONLY and do not represent an exhibition.
window.EXHIBITION = {
  title: 'Outdoor AR Art Exhibition',
  description: 'Explore ten artworks in augmented reality.',
  artworks: Array.from({ length: 10 }, (_, i) => ({
    id: `art${i + 1}`,
    title: `Artwork ${i + 1}`,
    artist: 'Artist name',
    description: 'Add the story behind this artwork here.',
    image: `assets/art${i + 1}.svg`,
    latitude: 59.3293 + Math.floor(i / 5) * 0.0003,
    longitude: 18.0686 + (i % 5) * 0.0003,
    width: 2,
    height: 2,
    altitude: 1.8,
    // Degrees clockwise from north: 0 = north, 90 = east.
    bearing: 180
  }))
};
