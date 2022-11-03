import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {ParametersService} from '../edit-parameters/parameters.service';
import ParameterI from '../edit-parameters/parameters';
import {map, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaxDaysASprintValidator implements AsyncValidator {
  constructor(private parametersService: ParametersService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const availableDaysInAWeek = control.get('availableDaysInAWeek');
    const holidaysForNextSprint = control.get('holidaysForNextSprint');

    return this.parametersService.getParameters().pipe(
      map((parameters: ParameterI) => {
        if (availableDaysInAWeek
          && holidaysForNextSprint
          && availableDaysInAWeek.value * parameters.nbWeeksForOneSprint >= holidaysForNextSprint.value) {
          return { maxDaysASprint: true }
        }

        return null
      })
    )
  }
}
