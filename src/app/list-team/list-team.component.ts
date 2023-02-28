import {Component, OnInit} from '@angular/core';
import {TeamService} from "../manage-team/team.service";
import TeammateI from "../add-teammate/teammate";
import ParameterI, {DefaultParameter} from '../edit-parameters/parameters';
import {ParametersService} from '../edit-parameters/parameters.service';
import {ToFixedPipe} from '../to-fixed.pipe';
import {AddTeammateComponent} from '../add-teammate/add-teammate.component';
import {CommonModule} from '@angular/common';
import { ClarityIcons, pencilIcon } from '@cds/core/icon';
import { CdsIconModule } from '@cds/angular';

ClarityIcons.addIcons(pencilIcon);

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule, CdsIconModule,  ToFixedPipe, AddTeammateComponent],
  template: `
    <h1 *ngIf="team.length > 0">List of teammates</h1>
    <ul>
      <li *ngFor="let teammate of team; trackBy: trackByName">
        {{teammate.name}}: {{teammate.getAvailableDaysInSprint(parameters.nbWeeksForOneSprint) | toFixed:2}} days available
        <button *ngIf="!editedTeammate || editedTeammate !== teammate" (click)="editTeammate(teammate)"
                class="btn btn-link" aria-label="edit">
          <cds-icon shape="pencil"></cds-icon>
        </button>
      </li>
    </ul>

    <app-add-teammate *ngIf="editedTeammate" [editedTeammate]="editedTeammate"></app-add-teammate>
  `,
  styles: []
})
export class ListTeamComponent implements OnInit {
  team: TeammateI[] = [];
  parameters: ParameterI = DefaultParameter;
  editedTeammate: TeammateI|undefined = undefined

  constructor(protected teamService: TeamService, protected parametersService: ParametersService) {
  }

  ngOnInit(): void {
    this.teamService.getTeammates().subscribe(
      (team: TeammateI[]) => {
        this.team = team;

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
