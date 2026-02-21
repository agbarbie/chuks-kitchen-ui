import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Please enter your email and password');
    }
  }
}