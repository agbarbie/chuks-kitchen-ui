import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  cart = inject(CartService);

  payMethod: 'card' | 'bank' | 'transfer' = 'card';
  cardNumber = '';
  expiry = '';
  cvv = '';
  saveCard = false;

  total = this.cart.total() + 200; // includes service fee
}