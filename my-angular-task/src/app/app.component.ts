import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {UserListComponent} from "./user-list/user-list.component";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,UserListComponent],
  providers: [UserService], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-task';
}
