import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../../pages/login/login.component';
import { SignUpComponent } from '../../pages/signup/signup.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shared-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoginComponent,
    SignUpComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class SharedLayoutComponent {
  // --- Header Properties & Logic ---
  @Input() isMobileMenuOpen = false;
  @Output() loginClicked = new EventEmitter<void>();
  @Output() signupClicked = new EventEmitter<void>();
  @Output() mobileMenuToggled = new EventEmitter<void>();

  navLinks = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Service', path: '/service', exact: false },
    { label: 'About Us', path: '/about', exact: false },
    { label: 'Contact Us', path: '/contact', exact: false }
  ];
  // Modal states
  showLogin = false;
  showSignup = false;

  // --- Footer Properties & Logic ---
  email: string = '';
  message: string = '';

  constructor(private router: Router) {}

  // Header Methods
  navigateToHome(): void {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuToggled.emit();
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.mobileMenuToggled.emit();
    }
  }

  toggleLogin(): void {
    this.showLogin = true;
    this.showSignup = false;
    document.body.style.overflow = 'hidden';
  }

  toggleSignup(): void {
    this.showSignup = true;
    this.showLogin = false;
    document.body.style.overflow = 'hidden';
  }

  CloseLogin(): void {
    this.showLogin = false;
    document.body.style.overflow = 'auto';
  }

  CloseSignup(): void {
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }

  SwitchToSignup(): void {
    this.showLogin = false;
    this.showSignup = true;
  }

  SwitchToLogin(): void {
    this.showSignup = false;
    this.showLogin = true;
  }

  closeAllModals(): void {
    this.showLogin = false;
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }

  // Footer Methods
  subscribe(): void {
    if (!this.isValidEmail(this.email)) {
      this.message = 'Please enter a valid email address';
      return;
    }

    console.log('Subscribed email:', this.email);
    this.message = 'Thanks for subscribing!';
    this.email = '';

    setTimeout(() => (this.message = ''), 3000);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}