import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrengthValidator(
    control: AbstractControl
): ValidationErrors | null {
    //Get value from user
    const value = control.value as string;

    // Return null for validator.required 
    if (!value) return null; 

    const hasUppercase = /[A-Z]/.test(value);
    const hashSpecialCharacter =/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value);



    const errors: ValidationErrors = {};

    if (!hasUppercase) {
        errors['uppercase'] = true;
    }

    if (!hashSpecialCharacter) {
        errors['specialCharacter'] = true;
    }

    return Object.keys(errors).length ? errors:null
}
