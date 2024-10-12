import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          const role = this.authService.getRole();
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'student') {
            this.router.navigate(['/student']);
          } else if (role === 'master') {
            this.router.navigate(['/master']);
          } else if (role === 'company') {
            this.router.navigate(['/company']);
          }
        },
        error: (err) => {
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
      });
    }
  }
}
