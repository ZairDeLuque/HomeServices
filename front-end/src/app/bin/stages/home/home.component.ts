import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { v4 as uuidv4 } from 'uuid';
import { SignupHashesService } from '../../services/session/cache/signup-hashes.service';
import * as Notiflix from 'notiflix';
import { LoggedService } from '../../services/session/cache/logged.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit{
  protected value: string = "";

  //Modal Form
  protected RecapCheck: boolean = false;
  protected TermsCheck: boolean = false;

  //Form
  protected formLogin: FormGroup;

  constructor(private router: Router, private __formgroup: FormBuilder, private modalService: BsModalService, private _locate: Location, private Title: Title, private userAPI: UsersgestorService, private _HASH: SignupHashesService, private NG_MSG: MessageService, private Logged:LoggedService) {        //Form
    this.formLogin = this.__formgroup.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]]
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
  }

  siAccount(): void{
    this.router.navigate(["/login"]);
  }

  reformatJSON(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      const JSONSimplify = {
        u0x: uuidv4(),
        pw1x: 'aurora',
        e2x: this.formLogin.controls['email'].value,
        p3x: this.formLogin.controls['password'].value,
        fn4x: this.formLogin.controls['name'].value,
      }

      resolve(JSONSimplify)
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
        className: 'font-b'
      })

      const json = await this.reformatJSON();

      this.closeModal();

      this.userAPI.createCredentials(json).subscribe(
        result => {
          // this._HASH.setEmailHash(result.owner);
          Notiflix.Loading.remove();

          this.Logged.isSessionLogged()

          this.router.navigate(["/"]);
        },
        error => {
          Notiflix.Loading.remove();
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
    
  }
}
