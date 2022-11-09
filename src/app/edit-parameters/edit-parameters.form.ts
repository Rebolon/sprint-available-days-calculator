import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import ParameterI from './parameters';

@Injectable({
  providedIn: 'root'
})
export class EditParametersForm {
  createForm(parameters: ParameterI): FormGroup {
    return new FormGroup({
      'nbWeeksForOneSprint': new FormControl<number>(
        parameters.nbWeeksForOneSprint,
        [Validators.required, Validators.min(1)]
      ),
      'marginRate': new FormControl<number>(
        parameters.marginRate,
        [Validators.required, Validators.min(0), Validators.max(1)]
      ),
      'velocityRateForNewComer': new FormControl<number>(
        parameters.velocityRateForNewComer,
        [Validators.required, Validators.min(0), Validators.max(1)]
      )
    });
  }
}
