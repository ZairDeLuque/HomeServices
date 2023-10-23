import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  constructor(private _locate: Location, private Title: Title){
    this.Title.setTitle('No encontrado | HomeServices®️')
  }

  back(){
    this._locate.back();
  }
}
