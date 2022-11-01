import {Component, OnInit} from '@angular/core';
import {TeamService} from "./team.service";
import TeammateI from "../add-teammate/teammate";
import {of, switchMap} from "rxjs";
import ParameterI, {DefaultParameter} from '../edit-parameters/parameters';

@Component({
  selector: 'app-create-team',
  // standalone: true,
  template: `
    <h1>{{editedTeammate | teammateFormTitle}}</h1>
    <app-add-teammate [editedTeammate]="editedTeammate"></app-add-teammate>

    <h1 *ngIf="nbOfTeammates > 0">List of teammates</h1>
    <ul>
      <li *ngFor="let teammate of (this.teamService.getTeammates() | async); trackBy: trackByName">
        {{teammate.name}}: {{teammate.getAvailableDaysInSprint(parameters.nbWeeksForOneSprint)}} days available
        <button *ngIf="!editedTeammate || editedTeammate !== teammate" (click)="editTeammate(teammate)"
                class="btn btn-icon" aria-label="edit">
          <clr-icon shape="edit"></clr-icon>
        </button>
      </li>
    </ul>

    <clr-alert *ngIf="nbOfTeammates === 0" [clrAlertType]="'info'" [clrAlertClosable]="false">
      <clr-alert-item>
          <span class="alert-text">
              Please add teammate and then it will calculate the available days for the sprint.
          </span>
      </clr-alert-item>
    </clr-alert>
    
    <h1>Adapt parameters</h1>
    <app-edit-parameters (parameters)="setParameters($event)"></app-edit-parameters>

    <ng-container>
      <clr-alert *ngIf="nbOfTeammates > 0" [clrAlertType]="'info'"
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
    ReactiveFormsModule,
    AddTeammateComponent,
    AsyncPipe,
    NgForOf
  ],*/
  styles: []
})
export class CreateTeamComponent implements OnInit {
  nbOfTeammates: number = 0;
  editedTeammate: TeammateI|undefined = undefined
  availableDaysForTeam: number|undefined;
  parameters: ParameterI = DefaultParameter;

  constructor(protected teamService: TeamService) {
  }

  ngOnInit(): void {
    this.teamService.getTeammates().pipe(
      switchMap(teammates => of(teammates.length))
    ).subscribe(nbOfTeammates => this.nbOfTeammates = nbOfTeammates)

    this.teamService.getTeammates().subscribe(
      next => {
        // @todo add a toast to inform that the number changed because the team change
        this.calcAvailableDays()

        this.editedTeammate = undefined
      }
    )
  }

  protected setParameters(parameters: ParameterI): void {
    this.parameters = parameters
    this.calcAvailableDays()
  }

  protected editTeammate(teammate: TeammateI): void {
      this.editedTeammate = teammate
  }

  protected calcAvailableDays(): void {
    this.teamService.getTeammates().subscribe(
      (teammates: TeammateI[]) => {
        let availableDaysForTeam = 0;

        teammates.forEach((teammate: TeammateI) => {
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
    )
  }

  protected trackByName(index: number, teammate: TeammateI): string {
    return teammate.name
  }

}
