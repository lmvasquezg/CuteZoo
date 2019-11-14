import { Component, OnInit } from '@angular/core';

import {GoogleSignInSuccess} from 'angular-google-signin';

import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-google',
  templateUrl: './sign-up-google.component.html',
  styleUrls: ['./sign-up-google.component.css']
})
export class SignUpGoogleComponent implements OnInit {

  constructor(private user: UserService, private _snackBar: MatSnackBar) { }
  
  ngOnInit() {
  }

  genderOptions = [
    'Hombre',
    'Mujer',
    'Otro'
  ];
    
  age_control = new FormControl('', [Validators.required, Validators.min(1)]);
  city_control = new FormControl('', [Validators.required]);
  country_control = new FormControl('', [Validators.required]);
  address_control = new FormControl('', [Validators.required]);
  gender_control = new FormControl('', [Validators.required]);
  // user_control = new FormControl('', [Validators.required]);
  // psw_control = new FormControl('', [Validators.required]);
  
  name;
  age;
  city;
  country;
  address;
  email;
  gender;
  username;
  password;

  googleUser: gapi.auth2.GoogleUser;

  signedIn = false;

  private myClientId: string = '543474456477-h48cgal3hvkchoe1449hadshgijvtjkv.apps.googleusercontent.com';
 
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    
    this.name = profile.getName();
    this.email = profile.getEmail();

    this.signedIn = true;
    this.googleUser = googleUser;

    // console.log('ID: ' +
    //   profile
    //     .getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log(profile.getEmail());
    // console.log(profile.getImageUrl())
  }

  cerrar() {
    this.googleUser.disconnect()
  }

  getErrorMessage(type: string) {
    switch(type) {
      case "age":
        return this.age_control.hasError('required') ? 'Por favor ingrese su edad' :
               this.age_control.hasError('min') ? 'Por favor ingrese una edad valida':
               '';
        break;
      case "city":
        return this.city_control.hasError('required') ? 'Por favor ingrese su ciudad de residencia' : '';
        break;
      case "country":
        return this.country_control.hasError('required') ? 'Por favor ingrese su país de residencia' : '';
        break;
      case "address":
        return this.address_control.hasError('required') ? 'Por favor ingrese su dirección' : '';
        break;
      case "gender":
        return this.gender_control.hasError('required') ? 'Por favor seleccione una opción' : '';
        break;
      // case "user":
      //   return this.user_control.hasError('required') ? 'Por favor seleccione un nombre de usuario' : '';
      //   break;
      // case "password":
      //   return this.psw_control.hasError('required') ? 'Por favor ingrese una contraseña' : '';
      //   break;
    }
  }

  createUser() {
    if (this.age_control.invalid || this.city_control.invalid || this.country_control.invalid || this.address_control.invalid || this.gender_control.invalid) {
      if (this.age_control.hasError('min')) {
        this.openSnackBar("Ingrese una edad valida", "Ok");
      }
      else{
        this.openSnackBar("Ingrese todos los datos", "Ok");
      }
    }
    else if (!this.signedIn) {
      this.openSnackBar("Por favor inicie sesión en su cuenta de Google", "Ok");
    }
    else{

      this.age = (document.getElementById('age') as HTMLInputElement).value;
      this.city = (document.getElementById('city') as HTMLInputElement).value;
      this.country = (document.getElementById('country') as HTMLInputElement).value;
      this.address = (document.getElementById('address') as HTMLInputElement).value;
      // this.username = (document.getElementById('username') as HTMLInputElement).value;
      // this.password = (document.getElementById('password') as HTMLInputElement).value;
  
      this.user.name = this.name;
      this.user.age = this.age;
      this.user.city = this.city;
      this.user.country = this.country;
      this.user.address = this.address;
      this.user.email = this.email;
      this.user.gender = this.gender;
      this.user.username = this.username;
      this.user.password = this.password;

      console.log(this.user);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
