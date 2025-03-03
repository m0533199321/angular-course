import { Component } from '@angular/core';
import { Lesson } from '../../models/lesson.mode';
import { Observable } from 'rxjs';
import { LessonsService } from '../../services/lessons.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { LessonComponent } from '../lesson/lesson.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { IconsPipe } from "../../pipes/icons.pipe";
import { DirectiveDirective } from "../../directives/directive.directive";


@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [DirectiveDirective, MatCardModule, MatIconModule, LessonComponent, MatButtonModule, AsyncPipe, IconsPipe],
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.css'
})
export class LessonsListComponent {

  constructor(private lessonsService: LessonsService, private activatedRoute: ActivatedRoute, private userService: UserService) { }
  courseId: number = 0;
  lessons$: Observable<Lesson[]> = this.lessonsService.lessons;
  lesson: Lesson = new Lesson(0, '', '', this.courseId);
  edit: boolean = false;
  add: boolean = false;
  user = this.userService.userLog;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') ? Number(params.get('id')) : 0;
      this.lessonsService.getLessons(this.courseId);
    })
  }

  toggleEdit(lesson: Lesson) {
    this.lesson = lesson;
    this.edit = true;
  }

  toggleAdd(lesson: Lesson) {
    this.lesson = new Lesson(0, '', '', this.courseId);
    this.add = true;
  }

  addLesson(lesson: Lesson) {
    this.add = false;
    if (lesson) {
      this.lessonsService.addLesson(lesson);
    }
  }

  editLesson(lesson: Lesson) {
    this.edit = false;
    if (lesson) {
      this.lessonsService.editLesson(lesson);
    }
  }

  deleteLesson(courseId: number, lessonId: number) {
    this.lessonsService.deleteLesson(courseId, lessonId);
  }
}
