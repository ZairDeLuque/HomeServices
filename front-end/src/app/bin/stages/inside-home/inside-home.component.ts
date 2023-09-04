import { Component } from '@angular/core';

@Component({
  selector: 'app-inside-home',
  templateUrl: './inside-home.component.html',
  styleUrls: ['./inside-home.component.css']
})
export class InsideHomeComponent {
  protected items = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];
}
