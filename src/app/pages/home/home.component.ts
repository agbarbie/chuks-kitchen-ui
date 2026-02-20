import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, MenuItem } from '../../services/cart.service';
import { MenuService } from '../../services/menu.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ToastComponent, FormsModule, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchQuery = '';
  private router = inject(Router);

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  categories = [
    { name: 'Jollof Delights', image: 'assets/images/Property 1=Default.png' },
    { name: 'Swallow & Soups', image: 'assets/images/Property 2=Default.png' },
    { name: 'Grills & BBQ', image: 'assets/images/Property 10=Default.png' },
    { name: 'Sweet Treats', image: 'assets/images/Property 4=Default.png' },
    { name: 'Jollof Delights', image: 'assets/images/Property 2=Default.png' },
    { name: 'Jollof Delights', image: 'assets/images/Property 10=Default.png' },
  ];

  cart = inject(CartService);
  menuService = inject(MenuService);

  toastMsg = signal('');
  toastVisible = signal(false);

  featured = this.menuService.items.slice(0, 6);

  // Navigate to food detail page
  onViewFood(item: MenuItem) {
    this.router.navigate(['/food', item.id]);
  }

  onAddToCart(item: MenuItem, event: Event) {
    event.stopPropagation(); // prevents card click from firing when adding to cart
    this.cart.addItem(item);
    this.toastMsg.set(`${item.name} added to cart!`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }
}