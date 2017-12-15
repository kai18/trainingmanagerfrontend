import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule , MatTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import {Navbar} from './component/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    Navbar
  ],
  imports: [
    BrowserModule,
	  BrowserAnimationsModule,
	  MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
	  MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
