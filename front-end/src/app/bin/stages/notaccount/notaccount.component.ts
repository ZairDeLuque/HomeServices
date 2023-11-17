import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notaccount',
  templateUrl: './notaccount.component.html',
  styleUrls: ['./notaccount.component.css']
})
export class NotaccountComponent {
  constructor(protected _back: Location){}

}
