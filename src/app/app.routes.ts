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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'track', component: OrderTrackingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
{ path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: '' }
];