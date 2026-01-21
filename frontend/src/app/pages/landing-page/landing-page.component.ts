import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { MatToolbarModule } from '@angular/material/toolbar';   
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [CommonModule, LoginComponent, SignUpComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  standalone: true // GREEN: Added standalone: true to ensure this component can work independently
})
export class LandingPageComponent implements OnInit {
  showLogin: boolean = false;
  showSignup: boolean = false;
  
  constructor(private router: Router, private apiService: ApiService) {}

  // GREEN: Added method to close modals when clicking outside (can be linked to overlay)
  closeAllModals() {
    this.showLogin = false;
    this.showSignup = false;
  }

  toggleLogin() {
    console.log("Login Clicked!"); 
    this.showLogin = true;
    this.showSignup = false;
    
    // GREEN: Added code to prevent scrolling of background when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  CloseLogin() {
    console.log("Login Closed!");
    this.showLogin = false;
    
    // GREEN: Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  }
  
  toggleSignup() {
    console.log("Signup Clicked!"); 
    this.showSignup = true;
    this.showLogin = false;
    
    // GREEN: Added code to prevent scrolling of background when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  CloseSignup() {
    console.log("Signup Closed!");
    this.showSignup = false;
    
    // GREEN: Re-enable scrolling when modal is closed
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
  
 ngOnInit() {
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
  
  // GREEN: Added method to close modals when ESC key is pressed
  ngAfterViewInit() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAllModals();
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // GREEN: Added cleanup to remove event listener when component is destroyed
  ngOnDestroy() {
    document.removeEventListener('keydown', () => {});
  }
}