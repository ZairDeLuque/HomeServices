import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  protected items: MenuItem[];
  protected value: string = "";

  //Form
  protected formLogin: FormGroup;
  
  constructor(private __formgroup: FormBuilder, private router: Router, private Title: Title, private _locate: Location, private userAPI: UsersgestorService) {
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

    //Form
    this.formLogin = this.__formgroup.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]],
    })

    this.Title.setTitle('HomeServices®️ - Iniciar sesión')
  }

  noAccount(): void{
    this.router.navigate(["/start"]);
  }

  reformatJSON(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        e1x: this.formLogin.controls['email'].value,
        p2x: this.formLogin.controls['password'].value,
      }

      resolve(JSONSimplify)
    })
  }

  back(){
    this._locate.back();
  }

  ngOnInit(): void {
      
  }

  async compare(){
    const json = await this.reformatJSON();

    this.userAPI.compareCredentials(json).subscribe((res) => {
      if(res.allowed === true){
        Notify.success(res.result);
      }
      else{
        Notify.failure(res.result);
      }
    })
  }
}
