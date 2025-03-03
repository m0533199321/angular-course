import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { AsyncPipe } from '@angular/common';
import { CourseComponent } from '../course/course.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsPipe } from "../../pipes/icons.pipe";
import { CourseStudentsService } from '../../services/course-students.service';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CourseComponent, AsyncPipe, MatDialogModule, IconsPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {
  constructor(private router: Router, private route: ActivatedRoute, private coursesService: CoursesService, private userService: UserService, public dialog: MatDialog, private course_studentsService: CourseStudentsService) { }
  courses$: Observable<Course[]> = this.coursesService.courses;
  student_courses$ = this.course_studentsService.student_courses;
  course: Course = new Course(0, '', '', 0);
  edit: boolean = false;
  add: boolean = false;
  isLoggedIn: boolean = false;
  user = this.userService.userLog;

  ngOnInit() {
    this.courses$ = this.coursesService.courses;
    this.coursesService.getCourses();
    this.student_courses$ = this.course_studentsService.student_courses;
    this.course_studentsService.getCoursesToStdent(this.user.value.id);
  }

  addCourse(course: Course) {
    this.add = false;
    if (course) {
      this.coursesService.addCourse(course);
    }
  }

  editCourse(course: Course) {
    this.edit = false;
    if (course) {
      this.coursesService.editCourse(course.id, course);
    }
  }

  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId);
  }

  toggleEdit(course: Course) {
    this.course = course;
    this.edit = true;
  }

  toggleAdd(course: Course) {
    this.course = new Course(0, '', '', 0);
    this.add = true;
  }

  toggleDisplay(courseId: number) {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url;
      const newUrl = `${currentUrl}/${courseId}`;
      this.router.navigateByUrl(newUrl);
    });
  }

  addStudentToCourse(courseId: number) {
    this.course_studentsService.addStudentToCourse(this.user.value.id, courseId);
  }

  RemoveStudentFromCourse(courseId: number) {
    this.course_studentsService.RemoveStudentFromCourse(this.user.value.id, courseId);
  }

  courseExists(id:number){
    return this.student_courses$.value.some(c => c.id === id)
   }
}
