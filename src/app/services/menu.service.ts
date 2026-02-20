import { Injectable } from '@angular/core';
import { MenuItem } from './cart.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly categories = ['All', 'Rice Dishes', 'Soups', 'Proteins', 'Snacks', 'Drinks'];

  readonly items: MenuItem[] = [
  {
    id: 'rice-1', name: 'Jollof Rice + Chicken', price: 2500, emoji: '🍛',
    imageUrl: 'images/Property 1=Variant5.png',
    category: 'Rice Dishes', rating: 4.9, badge: 'bestseller',
    description: 'Party-style Jollof rice slow-cooked in a rich tomato base, served with grilled chicken'
  },
  {
    id: 'rice-2', name: 'Fried Rice + Tilapia', price: 2800, emoji: '🍚',
    imageUrl: 'images/image3.png',
    category: 'Rice Dishes', rating: 4.7,
    description: 'Colourful vegetable fried rice cooked with soy sauce, served with crispy whole tilapia'
  },
  {
    id: 'rice-3', name: 'White Rice + Stew', price: 2000, emoji: '🍱',
    imageUrl: 'images/image8.png',
    category: 'Rice Dishes', rating: 4.6,
    description: 'Steamed long-grain rice with rich tomato stew and assorted meat of your choice'
  },
  {
    id: 'soup-1', name: 'Egusi Soup + Fufu', price: 3000, emoji: '🍲',
    imageUrl: 'images/image2.png',
    category: 'Soups', rating: 4.8, badge: 'spicy',
    description: 'Rich melon seed soup cooked with assorted meat and stockfish, served with fufu'
  },
  {
    id: 'soup-2', name: 'Ofe Akwu + Pounded Yam', price: 3200, emoji: '🥘',
    imageUrl: 'images/image1.png',
    category: 'Soups', rating: 4.8, badge: 'new',
    description: 'Palm nut soup with assorted meats, served with smooth pounded yam'
  },
  {
    id: 'soup-3', name: 'Okra Soup + Eba', price: 2700, emoji: '🫕',
    imageUrl: 'images/image6.png',
    category: 'Soups', rating: 4.7,
    description: 'Thick okra soup loaded with prawns and shredded beef, paired with golden eba'
  },
  {
    id: 'prot-1', name: 'Peppered Chicken', price: 1800, emoji: '🍗',
    imageUrl: 'images/image7.png',
    category: 'Proteins', rating: 5.0, badge: 'bestseller',
    description: 'Tender chicken marinated and slow-cooked in rich Nigerian pepper sauce'
  },
  {
    id: 'prot-2', name: 'Suya Beef Skewers', price: 2200, emoji: '🥩',
    imageUrl: 'assets/images/image 8.png',
    category: 'Proteins', rating: 4.9,
    description: 'Grilled beef skewers seasoned with authentic suya spice blend, served with onions'
  },
  {
    id: 'snack-1', name: 'Puff Puff (6 pcs)', price: 600, emoji: '🟤',
    imageUrl: 'assets/images/image 9.png',
    category: 'Snacks', rating: 4.8,
    description: 'Freshly fried fluffy Nigerian doughnuts, lightly sweetened and perfectly golden'
  },
  {
    id: 'drink-1', name: 'Zobo Drink', price: 500, emoji: '🥤',
    imageUrl: 'assets/images/image 10.png',
    category: 'Drinks', rating: 4.6,
    description: 'Chilled hibiscus drink infused with ginger and pineapple, naturally sweet'
  },
  {
    id: 'drink-2', name: 'Kunu Drink', price: 400, emoji: '🍺',
    imageUrl: 'assets/images/image 11.png',
    category: 'Drinks', rating: 4.5,
    description: 'Traditional millet-based drink, lightly spiced and refreshingly creamy'
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