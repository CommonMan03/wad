import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div style="background: red; padding: 20px; color: white;">
    <h1>Angular App is Working!</h1>
    <router-outlet />
  </div>`,
})
export class AppComponent {}
