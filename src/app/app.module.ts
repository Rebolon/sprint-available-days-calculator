import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {ClarityModule} from "@clr/angular";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DebugComponent} from "./debug/debug.component";
import {AlertService} from "./alert.service";
import {AddTeammateComponent} from "./add-teammate/add-teammate.component";
import {TeammateFormTitlePipe} from './manage-team/teammate-form-title.pipe';
import {EditParametersComponent} from './edit-parameters/edit-parameters.component';
import {AvailableDaysComponent} from './available-days/available-days.component';
import {ListTeamComponent} from './list-team/list-team.component';
import {ManageTeamComponent} from './manage-team/manage-team.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

    // standalone components until i found how to make them work here without this
    AddTeammateComponent,
    ManageTeamComponent,
    ListTeamComponent,
    EditParametersComponent,
    AvailableDaysComponent,
    TeammateFormTitlePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DebugComponent,

    // standalone components until i found how to make them work here without this
    ClarityModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    //AddTeammateComponent,
    //CreateTeamComponent,
  ],
  providers: [
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
