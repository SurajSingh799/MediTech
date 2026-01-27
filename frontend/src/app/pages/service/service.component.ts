// services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  imports: [CommonModule,MatIcon],
  styleUrls: ['./service.component.css']
})
export class ServicesComponent {
  services = [
    {
      title: 'Electronic Medical Records',
      description: 'Secure, centralized storage and management of patient medical records with easy access and retrieval.',
      icon: 'folder_open',
      iconClass: 'medical',
      features: [
        'Centralized patient data storage',
        'Quick search and retrieval',
        'Secure cloud backup'
      ]
    },
    {
      title: 'Access Control & Security',
      description: 'Role-based access control ensuring only authorized personnel can view sensitive patient information.',
      icon: 'security',
      iconClass: 'security',
      features: [
        'Role-based permissions',
        'End-to-end encryption',
        'Multi-factor authentication'
      ]
    },
    {
      title: 'Analytics & Reporting',
      description: 'Comprehensive analytics dashboard for tracking patient trends and healthcare metrics.',
      icon: 'analytics',
      iconClass: 'analytics',
      features: [
        'Real-time dashboards',
        'Custom report generation',
        'Trend analysis tools'
      ]
    },
    {
      title: 'System Integration',
      description: 'Seamless integration with existing healthcare systems and third-party applications.',
      icon: 'integration_instructions',
      iconClass: 'integration',
      features: [
        'API integration support',
        'HL7 & FHIR compliance',
        'Legacy system compatibility'
      ]
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock technical support and assistance for all your healthcare data management needs.',
      icon: 'support_agent',
      iconClass: 'support',
      features: [
        'Dedicated support team',
        'Live chat assistance',
        'Regular system updates'
      ]
    },
    {
      title: 'Compliance & Audit',
      description: 'Built-in compliance tools to meet healthcare regulations and maintain detailed audit trails.',
      icon: 'verified_user',
      iconClass: 'compliance',
      features: [
        'HIPAA compliance',
        'Automated audit logs',
        'Compliance reporting'
      ]
    }
  ];
}
