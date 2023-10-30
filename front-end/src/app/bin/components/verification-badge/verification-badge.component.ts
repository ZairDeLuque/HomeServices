import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VerifyCodeService } from '../../services/api/verify-code.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-verification-badge',
  templateUrl: './verification-badge.component.html',
  styleUrls: ['./verification-badge.component.css'],
  providers: [MessageService]
})
export class VerificationBadgeComponent implements OnInit{
  
  protected isVerified: boolean = true;
  protected _name: string = '';
  protected _uuid: string = '';

  protected step: number = 0;
  protected showUUID: string = '';

  protected form: FormGroup;
  protected formVerify: FormGroup;

  private codeVerify: number = 0;

  protected compare(){
    if(this.codeVerify === this.formVerify.controls['x0'].value){
      this.formVerify.controls['x0'].disable();

      Notiflix.Loading.dots('Completando verificación...', {
        clickToClose: false,
        svgColor: '#a95eff',
      })

      const json = {
        _uuid: this._uuid,
        c0x: this.formVerify.controls['x0'].value
      }

      this.verify.verifyFinish(json).subscribe(
        result => {
          this.closeModal();
          Notiflix.Loading.remove();

          this.sendVerify();

          this.NG_MSG.add({severity: 'success', summary: 'Perfecto!', detail: result.result, closable: true})
        },
        error => {
          this.closeModal();
          this.NG_MSG.add({severity: 'error', summary: 'Tanto para nada:(', detail: error.result, closable: true})
        }
      )
    }
  }

  constructor(private _API_:UsersgestorService, private modalService: BsModalService, private readonly verify: VerifyCodeService, private NG_MSG: MessageService, private __formgroup: FormBuilder) {
    this.form = this.__formgroup.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
    })

    this.formVerify = this.__formgroup.group({
      x0: ['', [Validators.required ,Validators.maxLength(6), Validators.minLength(6), Validators.pattern('^[0-9]*$')]]
    })
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

    this.step = 0;
    this.formVerify.reset();
    this.form.reset();
  }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else if (sessionStorage.getItem('uu0x0')){
      return sessionStorage.getItem('uu0x0')!; 
    }
    else{
      return '';
    }
  }

  sendVerify(){
    const packet = {
      _uuid: this._uuid
    }

    this._API_.obtainUserData(packet).subscribe(
      result => {
        this._name = result.result.fn0x4;

        if(result.result._v0x2 === 0){
          this.isVerified = false;
        }
        else{
          this.isVerified = true;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this._uuid = this.whatUUID();

    this.sendVerify();

    if(this._uuid !== ''){
      for(let i = 0; i < this._uuid.length; i++){
        if(i <= this._uuid.length-6){
          this.showUUID += '*';
        }
        else{
          this.showUUID += this._uuid[i];
        }
      }
    }
  }
  
  btnActions(){
    if(this.step === 0){
      this.verifyEmail();
    }
  }

  sendMail(){
    Notiflix.Loading.dots('Enviando correo...',{
      clickToClose: false,
      svgColor: '#a95eff',
    })

    const json = {
      h0x: this._uuid,
      e1x: this.form.controls['email'].value
    }

    this.verify.sendNewVerificationCode(json).subscribe(
      result => {
        if(result.saved === true){
          const codeAsNumber = parseInt(result.code, 10);
          this.codeVerify = codeAsNumber;
          
          Notiflix.Loading.remove();
        }
        else{
          Notiflix.Loading.remove();
          Notiflix.Report.failure('Error al enviar correo.', `El agente encargado a fallado en enviar el correo de verificación a ${this.form.controls['email'].value}. Posiblemente no tienes conexión a internet o compruebe el estado del servidor en www.home-status.store`, 'Cerrar')  
        }
      },
      error => {
        console.error(error)
        Notiflix.Loading.remove();
        Notiflix.Report.failure('Error al enviar correo.', `El agente encargado a fallado en enviar el correo de verificación a ${this.form.controls['email'].value}. Posiblemente no tienes conexión a internet o compruebe el estado del servidor en www.home-status.store`, 'Cerrar')
      }
    )
  }
  
  verifyEmail(): void{
    const packet = {
      _fn: this._name,
      _e0x1: this.form.controls['email'].value
    }

    this.verify.evaluateEmail(packet).subscribe(
      result => {
        if(result.result === true){
          this.next();
          Notiflix.Notify.success('El correo parece ser valido.')
        }
        else{
          Notiflix.Notify.failure('¿'+this._name+'?: ' + result.message)
        }
      },
      error => {
        console.log(error);
        this.NG_MSG.add({severity: 'error', summary: 'Oh oh', detail: 'Los servicios de Aurora Studios no pudieron verificar el correo electrónico.', closable: true})
      }
    )
  }

  next(){
    this.step++;
    this.sendMail();
  }
}
