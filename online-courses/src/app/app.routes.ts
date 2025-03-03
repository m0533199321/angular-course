import { Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { LessonsListComponent } from './components/lessons-list/lessons-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { entryAuthGuard } from './gaurds/entry-auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'courses', component: CoursesListComponent, canActivate:[entryAuthGuard] },
    { path: 'courses/:id', component: LessonsListComponent }
];
