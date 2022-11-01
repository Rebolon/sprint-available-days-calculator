import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateTeamComponent} from "./create-team/create-team.component";
import {AddTeammateComponent} from "./add-teammate/add-teammate.component";

const routes: Routes = [
  {path: 'create-team', component: CreateTeamComponent},
  {path: 'add-teammate', component: AddTeammateComponent}, // for debug only
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
