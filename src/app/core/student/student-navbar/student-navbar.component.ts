import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/student.model';
import { UserService } from '../../../services/users/user.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, NgIf, MatMenuModule],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss',
})

export class StudentNavbarComponent {
  @Input() isSidebarOpen!: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  userData: User | null = null;
  token: string | null = localStorage.getItem('token');
  role: string | null = localStorage.getItem('role');
  isDropdownOpen = false;
  isLoading: boolean = true; 
  errorMessage: string | null = null; 

  constructor(private authService: AuthService, private router: Router, private eRef: ElementRef, private userService: UserService) {}
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

  toggleSidenavs() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleSidenav.emit();
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.token = null;
        this.role = null;
        localStorage.clear();
        this.router.navigate(['/home']);
        console.error('Logout successfully');
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
