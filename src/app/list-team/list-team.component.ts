import { CommonModule } from '@angular/common';
import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { AddTeammateComponent } from '../add-teammate/add-teammate.component';
import TeammateI from '../add-teammate/teammate';
import { ParametersService } from '../edit-parameters/parameters.service';
import { TeamService } from '../manage-team/team.service';
import { ToFixedPipe } from '../to-fixed.pipe';

import { toSignal } from '@angular/core/rxjs-interop';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, pencilIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
ClarityIcons.addIcons(pencilIcon);

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule, CdsIconModule, ToFixedPipe, AddTeammateComponent],
  template: `
    @if (team().length > 0) {
      <h1>List of teammates</h1>
    }
    <ul>
      @for (teammate of team(); track teammate.name) {
        <li>
          <button
            [disabled]="editedTeammate() && editedTeammate() === teammate"
            (click)="editTeammate(teammate)"
            class="btn btn-link"
            aria-label="edit"
          >
            <cds-icon shape="pencil"></cds-icon>
          </button>
          {{ teammate.name }}:
          {{
            teammate.getAvailableDaysInSprint(parametersService.getParameters().nbWeeksForOneSprint)
              | toFixed: 2
          }}
          days available
        </li>
      }
    </ul>

    <app-add-teammate
      *ngIf="editedTeammate()"
      [editedTeammate]="editedTeammate()"
    ></app-add-teammate>
  `,
  styles: 'ul > li { list-style: none; }',
})
export class ListTeamComponent {
  protected team: Signal<TeammateI[]> = computed(() => this.teamService.getTeammates());
  editedTeammate: WritableSignal<TeammateI | undefined> = signal(undefined);

  constructor(
    protected teamService: TeamService,
    protected parametersService: ParametersService,
  ) {
    this.editedTeammate.set(undefined);
  }

  protected editTeammate(teammate: TeammateI): void {
    this.editedTeammate.set(teammate);
  }
}
