import {Component, OnInit} from '@angular/core';
import {TeamService} from "../manage-team/team.service";
import TeammateI from '../add-teammate/teammate';
import {ParametersService} from '../edit-parameters/parameters.service';
import ParameterI, {DefaultParameter} from '../edit-parameters/parameters';
import {AlertService} from '../alert.service';
import {ClrAlertModule} from '@clr/angular';
import {ToFixedPipe} from '../to-fixed.pipe';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-available-days',
  standalone: true,
  imports: [CommonModule, ClrAlertModule, ToFixedPipe],
  template: `
    <ng-container>
      <clr-alert *ngIf="team.length > 0" [clrAlertType]="'info'"
                 [clrAlertClosable]="false">
        <clr-alert-item>
          <span class="alert-text">
              {{availableDaysForTeam | toFixed: 2}} days available for the sprint.
          </span>
        </clr-alert-item>
      </clr-alert>
    </ng-container>
  `,
  styles: []
})
export class AvailableDaysComponent implements OnInit {
  availableDaysForTeam: number|undefined;
  parameters: ParameterI = DefaultParameter;
  team: TeammateI[] = [];

  constructor(
    protected teamService: TeamService,
    protected parametersService: ParametersService,
    protected alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.teamService.getTeammates().subscribe(
      (team: TeammateI[]) => {
        this.team = team;
        this.calcAvailableDays()
      }
    )

    this.parametersService.getParameters()
      .subscribe((parameters: ParameterI) => {
        this.parameters = parameters
        this.calcAvailableDays()
      })
  }

  protected calcAvailableDays(): void {
    let errors: string[] = []
    let availableDaysForTeam = 0;

    this.team.forEach((teammate: TeammateI) => {
      try {
        let availableDays = teammate.getAvailableDaysInSprint(this.parameters.nbWeeksForOneSprint)
        if (teammate.isNewComer) {
          availableDays = availableDays - (availableDays * this.parameters.velocityRateForNewComer)
        }

        availableDaysForTeam += availableDays
      } catch (e: any) {
        errors.push(e.message)
      }
    })

    if (errors.length) {
        this.availableDaysForTeam = undefined
        this.alertService.setAlert(
          `Seems to be a problem in holidays of teammate and available days in a sprint: ${errors.join(', ')}`
        )
    } else {
      this.availableDaysForTeam = Math.round((availableDaysForTeam - (
        availableDaysForTeam * this.parameters.marginRate
      )) * 100) / 100
    }
  }
}
