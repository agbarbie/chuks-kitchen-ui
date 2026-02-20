import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';
import { DeliveryDetailsComponent } from './pages/delivery-details/delivery-details.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },  // 👈 change this
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'track', component: OrderTrackingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'food/:id', component: FoodDetailComponent },
  { path: 'delivery', component: DeliveryDetailsComponent },
  { path: 'confirmation', component: OrderConfirmationComponent },
  { path: '**', redirectTo: '' }
];