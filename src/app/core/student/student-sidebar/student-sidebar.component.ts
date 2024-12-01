import { Component, HostListener, input, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../../models/student.model';

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.scss'
})
export class StudentSidebarComponent{
  @Input() isSidebarOpen!: boolean;
  @Input() data: User | null  = null;
  @Input() closeSidebarOnLinkClick!: () => void;
  isMobileOrTablet: boolean = false;

  constructor() {
    this.checkIfMobileOrTablet();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkIfMobileOrTablet();
  }

  private checkIfMobileOrTablet(): void {
    const width = window.innerWidth;
    this.isMobileOrTablet = width <= 768;
  }
}
