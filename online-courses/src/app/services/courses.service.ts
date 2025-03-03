import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000/api/courses';

  public courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  constructor(private http: HttpClient) { }

  getCourses() {
    this.http.get<Course[]>(this.baseUrl).subscribe(data => {
      this.courses.next(data);
    })
  }

  addCourse(course: Course) {
    this.http.post<any>(this.baseUrl, course).subscribe(
      data => {
        this.getCourses();
        alert('Course added successfully');
      },
      error => {
        alert('Course add failed');
      }
    )
  }

  editCourse(courseId: number, course: Course) {
    this.http.put<any>(`${this.baseUrl}/${courseId}`, course).subscribe(
      data => {
        this.getCourses();
        alert('Course updated successfully');
      },
      error => {
        alert('Course update failed');
      }
    );
  }

  deleteCourse(courseId: number) {
    this.http.delete<any>(`${this.baseUrl}/${courseId}`).subscribe(
      data => {
        this.getCourses();
        alert('Course deleted successfully');
      },
      error => {
        alert('Course delete failed');
      }
    );
  }
}
