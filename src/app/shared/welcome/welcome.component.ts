import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { User } from '../../models/student.model';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit{
  userData: User | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = true; 

  constructor(private userService: UserService){}
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
