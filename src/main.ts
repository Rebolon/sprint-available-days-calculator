import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routing';
import { TeamService } from './app/manage-team/team.service';
import { ParametersService } from './app/edit-parameters/parameters.service';
import { AlertService } from './app/alert.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    TeamService,
    ParametersService,
    AlertService,
  ],
}).catch((err) => console.error(err));
