import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent, ProfileComponent, RegisterComponent } from './pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
