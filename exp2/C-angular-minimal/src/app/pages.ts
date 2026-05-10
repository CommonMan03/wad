import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login</h2>
        <form (ngSubmit)="handleLogin()">
          <input [(ngModel)]="email" type="email" placeholder="Email" name="email" required>
          <input [(ngModel)]="password" type="password" placeholder="Password" name="password" required>
          <button type="submit">Login</button>
          @if (errorMessage) {
            <div class="error">{{ errorMessage }}</div>
          }
        </form>
        <p>Don't have an account? <a routerLink="/register">Register</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      padding: 20px;
    }
    .auth-card {
      background: white;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .error {
      color: #dc3545;
      background: #f8d7da;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
    }
    p {
      text-align: center;
      margin-top: 1rem;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  handleLogin() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Register</h2>
        <form (ngSubmit)="handleRegister()">
          <input [(ngModel)]="name" type="text" placeholder="Name" name="name" required>
          <input [(ngModel)]="email" type="email" placeholder="Email" name="email" required>
          <input [(ngModel)]="password" type="password" placeholder="Password" name="password" required>
          <button type="submit">Register</button>
          @if (errorMessage) {
            <div class="error">{{ errorMessage }}</div>
          }
        </form>
        <p>Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      padding: 20px;
    }
    .auth-card {
      background: white;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      background: #28a745;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .error {
      color: #dc3545;
      background: #f8d7da;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
    }
    p {
      text-align: center;
      margin-top: 1rem;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  handleRegister() {
    const result = this.auth.register(this.name, this.email, this.password);
    if (result === 'success') {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Registration failed';
    }
  }
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <h2>Profile</h2>
        @if (user) {
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
          </div>
          <button (click)="handleLogout()">Logout</button>
        } @else {
          <p>No user logged in</p>
          <a routerLink="/login">Login</a>
        }
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      padding: 20px;
    }
    .profile-card {
      background: white;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }
    .user-info {
      margin-bottom: 2rem;
    }
    h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
      margin-bottom: 2rem;
    }
    button {
      background: #dc3545;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class ProfileComponent {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getProfile();
  }

  handleLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
