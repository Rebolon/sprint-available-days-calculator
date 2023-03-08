import {Component, OnInit} from '@angular/core';
import {TeamService} from "./team.service";
import TeammateI from "../add-teammate/teammate";
import ParameterI, {DefaultParameter} from '../edit-parameters/parameters';
import {ParametersService} from '../edit-parameters/parameters.service';
import {ListTeamComponent} from '../list-team/list-team.component';
import {ClrAlertModule} from '@clr/angular';
import {AvailableDaysComponent} from '../available-days/available-days.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [CommonModule, RouterModule, ClrAlertModule, ListTeamComponent, AvailableDaysComponent],
  template: `
    <app-list-team></app-list-team>

    <clr-alert *ngIf="nbOfTeammates === 0" [clrAlertType]="'info'" [clrAlertClosable]="false">
      <clr-alert-item>
          <span class="alert-text">
              Please <a routerLink="/add-teammate">add teammate</a> and then it will calculate the available days for the sprint.
          </span>
      </clr-alert-item>
    </clr-alert>

    <app-available-days></app-available-days>
  `,
  styles: []
})
export class ManageTeamComponent implements OnInit {
  availableDaysForTeam: number|undefined;
  team: TeammateI[] = [];
  parameters: ParameterI = DefaultParameter;
  nbOfTeammates: number = 0;
  editedTeammate: TeammateI|undefined = undefined

  constructor(protected teamService: TeamService, protected parametersService: ParametersService) {
  }

  ngOnInit(): void {
    this.teamService.getTeammates().subscribe(
      (team: TeammateI[]) => {
        this.team = team;
        this.nbOfTeammates = team.length;

        this.editedTeammate = undefined
      }
    )

    this.parametersService.getParameters().subscribe(
      (parameters: ParameterI) => this.parameters = parameters
    )
  }

  protected editTeammate(teammate: TeammateI): void {
      this.editedTeammate = teammate
  }

  protected trackByName(index: number, teammate: TeammateI): string {
    return teammate.name
  }

}
