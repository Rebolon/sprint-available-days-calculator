import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import TeammateI from "./teammate";
import {maxDaysAWeekValidator} from './max-days-a-week.validator';
import {MaxDaysASprintValidator} from './max-days-a-sprint.validator';

export class TeammateForm extends FormGroup {
  readonly name = this.get('name') as FormControl<string>;
  readonly availableDaysInAWeek = this.get('availableDaysInAWeek') as FormControl<number>;
  readonly holidaysForNextSprint = this.get('holidaysForNextSprint') as FormControl<number>;
  readonly meetingDaysAWeek = this.get('meetingDaysAWeek') as FormControl<number>;
  readonly isNewComer = this.get('isNewComer') as FormControl<boolean>;

  constructor(
    readonly teammate: TeammateI,
    protected maxDaysInASprintValidator: MaxDaysASprintValidator,
    readonly formBuilder: FormBuilder = new FormBuilder()
  ) {
    super(formBuilder.group(
      {
        'name': new FormControl<string>(
          teammate?.name,
          [Validators.required, Validators.minLength(2)]
        ),
        'availableDaysInAWeek': new FormControl<number>(
          teammate?.availableDaysInAWeek,
          [Validators.required, Validators.min(1), Validators.max(7)]
        ),
        'holidaysForNextSprint':  new FormControl<number>(
          teammate?.holidaysForNextSprint,
          {
            // @todo fix the async validator coz it fails, the form still in pending status
            //asyncValidators: [maxDaysInASprintValidator.validate.bind(maxDaysInASprintValidator)],
            validators: [Validators.required, Validators.min(0)]
          }
        ),
        'meetingDaysAWeek': new FormControl<number>(
          teammate?.meetingDaysAWeek,
          [Validators.required, Validators.min(0), maxDaysAWeekValidator]
        ),
        'isNewComer': new FormControl<boolean>(
          teammate?.isNewComer
        ),
      }/*,
      {
        updateOn: "blur"
      }*/
    ).controls)
  }
}
