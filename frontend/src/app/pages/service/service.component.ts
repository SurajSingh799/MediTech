// services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  imports: [CommonModule],
  styleUrls: ['./service.component.css']
})
export class ServicesComponent {
  services = [
    {
      icon: 'medical-records',
      title: 'Medical Records Management',
      description: 'Securely store, manage, and access patient medical records with end-to-end encryption and role-based permissions.',
      features: [
        'Encrypted cloud storage',
        'Quick search and retrieval',
        'Version history tracking',
        'Bulk upload capabilities'
      ]
    },
    {
      icon: 'access-control',
      title: 'Role-Based Access Control',
      description: 'Define granular access permissions for doctors, patients, and administrative staff to ensure data privacy.',
      features: [
        'Customizable user roles',
        'Permission hierarchies',
        'Access request workflows',
        'Temporary access grants'
      ]
    },
    {
      icon: 'audit-trail',
      title: 'Audit Trail & Compliance',
      description: 'Complete logging of all system activities with timestamps, user identification, and action details for regulatory compliance.',
      features: [
        'Comprehensive activity logs',
        'HIPAA compliance ready',
        'Tamper-proof records',
        'Exportable audit reports'
      ]
    },
    {
      icon: 'analytics',
      title: 'Analytics & Reporting',
      description: 'Generate insights from healthcare data with powerful analytics tools and customizable reporting features.',
      features: [
        'Custom report builder',
        'Data visualization',
        'Trend analysis',
        'Automated reporting'
      ]
    },
    {
      icon: 'integration',
      title: 'System Integration',
      description: 'Seamlessly integrate with existing healthcare systems, laboratory information systems, and third-party applications.',
      features: [
        'REST API access',
        'HL7 compatibility',
        'FHIR standard support',
        'Custom integrations'
      ]
    },
    {
      icon: 'support',
      title: '24/7 Support & Training',
      description: 'Round-the-clock technical support and comprehensive training programs for your healthcare staff.',
      features: [
        'Dedicated support team',
        'Live chat assistance',
        'Video tutorials',
        'On-site training options'
      ]
    }
  ];

  additionalServices = [
    'Patient Portal Access',
    'Appointment Scheduling',
    'Prescription Management',
    'Telemedicine Integration',
    'Insurance Verification',
    'Billing & Claims Processing'
  ];
}