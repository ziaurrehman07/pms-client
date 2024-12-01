import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/student.model';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {

  // @Output() saveProfile = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Input() student: User | null = null;


  editedStudent!: User;
}
