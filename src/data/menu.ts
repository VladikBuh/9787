import { MenuCategory, MenuItem } from '../types';

export const menuCategories: MenuCategory[] = [
  'Signatures',
  'Fresh & Light',
  'Desserts',
];

export const menuItems: MenuItem[] = [
  {
    id: 'grilled-beef-tenderloin',
    name: 'Grilled Beef Tenderloin',
    category: 'Signatures',
    description:
      'Premium grilled beef tenderloin served with roasted vegetables and creamy pepper sauce.',
    price: 34.9,
    prepTime: '30–35 min',
    ingredients: [
      'Beef tenderloin',
      'Asparagus',
      'Baby carrots',
      'Rosemary potatoes',
      'Black pepper sauce',
      'Butter',
      'Herbs',
    ],
    image: 'GrilledBeefTenderloin',
  },
  {
    id: 'herb-roasted-salmon',
    name: 'Herb Roasted Salmon',
    category: 'Signatures',
    description:
      'Atlantic salmon baked with fresh herbs and served with lemon butter and seasonal vegetables.',
    price: 29.9,
    prepTime: '25–30 min',
    ingredients: [
      'Salmon fillet',
      'Lemon',
      'Butter',
      'Dill',
      'Broccoli',
      'Carrots',
      'Olive oil',
    ],
    image: 'HerbRoastedSalmon',
  },
  {
    id: 'truffle-mushroom-risotto',
    name: 'Truffle Mushroom Risotto',
    category: 'Signatures',
    description:
      'Creamy Arborio risotto finished with Parmesan cheese and black truffle.',
    price: 22.9,
    prepTime: '20–25 min',
    ingredients: [
      'Arborio rice',
      'Mushrooms',
      'Parmesan',
      'Truffle oil',
      'Onion',
      'Garlic',
      'Vegetable broth',
    ],
    image: 'TruffleMushroomRisotto',
  },
  {
    id: 'chicken-supreme',
    name: 'Chicken Supreme',
    category: 'Signatures',
    description:
      'Juicy roasted chicken breast served with mashed potatoes and mushroom cream sauce.',
    price: 24.9,
    prepTime: '25–30 min',
    ingredients: [
      'Chicken breast',
      'Potatoes',
      'Mushrooms',
      'Cream',
      'Butter',
      'Garlic',
      'Parsley',
    ],
    image: 'ChickenSupreme',
  },
  {
    id: 'lamb-rack-deluxe',
    name: 'Lamb Rack Deluxe',
    category: 'Signatures',
    description:
      'Tender herb-crusted lamb rack served with roasted potatoes and red wine reduction.',
    price: 38.9,
    prepTime: '35–40 min',
    ingredients: [
      'Lamb rack',
      'Rosemary',
      'Thyme',
      'Potatoes',
      'Garlic',
      'Red wine sauce',
    ],
    image: 'LambRackDeluxe',
  },

  // Fresh & Light
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    category: 'Fresh & Light',
    description:
      'Crisp romaine lettuce with grilled chicken, Parmesan, croutons and Caesar dressing.',
    price: 16.9,
    prepTime: '10–15 min',
    ingredients: [
      'Romaine lettuce',
      'Grilled chicken',
      'Parmesan',
      'Croutons',
      'Caesar dressing',
    ],
    image: 'CaesarSalad',
  },
  {
    id: 'mediterranean-salad',
    name: 'Mediterranean Salad',
    category: 'Fresh & Light',
    description:
      'Fresh vegetables with feta cheese, olives and oregano dressing.',
    price: 15.5,
    prepTime: '10–15 min',
    ingredients: [
      'Tomatoes',
      'Cucumber',
      'Feta cheese',
      'Olives',
      'Red onion',
      'Oregano',
      'Olive oil',
    ],
    image: 'MediterraneanSalad',
  },
  {
    id: 'avocado-toast-deluxe',
    name: 'Avocado Toast Deluxe',
    category: 'Fresh & Light',
    description:
      'Toasted sourdough topped with smashed avocado, poached egg and microgreens.',
    price: 14.9,
    prepTime: '10–12 min',
    ingredients: [
      'Sourdough bread',
      'Avocado',
      'Egg',
      'Microgreens',
      'Chili flakes',
      'Olive oil',
    ],
    image: 'AvocadoToastDeluxe',
  },
  {
    id: 'grilled-vegetable-wrap',
    name: 'Grilled Vegetable Wrap',
    category: 'Fresh & Light',
    description:
      'Warm tortilla filled with grilled vegetables and herb yogurt sauce.',
    price: 13.9,
    prepTime: '12–15 min',
    ingredients: [
      'Tortilla',
      'Zucchini',
      'Bell peppers',
      'Eggplant',
      'Yogurt sauce',
      'Spinach',
    ],
    image: 'GrilledVegetableWrap',
  },
  {
    id: 'berry-yogurt-bowl',
    name: 'Berry Yogurt Bowl',
    category: 'Fresh & Light',
    description:
      'Greek yogurt topped with seasonal berries, granola and honey.',
    price: 11.9,
    prepTime: '5–8 min',
    ingredients: [
      'Greek yogurt',
      'Strawberries',
      'Blueberries',
      'Raspberries',
      'Granola',
      'Honey',
    ],
    image: 'BerryYogurtBowl',
  },

  // Desserts
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description:
      'Warm chocolate cake with a rich molten center served with vanilla ice cream.',
    price: 10.9,
    prepTime: '15–18 min',
    ingredients: [
      'Dark chocolate',
      'Butter',
      'Eggs',
      'Flour',
      'Sugar',
      'Vanilla ice cream',
    ],
    image: 'ChocolateLavaCake',
  },
  {
    id: 'new-york-cheesecake',
    name: 'New York Cheesecake',
    category: 'Desserts',
    description: 'Creamy baked cheesecake topped with fresh berry sauce.',
    price: 9.9,
    prepTime: '8–10 min',
    ingredients: [
      'Cream cheese',
      'Biscuits',
      'Butter',
      'Eggs',
      'Vanilla',
      'Berry sauce',
    ],
    image: 'NewYorkCheesecake',
  },
  {
    id: 'tiramisu-classic',
    name: 'Tiramisu Classic',
    category: 'Desserts',
    description:
      'Traditional Italian dessert layered with mascarpone and espresso-soaked biscuits.',
    price: 9.5,
    prepTime: '8–10 min',
    ingredients: [
      'Mascarpone',
      'Ladyfingers',
      'Espresso',
      'Cocoa powder',
      'Eggs',
      'Sugar',
    ],
    image: 'TiramisuClassic',
  },
  {
    id: 'fresh-fruit-platter',
    name: 'Fresh Fruit Platter',
    category: 'Desserts',
    description: 'Seasonal sliced fruits served chilled with fresh mint.',
    price: 8.9,
    prepTime: '5–8 min',
    ingredients: [
      'Pineapple',
      'Melon',
      'Grapes',
      'Kiwi',
      'Strawberries',
      'Mint',
    ],
    image: 'FreshFruitPlatter',
  },
  {
    id: 'vanilla-creme-brulee',
    name: 'Vanilla Crème Brûlée',
    category: 'Desserts',
    description:
      'Silky vanilla custard topped with a perfectly caramelized sugar crust.',
    price: 10.5,
    prepTime: '12–15 min',
    ingredients: ['Cream', 'Egg yolks', 'Vanilla', 'Sugar'],
    image: 'VanillaCremeBrulee',
  },
];

export const getMenuItem = (id: string): MenuItem =>
  menuItems.find(item => item.id === id) ?? menuItems[0];
