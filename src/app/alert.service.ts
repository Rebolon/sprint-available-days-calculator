import { Injectable } from '@angular/core';
import {filter, Observable, of, ReplaySubject, switchMap} from "rxjs";

export interface AlertI {
  hasAlert(): Observable<boolean>;
  getAlert(): Observable<string>;
  setAlert(alert: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService implements AlertI {
  private alert$: ReplaySubject<string> = new ReplaySubject(1)

  public hasAlert(): Observable<boolean> {
    return this.alert$.asObservable().pipe(
      filter((next: string) => next.trim().length > 0),
      switchMap((next: string) => of(true))
    )
  }

  public getAlert(): Observable<string> {
    return this.alert$.asObservable();
  }

  public setAlert(alert: string): void {
    this.alert$.next(alert);
  }
}
