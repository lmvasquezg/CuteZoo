import { Component, OnInit } from '@angular/core';

import { GoogleSignInSuccess } from 'angular-google-signin';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  user: string;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
  }

  user_control = new FormControl('', [Validators.required]);
  psw_control = new FormControl('', [Validators.required])

  username = '';
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

  async checkUser(type: string, username: string, password: string) {
    if (type == 'google') {
      await this.getUserGoogle(username);

      this.googleUser.disconnect();
    }
    else if (type == 'regular') {
      await this.getUser(username, password);
    }
  }

  signIn() {
    this.username = (document.getElementById('username') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    this.checkUser('regular', this.username, this.password);
  }

  getErrorMessage(type: string) {
    switch (type) {
      case "username":
        return this.user_control.hasError('required') ? 'Por favor ingrese su nombre de usuario' : '';
        break;
      case "password":
        return this.psw_control.hasError('required') ? 'Por favor ingrese su contraseña' : '';
        break;
    }
  }

  getUser(username: string, password: string) {
    const req = this.http.get(`${API_URL}/password/${username}`).subscribe(
      async res => {
        if (res != "Usuario no existe") {
          if (password == res) {
            await this.userService.setUsername("HOLLAAAAA");
            window.open('/products', '_self', '', false);
          }
          else {
            this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
          }
        }
        else {
          this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
        }
      }
    )
  }

  getUserGoogle(username: string) {
    const req = this.http.get(`${API_URL}/password/${username}`).subscribe(
      async res => {
        if (res != "Usuario no existe") {
          await this.userService.setUsername("HOLLAAAAA");
          this.userService.currentUsername.subscribe(usr => console.log(usr));
          window.open('/products', '_self', '', false);
        }
        else {
          this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
        }
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
