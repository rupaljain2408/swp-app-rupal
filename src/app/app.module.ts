import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import {ProductModule} from './Products/product.module';
import {ProductService} from './Products/product.service'
import { AppComponent } from './app.component';
import {routing} from './app.route';
import {AlertComponent} from './SharedComponents/Alerts/alert.component';
import {AuthGuard} from './Guards/auth.guards';
import { AngularMultiSelectModule } from './SharedComponents/angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {AlertService} from './CommonServices/alert.service';
import {AuthenticationService} from './CommonServices/authentication.service';
import {LoginComponent} from './Login/login.component';
import {SharedServiceGM} from './CommonServices/shared.service';
import {HeaderComponent} from './SharedComponents/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,    
    LoginComponent,
    HeaderComponent  
  ],
  imports: [
    BrowserModule,   
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule,
    ProductModule, 
    AngularMultiSelectModule,    
    routing
  ],
  providers: [AlertService, AuthenticationService, AuthGuard, SharedServiceGM, CookieService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
