import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course_student } from '../models/course_student.model';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseStudentsService {

  private baseUrl = 'http://localhost:3000/api/courses';

  public student_courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(private http: HttpClient) { }

  getCoursesToStdent(userId: number) {
    this.http.get<Course[]>(`${this.baseUrl}/student/${userId}`).subscribe(
      data => {
        this.student_courses.next(data);
        console.log(this.student_courses);
      });
  }

  addStudentToCourse(userId: number, courseId: number) {
    this.http.post<any>(`${this.baseUrl}/${courseId}/enroll`, { userId })
      .subscribe(
        data => {
          console.log('Enrollment successful', data);
          alert('Enrollment successful');
          this.getCoursesToStdent(userId);
        },
        error => {
          console.error('Enrollment failed', error);
          alert('Enrollment failed');
        }
      );
  }

  RemoveStudentFromCourse(userId: number, courseId: number) {
    this.http.delete<any>(`${this.baseUrl}/${courseId}/unenroll`, {
      body: { userId: userId.toString() }
    }).subscribe(
      data => {
        console.log('UnEnrollment successful', data);
        alert('UnEnrollment successful');
        this.getCoursesToStdent(userId);
      },
      error => {
        alert('UnEnrollment failed');
        console.error('UnEnrollment failed', error);
      }
    );
  }
}
