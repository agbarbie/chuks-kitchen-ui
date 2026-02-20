import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  cart = inject(CartService);
  menuService = inject(MenuService);

  item = this.menuService.items.find(
    i => i.id === this.route.snapshot.paramMap.get('id')
  );

  proteins = [
    { label: 'Fried Chicken', extra: 0, note: '(Default)' },
    { label: 'Grilled Fish', extra: 500, note: '' },
    { label: 'Beef', extra: 700, note: '' },
  ];

  sides = [
    { label: 'Fried Plantain', extra: 700, selected: false },
    { label: 'Coleslaw', extra: 500, selected: false },
    { label: 'Extra Pepper Sauce', extra: 300, selected: false },
  ];

  selectedProtein = this.proteins[0];
  specialInstructions = '';

  totalPrice = computed(() => {
    if (!this.item) return 0;
    const sidesTotal = this.sides
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.extra, 0);
    return this.item.price + this.selectedProtein.extra + sidesTotal;
  });

  addToCart() {
    if (this.item) {
      this.cart.addItem(this.item);
      this.router.navigate(['/cart']);
    }
  }

  goBack() { this.router.navigate(['/menu']); }
}