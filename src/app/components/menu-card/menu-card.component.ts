import { Component, input, output, signal } from '@angular/core';
import { MenuItem } from '../../services/cart.service';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent {
  item = input.required<MenuItem>();
  addToCart = output<MenuItem>();
  viewFood = output<MenuItem>();        // 👈 new
  wishlisted = signal(false);

  badgeLabel() {
    const map: Record<string, string> = {
      bestseller: 'Bestseller',
      new: 'New',
      spicy: 'Spicy 🌶'
    };
    return map[this.item().badge!] || '';
  }

  toggleWish(event: Event) {
    event.stopPropagation();            // 👈 prevent card click
    this.wishlisted.update(v => !v);
  }

  onCardClick() {
    this.viewFood.emit(this.item());    // 👈 navigate to food detail
  }

  onAddClick(event: Event) {
    event.stopPropagation();            // 👈 prevent card click
    this.addToCart.emit(this.item());
  }
}