import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormButtonComponent } from '../../../../shared/components/form-button/form-button.component';
import { AuthService } from '../../services/authService';
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

  // Connect the server with the loginForm component
  // Call the service (inject) to pass the user data to the sever (*)
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

    // (*) --> subscribe the observable that is returned (can get the response data or error)
    this.authFeatureService.login(loginData).subscribe({
      next: (res) => {
        console.log('STATUS:', res.status);
        this.router.navigate(['/todo_list']);
      },
      error: () => {
        alert('Login failed');
      },
    });
  }
}




