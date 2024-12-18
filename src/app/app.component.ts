/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ClarityIcons,
  angleIcon,
  calculatorIcon,
  cogIcon,
  floppyIcon,
  userIcon,
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClrAlertModule, ClrDropdownModule } from '@clr/angular';
import TeammateI, { Teammate } from './add-teammate/teammate';
import { AlertService } from './alert.service';
import {
  Parameter
} from './edit-parameters/parameters';
import { ParametersService } from './edit-parameters/parameters.service';
import { TeamService } from './manage-team/team.service';
import { StorageService } from './storage.service';
import { IconComponent } from './icon/icon.component';

ClarityIcons.addIcons(angleIcon, userIcon, cogIcon, calculatorIcon, floppyIcon);

@Component({
    imports: [
        CommonModule,
        RouterModule,
        CdsIconModule,
        ClrAlertModule,
        ClrDropdownModule,
    ],
    providers: [TeamService, ParametersService, AlertService],
    selector: 'app-root',
    template: `
    <div class="main-container">
      <clr-alerts>
        @if (alert.hasAlert() | async) {
        <clr-alert
          [clrAlertType]="'info'"
          [clrAlertClosable]="true"
        >
          <clr-alert-item>
            <span class="alert-text">
              {{ alert.getAlert() | async }}
            </span>
          </clr-alert-item>
        </clr-alert>
        }

        @if (storageService.hasSavedData()) {
        <clr-alert [clrAlertClosable]="true">
          <clr-alert-item>
            <span class="alert-text">
              A save has been found in your browser, do you want to restore it ?
              {{ getSavedTeammates() }}
            </span>
            <div class="alert-actions">
              <clr-dropdown>
                <button class="dropdown-toggle" clrDropdownTrigger>
                  Actions
                  <app-icon shape="angle" direction="down"></app-icon>
                </button>
                <clr-dropdown-menu clrPosition="bottom-right">
                  <a (click)="restore()" (keyup.enter)="restore()" class="dropdown-item" clrDropdownItem
                    >restore</a
                  >
                  <a
                    (click)="deleteSavedData()"
                    (keyup.enter)="deleteSavedData()"
                    class="dropdown-item"
                    clrDropdownItem
                    >delete</a
                  >
                </clr-dropdown-menu>
              </clr-dropdown>
            </div>
          </clr-alert-item>
        </clr-alert>
        }
      </clr-alerts>
      <header class="header header-6">
        <div class="branding">
          <a routerLink="/">
            <span class="title">How many days ?</span>
          </a>
        </div>
        <div class="header-nav">
          <a class="nav-link nav-icon" routerLink="manage-team"
            ><app-icon shape="calculator" size="24"></app-icon
          ></a>
          <a class="nav-link nav-icon" routerLink="add-teammate"
            ><app-icon shape="user" size="24"></app-icon
          ></a>
          <a class="nav-link nav-icon" routerLink="edit-parameters"
            ><app-icon shape="cog" size="24"></app-icon
          ></a>
          <a
            [attr.disabled]="teamService.getTeammates().length ? 'disabled' : ''"
            (click)="save()"
            (keyup.enter)="save()"
            class="nav-link nav-icon a-hover"
            ><app-icon shape="floppy" size="24"></app-icon
          ></a>
        </div>
      </header>

      <div class="content-container">
        <div class="content-area">
          <!--div class="clr-row">
            <div class="clr-col-12"-->
          <router-outlet></router-outlet>
          <!--/div>
          </div-->
        </div>
      </div>
    </div>
  `,
    styles: '.a-hover { cursor: pointer; }'
})
export class AppComponent {
  protected alert = inject(AlertService);
  protected teamService = inject(TeamService);
  protected parametersService = inject(ParametersService);
  protected storageService = inject(StorageService);

  title = 'sprint-resources-availability';
  protected getSavedTeammates: Signal<string> = computed(() =>
    this.teamService.getTeammates()
      .map((teammate: TeammateI): string => teammate.name)
      .join(', ')
  )
  // @todo do we need to manage unsubscribe with toSignal ?
  protected hasSavedData = false;

  protected save() {
    this.storageService.save({team: this.teamService.getTeammates(), parameters: this.parametersService.getParameters()});
    this.alert.setAlert('save done');
  }

  protected deleteSavedData() {
    this.storageService.clear();
    this.alert.setAlert('delete done');
  }

  protected restore() {
    const {team, parameters} = this.storageService.restore()

    team.forEach((teammate: TeammateI) =>
      this.teamService.addTeammate(
        new Teammate(
          teammate.name,
          teammate.availableDaysInAWeek,
          teammate.holidaysForNextSprint,
          teammate.meetingDaysAWeek,
          teammate.isNewComer
        )
      )
    );

    this.parametersService.setParameters(
      new Parameter(
        parameters.nbWeeksForOneSprint,
        parameters.marginRate,
        parameters.velocityRateForNewComer
      )
    );

    this.alert.setAlert('Restore done');
  }
}
