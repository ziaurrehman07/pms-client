import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/users/user.service';
import { ApiResponse, User } from '../../models/student.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, StudentSidebarComponent, StudentNavbarComponent, CommonModule,
    RouterModule, MatSidenavModule, MatButtonModule, MatIconModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  isMobile: boolean = false;
  isSidebarOpen: boolean = true;
  data: User | null = null;
  errorMessage: string | null = null;
  @ViewChild('mobileSidebar') mobileSidebar!: MatSidenav;


  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {}

  ngOnInit(): void {
    this.loadActiveUsers();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      if (!this.isMobile) {
        this.isSidebarOpen = false;
      }
    });
  }
  toggleSidebar(): void {
    this.mobileSidebar.toggle();
  }
  closeSidebarOnLinkClick(sidenav: any): void {
    if (this.isMobile) {
      sidenav.close();
      this.isSidebarOpen = false;
    }
  }

  loadActiveUsers(): void {
    this.userService.getActiveUsers().subscribe({
      next: (response: ApiResponse) => {
        this.data = response.data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error:', error);
      },
    });
  }
}
