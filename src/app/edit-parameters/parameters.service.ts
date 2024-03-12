import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReplaySubject, distinct } from 'rxjs';
import ParameterI, { Parameter } from './parameters';

export interface ParametersServiceI {
  getParameters: Signal<ParameterI>;
  setParameters(parameters: ParameterI): void;
}

@Injectable({
  providedIn: 'root',
})
export class ParametersService implements ParametersServiceI {
  private parameters$: ReplaySubject<ParameterI> = new ReplaySubject(1);

  getParameters = toSignal(this.parameters$.asObservable().pipe(distinct()), {
    initialValue: new Parameter(),
  });

  setParameters(parameters: ParameterI): void {
    this.parameters$.next(parameters);
  }
}
