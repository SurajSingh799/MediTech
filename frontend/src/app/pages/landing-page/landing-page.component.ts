// landing-page.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatToolbarModule } from '@angular/material/toolbar';   
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [
    CommonModule, 
    LoginComponent, 
    SignUpComponent, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    RouterModule,
    FormsModule
  ],
  standalone: true
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  showLogin: boolean = false;
  showSignup: boolean = false;
  isHomePage: boolean = true;
  email: string = '';
  message = '';
  
  constructor(private router: Router, private apiService: ApiService) {
    // Subscribe to router events to detect route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if we're on the home page
      this.isHomePage = event.url === '/' || event.url === '';
      
      // Close modals when navigating
      this.closeAllModals();
    });
  }

  ngOnInit() {
    // Check initial route
    this.isHomePage = this.router.url === '/' || this.router.url === '';
    
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Optional: make a backend call to verify token
      this.apiService.getCurrentUser().subscribe({
        next: userData => {
          console.log('Session restored:', userData);
          // optionally store in app state or service
        },
        error: err => {
          console.warn('Token is invalid or expired, clearing...');
          this.apiService.logout();
        }
      });
    }
  }

  // Close modals when clicking outside
  closeAllModals() {
    this.showLogin = false;
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }

  toggleLogin() {
    console.log("Login Clicked!"); 
    this.showLogin = true;
    this.showSignup = false;
    document.body.style.overflow = 'hidden';
  }
  
  CloseLogin() {
    console.log("Login Closed!");
    this.showLogin = false;
    document.body.style.overflow = 'auto';
  }
  
  toggleSignup() {
    console.log("Signup Clicked!"); 
    this.showSignup = true;
    this.showLogin = false;
    document.body.style.overflow = 'hidden';
  }
  
  CloseSignup() {
    console.log("Signup Closed!");
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }
  
  SwitchToSignup() {
    console.log("Switching to Signup");
    this.showLogin = false;
    this.showSignup = true;
  }

  SwitchToLogin() {
    console.log("Switching to Login");
    this.showLogin = true;
    this.showSignup = false; 
  }

  // Navigate to specific sections
  navigateToServices() {
    this.router.navigate(['/services']);
    window.scrollTo(0, 0);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
    window.scrollTo(0, 0);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
    window.scrollTo(0, 0);
  }

  navigateToHome() {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
  }
  
  // Close modals when ESC key is pressed
  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeAllModals();
    }
  }
  
  // Cleanup to remove event listener when component is destroyed
  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.overflow = 'auto';
  }
  subscribe() {
    if (!this.isValidEmail(this.email)) {
      this.message = 'Please enter a valid email address';
      return;
    }

    // 🔥 Later: call backend API here
    console.log('Subscribed email:', this.email);

    this.message = 'Thanks for subscribing!';
    this.email = '';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}