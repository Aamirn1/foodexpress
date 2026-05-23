export interface MenuItem {
  id: string
  name: string
  price: number
  priceFormatted: string
  category: string
  categorySlug: string
  images: string[]
  description: string
  rating: number
  tag?: string
  ingredients: string[]
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Hot' | 'Extra Hot'
  isAvailable: boolean
  prepTime: string
  calories: number
}

export interface FoodCategory {
  slug: string
  title: string
  subtitle: string
  image: string
}

export const categories: FoodCategory[] = [
  {
    slug: 'burgers',
    title: 'Burgers',
    subtitle: 'Flame-Grilled Perfection',
    image: '/images/category-burgers.png',
  },
  {
    slug: 'pizza',
    title: 'Pizza',
    subtitle: 'Wood-Fired Goodness',
    image: '/images/category-pizza.png',
  },
  {
    slug: 'chicken',
    title: 'Chicken',
    subtitle: 'Crispy & Juicy',
    image: '/images/category-chicken.png',
  },
  {
    slug: 'desserts',
    title: 'Desserts',
    subtitle: 'Sweet Indulgence',
    image: '/images/category-desserts.png',
  },
]

export const menuItems: MenuItem[] = [
  {
    id: 'classic-burger',
    name: 'Classic Smash Burger',
    price: 850,
    priceFormatted: 'Rs. 850',
    category: 'Burgers',
    categorySlug: 'burgers',
    images: ['/images/product-classic-burger.png'],
    description: 'Our signature smash burger with two thin beef patties, melted cheddar, caramelized onions, pickles, and our secret Fire Sauce on a toasted brioche bun. Simple, bold, unforgettable.',
    rating: 4.9,
    tag: "Chef's Special",
    ingredients: ['Beef Patty', 'Cheddar Cheese', 'Brioche Bun', 'Caramelized Onions', 'Pickles', 'Fire Sauce'],
    spiceLevel: 'Medium',
    isAvailable: true,
    prepTime: '12 min',
    calories: 680,
  },
  {
    id: 'spicy-burger',
    name: 'Inferno Burger',
    price: 1050,
    priceFormatted: 'Rs. 1,050',
    category: 'Burgers',
    categorySlug: 'burgers',
    images: ['/images/product-spicy-burger.png'],
    description: 'For those who dare. A juicy beef patty topped with ghost pepper sauce, jalapeños, habanero cheese, and crispy onion rings. Not for the faint-hearted.',
    rating: 4.7,
    tag: 'Spicy 🔥',
    ingredients: ['Beef Patty', 'Ghost Pepper Sauce', 'Jalapeños', 'Habanero Cheese', 'Onion Rings'],
    spiceLevel: 'Extra Hot',
    isAvailable: true,
    prepTime: '14 min',
    calories: 780,
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Blaze',
    price: 1200,
    priceFormatted: 'Rs. 1,200',
    category: 'Pizza',
    categorySlug: 'pizza',
    images: ['/images/product-pepperoni-pizza.png'],
    description: 'Our wood-fired pepperoni pizza with a crispy thin crust, tangy tomato sauce, mozzarella cheese, and generous layers of premium pepperoni. A classic done right.',
    rating: 4.8,
    tag: 'Best Seller',
    ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Oregano'],
    spiceLevel: 'Mild',
    isAvailable: true,
    prepTime: '18 min',
    calories: 920,
  },
  {
    id: 'chicken-wings',
    name: 'Blazing Wings',
    price: 750,
    priceFormatted: 'Rs. 750',
    category: 'Chicken',
    categorySlug: 'chicken',
    images: ['/images/product-chicken-wings.png'],
    description: '8 crispy fried chicken wings tossed in our signature Blazing Sauce. Served with ranch dip and celery sticks. The ultimate wing experience.',
    rating: 4.6,
    tag: 'Popular',
    ingredients: ['Chicken Wings', 'Blazing Sauce', 'Ranch Dip', 'Celery Sticks'],
    spiceLevel: 'Hot',
    isAvailable: true,
    prepTime: '15 min',
    calories: 620,
  },
  {
    id: 'loaded-hotdog',
    name: 'Loaded Fire Dog',
    price: 700,
    priceFormatted: 'Rs. 700',
    category: 'Burgers',
    categorySlug: 'burgers',
    images: ['/images/product-loaded-hotdog.png'],
    description: 'A premium all-beef hotdog loaded with chili, melted cheese, crispy bacon bits, diced onions, and a drizzle of spicy mustard. Loaded to the max.',
    rating: 4.5,
    tag: 'New',
    ingredients: ['All-Beef Hotdog', 'Chili', 'Cheese', 'Bacon Bits', 'Onions', 'Spicy Mustard'],
    spiceLevel: 'Medium',
    isAvailable: true,
    prepTime: '10 min',
    calories: 540,
  },
  {
    id: 'fries',
    name: 'Truffle Fire Fries',
    price: 550,
    priceFormatted: 'Rs. 550',
    category: 'Burgers',
    categorySlug: 'burgers',
    images: ['/images/product-fries.png'],
    description: 'Crispy golden fries tossed in truffle oil, parmesan cheese, and fresh herbs. Served with our spicy aioli dipping sauce. Dangerously addictive.',
    rating: 4.4,
    ingredients: ['Potatoes', 'Truffle Oil', 'Parmesan', 'Fresh Herbs', 'Spicy Aioli'],
    spiceLevel: 'Mild',
    isAvailable: true,
    prepTime: '8 min',
    calories: 380,
  },
  {
    id: 'milkshake',
    name: 'Fire Shake',
    price: 600,
    priceFormatted: 'Rs. 600',
    category: 'Desserts',
    categorySlug: 'desserts',
    images: ['/images/product-milkshake.png'],
    description: 'Our legendary thick milkshake blended with real vanilla ice cream, topped with whipped cream, a drizzle of caramel, and a dash of cinnamon. Pure indulgence.',
    rating: 4.8,
    tag: 'Popular',
    ingredients: ['Vanilla Ice Cream', 'Whipped Cream', 'Caramel', 'Cinnamon'],
    spiceLevel: 'None',
    isAvailable: true,
    prepTime: '5 min',
    calories: 520,
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken Platter',
    price: 1500,
    priceFormatted: 'Rs. 1,500',
    category: 'Chicken',
    categorySlug: 'chicken',
    images: ['/images/category-chicken.png'],
    description: 'A full half-chicken slow-smoked with our house BBQ glaze, served with coleslaw, corn on the cob, and garlic bread. Perfect for sharing (or not).',
    rating: 4.9,
    tag: "Chef's Special",
    ingredients: ['Half Chicken', 'BBQ Glaze', 'Coleslaw', 'Corn on the Cob', 'Garlic Bread'],
    spiceLevel: 'Mild',
    isAvailable: true,
    prepTime: '25 min',
    calories: 1100,
  },
]

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under Rs. 700', min: 0, max: 700 },
  { label: 'Rs. 700 - 1,000', min: 700, max: 1000 },
  { label: 'Rs. 1,000 - 1,500', min: 1000, max: 1500 },
  { label: 'Over Rs. 1,500', min: 1500, max: Infinity },
]

export function getMenuItemsByCategory(slug: string): MenuItem[] {
  if (!slug || slug === 'all') return menuItems
  return menuItems.filter((item) => item.categorySlug === slug)
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}

export function getRelatedItems(itemId: string): MenuItem[] {
  const item = getMenuItemById(itemId)
  if (!item) return []
  return menuItems.filter((i) => i.categorySlug === item.categorySlug && i.id !== item.id)
}

export function searchMenuItems(query: string): MenuItem[] {
  const q = query.toLowerCase()
  return menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q)
  )
}
