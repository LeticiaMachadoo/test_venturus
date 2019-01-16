import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbsModule} from "ng6-breadcrumbs";

import { FilterPipe } from './filter.pipe';
import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { RequesterService } from '../services/requester.service';
import { UserService } from '../services/user.service';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RegistrationHelpComponent } from './registration-help/registration-help.component';
import { Data } from 'src/providers/data';
import { HeaderComponent } from './header/header.component';
import { Days } from 'src/constants/days';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    FilterPipe,
    AddUserComponent,
    RegistrationHelpComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RequesterService,
    UserService,
    Data,
    Days
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
