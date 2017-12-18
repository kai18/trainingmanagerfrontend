import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule,
 MatFormFieldModule, MatGridListModule, MatOptionModule, MatSelectModule} from '@angular/material';

import {MatInputModule} from '@angular/material';

import {HttpClientModule, HttpClient,HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module'

import { AppComponent } from './app.component';
import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Search
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
	  BrowserAnimationsModule,
    HttpClientModule,
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
    MatSelectModule

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
