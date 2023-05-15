import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const maxDaysAWeekValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const availableDaysInAWeek = control.parent?.get('availableDaysInAWeek');

  return availableDaysInAWeek && availableDaysInAWeek.value >= control.value
    ? null
    : { maxDaysAWeek: true };
};
