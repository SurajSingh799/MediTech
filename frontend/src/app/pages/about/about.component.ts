import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignUpComponent } from '../signup/signup.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [CommonModule, MatIcon, MatButtonModule, RouterLink,SignUpComponent],
  styleUrls: ['./about.component.css'],
  standalone: true
})
export class AboutComponent {
  showSignup = false;
  values = [
    {
      icon: 'security',
      color: '#1976d2',
      title: 'Security First',
      description: 'We use industry-standard encryption and follow HIPAA guidelines to protect patient data.'
    },
    {
      icon: 'speed',
      color: '#4caf50',
      title: 'User-Friendly',
      description: 'Building intuitive interfaces that make complex healthcare workflows simple and efficient.'
    },
    {
      icon: 'support',
      color: '#ff9800',
      title: 'Reliable Support',
      description: 'Providing responsive support to help you get the most out of our platform.'
    },
    {
      icon: 'visibility',
      color: '#9c27b0',
      title: 'Transparency',
      description: 'Clear communication, detailed audit logs, and honest about our capabilities and limitations.'
    }
  ];

  techStack = [
    {
      icon: 'cloud',
      title: 'Cloud-Based',
      description: 'Secure cloud infrastructure for reliable access anywhere, anytime'
    },
    {
      icon: 'lock',
      title: 'HIPAA Compliant',
      description: 'Built to meet healthcare data protection and privacy requirements'
    },
    {
      icon: 'integration_instructions',
      title: 'Easy Integration',
      description: 'Works with your existing systems through standard APIs'
    },
    {
      icon: 'analytics',
      title: 'Data Analytics',
      description: 'Basic reporting and insights to help track patient data trends'
    }
  ];
   toggleSignup(): void {
    this.showSignup = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSignup(): void {
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }

  closeAllModals(): void {
    this.showSignup = false;
    document.body.style.overflow = 'auto';
  }
}