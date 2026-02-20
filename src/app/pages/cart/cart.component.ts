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
  private router = inject(Router);        // 👈 added

  name = signal('');
  phone = signal('');
  address = signal('');
  payMethod = signal('');

  toastMsg = signal('');
  toastVisible = signal(false);
  modalVisible = signal(false);
  orderId = signal('');

  showToast(msg: string) {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }

  changeQty(itemId: string, delta: number) {
    this.cart.changeQty(itemId, delta);
  }

  removeItem(itemId: string) {
    this.cart.removeItem(itemId);
    this.showToast('Item removed from cart');
  }

  clearCart() {
    if (this.cart.cartItems().length === 0) return;
    this.cart.clearCart();
    this.showToast('Cart cleared');
  }

  get freeDeliveryLeft() {
    return Math.max(0, 5000 - this.cart.subtotal());
  }

  onInput(field: 'name' | 'phone' | 'address' | 'payMethod', event: Event) {
    const value = (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    if (field === 'name') this.name.set(value);
    if (field === 'phone') this.phone.set(value);
    if (field === 'address') this.address.set(value);
    if (field === 'payMethod') this.payMethod.set(value);
  }

  placeOrder() {
    if (this.cart.cartItems().length === 0) {
      this.showToast('Your cart is empty!'); return;
    }
    if (!this.name() || !this.phone() || !this.address() || !this.payMethod()) {
      this.showToast('Please fill all delivery details'); return;
    }

    // Save delivery details so order-summary can read them
    this.cart.saveDeliveryDetails({          // 👈 changed
      name: this.name(),
      phone: this.phone(),
      address: this.address(),
      payMethod: this.payMethod()
    });

    this.router.navigate(['/order-summary']); // 👈 changed
  }

  closeModal() {
    this.modalVisible.set(false);
  }
}