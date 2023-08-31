import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  protected items: MenuItem[];

  constructor() {
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

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }

  ngOnInit(): void {
      
  }
}
