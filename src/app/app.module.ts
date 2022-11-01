import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DebugComponent} from "./debug/debug.component";
import {AlertService} from "./alert.service";
import {AddTeammateComponent} from "./add-teammate/add-teammate.component";
import {CreateTeamComponent} from "./create-team/create-team.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ClarityModule} from "@clr/angular";
import { TeammateFormTitlePipe } from './create-team/teammate-form-title.pipe';
import {EditParametersComponent} from './edit-parameters/edit-parameters.component';

@NgModule({
  declarations: [
    AppComponent,

    // standalone components until i found how to make them work here without this
    AddTeammateComponent,
    CreateTeamComponent,
    EditParametersComponent,
    TeammateFormTitlePipe,
  ],
  imports: [
    BrowserModule,
//    AppRoutingModule,
    DebugComponent,

    // standalone components until i found how to make them work here without this
    ClarityModule,
    ReactiveFormsModule,
    //AddTeammateComponent,
    //CreateTeamComponent,
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
