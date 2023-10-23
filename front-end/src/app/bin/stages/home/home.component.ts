import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { SaveFormsService } from '../../services/forms/storage/save-forms.service';
import { TinyService } from '../../services/navbars/customization/tiny.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { v4 as uuidv4 } from 'uuid';
import { SignupHashesService } from '../../services/session/cache/signup-hashes.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit{
  protected items: MenuItem[];
  protected value: string = "";

  //Form
  protected formLogin: FormGroup;

  constructor(private router: Router, private __formgroup: FormBuilder, private _save: SaveFormsService, private customNav: TinyService, private modalService: BsModalService, private _locate: Location, private Title: Title, private userAPI: UsersgestorService, private _HASH: SignupHashesService, private NG_MSG: MessageService) {    
    //PrimeNG Context Menu
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[a-zA-Z0-9!@#$%^&*()-_+=<>?]/)]],
      checked: ['', [Validators.required]]
    })

    this.Title.setTitle('HomeServices®️ - Crear cuenta')
  }
  
  //Modal
  modalRef?: BsModalRef | null;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {id: 1, class: 'bg-blur', ignoreBackdropClick: true, keyboard: false});
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

  async onResolved(captchaResponse: string) {
    if(captchaResponse){
      if(!this.formLogin.errors){        
        Notiflix.Loading.dots('Esperando respuesta...',{
          clickToClose: false,
          svgColor: '#a95eff',
          className: 'font-b'
        })

        this.customNav.setChangeValue(this.formLogin.controls['email'].value)
        this.customNav.emitNewChange();
        
        const json = await this.reformatJSON();

        this._save.setFormData(this.formLogin);
        
        this.closeModal();

        this.userAPI.createCredentials(json).subscribe(
          result => {
            this._HASH.setEmailHash(result.owner);
            Notiflix.Loading.remove();

            this.router.navigate(["/start/verification"]);
          },
          error => {
            Notiflix.Loading.remove();
            this.NG_MSG.add({severity: 'error', summary: 'Oh oh', detail:'Los servicios de Aurora Studios no han conseguido crear las credenciales.', closable: true})
          }
        );

      }
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
