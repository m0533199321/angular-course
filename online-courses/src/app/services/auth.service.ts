import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private userService: UserService) { }

  register(user: User) {
    this.http.post<any>(this.baseUrl + '/register', user).subscribe(
      data => {
        console.log('Registration successful:', data);
        this.login(user);
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    );
  }

  login(user: User) {
    this.http.post<any>(this.baseUrl + '/login', user).subscribe(data => {
      if (data.token) {
        alert('Login successful');
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('authToken', data.token);
        console.log(data.token);
        this.userService.getById(data.userId);
      }
    },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    );
  }
}
