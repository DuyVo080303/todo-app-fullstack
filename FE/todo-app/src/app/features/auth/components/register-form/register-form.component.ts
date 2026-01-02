import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { passwordStrengthValidator } from '../../validators/passwordStrengthenValidator';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator';
import { CommonModule } from '@angular/common';
import { FormButtonComponent } from '../../../../shared/components/form-button/form-button.component';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { RegisterDto } from '../../models/register.dto';
import { RegisterFormDto } from '../../models/register-form.dto';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, CommonModule, FormButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    { validators: passwordMatchValidator }
  );

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  private authFeatureService = inject(AuthService);
  private router = inject(Router);

  handleRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const formValue = this.registerForm.value as RegisterFormDto

    const payload: RegisterDto = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
    };

    this.authFeatureService.register(payload).subscribe({
      next: (res) => {
        console.log('STATUS:', res.status);
        alert('Register Successfully');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Register failed');
      },
    });
  }
}
