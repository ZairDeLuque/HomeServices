import { Component, OnInit } from '@angular/core';

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
  
  protected states: State[] = [];

  constructor(){}

  ngOnInit(): void {
      
  }
}
