import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {MessageService} from './message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers:[MessageService]
})
export class AppComponent {
  constructor(public router: Router) { }
  title = 'CuteZoo';
}
