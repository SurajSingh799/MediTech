// contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  };

  contactInfo = [
    {
      icon: 'email',
      title: 'Email Us',
      details: 'support@meditech.com',
      link: 'mailto:support@meditech.com'
    },
    {
      icon: 'phone',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'location',
      title: 'Visit Us',
      details: '123 Healthcare Blvd, Medical District, CA 90210',
      link: '#'
    },
    {
      icon: 'support',
      title: 'Support Hours',
      details: '24/7 Customer Support Available',
      link: '#'
    }
  ];

  offices = [
    {
      city: 'San Francisco',
      address: '123 Healthcare Blvd',
      postal: 'CA 90210',
      phone: '+1 (555) 123-4567'
    },
    {
      city: 'New York',
      address: '456 Medical Plaza',
      postal: 'NY 10001',
      phone: '+1 (555) 234-5678'
    },
    {
      city: 'Chicago',
      address: '789 Health Center Dr',
      postal: 'IL 60601',
      phone: '+1 (555) 345-6789'
    }
  ];

  faqs = [
    {
      question: 'How secure is MediTech?',
      answer: 'MediTech uses enterprise-grade encryption, role-based access control, and maintains HIPAA compliance to ensure your healthcare data is completely secure.',
      open: false
    },
    {
      question: 'What is the onboarding process?',
      answer: 'Our onboarding process typically takes 2-4 weeks and includes data migration, staff training, and system customization to meet your specific needs.',
      open: false
    },
    {
      question: 'Do you offer integration with existing systems?',
      answer: 'Yes, MediTech integrates seamlessly with most healthcare systems including EHR, laboratory systems, and billing platforms through our REST API.',
      open: false
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 technical support via phone, email, and live chat, along with comprehensive training materials and on-site support options.',
      open: false
    }
  ];

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    alert('Thank you for contacting us! We will get back to you within 24 hours.');
    this.resetForm();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    };
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}