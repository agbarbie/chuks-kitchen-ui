import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CartService, Order } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ FormsModule, DecimalPipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  cart = inject(CartService);
  private router = inject(Router);          // 👈 added

  payMethod: 'card' | 'bank' | 'transfer' = 'card';
  cardNumber = '';
  expiry = '';
  cvv = '';
  saveCard = false;

  total = this.cart.total() + 200; // includes service fee

  pay() {
    // Validate card fields if card is selected
    if (this.payMethod === 'card') {
      if (!this.cardNumber || !this.expiry || !this.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    // Generate order ID and save the completed order
    const id = 'CK-' + Math.floor(100000 + Math.random() * 900000);
    const details = this.cart.deliveryDetails();

    const order: Order = {
      id,
      items: this.cart.cartItems(),
      name: details?.name ?? '',
      phone: details?.phone ?? '',
      address: details?.address ?? '',
      payMethod: this.payMethod,
      time: new Date().toISOString()
    };

    this.cart.saveOrder(order);    // persist to localStorage
    this.cart.clearCart();         // empty the cart

    this.router.navigate(['/confirmation']);  // 👈 navigate to confirmation
  }
}