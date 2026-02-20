import { Injectable, signal, computed } from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  imageUrl: string;
  category: string;
  description: string;
  rating: number;
  badge?: 'bestseller' | 'new' | 'spicy';
}

export interface CartItem {
  item: MenuItem;
  qty: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  name: string;
  phone: string;
  address: string;
  payMethod: string;
  time: string;
}

export interface DeliveryDetails {       // 👈 new interface
  name: string;
  phone: string;
  address: string;
  payMethod: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly CART_KEY = 'chuksKitchenCart';
  private readonly ORDER_KEY = 'chuksLastOrder';

  cartItems = signal<CartItem[]>(this.loadCart());
  deliveryDetails = signal<DeliveryDetails | null>(null);   // 👈 new

  totalItems = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.qty, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((sum, i) => sum + i.item.price * i.qty, 0)
  );

  deliveryFee = computed(() => this.subtotal() >= 5000 ? 0 : 500);

  total = computed(() => this.subtotal() + this.deliveryFee());

  private loadCart(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    } catch { return []; }
  }

  private persist() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems()));
  }

  addItem(item: MenuItem) {
    this.cartItems.update(cart => {
      const existing = cart.find(c => c.item.id === item.id);
      if (existing) {
        return cart.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...cart, { item, qty: 1 }];
    });
    this.persist();
  }

  changeQty(itemId: string, delta: number) {
    this.cartItems.update(cart =>
      cart
        .map(c => c.item.id === itemId ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0)
    );
    this.persist();
  }

  removeItem(itemId: string) {
    this.cartItems.update(cart => cart.filter(c => c.item.id !== itemId));
    this.persist();
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem(this.CART_KEY);
  }

  saveDeliveryDetails(details: DeliveryDetails) {    // 👈 new
    this.deliveryDetails.set(details);
  }

  saveOrder(order: Order) {
    localStorage.setItem(this.ORDER_KEY, JSON.stringify(order));
  }

  getLastOrder(): Order | null {
    try {
      return JSON.parse(localStorage.getItem(this.ORDER_KEY) || 'null');
    } catch { return null; }
  }
}