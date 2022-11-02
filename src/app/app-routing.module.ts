import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageTeamComponent} from "./manage-team/manage-team.component";
import {AddTeammateComponent} from "./add-teammate/add-teammate.component";
import {EditParametersComponent} from './edit-parameters/edit-parameters.component';
import {ListTeamComponent} from './list-team/list-team.component';
import {Page404Component} from './Page404.component';

const routes: Routes = [
  {path: '', redirectTo: '/manage-team', pathMatch: 'full'},
  {path: 'list-team', component: ListTeamComponent},
  {path: 'manage-team', component: ManageTeamComponent},
  {path: 'add-teammate', component: AddTeammateComponent},
  {path: 'edit-teammate/:id', component: AddTeammateComponent},
  {path: 'edit-parameters', component: EditParametersComponent},
  {path: 'edit-parameters', component: EditParametersComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
