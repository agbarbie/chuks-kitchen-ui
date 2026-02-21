import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {
  router = inject(Router);
  cart = inject(CartService);

  orderId = this.cart.getLastOrder()?.id ?? 'CK-000000';

  trackOrder() {
    this.router.navigate(['/track']);
  }

  backToHome() {
    this.router.navigate(['/home']); 
  }
}