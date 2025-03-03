import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from "./components/header/header.component";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.getUserFromToken();
    console.log(this.userService.userLog);
    console.log()
  }
  // constructor(private authService: AuthService) { }
  // title = 'online-courses';
}
