// Maps each domain id (from src/data/domains.ts) to its page route
export const DOMAIN_ROUTES: Record<string, string> = {
  'product-design': '/product',
  'graphic-design': '/identity',
  'uiux-web': '/digital',
  marketing: '/reach',
  'video-generation': '/video',
  photography: '/photography',
};

// Slight tilt for each hero card (degrees)
export const CARD_ROTATIONS = [-6, 4, -3, 5, -5, 3];

// Where the teal viewfinder frame sits for each domain (percent of the stage)
export const FRAME_PRESETS = [
  { l: 30, t: 12, w: 46, h: 56 },
  { l: 8, t: 20, w: 50, h: 48 },
  { l: 36, t: 30, w: 44, h: 46 },
  { l: 14, t: 10, w: 48, h: 58 },
  { l: 40, t: 18, w: 42, h: 52 },
  { l: 22, t: 28, w: 50, h: 44 },
];
