import { Component, Input } from '@angular/core';
import { User } from '../../../services/users/user.model';
import { UserService } from '../../../services/users/user.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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
