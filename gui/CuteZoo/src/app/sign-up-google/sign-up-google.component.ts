import { Component, OnInit } from '@angular/core';

import {GoogleSignInSuccess} from 'angular-google-signin';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';
import { USER } from '../user';

@Component({
  selector: 'app-sign-up-google',
  templateUrl: './sign-up-google.component.html',
  styleUrls: ['./sign-up-google.component.css']
})
export class SignUpGoogleComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  
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
  
  private name;
  private age;
  private city;
  private country;
  private address;
  private email;
  private gender;
  private username;
  private password;

  private googleUser: gapi.auth2.GoogleUser;

  private signedIn = false;

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
  
      // USER.name = this.name;
      // USER.age = this.age;
      // USER.city = this.city;
      // USER.country = this.country;
      // USER.address = this.address;
      // USER.email = this.email;
      // USER.gender = this.gender;
      // USER.username = this.email;
      // USER.password = '';

      this.post(this.name, this.age, this.city, this.country, this.address, this.email, this.gender, '', this.email)
    }
  }

  post(name, age, city, country, address, email, gender, password, username){
    const req = this.http.post(`${API_URL}/add_user`, {
      nombre: name,
      edad: age,
      ciudad: city,
      pais: country,
      direccion: address,
      correo: email,
      genero: gender,
      contrasena: password,
      usuario: username
    })
    .subscribe(
      res => {
        if (res == "Usuario agregado exitosamente") {
          this.openSnackBar("Usuario creado exitosamente", "OK");
          this.googleUser.disconnect();
          window.open('/home', '_self', '', false);
        }
        else{
          this.openSnackBar("Ya existe un usuario asosiado a esta cuenta de Google", "Ok");
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
