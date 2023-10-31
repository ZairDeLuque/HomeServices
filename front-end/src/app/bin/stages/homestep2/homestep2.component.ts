/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface TimeSelect {
  name: string,
  code: string
}

@Component({
  selector: 'app-homestep2',
  templateUrl: './homestep2.component.html',
  styleUrls: ['./homestep2.component.css']
})
export class Homestep2Component implements OnInit{
  
  protected _category: string | undefined;
  protected _name: string | undefined;
  protected _description: string | undefined;

  protected times: TimeSelect[];

  constructor(private title: Title){
    this.times = [
      {name: 'Hora', code: 'H'},
      {name: 'Dia', code: 'D'},
      {name: 'Semana', code: 'S'},
      {name: 'Pago único', code: 'PU'},
  ];
  }

  ngOnInit(): void {
    this.title.setTitle('Publicar servicio | HomeServices®️')
  }

}
