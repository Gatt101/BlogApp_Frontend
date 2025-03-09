import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-12 bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ">
      <div class="flex flex-col justify-between items-center mb-6">
        <h1 class="text-5xl font-extrabold text-gray-900 dark:text-gray-100 font-mono tracking-wide">
          Blog Posts
        </h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          *ngFor="let post of posts" 
          [routerLink]="['/post', post.id]"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between" 
        >
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-serif">
              {{ post.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Written by 
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ post.author }}</span>
              <span *ngIf="post.createdAt" class="ml-2">
                on <span class="text-gray-600 dark:text-gray-400">{{ post.createdAt | date:'short' }}</span>
              </span>
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
              {{ post.content }}
            </p>
          </div>
          <div class="bg-gray-100 dark:bg-gray-700 p-4 text-right ">
            <button class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Read More →
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  isDarkMode = this.themeService.isDarkMode$; // Use global theme state

  constructor(private postService: PostService, private themeService: ThemeService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (error) => console.error('Error loading posts:', error),
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode(); // Toggle global dark mode
  }
}
