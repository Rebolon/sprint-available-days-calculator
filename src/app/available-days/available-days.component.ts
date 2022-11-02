import {Component, OnInit} from '@angular/core';
import {TeamService} from "../manage-team/team.service";
import TeammateI from '../add-teammate/teammate';
import {ParametersService} from '../edit-parameters/parameters.service';
import ParameterI, {DefaultParameter} from '../edit-parameters/parameters';

@Component({
  selector: 'app-available-days',
  //standalone: true,
  template: `
    <ng-container>
      <clr-alert *ngIf="team.length > 0" [clrAlertType]="'info'"
                 [clrAlertClosable]="false">
        <clr-alert-item>
          <span class="alert-text">
              {{availableDaysForTeam}} days available for the sprint.
          </span>
        </clr-alert-item>
      </clr-alert>
    </ng-container>
  `,
  /*imports: [
    ReactiveFormsModule
  ],*/
  styles: []
})
export class AvailableDaysComponent implements OnInit {
  availableDaysForTeam: number|undefined;
  parameters: ParameterI = DefaultParameter;
  team: TeammateI[] = [];

  constructor(protected teamService: TeamService, protected parametersService: ParametersService) {
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
    let availableDaysForTeam = 0;

    this.team.forEach((teammate: TeammateI) => {
      let availableDays = teammate.getAvailableDaysInSprint(this.parameters.nbWeeksForOneSprint)
      if (teammate.isNewComer) {
        availableDays = availableDays - (availableDays * this.parameters.velocityRateForNewComer)
      }

      availableDaysForTeam += availableDays
    })

    this.availableDaysForTeam = Math.round((availableDaysForTeam - (
      availableDaysForTeam * this.parameters.marginRate
    )) * 100) / 100
  }
}
