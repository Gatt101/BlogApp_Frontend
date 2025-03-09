import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment.production';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl =  environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Error Handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /** ✅ Get all posts */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /** ✅ Get a single post by ID */
  getPost(id: string): Observable<Post> {  // Use string instead of number
    return this.http.get<Post>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /** ✅ Create a new post */
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** ✅ Update an existing post */
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/update`, post, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** ✅ Delete a post using the entire post object */
  deletePost(post: Post): Observable<string> {
    return this.http.request<string>('delete', `${this.apiUrl}/delete`, {
      body: post,  // Send the entire post object in request body
      headers: this.httpOptions.headers
    }).pipe(
      catchError(this.handleError)
    );
  }
}
