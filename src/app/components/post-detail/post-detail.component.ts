import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div class="max-w-4xl mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <button 
            (click)="goBack()" 
            class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center gap-2 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transition-colors duration-300">
          <ng-container *ngIf="!error; else errorTemplate">
            <div *ngIf="post; else loadingTemplate">
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                {{ post.title }}
              </h1>
              <div class="mb-8 border-b dark:border-gray-700 pb-4">
                <p class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Written by 
                  <span class="font-medium text-gray-800 dark:text-gray-200">{{ post.author }}</span>
                  <span *ngIf="post.createdAt" class="ml-2 text-gray-500 dark:text-gray-500">
                    on {{ post.createdAt | date:'medium' }}
                  </span>
                </p>
              </div>
              <div class="prose dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg transition-colors duration-300">
                  {{ post.content }}
                </p>
              </div>
            </div>
          </ng-container>

          <!-- Loading Template -->
          <ng-template #loadingTemplate>
            <div class="flex flex-col items-center justify-center py-12">
              <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 dark:border-blue-400 mb-4"></div>
              <p class="text-gray-600 dark:text-gray-400 text-lg animate-pulse transition-colors duration-300">
                Loading post...
              </p>
            </div>
          </ng-template>

          <!-- Error Template -->
          <ng-template #errorTemplate>
            <div class="text-center py-12">
              <p class="text-lg font-medium text-red-600 dark:text-red-400 transition-colors duration-300">
                {{ error }}
              </p>
              <button 
                (click)="retryLoad()" 
                class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Try Again
              </button>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  error: string | null = null;
  private currentId: string | null = null;
  isDarkMode = this.themeService.isDarkMode$; // Subscribe to global theme state

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService // Inject ThemeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];  // ✅ Fix: MongoDB uses string IDs
      if (id) {
        this.currentId = id;
        this.loadPost(id);
      } else {
        this.error = 'Invalid post ID';
        this.router.navigate(['/']);
      }
    });
  }

  loadPost(id: string) {
    this.error = null;
    this.post = null;
    
    this.postService.getPost(id).subscribe({
      next: (post) => {
        if (post) {
          this.post = post;
        } else {
          this.error = 'Post not found';
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.error = 'Failed to load post. Please try again.';
      }
    });
  }

  retryLoad() {
    if (this.currentId) {
      this.loadPost(this.currentId);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode(); // Use global dark mode toggle
  }
}
