import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  genderOptions = [
    'Hombre',
    'Mujer',
    'Otro'
  ];

  name_control = new FormControl('', [Validators.required]);
  age_control = new FormControl('', [Validators.required, Validators.min(1)]);
  city_control = new FormControl('', [Validators.required]);
  country_control = new FormControl('', [Validators.required]);
  address_control = new FormControl('', [Validators.required]);
  email_control = new FormControl('', [Validators.required, Validators.email]);
  gender_control = new FormControl('', [Validators.required]);


  name;
  age;
  city;
  country;
  address;
  email;
  gender;

  getErrorMessage(type: string) {
    switch(type) {
      case "name":
        return this.name_control.hasError('required') ? 'Por favor ingrese su nombre' : '';
        break;
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
      case "email":
        return this.email_control.hasError('required') ? 'Por favor ingrese su correo electrónico' :
               this.email_control.hasError('email') ? 'Por favor ingrese un correo electrónico valido' : 
               '';
        break;
      case "gender":
        return this.gender_control.hasError('required') ? 'Por favor seleccione un opción' : '';
        break;
    }
  }

  createUser() {
    this.name = (document.getElementById('name') as HTMLInputElement).value;
    this.age = (document.getElementById('age') as HTMLInputElement).value;
    this.city = (document.getElementById('city') as HTMLInputElement).value;
    this.country = (document.getElementById('country') as HTMLInputElement).value;
    this.address = (document.getElementById('address') as HTMLInputElement).value;
    this.email = (document.getElementById('email')as HTMLInputElement).value;

    this.user.name = this.name;
    this.user.age = this.age;
    this.user.city = this.city;
    this.user.country = this.country;
    this.user.address = this.address;
    this.user.email = this.email;
    this.user.gender = this.gender;

    console.log(this.user);
  }
}
