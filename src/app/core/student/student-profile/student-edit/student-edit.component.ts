import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/student.model';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {

  @Output() saveProfile = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Input() student: User | null = null;
  editedStudent!: User;

  updateForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      fullName: [this.student?.fullName || '', [Validators.required]],
      enrollment: [this.student?.enrollment || '', [Validators.required]],
      email: [this.student?.email || '', [Validators.required, Validators.email]],
      branch: [this.student?.branch || '', [Validators.required]],
      result_10: [this.student?.result_10 || '', [Validators.required]],
      result_12: [this.student?.result_12 || '', [Validators.required]],
      college_cgpa: [this.student?.college_cgpa || '', [Validators.required]],
      mobile: [
        this.student?.mobile || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      address: [this.student?.address || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.userService.updateUserProfile(this.updateForm.value).subscribe({
      next: (response) => {
        console.log('User profile updated successfully:', response);
        this.isSubmitting = false;
        const updatedProfile = { ...this.student, ...this.updateForm.value };
        this.saveProfile.emit(updatedProfile);
        this.cancelEdit.emit();
      },
      error: (error) => {
        console.error('Error updating student profile:', error);
        this.isSubmitting = false;
      },
    });
  }
  onCancel(): void {
    this.cancelEdit.emit();
  }
}
