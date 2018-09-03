import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {DataTableModule} from "angular-6-datatable";
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TinymceModule } from 'angular2-tinymce';


import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { PricingComponent } from './pricing.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './dashboard/users/users.component';
import { LogoutComponent } from './dashboard/users/logout/logout.component';
import { AddusersComponent } from './dashboard/users/addusers.component';
import { EditUsersComponent } from './dashboard/users/edit-users/edit-users.component';
import { DeleteuserComponent } from './dashboard/users/deleteuser.component';
import { PagesComponent } from './dashboard/pages/pages.component';
import { AddPagesComponent } from './dashboard/pages/add-pages.component';
import { MediaComponent } from './dashboard/media/media.component';
import { AddMediaComponent } from './dashboard/media/add-media.component';
import { RemoveMediaComponent } from './dashboard/media/remove-media.component';
import {Global} from './dashboard/global';


@NgModule({
  declarations: [
    AppComponent,
    PricingComponent,
    HomeComponent,
    ErrorComponent,
    BlogComponent,
    ContactComponent,
    DashboardComponent,
    UsersComponent,
    LogoutComponent,
    AddusersComponent,
    EditUsersComponent,
    DeleteuserComponent,
    PagesComponent,
    AddPagesComponent,
    MediaComponent,
    AddMediaComponent,
    RemoveMediaComponent,
    
  ],
  imports: [
    TinymceModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
