export interface GalleryItem {
  src: string
  alt: string
  caption: string
  ratio: 'portrait' | 'landscape'
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/images/dining-room.webp',
    alt: 'The main dining room in walnut, stone and brass',
    caption: 'The dining room',
    ratio: 'landscape',
  },
  {
    src: '/images/table-setting.webp',
    alt: 'Linen napkin, crystal coupes and candlelight on a walnut table',
    caption: 'Mise en place',
    ratio: 'portrait',
  },
  {
    src: '/images/hero-plating.webp',
    alt: 'Chef finishing a dish with tweezers at the pass',
    caption: 'At the pass',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-halibut.webp',
    alt: 'Wild halibut with champagne velouté',
    caption: 'Flétan de la Côte',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-couple.webp',
    alt: 'Guests sharing an evening in the dining room',
    caption: 'An evening at ÉLÉVÉ',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-chocolate.webp',
    alt: 'Grand cru chocolate dessert with gold leaf',
    caption: 'Ombre & Or',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-hall.webp',
    alt: 'The grand salon at dusk with arched windows',
    caption: 'The grand salon',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-garden.webp',
    alt: 'Autumn vegetables over butternut velvet',
    caption: 'Jardin d’Automne',
    ratio: 'portrait',
  },
  {
    src: '/images/dish-amuse.webp',
    alt: 'Amuse-bouche under candlelight',
    caption: 'Prélude Doré',
    ratio: 'landscape',
  },
]
