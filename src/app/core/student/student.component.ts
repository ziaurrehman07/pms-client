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



@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterOutlet, RouterModule, StudentSidebarComponent, StudentNavbarComponent, CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
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
  isSidebarOpen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.isSidebarOpen = false;
      });
  }

  toggleSidebar(sidenav: any) {
    sidenav.toggle();
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
