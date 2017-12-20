import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule,
 MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule, MatCheckboxModule} from '@angular/material';

import {MatInputModule} from '@angular/material';

import {HttpClientModule, HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule, Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';
import {RoleComponent} from './component/role/role.component';

import {RoleService} from './service/RoleService.service';


@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Search,
    RoleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule ,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule

  ],
  providers: [
    HttpClientModule,
    RoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
