import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatInputModule, MatSelectModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course: Course = new Course(0,'','',0);
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  
  onSignIn() { 
    this.save.emit(this.course);
  }

  onCancel() {
    this.save.emit(null);
  }
}
