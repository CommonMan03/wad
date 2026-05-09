import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="submit()">
      <p><input [(ngModel)]="name" name="name" placeholder="Name" required /></p>
      <p><input [(ngModel)]="email" name="email" type="email" placeholder="Email" required /></p>
      <p><input [(ngModel)]="password" name="password" type="password" placeholder="Password" required /></p>
      <button type="submit">Register</button>
    </form>
    <p><a routerLink="/login">Back to Login</a></p>
    @if (err) { <p style="color:red">{{ err }}</p> }
  `,
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  err = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    this.err = '';
    const msg = this.auth.register(this.name, this.email, this.password);
    if (msg) {
      this.err = msg;
      return;
    }
    this.router.navigate(['/login']);
  }
}
