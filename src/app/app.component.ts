import {Component, OnInit} from '@angular/core';
import {AlertService} from "./alert.service";
import {TeamService} from './manage-team/team.service';
import {ParametersService} from './edit-parameters/parameters.service';
import TeammateI, {Teammate} from './add-teammate/teammate';
import ParameterI, {DefaultParameter, Parameter} from './edit-parameters/parameters';
import {preventArrowKeyScroll} from '@clr/angular/utils/focus/key-focus/util';

@Component({
  selector: 'app-root',
  template: `
    <div class="main-container">
      <div *ngIf="alert.hasAlert() | async" class="alert alert-app-level">
        {{alert.getAlert() | async}}
      </div>
      <header class="header header-6">
        <div class="branding">
          <a routerLink="/">
            <span class="title">Sprint days calculator</span>
          </a>
        </div>
        <div class="header-nav">
          <a routerLink="add-teammate" class="nav-link nav-icon"><clr-icon shape="user" size="24"></clr-icon></a>
          <a routerLink="manage-team" class="nav-link nav-icon"><clr-icon shape="calculator" size="24"></clr-icon></a>
          <a routerLink="edit-parameters" class="nav-link nav-icon"><clr-icon shape="cog" size="24"></clr-icon></a>
          <a (click)="save()" [attr.disabled]="team.length ? 'disabled' : ''" class="nav-link nav-icon a-hover"><clr-icon shape="floppy" size="24"></clr-icon></a>
          <a (click)="restore()" *ngIf="hasSavedData" class="nav-link nav-icon a-hover"><clr-icon shape="backup-restore" size="24"></clr-icon></a>
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
  styles: [
    '.a-hover { cursor: pointer; }'
  ]
})
export class AppComponent implements OnInit {
  title = 'sprint-resources-availability';
  protected team: TeammateI[] = []
  private parameters: ParameterI|undefined;
  protected hasSavedData = false

  constructor(
    protected alert: AlertService,
    protected teamService: TeamService,
    protected parametersService: ParametersService
  ) {
  }

  ngOnInit(): void {
    this.teamService.getTeammates().subscribe((team: TeammateI[]) => this.team = team)
    this.parametersService.getParameters().subscribe((parameters: ParameterI) => this.parameters = parameters)
    this.checkStorage()
  }

  protected save()
  {
    localStorage.setItem('team', JSON.stringify(this.team))
    localStorage.setItem('parameters', this.parameters ? JSON.stringify(this.parameters) : JSON.stringify(DefaultParameter))

    this.alert.setAlert('Save done')
  }

  protected restore()
  {
    const team: TeammateI[] = localStorage.getItem('team') ? JSON.parse(localStorage.getItem('team') as string) : []
    const parameters = localStorage.getItem('parameters') ? JSON.parse(localStorage.getItem('parameters') as string) : undefined

    team.forEach((teammate: TeammateI) => this.teamService.addTeammate(new Teammate(
      teammate.name,
      teammate.availableDaysInAWeek,
      teammate.holidaysForNextSprint,
      teammate.meetingDaysAWeek,
      teammate.isNewComer
    )))

    this.parametersService.setParameters(new Parameter(
      parameters.nbWeeksForOneSprint, parameters.marginRate, parameters.velocityRateForNewComer
    ))

    this.hasSavedData = false

    this.alert.setAlert('Restore done')
  }

  protected checkStorage()
  {
   if (localStorage.getItem('team') && localStorage.getItem('parameters')) {
     const teammatesName = this.team.map((teammate: TeammateI): string => teammate.name).join(', ')
     this.alert.setAlert(`A save has been found in your browser, do you want to restore it ?
      ${teammatesName}
     `)
     this.hasSavedData = true
   } 
  }
}
