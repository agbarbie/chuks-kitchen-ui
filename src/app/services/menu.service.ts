import { Injectable } from '@angular/core';
import { MenuItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly categories = [
  'Popular',
  'Jollof Rice & Entrees',
  'Swallow & Soups',
  'Grills & sides',
  'Beverages',
  'Desserts'
];

  readonly items: MenuItem[] = [
    {
      id: 'pop-1', name: 'Jollof Rice & Fried Chicken', price: 3500, emoji: '🍛',
      imageUrl: 'images/Property 1=Variant5.png',
      category: 'Popular', rating: 4.9, badge: 'bestseller',
      description: 'Our signature Jollof rice, served with crispy fried chicken and plantain'
    },
    {
      id: 'pop-2', name: 'Eba & Egusi Soup (Goat Meat)', price: 3500, emoji: '🍲',
      imageUrl: 'images/image2.png',
      category: 'Popular', rating: 4.8,
      description: 'Hearty Egusi soup with tender goat meat, served with soft Eba'
    },
    {
      id: 'pop-3', name: 'Pounded Yam & Edikaikong', price: 3800, emoji: '🥘',
      imageUrl: 'images/image1.png',
      category: 'Popular', rating: 4.8,
      description: 'Traditional pounded yam with rich, leafy Edikaikong soup'
    },
    {
      id: 'pop-4', name: 'Peppered Snail', price: 2500, emoji: '🐌',
      imageUrl: 'images/image7.png',
      category: 'Popular', rating: 5.0, badge: 'bestseller',
      description: 'Spicy and savory peppered snail, perfect as a starter'
    },
    {
      id: 'pop-5', name: 'Grilled Tilapia Fish', price: 4500, emoji: '🐟',
      imageUrl: 'images/image3.png',
      category: 'Popular', rating: 4.7,
      description: 'Whole grilled tilapia seasoned with our special spices'
    },
    {
      id: 'jollof-1', name: 'Jollof Rice & Smoked Fish', price: 3500, emoji: '🍛',
      imageUrl: 'images/Property 1=Variant5.png',
      category: 'Jollof Rice & Entrees', rating: 4.8,
      description: 'Flavorful jollof rice served with perfectly smoked fish'
    },
    {
      id: 'jollof-2', name: 'Party Jollof Rice (Veg)', price: 2500, emoji: '🍚',
      imageUrl: 'images/image8.png',
      category: 'Jollof Rice & Entrees', rating: 4.6,
      description: 'Vegetarian party jollof, full of rich flavors'
    },
    {
      id: 'jollof-3', name: 'Party Jollof Rice (Veg)', price: 3500, emoji: '🍱',
      imageUrl: 'images/image8.png',
      category: 'Jollof Rice & Entrees', rating: 4.6,
      description: 'Vegetarian party jollof, full of rich flavors'
    },
    {
      id: 'swallow-1', name: 'Amala with Gbegiri & Ewedu', price: 3500, emoji: '🍲',
      imageUrl: 'images/image2.png',
      category: 'Swallow & Soups', rating: 4.8,
      description: 'Classic Amala served with Gbegiri (beans) and Ewedu (jute leaf) soup'
    },
    {
      id: 'swallow-2', name: 'Fufu & Okra Soup (Fish)', price: 3500, emoji: '🫕',
      imageUrl: 'images/image6.png',
      category: 'Swallow & Soups', rating: 4.7,
      description: 'Light Fufu served with fresh okra soup and tilapia fish'
    },
    {
      id: 'swallow-3', name: 'Fufu & Okra Soup (Fish)', price: 3500, emoji: '🫕',
      imageUrl: 'images/image6.png',
      category: 'Swallow & Soups', rating: 4.7,
      description: 'Light Fufu served with fresh okra soup and tilapia fish'
    },
    {
      id: 'grill-1', name: 'Suya Beef Skewers', price: 2200, emoji: '🥩',
      imageUrl: 'images/image8.png',
      category: 'Grills & sides', rating: 4.9,
      description: 'Grilled beef skewers seasoned with authentic suya spice blend, served with onions'
    },
    {
      id: 'grill-2', name: 'Peppered Chicken', price: 1800, emoji: '🍗',
      imageUrl: 'images/image7.png',
      category: 'Grills & sides', rating: 5.0, badge: 'bestseller',
      description: 'Tender chicken marinated and slow-cooked in rich Nigerian pepper sauce'
    },
    {
      id: 'bev-1', name: 'Zobo Drink', price: 500, emoji: '🥤',
      imageUrl: 'images/image10.png',
      category: 'Beverages', rating: 4.6,
      description: 'Chilled hibiscus drink infused with ginger and pineapple, naturally sweet'
    },
    {
      id: 'bev-2', name: 'Kunu Drink', price: 400, emoji: '🍺',
      imageUrl: 'images/image11.png',
      category: 'Beverages', rating: 4.5,
      description: 'Traditional millet-based drink, lightly spiced and refreshingly creamy'
    },
    {
      id: 'dessert-1', name: 'Puff Puff (6 pcs)', price: 600, emoji: '🟤',
      imageUrl: 'images/image9.png',
      category: 'Desserts', rating: 4.8,
      description: 'Freshly fried fluffy Nigerian doughnuts, lightly sweetened and perfectly golden'
    },
  ];

  getByCategory(category: string): MenuItem[] {
    if (category === 'All') return this.items;
    return this.items.filter(i => i.category === category);
  }

  search(query: string): MenuItem[] {
    const q = query.toLowerCase();
    return this.items.filter(i => i.name.toLowerCase().includes(q));
  }
}