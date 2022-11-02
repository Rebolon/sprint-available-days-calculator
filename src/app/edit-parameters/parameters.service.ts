import {Injectable} from '@angular/core';
import {distinct, Observable, ReplaySubject} from "rxjs";
import ParameterI from './parameters';

export interface ParametersServiceI {
  getParameters(): Observable<ParameterI>
  setParameters(parameters: ParameterI): void
}

@Injectable({
  providedIn: 'root'
})
export class ParametersService implements ParametersServiceI {
  private parameters$: ReplaySubject<ParameterI> = new ReplaySubject(1)

  getParameters(): Observable<ParameterI> {
    return this.parameters$.asObservable().pipe(
      distinct()
    )
  }

  setParameters(parameters: ParameterI): void {
    this.parameters$.next(parameters)
  }
}
