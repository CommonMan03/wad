import { Injectable } from '@angular/core';

type UserRecord = { name: string; email: string; password: string };
type SessionUser = { name: string; email: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersKey = 'app_users';
  private readonly sessionKey = 'session_user';

  private users(): UserRecord[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]') as UserRecord[];
  }

  register(name: string, email: string, password: string): string | null {
    const users = this.users();
    if (users.some((x) => x.email === email)) return 'exists';
    users.push({ name, email, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return null;
  }

  login(email: string, password: string): boolean {
    const user = this.users().find((x) => x.email === email && x.password === password);
    if (!user) return false;
    localStorage.setItem(this.sessionKey, JSON.stringify({ name: user.name, email: user.email }));
    return true;
  }

  profile(): SessionUser | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }
}
