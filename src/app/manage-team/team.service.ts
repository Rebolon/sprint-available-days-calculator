import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReplaySubject, first, map } from 'rxjs';
import TeammateI from '../add-teammate/teammate';

export interface TeamServiceI {
  getTeammates: Signal<TeammateI[]>;
  addTeammate(teammate: TeammateI): void;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService implements TeamServiceI {
  private team$: ReplaySubject<TeammateI[]> = new ReplaySubject(1);

  constructor() {
    this.team$.next([]);
  }

  getTeammates = toSignal(
    this.team$.asObservable().pipe(
      map((teammates) =>
        teammates.sort((a: TeammateI, b: TeammateI) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        }),
      ),
    ),
    { initialValue: [] },
  );

  addTeammate(newTeammate: TeammateI): void {
    this.team$
      .pipe(
        first(),
        map((teammates) => {
          teammates.push(newTeammate);

          return teammates;
        }),
      )
      .subscribe((teammates) => {
        this.team$.next(teammates);
      });
  }

  editTeammate(newTeammate: TeammateI, previousTeammate: TeammateI): void {
    this.team$
      .pipe(
        first(),
        // @todo possible de faire ça de manière Prog Fonctionnelle ?
        map((teammates: TeammateI[]) => {
          teammates = teammates.map((teammate) => {
            if (teammate === previousTeammate) {
              return newTeammate;
            }

            return teammate;
          });

          return teammates;
        }),
      )
      .subscribe((teammates) => {
        this.team$.next(teammates);
      });
  }
}
