import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { RequesterService } from '../services/requester.service';
import { UserService } from '../services/user.service';
import { ListUsersComponent } from './list-users/list-users.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RequesterService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
