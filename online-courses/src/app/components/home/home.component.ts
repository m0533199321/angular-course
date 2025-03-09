import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses = [
    { id: 1, title: 'Web Development', description: 'Learn HTML, CSS, JavaScript, and frameworks like Angular & React.' },
    { id: 2, title: 'Data Science', description: 'Master Python, Machine Learning, and Data Analysis.' },
    { id: 3, title: 'UI/UX Design', description: 'Create stunning interfaces with Figma and Adobe XD.' },
    { id: 4, title: 'Mobile App Development', description: 'Build apps for iOS and Android with Flutter & Swift.' },
    { id: 5, title: 'Cybersecurity', description: 'Protect systems and networks with ethical hacking.' },
    { id: 6, title: 'Cloud Computing', description: 'Master AWS, Azure, and Google Cloud.' }
  ];

  constructor(private router: Router) {}

  signUp() {
    this.router.navigate(['courses']);
  }
}