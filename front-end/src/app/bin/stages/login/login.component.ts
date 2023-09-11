import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Loading, Notify } from 'notiflix';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
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
    const loginPopup = this.msalService.loginPopup().subscribe(
      (response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        loginPopup.unsubscribe();
      }
    )
  }

  noAccount(): void{
    this.router.navigate(["/start"]);
  }

  ngOnInit(): void {
      
  }
}
