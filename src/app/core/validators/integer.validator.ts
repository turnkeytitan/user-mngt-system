import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isInteger(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    return !Number.isInteger(value) ? { isInteger: true } : null;
  };
}
