import { Routes } from '@angular/router';
import { ListTeamComponent } from './list-team/list-team.component';
import { AddTeammateComponent } from './add-teammate/add-teammate.component';
import { EditParametersComponent } from './edit-parameters/edit-parameters.component';
import { Page404Component } from './page404.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';

// @todo si ça fail => remettre ça dans main.ts
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/manage-team',
    pathMatch: 'full',
  },
  {
    path: 'manage-team',
    loadComponent: () =>
      import('./manage-team/manage-team.component').then(
        (c) => c.ManageTeamComponent
      ) /* */,
  },
  {
    path: 'list-team',
    loadComponent: () =>
      import('./list-team/list-team.component').then(
        (c) => c.ListTeamComponent
      ) /* */,
  },
  {
    path: 'add-teammate',
    loadComponent: () =>
      import('./add-teammate/add-teammate.component').then(
        (c) => c.AddTeammateComponent
      ) /* */,
  },
  {
    path: 'edit-teammate/:id',
    loadComponent: () =>
      import('./add-teammate/add-teammate.component').then(
        (c) => c.AddTeammateComponent
      ) /* */,
  },
  {
    path: 'edit-parameters',
    loadComponent: () =>
      import('./edit-parameters/edit-parameters.component').then(
        (c) => c.EditParametersComponent
      ) /* */,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page404.component').then((c) => c.Page404Component) /* */,
  },
];
