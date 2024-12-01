import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../../../models/student.model';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, NgIf],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss',
  animations: [
    trigger('dropdownSlideAnimation', [
      state('void', style({ transform: 'translateY(-10%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', animate('200ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ]),
    trigger('iconRotate', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed <=> open', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})

export class StudentNavbarComponent {
  @Input() isSidebarOpen!: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() data: User | null = null;
  token: string | null = localStorage.getItem('token');
  role: string | null = localStorage.getItem('role');
  isDropdownOpen = false;

  constructor(private authService: AuthService, private router: Router, private eRef: ElementRef) {}

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
