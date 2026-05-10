import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h3>Login</h3>
        <form class="auth-form" (ngSubmit)="go()">
          <input [(ngModel)]="email" name="e" type="email" placeholder="Email" required />
          <input [(ngModel)]="pass" name="p" type="password" placeholder="Password" required />
          <button type="submit" class="btn">Sign in</button>
        </form>
        <a routerLink="/register" class="link">Create account</a>
        @if (err) {
          <small class="msg-err">{{ err }}</small>
        }
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  pass = '';
  err = '';

  constructor(private auth: AuthService, private router: Router) {}

  go(): void {
    this.err = '';
    if (this.auth.login(this.email, this.pass)) this.router.navigate(['/profile']);
    else this.err = 'Invalid email or password';
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h3>Register</h3>
        <form class="auth-form" (ngSubmit)="go()">
          <input [(ngModel)]="name" name="n" placeholder="Name" required />
          <input [(ngModel)]="email" name="e" type="email" placeholder="Email" required />
          <input [(ngModel)]="pass" name="p" type="password" placeholder="Password" required />
          <button type="submit" class="btn">Sign up</button>
        </form>
        <a routerLink="/login" class="link">Already have an account?</a>
        @if (err) {
          <small class="msg-err">{{ err }}</small>
        }
      </div>
    </div>
  `,
})
export class RegisterComponent {
  name = '';
  email = '';
  pass = '';
  err = '';

  constructor(private auth: AuthService, private router: Router) {}

  go(): void {
    this.err = '';
    const result = this.auth.register(this.name, this.email, this.pass);
    if (result === 'exists') this.err = 'Email already exists';
    else this.router.navigate(['/login']);
  }
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h3>Profile</h3>
        @if (user) {
          <p class="profile-line">
            <strong>{{ user.name }}</strong><br />
            <span class="email">{{ user.email }}</span>
          </p>
        }
        <div class="actions">
          <button type="button" class="btn btn-ghost" (click)="out()">Logout</button>
          <a routerLink="/login" class="link">Login page</a>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  user: { name: string; email: string } | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.profile();
  }

  out(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
