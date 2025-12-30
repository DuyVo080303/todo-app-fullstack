import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormButtonComponent } from '../../../../shared/components/form-button/form-button.component';
import { AuthService } from '../../../../core/services/authService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, CommonModule, FormButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})

export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  private authFeatureService = inject(AuthService);
  private router = inject(Router);

  handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authFeatureService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['/todo_list']);
      },
      error: () => {
        alert('Login failed');
      },
    });
  }
}
