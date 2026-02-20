import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    const id = 'CK-' + Math.floor(100000 + Math.random() * 900000);
    this.orderId.set(id);
    this.cart.saveOrder({
      id,
      name: this.name(),
      phone: this.phone(),
      address: this.address(),
      payMethod: this.payMethod(),
      items: this.cart.cartItems(),
      time: new Date().toISOString()
    });
    this.cart.clearCart();
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }
}