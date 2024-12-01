import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/student.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentDetailsComponent, StudentEditComponent],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit{
  isEditing = false;
  errorMessage: string | null = null;
  userData: User | null = null;
  isLoading: boolean = true; 



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

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
 
}
