import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  onRegister() {
    console.log('Register:', this.email, this.phone);
  }
}