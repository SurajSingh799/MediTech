import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatDivider, MatCardModule, MatButtonModule]
})
export class SignUpComponent {
  name: string = '';
  role: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  specialization: string = '';
  license: string = '';
  isSubmitting = false;

  showPassword: boolean = false;
  showSignup: boolean = true;
  successMessage: string = '';
  errorMessage: string = '';

  @Output() closeSignup = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private apiService: ApiService) {
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.role = '';
    this.specialization = '';
    this.license = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  switchToLoginEvent() {
    this.switchToLogin.emit();
  }

  hideSignup() {
    this.showSignup = false;
    this.closeSignup.emit();
  }


  // Validate form before submission
  private validateForm(): boolean {
    this.errorMessage = '';

    if (!this.name.trim()) {
      this.errorMessage = 'Name is required.';
      return false;
    }

    if (!this.email.trim()) {
      this.errorMessage = 'Email is required.';
      return false;
    }

    if (!this.password) {
      this.errorMessage = 'Password is required.';
      return false;
    }

    if (!this.confirmPassword) {
      this.errorMessage = 'Please confirm your password.';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return false;
    }

    if (!this.role) {
      this.errorMessage = 'Please select a role.';
      return false;
    }

    if (this.role === 'doctor') {
      if (!this.specialization.trim()) {
        this.errorMessage = 'Specialization is required for doctors.';
        return false;
      }
      if (!this.license.trim()) {
        this.errorMessage = 'License number is required for doctors.';
        return false;
      }
    }

    return true;
  }

  
  onSubmit() {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userData = {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
      role: this.role,
      specialization: this.role === 'doctor' ? this.specialization.trim() : undefined,
      license: this.role === 'doctor' ? this.license.trim() : undefined,
    };

    console.log('Submitting signup data:', { ...userData, password: '[HIDDEN]' });

    this.apiService.signup(userData).subscribe({
      next: (res: any) => {
        console.log('Signup successful:', res);
        this.successMessage = res.message || 'Signup successful! You can now login.';
        this.errorMessage = '';
        
        setTimeout(() => {
          this.switchToLoginEvent();
          this.resetForm();
        }, 3000);
      },
      error: (err: any) => {
        console.error('Signup error:', err);
        this.isSubmitting = false;
        
        // Handle specific error messages from backend
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid input data. Please check your information.';
        } else if (err.status === 409) {
          this.errorMessage = 'Email already registered.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
        this.successMessage = '';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}