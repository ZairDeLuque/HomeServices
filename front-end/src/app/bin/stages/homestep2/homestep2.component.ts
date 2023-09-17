import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface State {
  name: string;
  code: string;
}

@Component({
  selector: 'app-homestep2',
  templateUrl: './homestep2.component.html',
  styleUrls: ['./homestep2.component.css']
})
export class Homestep2Component implements OnInit{
  protected stateselected: string = "";
  
  protected steps: MenuItem[] = [
    {
      label: 'Credenciales'
    },
    {
      label: 'Información personal'
    },
    {
      label: 'Verificación'
    },
    {
      label: 'Intereses'
    }
  ]
  protected states: State[] = [];

  constructor(){}

  ngOnInit(): void {
      
  }
}
