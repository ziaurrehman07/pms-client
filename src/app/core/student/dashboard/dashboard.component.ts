import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../../models/student.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData: User | null = null;
  isLoading: boolean = true; 
  errorMessage: string | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load user data';
        this.isLoading = false;
      }
    );
  }
}
