import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { v4 as uuidv4 } from 'uuid';
import * as Notiflix from 'notiflix';
import { LoggedService } from '../../services/session/cache/logged.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit{
  protected value: string = "";

  //Google Subscribe
  private userGoogle: SocialUser | undefined;

  //Modal Form
  protected RecapCheck: boolean = false;
  protected TermsCheck: boolean = false;

  //Form
  protected formLogin: FormGroup;
  constructor(private router: Router, private __formgroup: FormBuilder, private modalService: BsModalService, private _locate: Location, private Title: Title, private userAPI: UsersgestorService, private NG_MSG: MessageService, private readonly Logged: LoggedService, private readonly _authService: SocialAuthService) {
    this.formLogin = this.__formgroup.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]],
      session: ['']
    })

    this.Title.setTitle('Crear cuenta | HomeServices®️')
  }
  
  //Modal
  modalRef?: BsModalRef | null;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur modal-lg', ignoreBackdropClick: true, keyboard: false});
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
    this.TermsCheck = false;
  }

  siAccount(): void{
    this.router.navigate(["/login"]);
  }

  reformatJSON(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        u0x: uuidv4(),
        pw1x: 'AURORA',
        e2x: this.formLogin.controls['email'].value,
        p3x: this.formLogin.controls['password'].value,
        fn4x: this.formLogin.controls['name'].value,
        pp5x: 'notassign'
      }

      resolve(JSONSimplify)
    })
  }

  reformatJSON2(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const json = {
        e0x: this.formLogin.controls['email'].value,
        p1x: this.formLogin.controls['password'].value,
      }

      resolve(json)
    })
  }

  onResolved(captchaResponse: string) {
    if(captchaResponse){
      this.RecapCheck = true; 
    }
  }

  async sendData_AURORA(){
    if(!this.formLogin.errors){        
      Notiflix.Loading.dots('Esperando servidor...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })

      const json = await this.reformatJSON();

      this.closeModal();

      this.userAPI.createCredentials(json).subscribe(
        async result => {
          if(result.already === true){
            Notiflix.Loading.remove();
            this.NG_MSG.add({severity: 'error', summary: '¿Eres tu?', detail: result.result, closable: true})
          }
          else{
            if(result.new === 1){
              const json2 = await this.reformatJSON2();

              this.userAPI.compareCredentials(json2).subscribe(result2 => {
                Notiflix.Loading.remove();
                
                if(this.formLogin.controls['session'].value === true){
                  localStorage.setItem('uu0x0', json.u0x)
                  localStorage.setItem('ac0x1', 'true')
                  localStorage.setItem('_token', result2.token)
                }
                else{
                  sessionStorage.setItem('uu0x0', json.u0x)
                  sessionStorage.setItem('ac0x1', 'true')
                  sessionStorage.setItem('_token', result2.token)
                }
                  
                if(result2.isnew === 1){
                  this.router.navigate(["/welcome"]);
                }
                else{
                  this.router.navigate(["/"]);
                }
              }, error => {
                console.error(error);
                this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios no generaron un inicio de sesión, inicie sesión manualmente.', closable: true})
              })
            }
            else{
              Notiflix.Loading.remove();
              this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios retornaron un indefinido, intente crear nuevamente sus credenciales.', closable: true})
            }
          }
        },
        error => {
          Notiflix.Loading.remove();
          console.error(error);
          this.NG_MSG.add({severity: 'error', summary: 'Oh oh', detail:'Los servicios de Aurora Studios no han conseguido crear las credenciales.', closable: true})
        }
      );

    }
  }

  reformatJSONGoogleProvider(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        u0x: uuidv4(),
        pw1x: this.userGoogle?.provider,
        e2x: this.userGoogle?.email,
        p3x: this.userGoogle?.id,
        fn4x: this.userGoogle?.name,
        pp5x: this.userGoogle?.photoUrl
      }

      resolve(JSONSimplify)
    })
  }

  async sendData_GOOGLE(){
    if(this.userGoogle?.idToken){
      Notiflix.Loading.dots('Esperando servidor...',{
        clickToClose: false,
        svgColor: '#a95eff',
        className: 'font-b',
        backgroundColor: '#fff',
        messageColor: '#000'
      })
      
      const json = await this.reformatJSONGoogleProvider();

      this.userAPI.createCredentials(json).subscribe(
        result => {
          if(result.already === true){
            Notiflix.Loading.remove();
            this._authService.signOut();
            this.NG_MSG.add({severity: 'error', summary: '¿Eres tu?', detail: result.result, closable: true})
          }
          else{
            Notiflix.Loading.remove();

            // Notiflix.Notify.success('Inicie sesión nuevamente con Google para finalizar el proceso.')

            this.router.navigate(["/login"]);
          }
        },
        error => {
          Notiflix.Loading.remove();
          this._authService.signOut();
          console.error(error)
          this.NG_MSG.add({severity: 'error', summary: 'Oh oh', detail:'Los servicios de Aurora Studios no han conseguido crear las credenciales.', closable: true})
        }
      );
    }
  }

  back(){
    this._locate.back();
  }

  onErrorRecap(){
    this.NG_MSG.add({severity: 'error', summary: 'reCaptcha error', detail:'Verificación por ReCaptcha fuera de linea.', closable: true})
  }

  ngOnInit(): void {
    this._authService.authState.subscribe((data) => {
      this.userGoogle = data;

      if(this.userGoogle.email !== null){
        this.sendData_GOOGLE();
      }
    })
  }
}
