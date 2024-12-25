import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
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
  isDropdownOpen: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isLogoutModal: boolean = false;
  isProfileModal: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: () => {
        console.error('Failed to load user data');
      },
    });
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
      },
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
  toggleLogoutModal() {
    this.isLogoutModal = !this.isLogoutModal;
  }
  toggleProfileModal() {
    this.isProfileModal = !this.isProfileModal;
    if (!this.isProfileModal) {
      this.imagePreview = null;
      this.selectedFile = null;
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.selectedFile) {
      this.loading = true;
      const formData = new FormData();
      formData.append('avatar', this.selectedFile);

      this.userService.updateUserAvatar(formData).subscribe({
        next: (response) => {
          if (this.userData) {
            this.userData.avatar = response.data.avatar;
          }
          this.loading = false;
          this.imagePreview = null;
          this.toggleProfileModal();
        },
        error: (error) => {
          console.error('Error updating avatar:', error);
          this.loading = false;
        },
      });
    } else {
      console.error('No file selected');
    }
  }
}
