import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  template: `
    <h2>Profile</h2>
    <!-- Interpolation {{ }} shows component property values in the template -->
    @if (user) {
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    }
    <p><button type="button" (click)="logout()">Logout</button></p>
    <p><a routerLink="/login">Login page</a></p>
  `,
})
export class ProfileComponent {
  /** Filled from AuthService (session written at login time). */
  user: ReturnType<AuthService['profile']> = null;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.user = this.auth.profile();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
