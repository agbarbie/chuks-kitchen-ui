import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ToastComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart = inject(CartService);
  private router = inject(Router);

  toastMsg = signal('');
  toastVisible = signal(false);

  showToast(msg: string) {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }

  placeOrder() {
    if (this.cart.cartItems().length === 0) {
      this.showToast('Your cart is empty!');
      return;
    }
    this.router.navigate(['/order-summary']);
  }
}