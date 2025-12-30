import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
    control: AbstractControl
): ValidationErrors | null {
    //Get password and confirmPasswrod from user
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword')

    // Return null for validator.required 
    if (!password || !confirmPassword) return null;
    
    const errors: ValidationErrors = {}

    if(password.value != confirmPassword.value){
        errors['mismatch'] = true;
    }

    return Object.keys(errors).length ? errors:null
}
