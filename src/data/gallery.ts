export interface GalleryItem {
  src: string
  alt: string
  caption: string
  ratio: 'portrait' | 'landscape'
}

export const galleryItems: GalleryItem[] = [
  {
    src: '/images/dining-room.webp',
    alt: 'El comedor principal en nogal, piedra y latón',
    caption: 'El comedor',
    ratio: 'landscape',
  },
  {
    src: '/images/table-setting.webp',
    alt: 'Servilleta de lino anudada, copas de cristal tallado y luz de velas sobre nogal',
    caption: 'Mise en place',
    ratio: 'portrait',
  },
  {
    src: '/images/hero-plating.webp',
    alt: 'Chef terminando un plato con pinzas en el pase',
    caption: 'En el pase',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-halibut.webp',
    alt: 'Fletán salvaje con velouté de champagne',
    caption: 'Flétan de la Côte',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-couple.webp',
    alt: 'Comensales compartiendo una velada en el comedor',
    caption: 'Una velada en ÉLÉVÉ',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-chocolate.webp',
    alt: 'Postre de chocolate grand cru con pan de oro',
    caption: 'Ombre & Or',
    ratio: 'portrait',
  },
  {
    src: '/images/dining-hall.webp',
    alt: 'El gran salón al atardecer con ventanales en arco',
    caption: 'El gran salón',
    ratio: 'landscape',
  },
  {
    src: '/images/dish-garden.webp',
    alt: 'Verduras de otoño sobre terciopelo de calabaza',
    caption: 'Jardin d’Automne',
    ratio: 'portrait',
  },
  {
    src: '/images/dish-amuse.webp',
    alt: 'Amuse-bouche a la luz de las velas',
    caption: 'Prélude Doré',
    ratio: 'landscape',
  },
]
