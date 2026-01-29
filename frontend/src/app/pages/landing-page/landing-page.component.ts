import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';

// Services
import { ApiService } from '../../services/api.service';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginComponent,
    SignUpComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class LandingPageComponent
  implements OnInit, AfterViewInit, OnDestroy {

  // Modal states
  showLogin = false;
  showSignup = false;

  // UI states
  isHomePage = false;
  isMobileMenuOpen = false;

  // Newsletter
  email: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    // Detect route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkIfHomePage(event.urlAfterRedirects);
        this.closeAllModals();
        this.closeMobileMenu();
      });
  }

  ngOnInit(): void {
    this.checkIfHomePage(this.router.url);

    // Restore session if exists
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.apiService.getCurrentUser().subscribe({
        next: data => console.log('Session restored', data),
        error: () => {
          console.warn('Invalid session, logging out');
          this.apiService.logout();
        }
      });
    }
  }

  /* -------------------- ROUTING -------------------- */

  checkIfHomePage(url: string): void {
    this.isHomePage = url === '/' || url === '/home';
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
    this.closeMobileMenu();
  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
    window.scrollTo(0, 0);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
    window.scrollTo(0, 0);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
    window.scrollTo(0, 0);
  }

  /* -------------------- MODALS -------------------- */

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

  /* -------------------- MOBILE MENU -------------------- */

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /* -------------------- ESC KEY -------------------- */

  ngAfterViewInit(): void {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeAllModals();
    }
  };

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = 'auto';
  }

  /* -------------------- NEWSLETTER -------------------- */

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
