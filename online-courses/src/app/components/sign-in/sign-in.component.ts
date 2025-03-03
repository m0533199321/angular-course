import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatIconModule, MatCardModule, MatStepperModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  userForm: FormGroup;
  hide: boolean = true;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)]],
    });
  }
  toggleForm = () => {
    this.router.navigate(['']);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  goToSignUp() {
    this.router.navigate(['signUp']);
  }
  
  onSubmit() {
    if (this.userForm.invalid) {
      console.log("inavlid");

      this.userForm.markAllAsTouched();
      return;
    }
    let u = new User(0,
      this.userForm.get('name')?.value,
      this.userForm.get('email')?.value,
      this.userForm.get('password')?.value,
      this.userForm.get('role')?.value)
    this.authService.login(u);
    this.router.navigate(['']);
  }
}
