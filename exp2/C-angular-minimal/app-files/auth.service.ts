import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private U = 'app_users';
  private S = 'session_user';

  private users() {
    return JSON.parse(localStorage.getItem(this.U) || '[]') as { name: string; email: string; password: string }[];
  }

  register(n: string, e: string, p: string): string | null {
    const a = this.users();
    if (a.some((x) => x.email === e)) return 'exists';
    a.push({ name: n, email: e, password: p });
    localStorage.setItem(this.U, JSON.stringify(a));
    return null;
  }

  login(e: string, p: string): boolean {
    const u = this.users().find((x) => x.email === e && x.password === p);
    if (!u) return false;
    localStorage.setItem(this.S, JSON.stringify({ name: u.name, email: u.email }));
    return true;
  }

  profile(): { name: string; email: string } | null {
    const r = localStorage.getItem(this.S);
    return r ? JSON.parse(r) : null;
  }

  logout() {
    localStorage.removeItem(this.S);
  }
}
