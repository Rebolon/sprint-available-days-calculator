import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import TeammateI from "./teammate";
import {maxDaysAWeekValidator} from './max-days-a-week.validator';
import {MaxDaysASprintValidator} from './max-days-a-sprint.validator';

export const AddTeammateFormDefaultValues = {
  name: '',
  availableDaysInAWeek: 5,
  holidaysForNextSprint: 0,
  meetingDaysAWeek: 0,
  isNewComer: false
}

@Injectable({
  providedIn: 'root'
})
export class AddTeammateForm {
  constructor(
    protected maxDaysInASprintValidator: MaxDaysASprintValidator) {
  }

  createAddForm(): FormGroup {
      return new FormGroup({
        'name': new FormControl<string>(
          AddTeammateFormDefaultValues.name,
          [Validators.required, Validators.minLength(2)]
        ),
        'availableDaysInAWeek': new FormControl<number>(
          AddTeammateFormDefaultValues.availableDaysInAWeek,
          [Validators.required, Validators.min(1), Validators.max(7)]
        ),
        'holidaysForNextSprint':  new FormControl<number>(
          AddTeammateFormDefaultValues.holidaysForNextSprint,
          {
            //asyncValidators: [this.maxDaysInASprintValidator.validate.bind(this.maxDaysInASprintValidator)],
            validators: [Validators.required, Validators.min(0)]
          }
        ),
        'meetingDaysAWeek': new FormControl<number>(
          AddTeammateFormDefaultValues.meetingDaysAWeek,
          [Validators.required, Validators.min(0), maxDaysAWeekValidator]
        ),
        'isNewComer': new FormControl<boolean>(
          AddTeammateFormDefaultValues.isNewComer
        ),
      },
      {
        updateOn: "blur"
      });
  }

  createEditForm(editedTeammate: TeammateI): FormGroup {
    const form = this.createAddForm();
    form.controls['name'].setValue(editedTeammate.name)
    form.controls['availableDaysInAWeek'].setValue(editedTeammate.availableDaysInAWeek)
    form.controls['holidaysForNextSprint'].setValue(editedTeammate.holidaysForNextSprint)
    form.controls['meetingDaysAWeek'].setValue(editedTeammate.meetingDaysAWeek)
    form.controls['isNewComer'].setValue(editedTeammate.isNewComer)

    return form;
  }

  resetForm(form: FormGroup): void {
    form.reset({
      name: AddTeammateFormDefaultValues.name,
      availableDaysInAWeek: AddTeammateFormDefaultValues.availableDaysInAWeek,
      holidaysForNextSprint: AddTeammateFormDefaultValues.holidaysForNextSprint,
      meetingDaysAWeek: AddTeammateFormDefaultValues.meetingDaysAWeek,
      isNewComer: AddTeammateFormDefaultValues.isNewComer
    });
  }
}
