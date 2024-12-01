import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/student.model';



@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {

  @Input() student: User | null = null;
  @Output() editProfile = new EventEmitter<void>();
}
