import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword = false;
  showPopup = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isLoading = true;
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
        this.isLoading = false;
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}
