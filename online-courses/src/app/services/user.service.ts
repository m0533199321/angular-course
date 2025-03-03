import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CourseStudentsService } from './course-students.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users'
  public userLog: BehaviorSubject<User> = new BehaviorSubject<User>(new User(0, '', '', '', ''));

  constructor(private http: HttpClient, private course_student:CourseStudentsService) { }

  getById(id: number) {
    this.http.get<User>(`${this.baseUrl}/${id}`).subscribe(data => {
      this.userLog.next(data as User);
      console.log(this.userLog.value);
      this.course_student.getCoursesToStdent(this.userLog.value.id);
    }
    );
  }

  getUserFromToken() {
    const token = sessionStorage.getItem('authToken')
    if (token)
      try {
        const decodedToken: any = jwtDecode(token)
        console.log(decodedToken)
        this.getById(decodedToken.userId)
        console.log(this.userLog.value)
      }
      catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error)
      }
  }

  ngOnInit() {
    this.getUserFromToken()
  }
}
