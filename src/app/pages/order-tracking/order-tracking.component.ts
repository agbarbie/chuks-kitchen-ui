import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, Order } from '../../services/cart.service';
import { ToastComponent } from '../../components/toast/toast.component';

interface TrackStep {
  icon: string;
  label: string;
  addMins: number;
}

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {
  cart = inject(CartService);
  route = inject(ActivatedRoute);

  orderIdInput = signal('');
  trackedOrder = signal<Order | null>(null);
  currentStep = signal(0);
  toastMsg = signal('');
  toastVisible = signal(false);

  readonly steps: TrackStep[] = [
    { icon: '✅', label: 'Order Received', addMins: 0 },
    { icon: '🍳', label: 'Being Prepared', addMins: 2 },
    { icon: '📦', label: 'Ready for Pickup', addMins: 8 },
    { icon: '🚴', label: 'On the Way', addMins: 15 },
    { icon: '🏠', label: 'Delivered', addMins: 35 },
  ];

  progressPct = computed(() =>
    ((this.currentStep() - 1) / 4) * 100
  );

  statusLabel = computed(() => {
    const labels = [
      'Order Received',
      'Being Prepared',
      'Ready for Pickup',
      'On the Way',
      'Delivered'
    ];
    return labels[this.currentStep() - 1] || '';
  });

  etaMins = computed(() => {
    const order = this.trackedOrder();
    if (!order) return 0;
    const elapsed = (Date.now() - new Date(order.time).getTime()) / 60000;
    return Math.max(0, Math.round(35 - elapsed));
  });

  showRider = computed(() => this.currentStep() >= 4);

  constructor() {
    this.route.queryParams.subscribe(p => {
      if (p['id']) {
        this.orderIdInput.set(p['id']);
        setTimeout(() => this.trackOrder(), 200);
      }
    });
  }

  trackOrder() {
    const inputId = this.orderIdInput().trim().toUpperCase();
    if (!inputId.startsWith('CK-') || inputId.length < 8) {
      this.showToast('Please enter a valid order ID (e.g. CK-123456)');
      return;
    }

    let order = this.cart.getLastOrder();
    if (!order || order.id !== inputId) {
      order = {
        id: inputId,
        name: 'Demo Customer',
        phone: '+234 812 345 6789',
        address: '12 Allen Avenue, Ikeja, Lagos',
        items: [{
          item: {
            imageUrl: '',
            id: 'x', name: 'Jollof Rice + Chicken',
            price: 2500, emoji: '🍛',
            category: 'Rice Dishes', rating: 4.9,
            description: ''
          }, qty: 2
        }],
        payMethod: 'cash',
        time: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      };
    }

    this.trackedOrder.set(order);

    const elapsed = (Date.now() - new Date(order.time).getTime()) / 60000;
    let step = 1;
    if (elapsed >= 2) step = 2;
    if (elapsed >= 8) step = 3;
    if (elapsed >= 15) step = 4;
    if (elapsed >= 35) step = 5;
    this.currentStep.set(step);
  }

  getStepClass(index: number): string {
    const step = index + 1;
    if (step < this.currentStep()) return 'completed';
    if (step === this.currentStep()) return 'active';
    return '';
  }

  getStepTime(index: number): string {
    const order = this.trackedOrder();
    if (!order) return '';
    const step = index + 1;
    if (step > this.currentStep()) return '';
    if (step === this.currentStep()) return 'Now';
    const t = new Date(
      new Date(order.time).getTime() + this.steps[index].addMins * 60000
    );
    return t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatOrderTime(iso: string): string {
    return new Date(iso).toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit'
    });
  }

  onInput(event: Event) {
    this.orderIdInput.set(
      (event.target as HTMLInputElement).value.toUpperCase()
    );
  }

  showToast(msg: string) {
    this.toastMsg.set(msg);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3000);
  }
}