// contact-meditech.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [FormsModule, CommonModule,MatIconModule],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Form data model
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Success/Error message
  submitMessage: string = '';
  isSubmitting: boolean = false;

  constructor() {}

  // Handle form submission
  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      
      // Show success message
      this.submitMessage = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      this.isSubmitting = false;

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);

      // TODO: Replace with actual API call
      // this.contactService.sendMessage(this.formData).subscribe(
      //   response => {
      //     this.submitMessage = 'Message sent successfully!';
      //     this.resetForm();
      //   },
      //   error => {
      //     this.submitMessage = 'Failed to send message. Please try again.';
      //     this.isSubmitting = false;
      //   }
      // );

    }, 1500);
  }

  // Optional: Add validation methods
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Optional: Character counter for message
  getMessageCharCount(): number {
    return this.formData.message.length;
  }
}