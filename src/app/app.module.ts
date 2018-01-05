import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule,
 MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatChipsModule,
 MatDialogModule, MatSnackBarModule, MatSnackBar, MatTooltipModule} from '@angular/material';

import {MatInputModule, MatTableModule} from '@angular/material';

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
import { CreateDepartmentComponent } from './component/create-department/create-department.component';
import { DepartmentComponent} from './component/department/department.component';

import {RoleService} from './service/RoleService.service';
import {DepartmentService} from './service/DepartmentService';
import { DeleteModalComponent } from './component/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Search,
    RoleComponent,
    CreateDepartmentComponent,
    DepartmentComponent,
    DeleteModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule ,
    MatButtonModule,
    MatDialogModule,
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
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTooltipModule

  ],
  entryComponents: [DeleteModalComponent],
  providers: [
    HttpClientModule,
    MatSnackBar,
    RoleService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
