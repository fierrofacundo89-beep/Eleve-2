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
      'Slow-glazed pork belly lacquered in cider caramel, charred pearl onion, smoked parsnip emulsion and a honeycomb tuile — a first whisper of the evening.',
    price: '€24',
    image: '/images/dish-amuse.jpg',
    alt: 'Amuse-bouche of glazed pork belly with honeycomb tuile on a dark ceramic plate',
  },
  {
    id: 'garden',
    numeral: 'II',
    name: 'Jardin d’Automne',
    category: 'First Course',
    description:
      'Ember-roasted heritage carrots, romanesco and glazed cipollini over a velvet of butternut and brown butter, buckwheat crumble, oxalis and parsnip crisps.',
    price: '€32',
    image: '/images/dish-garden.jpg',
    alt: 'Roasted autumn vegetables over butternut purée on a hand-thrown dark plate',
  },
  {
    id: 'halibut',
    numeral: 'III',
    name: 'Flétan de la Côte',
    category: 'Sea',
    description:
      'Butter-basted wild halibut, girolles and romanesco, chervil and dill, finished tableside with a champagne velouté and cold-pressed herb oil.',
    price: '€58',
    image: '/images/dish-halibut.jpg',
    alt: 'Seared halibut fillet with chanterelles and champagne velouté',
  },
  {
    id: 'beef',
    numeral: 'IV',
    name: 'Filet des Prairies',
    category: 'Land',
    description:
      'Dry-aged beef tenderloin glazed in its own jus, chanterelles, burnt onion petals, golden pomme purée and a reduction of ten years’ patience.',
    price: '€68',
    image: '/images/dish-beef.jpg',
    alt: 'Dry-aged beef tenderloin with chanterelles and burnt onion petals',
  },
  {
    id: 'chocolate',
    numeral: 'V',
    name: 'Ombre & Or',
    category: 'Dessert',
    description:
      'Seventy-percent grand cru chocolate, blackberry and port gel, cocoa-nib lace, chocolate sorbet and a breath of gold leaf.',
    price: '€26',
    image: '/images/dish-chocolate.jpg',
    alt: 'Dark chocolate dessert with blackberries, cocoa lace and gold leaf',
  },
]
