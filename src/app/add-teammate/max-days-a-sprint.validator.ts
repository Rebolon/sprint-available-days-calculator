import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Injectable, inject } from '@angular/core';
import { ParametersService } from '../edit-parameters/parameters.service';
import ParameterI from '../edit-parameters/parameters';
import { delay, map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MaxDaysASprintValidator implements AsyncValidator {
  private parametersService = inject(ParametersService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const availableDaysInAWeek = control.get('availableDaysInAWeek');
    const holidaysForNextSprint = control.get('holidaysForNextSprint');

    return toObservable(this.parametersService.getParameters).pipe(
      map((parameters: ParameterI) => {
        if (
          availableDaysInAWeek &&
          holidaysForNextSprint &&
          availableDaysInAWeek.value * parameters.nbWeeksForOneSprint >=
            holidaysForNextSprint.value
        ) {
          return { maxDaysASprint: true };
        }

        return null;
      }),
      delay(500),
    );
  }
}
