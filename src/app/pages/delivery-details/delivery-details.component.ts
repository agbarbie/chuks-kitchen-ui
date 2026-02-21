import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css'
})
export class DeliveryDetailsComponent {
  router = inject(Router);
  cart = inject(CartService);             

  name = '';
  phone = '';
  address = '';
  landmark = '';
  city = '';

  proceed() {
    if (!this.name || !this.phone || !this.address || !this.city) {
      alert('Please fill in all required fields');
      return;
    }

    this.cart.saveDeliveryDetails({      
      name: this.name,
      phone: this.phone,
      address: `${this.address}, near ${this.landmark}, ${this.city}`,
      payMethod: this.cart.deliveryDetails()?.payMethod ?? ''
    });

    this.router.navigate(['/payment']);
  }
}