import {Routes} from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    component: ListUsersComponent,
    data: {
      breadcrumb: '> Listagem de Usuários',
    }
  },
  {
    path: 'users/new',
    component: AddUserComponent,
    data: {
      breadcrumb: '> Novo Usuário',
    }
  }
];
