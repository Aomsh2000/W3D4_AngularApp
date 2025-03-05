import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

// Define the User and Post interfaces
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add any other fields from the user object as needed
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  // Add any other fields from the post object as needed
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // Specify the types for the arrays
  users: User[] = []; // This will store the list of users
  posts: { [key: number]: Post[] } = {}; // This will store posts by userId (map of userId -> posts)

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch users from the service
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Assign the fetched users to the users array
        this.fetchPostsForUsers(); // Once users are fetched, fetch posts for each user
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Fetch posts for each user
  fetchPostsForUsers(): void {
    this.users.forEach(user => {
      this.userService.getPostsByUser(user.id).subscribe(
        (data: Post[]) => {
          this.posts[user.id] = data; // Assign the posts to the respective userId
          console.log(`Posts for ${user.name}:`, data); // Log the posts data
        },
        (error) => {
          console.error('Error fetching posts for user:', user.id, error);
        }
      );
    });
  }
}
