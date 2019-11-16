import { Component, OnInit } from '@angular/core';

import {GoogleSignInSuccess} from 'angular-google-signin';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { USER } from '../user';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private app: AppComponent) { }

  ngOnInit() {
  }

  user_control = new FormControl('', [Validators.required]);
  psw_control = new FormControl('', [Validators.required])

  private username = '';
  private password = '';
  private googleUser: gapi.auth2.GoogleUser;

  private myClientId: string = '543474456477-h48cgal3hvkchoe1449hadshgijvtjkv.apps.googleusercontent.com';

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    
    this.username = profile.getEmail();

    this.googleUser = googleUser;

    this.checkUser('google', this.username, '');
  }

  checkUser(type: string, username: string, password: string) {
    if (type == 'google') {
      // TODO: CHECK IN DATABASE IF USERNAME EXISTS
      USER.username = username;

      window.open("/products", "_self", "", false);
      this.googleUser.disconnect();
    }
    else if (type == 'regular') {
      // TODO: CHECK IN DATABASE IF USERNAME EXISTS AND PASSWORD IS CORRECT
      USER.username = username;

      window.open("/products", "_self", "", false);
    }
  }
 
  signIn() {
    this.username = (document.getElementById('username') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    this.checkUser('regular', this.username, this.password);
  }

  getErrorMessage(type: string) {
    switch(type) {
      case "username":
        return this.user_control.hasError('required') ? 'Por favor ingrese su nombre de usuario' : '';
        break;
      case "password":
        return this.psw_control.hasError('required') ? 'Por favor ingrese su contraseña' : '';
        break;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
