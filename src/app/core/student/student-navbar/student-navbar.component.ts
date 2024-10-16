import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../../services/users/user.model';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, NgIf, NgFor],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.scss'
})

export class StudentNavbarComponent implements OnInit {
  @Input() isSidebarOpen!: boolean;
  @Output() toggleSidenav = new EventEmitter<void>();
  data: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userService.getActiveUsers().subscribe(
      (response) => {
        this.data = response.data;
      });
  }
}
