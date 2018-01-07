import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule,
 MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatChipsModule,
 MatDialogModule, MatSnackBarModule, MatSnackBar, MatPaginatorModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule, MatTableModule} from '@angular/material';

import {HttpClientModule, HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule, Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';


import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AuthHttp, AuthConfig, provideAuth } from 'angular2-jwt';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';
import {RoleComponent} from './component/role/role.component';
import { CreateDepartmentComponent } from './component/create-department/create-department.component';
import { DepartmentComponent} from './component/department/department.component';
import { DeleteModalComponent } from './component/delete-modal/delete-modal.component';
import {Register} from './component/register/register.component';
import {Login} from './component/login/login.component';
import {Tabs} from './component/tabs/tabs.component';
import {Footer} from './component/footer/footer.component'
import { UserProfile } from './component/userprofile/userprofile.component';

import {RoleService} from './service/RoleService.service';
import {UserService} from './service/UserService.service';
import {DepartmentService} from './service/DepartmentService';
import { AuthorizeService } from './service/AuthorizeService.service';

import {JwtInterceptor} from './interceptor/jwtinterceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {

  return new AuthHttp(new AuthConfig(), http, options);

}


@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Search,
    RoleComponent,
    CreateDepartmentComponent,
    DepartmentComponent,
    DeleteModalComponent,
    Register,
    Login,
    Tabs,
    Footer,
    UserProfile
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
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressBarModule,
    FormsModule

  ],
  entryComponents: [DeleteModalComponent],
  providers: [
    HttpClientModule,
    MatSnackBar,
    RoleService,
    DepartmentService,
    UserService,
    JwtHelper,
    AuthorizeService,
    {
    provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
