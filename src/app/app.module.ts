import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FilterPipe } from './filter.pipe';
import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { RequesterService } from '../services/requester.service';
import { UserService } from '../services/user.service';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    FilterPipe,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RequesterService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
