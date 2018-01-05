import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgcFloatButtonModule} from 'ngc-float-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule,
 MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule, MatCheckboxModule} from '@angular/material';

import {MatInputModule, MatTableModule} from '@angular/material'; 
import { HttpClientModule, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';
import {RoleComponent} from './component/role/role.component';
import { CreateDepartmentComponent } from './component/create-department/create-department.component';
import { DepartmentComponent} from './component/department/department.component';

import {RoleService} from './service/RoleService.service';
import {DepartmentService} from './service/DepartmentService';


@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Search,
    RoleComponent,
    CreateDepartmentComponent,
    DepartmentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule ,
    MatButtonModule,
    HttpClientModule,
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
    MatCheckboxModule,
    MatTableModule,
    NgcFloatButtonModule
  ],
  providers: [
    RoleService,
    DepartmentService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
