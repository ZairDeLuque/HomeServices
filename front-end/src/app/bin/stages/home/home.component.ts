import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Loading, Notify } from 'notiflix';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  protected items: MenuItem[];
  protected value: string = "";

  constructor(private msalService: MsalService) {
    this.items = [
      {
        label: 'Copiar',
        icon: 'bi bi-file-earmark',
      },
      {
        label: 'Pegar',
        icon: 'bi bi-clipboard',
      },
      {
          separator: true
      },
      {
          label: 'Términos y condiciones',
          icon: 'bi bi-exclamation-circle',
          routerLink: '/terms'
      }
    ];
  }

  loginWithAzure(): void {
    
  }

  ngOnInit(): void {
      
  }
}
