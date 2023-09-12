import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import * as Notiflix from 'notiflix';
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

  user = {
    "email" : "",
    "pass": ""
  }

  resgistro () {
    if (this.user.email !== "" && this.user.pass !== ""){
      Notiflix.Notify.info("Procesando informacion");
    }
  }
  
  crearCuenta(){
    this.router.navigate(['/registro']);
  }

  loginWithAzure(): void {
    
  }

  siAccount(): void{
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {
      
  }
}
