import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { v4 as uuidv4, v4 } from 'uuid';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  protected items: MenuItem[];
  protected value: string = "";

  constructor(private msalService: MsalService, private router: Router) {
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

  siAccount(): void{
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {
      
  }
}
