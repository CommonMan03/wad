/**
 * Exam pattern: 3 standalone components in one file.
 * FormsModule + ngModel = template-driven form. Router.navigate = go to route.
 */
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
      <input [(ngModel)]="email" name="e" type="email" placeholder="Email" required>
      <input [(ngModel)]="pass" name="p" type="password" placeholder="Password" required>
      <button type="submit" class="btn">Sign in</button>
    </form>
    <a routerLink="/register" class="link">Create account</a>
    @if (err) { <small class="msg-err">{{ err }}</small> }
  </div>
</div>
`,
})
export class LoginComponent {
  email = '';
  pass = '';
  err = '';
  constructor(private a: AuthService, private r: Router) {}
  go() {
    this.err = '';
    if (this.a.login(this.email, this.pass)) this.r.navigate(['/profile']);
    else this.err = 'bad';
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
      <input [(ngModel)]="n" name="n" placeholder="Name" required>
      <input [(ngModel)]="email" name="e" type="email" placeholder="Email" required>
      <input [(ngModel)]="pass" name="p" type="password" placeholder="Password" required>
      <button type="submit" class="btn">Sign up</button>
    </form>
    <a routerLink="/login" class="link">Already have an account?</a>
    @if (err) { <small class="msg-err">{{ err }}</small> }
  </div>
</div>
`,
})
export class RegisterComponent {
  n = '';
  email = '';
  pass = '';
  err = '';
  constructor(private a: AuthService, private r: Router) {}
  go() {
    this.err = '';
    if (this.a.register(this.n, this.email, this.pass)) this.err = 'exists';
    else this.r.navigate(['/login']);
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
    @if (u) {
      <p class="profile-line"><strong>{{ u.name }}</strong><br><span class="email">{{ u.email }}</span></p>
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
  u = null as { name: string; email: string } | null;
  constructor(private a: AuthService, private r: Router) {
    this.u = this.a.profile();
  }
  out() {
    this.a.logout();
    this.r.navigate(['/login']);
  }
}
