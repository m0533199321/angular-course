import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Lesson } from '../../models/lesson.mode';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatInputModule, MatSelectModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {
  @Input() lesson: Lesson = new Lesson(0, '', '', 0);
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  onSignIn() {
    if (this.lesson.title && this.lesson.content) { 
    this.save.emit(this.lesson);
  };
}

onCancel() {
  this.save.emit(null);
}
}
