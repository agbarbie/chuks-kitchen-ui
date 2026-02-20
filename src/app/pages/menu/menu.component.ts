import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, MenuItem } from '../../services/cart.service';
import { MenuService } from '../../services/menu.service';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, MenuCardComponent, ToastComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  cart = inject(CartService);
  menuService = inject(MenuService);
  private router = inject(Router);

  activeCategory = signal('All');
  searchQuery = signal('');
  toastMsg = signal('');
  toastVisible = signal(false);

  filteredItems = computed(() => {
    let items = this.menuService.getByCategory(this.activeCategory());
    const q = this.searchQuery().toLowerCase();
    if (q) items = items.filter(i => i.name.toLowerCase().includes(q));
    return items;
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  // Navigate to food detail page
  onViewFood(item: MenuItem) {
    this.router.navigate(['/food', item.id]);
  }

  onAdd(item: MenuItem) {
    this.cart.addItem(item);
    this.toastMsg.set(`${item.name} added to cart!`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }
}