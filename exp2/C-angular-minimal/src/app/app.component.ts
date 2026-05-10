import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Angular Auth App</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <p>&copy; 2024</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
    }
    header {
      background: #007bff;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    main {
      flex: 1;
      background: #f8f9fa;
      padding: 2rem;
    }
    footer {
      background: #e9ecef;
      padding: 1rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class AppComponent {
  title = 'angular-auth-app';
}
