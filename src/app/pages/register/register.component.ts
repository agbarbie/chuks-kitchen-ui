import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  agreedToTerms = false;

  constructor(private router: Router) {}

  onRegister() {
    if (!this.email || !this.phone || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.agreedToTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    this.router.navigate(['/home']);
  }
}