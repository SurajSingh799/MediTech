import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule, 
    CommonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatDividerModule
  ]
})
export class LoginComponent  {
  // Traditional login fields
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isSubmitting: boolean = false;

  // UI state
  showLogin: boolean = true;
  successMessage: string = '';
  errorMessage: string = '';

  @Output() closeLogin = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}


  switchToSignupEvent() {
    this.switchToSignup.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  hideLogin() {
    this.showLogin = false;
    this.closeLogin.emit();
  }


  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  

  // Traditional email/password login
  onSubmit() {
    if (!this.email.trim() || !this.password.trim() ) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    this.apiService.login(this.email.trim(), this.password).subscribe({
      next: (res: any) => {
        console.log('Login successful:', res);
        this.successMessage = 'Login successful! Redirecting...';
        this.errorMessage = '';

        // Store user data
        this.apiService.storeUserData(res.token, res.user);

        // Navigate to dashboard
        setTimeout(() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        }, 1500);
      },
      error: (err: any) => {
        console.error('Login error:', err);
        
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
        this.successMessage = '';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}