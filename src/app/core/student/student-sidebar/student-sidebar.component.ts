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
  @Input() closeSidebarOnLinkClick!: () => void;

  constructor() {
  }
}
