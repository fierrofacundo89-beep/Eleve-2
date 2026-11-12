export interface Dish {
  id: string
  numeral: string
  name: string
  category: string
  description: string
  price: string
  image: string
  alt: string
}

export const dishes: Dish[] = [
  {
    id: 'prelude',
    numeral: 'I',
    name: 'Prélude Doré',
    category: 'Amuse-Bouche',
    description:
      'Panceta glaseada lentamente en caramelo de sidra, cebolla perla tostada, emulsión de chirivía ahumada y teja de miel — el primer susurro de la velada.',
    price: '24 €',
    image: '/images/dish-amuse.webp',
    alt: 'Amuse-bouche de panceta glaseada con teja de miel sobre cerámica oscura',
  },
  {
    id: 'garden',
    numeral: 'II',
    name: 'Jardin d’Automne',
    category: 'Primer Acto',
    description:
      'Zanahorias de variedades antiguas asadas a la brasa, romanesco y cipollini glaseados sobre un terciopelo de calabaza y mantequilla avellanada, crujiente de trigo sarraceno, oxalis y chips de chirivía.',
    price: '32 €',
    image: '/images/dish-garden.webp',
    alt: 'Verduras de otoño asadas sobre puré de calabaza en un plato oscuro hecho a mano',
  },
  {
    id: 'halibut',
    numeral: 'III',
    name: 'Flétan de la Côte',
    category: 'Mar',
    description:
      'Fletán salvaje confitado en mantequilla, rebozuelos y romanesco, perifollo y eneldo, terminado en la mesa con un velouté de champagne y aceite de hierbas prensado en frío.',
    price: '58 €',
    image: '/images/dish-halibut.webp',
    alt: 'Lomo de fletán dorado con rebozuelos y velouté de champagne',
  },
  {
    id: 'beef',
    numeral: 'IV',
    name: 'Filet des Prairies',
    category: 'Tierra',
    description:
      'Solomillo de vaca madurada glaseado en su propio jugo, rebozuelos, pétalos de cebolla quemada, parmentier dorado y una reducción de diez años de paciencia.',
    price: '68 €',
    image: '/images/dish-beef.webp',
    alt: 'Solomillo de vaca madurada con rebozuelos y pétalos de cebolla quemada',
  },
  {
    id: 'chocolate',
    numeral: 'V',
    name: 'Ombre & Or',
    category: 'Postre',
    description:
      'Chocolate grand cru al setenta por ciento, gel de mora y oporto, encaje de nibs de cacao, sorbete de chocolate y un suspiro de pan de oro.',
    price: '26 €',
    image: '/images/dish-chocolate.webp',
    alt: 'Postre de chocolate negro con moras, encaje de cacao y pan de oro',
  },
]
