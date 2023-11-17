import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import * as Notiflix from 'notiflix';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  //Google Subscribe
  private userGoogle: SocialUser | undefined;
  
  protected value: string = "";

  protected saveCheck: boolean = false;

  //Form
  protected formLogin: FormGroup;
  
  constructor(private __formgroup: FormBuilder, private router: Router, private Title: Title, private _locate: Location, private userAPI: UsersgestorService, private NG_MSG: MessageService, private readonly _authService: SocialAuthService) {
    //Form
    this.formLogin = this.__formgroup.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]],
    })

    this.Title.setTitle('Iniciar sesión | HomeServices®️')
  }

  noAccount(): void{
    this.router.navigate(["/start"]);
  }

  reformatJSONGoogleProvider(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        e0x: this.userGoogle?.email,
        p1x: this.userGoogle?.id,
      }

      resolve(JSONSimplify)
    })
  }

  reformatJSON(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        e0x: this.formLogin.controls['email'].value,
        p1x: this.formLogin.controls['password'].value,
      }

      resolve(JSONSimplify)
    })
  }

  back(){
    this._locate.back();
  }

  ngOnInit(): void {
    // this._authService.authState.subscribe((data) => {
    //   this.userGoogle = data;

    //     if(this.userGoogle.email !== null){
    //       this.saveCheck = true;
    //       this.compare('google')
    //     }
    // })
  }

  async compare(method: string){
    let json;

    if(method === 'google'){
      json = await this.reformatJSONGoogleProvider()
    }
    else{
      json = await this.reformatJSON()
    }

    Notiflix.Loading.dots('Validando credenciales...', {
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    this.userAPI.compareCredentials(json).subscribe(
      result => {
        Notiflix.Loading.remove();

        if(result.allowed === true){
          if(result.isnew === 1){
            if(this.saveCheck === true){
              localStorage.setItem('uu0x0', result.uuid)
              localStorage.setItem('ac0x1', 'true')
              localStorage.setItem('_token', result.token)
            }
            else{
              sessionStorage.setItem('uu0x0', result.uuid)
              sessionStorage.setItem('ac0x1', 'true')
              sessionStorage.setItem('_token', result.token)
            }
            
            this.router.navigate(["/welcome"]);
          }
          else{
            Notiflix.Notify.success('Maestro de llaves: ' + result.result)
          
            if(this.saveCheck === true){
              localStorage.setItem('uu0x0', result.uuid)
              localStorage.setItem('ac0x1', 'true')
              localStorage.setItem('_token', result.token)
            }
            else{
              sessionStorage.setItem('uu0x0', result.uuid)
              sessionStorage.setItem('ac0x1', 'true')
              sessionStorage.setItem('_token', result.token)
            }

            this.router.navigate(["/"]);
          }
        }
        else{
          this.NG_MSG.add({severity: 'error', summary: 'Credenciales invalidas', detail: result.result, closable: true})
        }    
      },
      error => {
        Notiflix.Loading.remove();

        console.log(error);

        this.NG_MSG.add({severity: 'error', summary: '¿Vacaciones?', detail: 'Los servicios encargados están fuera de linea, intente mas tarde.', closable: true})
      }
    )
  }
}
