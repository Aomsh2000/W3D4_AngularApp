import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsApiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch posts by user ID
  getPostsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.postsApiUrl}?userId=${userId}`).pipe(
      catchError(this.handleError) // Catch errors and handle them
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error for debugging purposes
    // Return a user-friendly error message
    return throwError('Something went wrong while fetching data. Please try again later.');
  }
}
