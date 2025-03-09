import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './app/components/home/home.component';
import { CreatePostComponent } from './app/components/create-post/create-post.component';
import { PostDetailComponent } from './app/components/post-detail/post-detail.component';
import { ThemeService } from './app/services/theme.service';
import { NgIf } from '@angular/common';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'post/:id', component: PostDetailComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,NgIf],
  template: `
    <div class="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <nav class="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div class="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex space-x-6">
            <a routerLink="/" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Home
            </a>
            <a routerLink="/create" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Create Post
            </a>
          </div>
          <button 
            (click)="toggleDarkMode()" 
            class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <svg 
              *ngIf="!isDarkMode" 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg 
              *ngIf="isDarkMode" 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    ThemeService
  ]
}).catch(err => console.error(err));
