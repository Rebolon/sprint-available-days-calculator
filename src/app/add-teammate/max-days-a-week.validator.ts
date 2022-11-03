import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const maxDaysAWeekValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const availableDaysInAWeek = control.parent?.get('availableDaysInAWeek');
  const meetingDaysAWeek = control.get('meetingDaysAWeek');

  return availableDaysInAWeek && meetingDaysAWeek && availableDaysInAWeek.value >= meetingDaysAWeek.value ?
    null : { maxDaysAWeek: true };
};
