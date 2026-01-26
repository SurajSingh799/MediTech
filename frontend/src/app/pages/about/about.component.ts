// about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [CommonModule],
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '200+', label: 'Healthcare Facilities' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];

  values = [
    {
      icon: 'security',
      title: 'Security First',
      description: 'We prioritize the security and privacy of healthcare data with enterprise-grade encryption and compliance standards.'
    },
    {
      icon: 'innovation',
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology to meet the changing needs of healthcare providers.'
    },
    {
      icon: 'reliability',
      title: 'Reliability',
      description: 'Delivering consistent, dependable service with 99.9% uptime and robust disaster recovery protocols.'
    },
    {
      icon: 'transparency',
      title: 'Transparency',
      description: 'Maintaining open communication with complete audit trails and clear documentation of all system activities.'
    }
  ];

  team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'assets/team/member1.jpg',
      bio: '15+ years in healthcare technology'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'assets/team/member2.jpg',
      bio: 'Expert in healthcare data security'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'assets/team/member3.jpg',
      bio: 'Healthcare UX specialist'
    },
    {
      name: 'David Thompson',
      role: 'Chief Compliance Officer',
      image: 'assets/team/member4.jpg',
      bio: 'HIPAA compliance authority'
    }
  ];

  timeline = [
    { year: '2019', event: 'MediTech founded with vision of secure healthcare data' },
    { year: '2020', event: 'First 50 healthcare facilities onboarded' },
    { year: '2022', event: 'Achieved HIPAA compliance certification' },
    { year: '2023', event: 'Reached 200+ healthcare facilities milestone' },
    { year: '2024', event: 'Launched AI-powered analytics platform' },
    { year: '2025', event: 'Expanding to international markets' }
  ];
}