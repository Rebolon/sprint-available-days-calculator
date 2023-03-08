import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertService } from './alert.service';
import { TeamService } from './manage-team/team.service';
import { ParametersService } from './edit-parameters/parameters.service';
import TeammateI, {Teammate} from './add-teammate/teammate';
import ParameterI, {DefaultParameter, Parameter} from './edit-parameters/parameters';
import {ClrAlertModule, ClrDropdownModule} from '@clr/angular';
import '@cds/core/icon/register.js';
import { ClarityIcons, angleIcon, userIcon, cogIcon, calculatorIcon, floppyIcon } from '@cds/core/icon';
import { CdsIconModule } from '@cds/angular';

ClarityIcons.addIcons(angleIcon, userIcon, cogIcon, calculatorIcon, floppyIcon);

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CdsIconModule, ClrAlertModule, ClrDropdownModule],
  providers: [TeamService, ParametersService, AlertService],
  selector: 'app-root',
  template: `
    <div class="main-container">
      <clr-alerts>
        <clr-alert
          *ngIf="alert.hasAlert() | async"
          [clrAlertType]="'info'"
          [clrAlertClosable]="true"
        >
          <clr-alert-item>
            <span class="alert-text">
              {{ alert.getAlert() | async }}
            </span>
          </clr-alert-item>
        </clr-alert>

        <clr-alert *ngIf="hasSavedData" [clrAlertClosable]="true">
          <clr-alert-item>
            <span class="alert-text">
              A save has been found in your browser, do you want to restore it ?
              {{ getSavedTeammates() }}
            </span>
            <div class="alert-actions">
              <clr-dropdown>
                <button class="dropdown-toggle" clrDropdownTrigger>
                  Actions
                  <cds-icon shape="angle" direction="down"></cds-icon>
                </button>
                <clr-dropdown-menu clrPosition="bottom-right">
                  <a (click)="restore()" class="dropdown-item" clrDropdownItem
                    >restore</a
                  >
                  <a
                    (click)="deleteSavedData()"
                    class="dropdown-item"
                    clrDropdownItem
                    >delete</a
                  >
                </clr-dropdown-menu>
              </clr-dropdown>
            </div>
          </clr-alert-item>
        </clr-alert>
      </clr-alerts>
      <header class="header header-6">
        <div class="branding">
          <a routerLink="/">
            <span class="title">How many days ?</span>
          </a>
        </div>
        <div class="header-nav">
          <a routerLink="manage-team" class="nav-link nav-icon"><cds-icon shape="calculator" size="24"></cds-icon></a>
          <a routerLink="add-teammate" class="nav-link nav-icon"><cds-icon shape="user" size="24"></cds-icon></a>
          <a routerLink="edit-parameters" class="nav-link nav-icon"><cds-icon shape="cog" size="24"></cds-icon></a>
          <a (click)="save()" [attr.disabled]="team.length ? 'disabled' : ''" class="nav-link nav-icon a-hover"><cds-icon shape="floppy" size="24"></cds-icon></a>
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
  styles: ['.a-hover { cursor: pointer; }'],
})
export class AppComponent implements OnInit {
  title = 'sprint-resources-availability';
  protected team: TeammateI[] = [];
  private parameters: ParameterI | undefined;
  protected hasSavedData = false;

  constructor(
    protected alert: AlertService,
    protected teamService: TeamService,
    protected parametersService: ParametersService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeammates()
      .subscribe((team: TeammateI[]) => (this.team = team));
    this.parametersService
      .getParameters()
      .subscribe((parameters: ParameterI) => (this.parameters = parameters));
    this.checkStorage();
  }

  protected save() {
    localStorage.setItem('team', JSON.stringify(this.team));
    localStorage.setItem(
      'parameters',
      this.parameters
        ? JSON.stringify(this.parameters)
        : JSON.stringify(DefaultParameter)
    );

    this.alert.setAlert('Save done');
  }

  protected deleteSavedData() {
    localStorage.removeItem('team');
    localStorage.removeItem('parameters');

    this.hasSavedData = false;
    this.alert.setAlert('delete done');
  }

  protected restore() {
    const team: TeammateI[] = localStorage.getItem('team')
      ? JSON.parse(localStorage.getItem('team') as string)
      : [];
    const parameters = localStorage.getItem('parameters')
      ? JSON.parse(localStorage.getItem('parameters') as string)
      : undefined;

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

    this.hasSavedData = false;

    this.alert.setAlert('Restore done');
  }

  protected checkStorage() {
    if (localStorage.getItem('team') && localStorage.getItem('parameters')) {
      this.hasSavedData = true;
    }
  }

  protected getSavedTeammates(): string {
    return this.team
      .map((teammate: TeammateI): string => teammate.name)
      .join(', ');
  }
}
