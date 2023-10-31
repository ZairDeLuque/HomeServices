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
  protected _name_length: number = 0;
  protected _name_klass: string = 'mb-0';

  protected _description: string | undefined;
  protected _description_length: number = 0;
  protected _description_klass: string = 'mb-0';

  protected _cash: number | undefined;
  protected _cash_b: any;
  protected _cash_b_show: string | undefined;


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

  onChangeMulti(){
    if(this._cash_b[0]){
      this._cash_b_show = this._cash_b[0].name;
    }
    else{
      this._cash_b_show = ' '
    }
  }

  onCompare(){
    if(this._name != undefined){
      
      this._name_length = this._name.length;

      if(this._name?.length === 25){
        this._name_klass = 'text-danger mb-0'
      }
      else{
        this._name_klass = 'mb-0'
      }
    }
  }

  onCompare2(){
    if(this._description != undefined){
      
      this._description_length = this._description.length;

      if(this._description.length === 250){
        this._description_klass = 'text-danger mb-0'
      }
      else{
        this._description_klass = 'mb-0'
      }
    }
  }
}
