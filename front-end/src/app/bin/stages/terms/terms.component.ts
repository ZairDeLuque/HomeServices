import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {

  constructor(private _location: Location ){

  }

  returnHome(){
    this._location.back();
  }
}
