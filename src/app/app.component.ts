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
        Sprint days calculator
      </header>
      <div class="content-container">
        <div class="content-area">
          <app-create-team></app-create-team>
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
