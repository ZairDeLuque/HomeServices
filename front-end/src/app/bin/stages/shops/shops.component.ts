import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit{
  protected items: MenuItem[];

  constructor(){
    this.items = [{
      label: 'Filtros',
      icon: 'bi bi-funnel',
      items: [{
        label: 'Ordenar alfabeticamente (A-Z)',
        icon: 'bi bi-sort-alpha-up',
      },
      {
        label: 'Ordenar alfabeticante (Z-A)',
        icon: 'bi bi-sort-alpha-up-alt',
      }
    ]
    }];
  }

  ngOnInit(): void {
    
  }
}
