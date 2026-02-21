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
    { name: 'Jollof Delights', image: 'images/Property 1=Default.png' },
    { name: 'Swallow & Soups', image: 'images/Property 1=Variant2.png' },
    { name: 'Grills & BBQ', image: 'images/Property 1=Variant10.png' },
    { name: 'Sweet Treats', image: 'images/Property 1=Variant4.png' },
    { name: 'Jollof Delights', image: 'images/Property 1=Variant2.png' },
    { name: 'Jollof Delights', image: 'images/Property 1=Variant10.png' },
  ];

  cart = inject(CartService);
  menuService = inject(MenuService);

  toastMsg = signal('');
  toastVisible = signal(false);

  featured = this.menuService.items.slice(0, 6);
  onViewFood(item: MenuItem) {
    this.router.navigate(['/food', item.id]);
  }

  onAddToCart(item: MenuItem, event: Event) {
    event.stopPropagation(); 
    this.cart.addItem(item);
    this.toastMsg.set(`${item.name} added to cart!`);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }
}