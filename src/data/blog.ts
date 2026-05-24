export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: string
  date: string
  readTime: string
  keywords: string[]
  relatedItems: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'perfect-burger-guide',
    title: 'The Art of the Perfect Burger: A Chef\'s Guide',
    excerpt: 'Discover the secrets behind crafting the ultimate burger — from patty thickness to bun selection.',
    content: [
      'At Food Express, we believe a great burger starts with great beef. Our patties are made from 100% premium chuck, ground fresh daily, and seasoned with our proprietary spice blend that gives every bite that signature Fire flavor.',
      'The secret to a smash burger is in the technique. We use a heavy press to flatten the patty on a scorching hot griddle, creating a caramelized crust that locks in juices while developing deep, savory flavors through the Maillard reaction.',
      'Bun selection matters more than most people think. We source our brioche buns from a local bakery — slightly sweet, perfectly toasted, and sturdy enough to hold up to our generous toppings without falling apart.',
      'Our Fire Sauce is what sets us apart. A carefully balanced blend of smoky chipotle, tangy mustard, and a hint of honey, it brings every component of the burger together in perfect harmony.',
    ],
    category: 'Behind the Grill',
    date: 'May 15, 2026',
    readTime: '4 min read',
    keywords: ['burger', 'cooking', 'chef tips', 'beef'],
    relatedItems: ['classic-burger', 'spicy-burger'],
  },
  {
    slug: 'wood-fired-pizza-secrets',
    title: 'Why Wood-Fired Pizza Hits Different',
    excerpt: 'The science and soul behind our 900°F wood-fired oven that makes every pizza extraordinary.',
    content: [
      'There\'s something magical about wood-fired pizza that you simply can\'t replicate in a conventional oven. At 900°F, our wood-fired oven cooks a pizza in just 90 seconds, creating a crust that\'s simultaneously crispy and chewy.',
      'The high heat causes the dough to puff up dramatically, creating those beautiful charred spots (called "leopard spotting") that add a subtle smoky flavor. The quick cooking time also means the toppings retain their fresh flavors rather than getting soggy.',
      'We use a blend of oak and cherry woods that impart a distinctive smokiness without overpowering the pizza. The wood choice matters — different woods create different flavor profiles.',
      'Our dough ferments for 72 hours, developing complex flavors and a light, airy texture. This slow fermentation is the foundation of every great pizza, and we never rush it.',
    ],
    category: 'Behind the Grill',
    date: 'May 10, 2026',
    readTime: '5 min read',
    keywords: ['pizza', 'wood-fired', 'cooking', 'oven'],
    relatedItems: ['pepperoni-pizza'],
  },
  {
    slug: 'spice-level-guide',
    title: 'Finding Your Perfect Spice Level',
    excerpt: 'From Mild to Extra Hot — a guide to navigating our spice spectrum and finding your sweet spot.',
    content: [
      'Spice is subjective, and at Food Express, we respect that. Our menu offers five spice levels: None, Mild, Medium, Hot, and Extra Hot. Each level is carefully calibrated using a blend of different chili peppers.',
      'Our Mild level uses a touch of paprika and black pepper — just enough warmth to notice, but nothing overwhelming. It\'s perfect for those who want flavor complexity without the burn.',
      'Medium is where things start to get interesting. We use a blend of jalapeño and ancho chili powders that provides a noticeable heat with fruity undertones. This is our most popular spice level.',
      'For the brave souls who choose Extra Hot, our ghost pepper sauce delivers an intense experience that builds with every bite. We always recommend having a Fire Shake nearby to cool things down.',
    ],
    category: 'Food Guide',
    date: 'May 5, 2026',
    readTime: '3 min read',
    keywords: ['spice', 'heat', 'chili', 'flavor guide'],
    relatedItems: ['spicy-burger', 'chicken-wings'],
  },
  {
    slug: 'milkshake-origins',
    title: 'The Story Behind Our Fire Shake',
    excerpt: 'How a happy accident in our kitchen led to our most beloved dessert item.',
    content: [
      'The Fire Shake was born from a happy accident. One evening, our head chef was experimenting with a new dessert sauce and accidentally knocked a dash of cinnamon into the vanilla milkshake mixture. The result was revelation.',
      'That subtle warmth from the cinnamon, combined with the cold creaminess of the shake and the sweet caramel drizzle, created a flavor experience that none of us could stop thinking about. We knew we had something special.',
      'After weeks of refinement — adjusting the cinnamon ratio, sourcing the perfect vanilla ice cream, and developing our signature caramel drizzle — the Fire Shake was born. It quickly became our #1 dessert item.',
      'Today, we serve over 500 Fire Shakes daily across all locations. Some things are just meant to be, and this happy accident became one of our proudest creations.',
    ],
    category: 'Our Story',
    date: 'April 28, 2026',
    readTime: '4 min read',
    keywords: ['milkshake', 'dessert', 'story', 'cinnamon'],
    relatedItems: ['milkshake'],
  },
  {
    slug: 'wings-championship',
    title: 'How Our Wings Won the City Championship',
    excerpt: 'The proud story of how Food Express Blazing Wings took home the gold at the Annual Wing Festival.',
    content: [
      'In 2024, our Blazing Wings competed against 47 restaurants at the Annual City Wing Festival. The competition was fierce, with established wing houses bringing their A-game. But our wings had something special.',
      'Our secret? A double-fry technique that creates an impossibly crispy exterior while keeping the meat incredibly juicy. The wings are fried once at a lower temperature to cook through, then flash-fried at high heat for that perfect crunch.',
      'Our Blazing Sauce is a carefully guarded recipe that took two years to develop. It starts sweet, builds heat slowly, and finishes with a smoky complexity that keeps you reaching for the next wing.',
      'When the judges announced Food Express as the champion, our team was overwhelmed. That trophy sits proudly in our restaurant, and every batch of wings we serve carries that same championship standard.',
    ],
    category: 'Our Story',
    date: 'April 20, 2026',
    readTime: '5 min read',
    keywords: ['wings', 'championship', 'award', 'chicken'],
    relatedItems: ['chicken-wings'],
  },
  {
    slug: 'sustainable-sourcing',
    title: 'Our Commitment to Sustainable Sourcing',
    excerpt: 'How we partner with local farms and suppliers to bring you the freshest ingredients responsibly.',
    content: [
      'At Food Express, great food starts with great ingredients. We\'ve spent years building relationships with local farms and suppliers who share our commitment to quality and sustainability.',
      'Our beef comes from grass-fed cattle raised on family farms within 100 miles of our kitchens. This not only ensures the freshest possible meat but also reduces our carbon footprint and supports local agriculture.',
      'All our produce is sourced from farms that practice sustainable agriculture. From the lettuce on our burgers to the herbs on our pizzas, every vegetable is fresh, seasonal, and grown with care for the environment.',
      'We\'re proud to say that over 80% of our ingredients are locally sourced. It costs a little more, but the difference in taste — and the positive impact on our community — makes it absolutely worth it.',
    ],
    category: 'Food Guide',
    date: 'April 15, 2026',
    readTime: '4 min read',
    keywords: ['sustainability', 'local', 'farming', 'ingredients'],
    relatedItems: ['classic-burger', 'pepperoni-pizza'],
  },
]

export const blogCategories = [
  'All',
  'Behind the Grill',
  'Food Guide',
  'Our Story',
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
