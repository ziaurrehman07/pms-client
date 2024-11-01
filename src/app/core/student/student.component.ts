import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { StudentNavbarComponent } from './student-navbar/student-navbar.component';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../services/users/user.service';
import { User, UserResponse } from '../../services/users/user.model';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, StudentSidebarComponent, StudentNavbarComponent, CommonModule,
    RouterModule, MatSidenavModule, MatButtonModule, MatIconModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  animations: [
    trigger('iconRotate', [
      state('open', style({ transform: 'rotate(0deg)' })),
      state('closed', style({ transform: 'rotate(180deg)' })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class StudentComponent implements OnInit {
  isMobile: boolean = false;
  isSidebarOpen: boolean = true;
  data: User | null = null;
  errorMessage: string | null = null;

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {}

  ngOnInit(): void {
    this.loadActiveUsers();

    // Detect if the screen is mobile or desktop
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.isSidebarOpen = !this.isMobile;
      });
  }

  // Toggle sidebar open/close on button click
  toggleSidebar(sidenav: any): void {
    sidenav.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Close sidebar on link click for mobile only
  closeSidebarOnLinkClick(sidenav: any): void {
    if (this.isMobile) {
      sidenav.close();
      this.isSidebarOpen = false;
    }
  }

  loadActiveUsers(): void {
    this.userService.getActiveUsers().subscribe({
      next: (response: UserResponse) => {
        this.data = response.data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error:', error);
      },
    });
  }
}
