export interface GalleryItem {
  src: string
  alt: string
  caption: string
  ratio: 'portrait' | 'landscape'
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/images/dining-room.jpg',
    alt: 'The main dining room in walnut, stone and brass',
    caption: 'The dining room',
    ratio: 'landscape',
  },
  {
    src: '/images/table-setting.jpg',
    alt: 'Linen napkin, crystal coupes and candlelight on a walnut table',
    caption: 'Mise en place',
    ratio: 'portrait',
  },
  {
    src: '/images/hero-plating.jpg',
    alt: 'Chef finishing a dish with tweezers at the pass',
    caption: 'At the pass',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-halibut.jpg',
    alt: 'Wild halibut with champagne velouté',
    caption: 'Flétan de la Côte',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-couple.jpg',
    alt: 'Guests sharing an evening in the dining room',
    caption: 'An evening at ÉLÉVÉ',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-chocolate.jpg',
    alt: 'Grand cru chocolate dessert with gold leaf',
    caption: 'Ombre & Or',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-hall.jpg',
    alt: 'The grand salon at dusk with arched windows',
    caption: 'The grand salon',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-garden.jpg',
    alt: 'Autumn vegetables over butternut velvet',
    caption: 'Jardin d’Automne',
    ratio: 'portrait',
  },
  {
    src: '/images/dish-amuse.jpg',
    alt: 'Amuse-bouche under candlelight',
    caption: 'Prélude Doré',
    ratio: 'landscape',
  },
]
