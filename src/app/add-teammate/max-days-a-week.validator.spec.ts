import { maxDaysAWeekValidator } from './max-days-a-week.validator';
import { FormGroup, FormControl } from '@angular/forms';

describe('maxDaysAWeekValidator', () => {
  it('maxDaysAWeekValidator should be valid', () => {
    const form = new FormGroup({
      availableDaysInAWeek: new FormControl(5),
      meetingDaysAWeek: new FormControl(1, [maxDaysAWeekValidator]),
    });
    form.markAllAsTouched();
    expect(form.valid).toBeFalse();
  });

  it('maxDaysAWeekValidator should be invalid', () => {
    const form = new FormGroup({
      availableDaysInAWeek: new FormControl(5),
      meetingDaysAWeek: new FormControl(10, [maxDaysAWeekValidator]),
    });
    form.markAllAsTouched();
    expect(form.valid).toBeFalse();
  });
});
