import { Component } from '@angular/core';
import {AlertService} from "./alert.service";

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
  styles: []
})
export class AppComponent {
  title = 'sprint-resources-availability';

  constructor(protected alert: AlertService) {
  }
}
