import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Store users
  postsCount: { [key: number]: number } = {};  // Store post counts by user ID
  errorMessage: string = '';  // Store the error message

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      // Fetch posts count for each user
      users.forEach(user => {
        this.userService.getPostsByUser(user.id).subscribe(posts => {
          this.postsCount[user.id] = posts.length;  // Store the number of posts per user
        },
        (error) => {
          this.errorMessage = error;  // Set error message if fetching posts fails
        });
      });
    },
    (error) => {
      this.errorMessage = error;  // Set error message if fetching users fails
    });
  }
}
