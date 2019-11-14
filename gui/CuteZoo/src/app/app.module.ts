import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GoogleSignInComponent } from 'angular-google-signin';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpGoogleComponent } from './sign-up-google/sign-up-google.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    GoogleSignInComponent,
    SignUpGoogleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule, 
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule
  ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
