import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Login</h2>
    <!-- Template-driven form: ngSubmit fires without full page reload -->
    <form (ngSubmit)="submit()">
      <p><input [(ngModel)]="email" name="email" type="email" placeholder="Email" required /></p>
      <p><input [(ngModel)]="password" name="password" type="password" placeholder="Password" required /></p>
      <button type="submit">Login</button>
    </form>
    <p><a routerLink="/register">Register</a></p>
    @if (err) { <p style="color:red">{{ err }}</p> }
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  err = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    this.err = '';
    // Service checks credentials against localStorage "database"
    if (this.auth.login(this.email, this.password)) this.router.navigate(['/profile']);
    else this.err = 'Invalid email or password';
  }
}
