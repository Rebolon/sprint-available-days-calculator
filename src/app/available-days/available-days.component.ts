/* eslint-disable prettier/prettier */

import { Component, Signal, computed, inject } from '@angular/core';
import { ClrAlertModule } from '@clr/angular';
import TeammateI from '../add-teammate/teammate';
import { AlertService } from '../alert.service';
import { ParametersService } from '../edit-parameters/parameters.service';
import { TeamService } from '../manage-team/team.service';
import { ToFixedPipe } from '../to-fixed.pipe';

@Component({
  selector: 'app-available-days',
  standalone: true,
  imports: [ClrAlertModule, ToFixedPipe],
  template: `
    @if (teamService.getTeammates().length > 0) {
    <clr-alert [clrAlertType]="'info'" [clrAlertClosable]="false">
        <clr-alert-item>
          <span class="alert-text">
            {{ availableDaysForTeam() | toFixed: 2 }} days available for the
            sprint.
          </span>
        </clr-alert-item>
      </clr-alert>
    }
  `,
  styles: [],
})
export class AvailableDaysComponent {
  protected teamService = inject(TeamService);
  protected parametersService = inject(ParametersService);
  protected alertService = inject(AlertService);
  protected availableDaysForTeam: Signal<number|undefined> = computed(() => {
    const errors: string[] = [];
    let availableDaysForTeam = 0;

    this.teamService.getTeammates().forEach((teammate: TeammateI) => {
      try {
        let availableDays = teammate.getAvailableDaysInSprint(
          this.parametersService.getParameters().nbWeeksForOneSprint
        );
        if (teammate.isNewComer) {
          availableDays =
            availableDays -
            availableDays * this.parametersService.getParameters().velocityRateForNewComer;
        }

        availableDaysForTeam += availableDays;
      } catch (e: any) {
        errors.push(e.message);
      }
    });

    if (errors.length) {
      return undefined;
      this.alertService.setAlert(
        `Seems to be a problem in holidays of teammate and available days in a sprint: ${errors.join(
          ', '
        )}`
      );
    } else {
      return Math.round(
        (availableDaysForTeam -
          availableDaysForTeam * this.parametersService.getParameters().marginRate) *
          100
      ) / 100;
    }
  });
}
