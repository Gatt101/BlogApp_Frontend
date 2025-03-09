import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 rounded-lg shadow-lg m-8">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Create New Post</h2>
      <form (ngSubmit)="onSubmit()" class="space-y-6">
      
        <div class="space-y-2">
          <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Author:</label>
          <input
            type="text"
            id="author"
            [(ngModel)]="post.author"
            name="author"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
          <input
            type="text"
            id="title"
            [(ngModel)]="post.title"
            name="title"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Content:</label>
          <textarea
            id="content"
            [(ngModel)]="post.content"
            name="content"
            rows="6"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  `
})
export class CreatePostComponent {
  post = {
    title: '',
    content: '',
    author: ''
  };

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.post.title && this.post.content && this.post.author) {
      this.postService.createPost(this.post).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => console.error('Error creating post:', error)
      });
    }
  }
}
