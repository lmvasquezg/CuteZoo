import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  name: string;
  age: Number;
  city: string;
  country: string;
  address: string;
  email: string;
  gender: string;

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }

  getCity() {
    return this.city;
  }

  getCountry() {
    return this.country;
  }

  getAddress() {
    return this.address;
  }

  getEmail() {
    return this.email;
  }

  getGender() {
    return this.gender;
  }

}
