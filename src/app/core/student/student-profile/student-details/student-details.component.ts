import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/student.model';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {

  @Input() student: User | null = null;
  @Output() editProfile = new EventEmitter<void>();

  onCancel(){
    this.editProfile.emit()
  }
}
