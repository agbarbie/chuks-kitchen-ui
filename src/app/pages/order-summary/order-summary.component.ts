import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  cart = inject(CartService);
  router = inject(Router);

  promoCode = '';
  specialInstructions = '';
  deliveryMode: 'delivery' | 'pickup' = 'delivery';

  serviceFee = 200;
  tax = 0;

  grandTotal() {
    return this.cart.subtotal() + this.cart.deliveryFee() + this.serviceFee + this.tax;
  }

  proceedToCheckout() {
    this.router.navigate(['/payment']);
  }
}