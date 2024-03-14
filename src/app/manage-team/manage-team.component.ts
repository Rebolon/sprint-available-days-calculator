import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrAlertModule } from '@clr/angular';
import TeammateI from '../add-teammate/teammate';
import { AvailableDaysComponent } from '../available-days/available-days.component';
import { ListTeamComponent } from '../list-team/list-team.component';
import { TeamService } from './team.service';

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
    <clr-alert
      *ngIf="this.team().length === 0"
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

    <app-list-team></app-list-team>
  `,
  styles: [],
})
export class ManageTeamComponent {
  protected teamService = inject(TeamService);
  protected team: Signal<TeammateI[]> = computed(() =>
    this.teamService.getTeammates(),
  );
}
