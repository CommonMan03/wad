import { Injectable } from '@angular/core';

/** Shape of one stored user (demo only — real apps hash passwords server-side). */
export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'app_users'; // localStorage key: all registrations
  private readonly SESSION_KEY = 'session_user'; // localStorage key: logged-in user (no password)

  /** Read users array from localStorage (JSON string → object). */
  private loadUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  /** Save new user; returns error message or null if OK. */
  register(name: string, email: string, password: string): string | null {
    const users = this.loadUsers();
    if (users.some((u) => u.email === email)) return 'Email already registered';
    users.push({ name, email, password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return null;
  }

  /** Check email/password; on success store session (name + email only). */
  login(email: string, password: string): boolean {
    const u = this.loadUsers().find((x) => x.email === email && x.password === password);
    if (!u) return false;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ name: u.name, email: u.email }));
    return true;
  }

  /** Current user for Profile (or null if not logged in). */
  profile(): { name: string; email: string } | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
