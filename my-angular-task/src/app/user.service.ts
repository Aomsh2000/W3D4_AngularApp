import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl = 'https://jsonplaceholder.typicode.com/users';
  private postsApiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl);
  }

  // Fetch posts by user ID
  getPostsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.postsApiUrl}?userId=${userId}`);
  }
}
