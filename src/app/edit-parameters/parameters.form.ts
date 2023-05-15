import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ParameterI from './parameters';

export class ParametersForm extends FormGroup {
  readonly nbWeeksForOneSprint = this.get(
    'nbWeeksForOneSprint'
  ) as FormControl<number>;
  readonly marginRate = this.get('marginRate') as FormControl<number>;
  readonly velocityRateForNewComer = this.get(
    'velocityRateForNewComer'
  ) as FormControl<number>;

  constructor(
    readonly parameters: ParameterI,
    readonly formBuilder: FormBuilder = new FormBuilder()
  ) {
    super(
      formBuilder.group({
        nbWeeksForOneSprint: new FormControl<number>(
          parameters?.nbWeeksForOneSprint,
          [Validators.required, Validators.min(1)]
        ),
        marginRate: new FormControl<number>(parameters?.marginRate, [
          Validators.required,
          Validators.min(0),
          Validators.max(1),
        ]),
        velocityRateForNewComer: new FormControl<number>(
          parameters?.velocityRateForNewComer,
          [Validators.required, Validators.min(0), Validators.max(1)]
        ),
      }).controls
    );
  }
}
