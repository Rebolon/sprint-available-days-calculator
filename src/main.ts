import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from './app/app.routing';
import {TeamService} from './app/manage-team/team.service';
import {ParametersService} from './app/edit-parameters/parameters.service';
import {AlertService} from './app/alert.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    TeamService,
    ParametersService,
    AlertService,
  ]
}).catch(err => console.error(err));
