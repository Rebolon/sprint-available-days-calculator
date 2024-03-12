import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { ClrAlertModule } from '@clr/angular';
import TeammateI from '../add-teammate/teammate';
import { AvailableDaysComponent } from '../available-days/available-days.component';
import ParameterI, { DefaultParameter } from '../edit-parameters/parameters';
import { ParametersService } from '../edit-parameters/parameters.service';
import { ListTeamComponent } from '../list-team/list-team.component';
import { TeamService } from './team.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClrAlertModule,
    ListTeamComponent,
    AvailableDaysComponent,
  ],
  template: `
    <app-list-team></app-list-team>

    <h1>{{nbOfTeammates()}}</h1>
    <clr-alert
      *ngIf="nbOfTeammates() === 0"
      [clrAlertType]="'info'"
      [clrAlertClosable]="false"
    >
      <clr-alert-item>
        <span class="alert-text">
          Please <a routerLink="/add-teammate">add teammate</a> and then it will
          calculate the available days for the sprint.
        </span>
      </clr-alert-item>
    </clr-alert>

    <app-available-days></app-available-days>
  `,
  styles: [],
})
export class ManageTeamComponent {
  nbOfTeammates = computed(() => this.teamService.getTeammates().length);
  constructor(protected teamService: TeamService) {}
}
